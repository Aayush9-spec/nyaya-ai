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
