import { getFirebaseAuth } from '@/lib/services/firebase/config';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

async function getAuthToken(): Promise<string | null> {
  try {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
  } catch (error) {
    console.error('Failed to get auth token:', error);
  }
  return null;
}

export async function serverRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requireAuth = true, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (requireAuth) {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = (await response.json()) as { error?: string };
    throw new Error(error.error || 'API request failed');
  }

  return response.json() as Promise<T>;
}

// Conversation API
export const conversationAPI = {
  list: () => serverRequest('/conversations'),

  create: (data: { title?: string; model: string }) =>
    serverRequest('/conversations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  get: (id: string) => serverRequest(`/conversations/${id}`),

  update: (id: string, data: { title: string }) =>
    serverRequest(`/conversations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    serverRequest(`/conversations/${id}`, {
      method: 'DELETE',
    }),
};

// Message API
export const messageAPI = {
  list: (conversationId: string) => serverRequest(`/messages/conversation/${conversationId}`),

  create: (data: {
    conversationId: string;
    role: 'user' | 'assistant';
    content: string;
    metadata?: Record<string, unknown>;
  }) =>
    serverRequest('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    serverRequest(`/messages/${id}`, {
      method: 'DELETE',
    }),
};
