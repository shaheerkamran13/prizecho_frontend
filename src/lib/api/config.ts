// src/lib/api/config.ts

interface FetchOptions extends RequestInit {
  token?: boolean;
  formData?: boolean;
}

export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_AUTH_SERVER_URL;

export async function fetchAPI(
  endpoint: string,
  options: FetchOptions = {}
) {
  const { token = true, formData = false, ...fetchOptions } = options;
  
  const baseHeaders: Record<string, string> = {
    'Accept': 'application/json',
  };

  if (!formData) {
    baseHeaders['Content-Type'] = 'application/json';
  }

  const headers: Record<string, string> = {
    ...baseHeaders,
    ...(fetchOptions.headers as Record<string, string> || {})
  };

  if (token && typeof window !== 'undefined') {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        const { access_token } = JSON.parse(userData);
        headers['Authorization'] = `Bearer ${access_token}`;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }

  try {
    const url = `${API_BASE_URL}${endpoint}`.replace(/([^:]\/)\/+/g, '$1');
    console.log('Fetching from:', url); // Debug log

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      credentials: 'include',
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An error occurred'
      }));
      
      throw new APIError(
        response.status,
        errorData.message || 'An error occurred',
        errorData.errors
      );
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(500, 'Network error occurred');
  }
}

export async function formDataRequest(
  endpoint: string,
  data: Record<string, string>,
  options: Omit<FetchOptions, 'body'> = {}
) {
  const formData = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return fetchAPI(endpoint, {
    ...options,
    method: 'POST',
    body: formData,
    formData: true,
  });
}

export async function handleAPIResponse<T>(
  promise: Promise<T>
): Promise<{ data?: T; error?: string; status?: number }> {
  try {
    const data = await promise;
    return { data, status: 200 };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message, status: error.status };
    }
    return { error: 'An unexpected error occurred', status: 500 };
  }
}