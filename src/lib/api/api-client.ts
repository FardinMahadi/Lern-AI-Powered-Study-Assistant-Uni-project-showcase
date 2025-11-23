// Centralized API client

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface APIError extends Error {
  status?: number;
  details?: string;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Create AbortController for timeout if no signal provided
    let abortController: AbortController | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!options.signal) {
      abortController = new AbortController();
      timeoutId = setTimeout(() => {
        abortController?.abort();
      }, 60000); // 60 second timeout
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
      signal: options.signal || abortController?.signal,
    };

    try {
      const response = await fetch(url, config);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      let data: T;

      if (contentType?.includes('application/json')) {
        data = (await response.json()) as T;
      } else {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.ok) {
        const errorData = data as { error?: string; message?: string; details?: string };
        const errorMessage =
          errorData.error || errorData.message || `API request failed (${response.status})`;
        const error: APIError = new Error(errorMessage);
        error.status = response.status;
        error.details = errorData.details;
        throw error;
      }

      // Clear timeout on successful response
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      return data;
    } catch (error) {
      // Clear timeout on error
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error instanceof Error) {
        // Preserve error details
        const apiError = error as APIError;
        if (apiError.status !== undefined) {
          throw error;
        }
        // Handle network errors
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          const timeoutError: APIError = new Error('Request timed out. Please try again.');
          timeoutError.status = 408;
          throw timeoutError;
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          const networkError: APIError = new Error('Network error. Please check your connection.');
          networkError.status = 0;
          throw networkError;
        }
      }
      console.error('API Error:', error);
      throw error;
    }
  }

  get<T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  post<T = unknown>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  put<T = unknown>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  delete<T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }
}

export const apiClient = new APIClient();
export default apiClient;
