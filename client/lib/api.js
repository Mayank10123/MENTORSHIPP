// API utility for handling environment-based URLs

export const API_URLS = {
  NODE: process.env.NEXT_PUBLIC_NODE_API_URL || 'http://127.0.0.1:5000',
  PYTHON: process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://127.0.0.1:8000',
};

/**
 * Safely fetch from API with error handling
 * Returns null if API is unavailable (useful for graceful degradation)
 */
export async function safeApiFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status}`, url);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error.message);
    return null;
  }
}
