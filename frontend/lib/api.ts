/**
 * API Base URL resolver for NyayaAI Frontend.
 *
 * Automatically resolves the backend API endpoint URL:
 * 1. Primary: process.env.NEXT_PUBLIC_API_URL (if configured in build)
 * 2. Automatic Production Fallback: Live Render backend when running on Vercel/non-localhost
 * 3. Local Development Fallback: http://localhost:8000
 */
export const getApiUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== '') {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host !== 'localhost' && host !== '127.0.0.1' && host !== '') {
      return 'https://nyaya-ai-4uz7.onrender.com';
    }
  }

  return 'http://localhost:8000';
};

/**
 * Robust fetch wrapper with automatic retries for server cold starts.
 * Render free tier instances spin down after inactivity and take up to 30-50s to wake up.
 */
export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries: number = 3,
  delayMs: number = 4000,
  onRetry?: (attempt: number) => void
): Promise<Response> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
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
