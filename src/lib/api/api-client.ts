// Centralized API client

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
      signal:
        options.signal ||
        (typeof AbortSignal !== 'undefined' ? AbortSignal.timeout(60000) : undefined),
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
        const error = new Error(errorMessage);
        (error as any).status = response.status;
        (error as any).details = errorData.details;
        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        // Preserve error details
        if ((error as any).status) {
          throw error;
        }
        // Handle network errors
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          const timeoutError = new Error('Request timed out. Please try again.');
          (timeoutError as any).status = 408;
          throw timeoutError;
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          const networkError = new Error('Network error. Please check your connection.');
          (networkError as any).status = 0;
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
