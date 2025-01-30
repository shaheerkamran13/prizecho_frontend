// src/lib/api/services/AuthenticationService.ts
import { z } from 'zod';
import { LoginSchema } from '@/lib/schemas/userschema';
import { fetchAPI } from '../config';

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  email?: string;
  user?: any;
};

export interface AuthResponse {
  success?: string; 
  error?: string;
  message?: string;
  data?: any;
}

class AuthenticationService {
  async login(credentials: z.infer<typeof LoginSchema>) {
    return fetchAPI('/api/token/', {
      method: 'POST',
      body: JSON.stringify(credentials),
      credentials: 'include'
    });
  }

  async logout() {
    return fetchAPI('/api/logout/', {
      method: 'POST',
      credentials: 'include'
    });
  }

  async refreshToken() {
    return fetchAPI('/api/token/refresh/', {
      method: 'POST',
      credentials: 'include'
    });
  }

  async resetPassword(email: string) {
    return fetchAPI('/api/password-reset/', {
      method: 'POST',
      body: JSON.stringify({ email }),
      credentials: 'include'
    });
  }

  async confirmPasswordReset(token: string, password: string) {
    return fetchAPI('/api/password-reset-confirm/', {
      method: 'POST',
      body: JSON.stringify({
        token,
        password
      }),
      credentials: 'include'
    });
  }

  async verifyEmail(token: string) {
    return fetchAPI(`/api/verify-email/${token}/`, {
      method: 'GET',
      credentials: 'include'
    });
  }

  async resendVerificationEmail(email: string) {
    return fetchAPI('/api/send-verification/', {
      method: 'POST',
      body: JSON.stringify({ email }),
      credentials: 'include'
    });
  }

  async getUserProfile() {
    return fetchAPI('/api/user/', {
      method: 'GET',
      credentials: 'include'
    });
  }
}

export default new AuthenticationService();