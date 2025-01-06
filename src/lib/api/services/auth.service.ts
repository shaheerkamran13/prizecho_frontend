// src/lib/api/services/auth.service.ts

import { z } from 'zod';
import { LoginSchema } from '@/lib/schemas/userschema';
import { formDataRequest, handleAPIResponse } from '../config';
import { cookies } from 'next/headers';

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
};

export async function login(credentials: z.infer<typeof LoginSchema>) {
  const response = await handleAPIResponse<LoginResponse>(
    formDataRequest('/user/login', {
      username: credentials.username,
      password: credentials.password,
    })
  );

  if (response.data) {
    const expiresInMilliseconds = response.data.expires_in * 1000;
    const userData = {
      ...response.data,
      accessTokenExpires: Date.now() + expiresInMilliseconds,
    };

    cookies().set({
      name: 'user_data',
      value: JSON.stringify(userData),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: 'Authenticated!', message: 'Welcome!' };
  }

  return { error: response.error || 'Login failed' };
}