/**
 * API Base URL resolver for NyayaAI Frontend.
 *
 * Automatically resolves the backend API endpoint URL:
 * 1. Primary: process.env.NEXT_PUBLIC_API_URL (if configured in build)
 * 2. Automatic Production Fallback: Live Render backend when running on Vercel/non-localhost
 * 3. Local Development Fallback: http://localhost:8000
 */
export const getApiUrl = (): string => {
  let url = '';
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== '') {
    url = process.env.NEXT_PUBLIC_API_URL.trim().replace(/\/$/, '');
  } else if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host !== 'localhost' && host !== '127.0.0.1' && host !== '') {
      url = 'https://nyaya-ai-4uz7.onrender.com';
    } else {
      url = 'http://localhost:8000';
    }
  } else {
    url = 'https://nyaya-ai-4uz7.onrender.com';
  }

  // Force HTTPS for production render domain to prevent Mixed Content blocking
  if (url.includes('onrender.com') && url.startsWith('http://')) {
    url = url.replace(/^http:\/\//, 'https://');
  }

  return url;
};

/**
 * Robust fetch wrapper with automatic retries for server cold starts and stream cloning.
 * Render free tier instances spin down after inactivity and take up to 35-45s to wake up.
 */
export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries: number = 12,
  delayMs: number = 3000,
  onRetry?: (attempt: number) => void
): Promise<Response> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Re-create FormData if body is a FormData instance so streams aren't consumed across retries
      let currentOptions: RequestInit = { ...options };
      if (options.body && typeof FormData !== 'undefined' && options.body instanceof FormData) {
        const freshFormData = new FormData();
        options.body.forEach((value, key) => {
          if (typeof File !== 'undefined' && value instanceof File) {
            freshFormData.append(key, value, value.name);
          } else {
            freshFormData.append(key, value as string);
          }
        });
        currentOptions.body = freshFormData;
      }

      const response = await fetch(url, currentOptions);
      if (response.ok || response.status < 500) {
        return response;
      }
      if (attempt === retries) return response;
    } catch (err) {
      if (attempt === retries) throw err;
    }
    if (onRetry) onRetry(attempt);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error('Server connection failed after retries.');
};
