// src/lib/api/config.ts

import { cookies } from 'next/headers';

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

export const API_BASE_URL = process.env.BACKEND_AUTH_SERVER_URL;

export async function fetchAPI(
  endpoint: string,
  options: FetchOptions = {}
) {
  const { token = true, formData = false, ...fetchOptions } = options;
  
  // Fix: Explicitly type the headers object
  const baseHeaders: Record<string, string> = {
    'Accept': 'application/json',
  };

  if (!formData) {
    baseHeaders['Content-Type'] = 'application/json';
  }

  // Merge with any additional headers
  const headers: Record<string, string> = {
    ...baseHeaders,
    ...(fetchOptions.headers as Record<string, string> || {})
  };

  // Get token from cookies if token option is true
  if (token) {
    const cookieStore = cookies();
    const userData = cookieStore.get('user_data');
    if (userData) {
      try {
        const { access_token } = JSON.parse(userData.value);
        headers['Authorization'] = `Bearer ${access_token}`;
      } catch (error) {
        console.error('Error parsing user data from cookie:', error);
      }
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      credentials: 'include', // Important for cookies
      cache: 'no-store', 
    });

    // Handle different response types
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

    // Return null for 204 No Content responses
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

// Utility function for handling form data requests
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

// Type-safe response handler
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