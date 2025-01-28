// src/lib/api/services/AuthenticationService.ts
import { z } from 'zod';
import { LoginSchema } from '@/lib/schemas/userschema';
import { formDataRequest, handleAPIResponse } from '../config';
import { cookies } from 'next/headers';

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

export class AuthenticationService {
 static async login(credentials: z.infer<typeof LoginSchema>): Promise<AuthResponse> {
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

     return { 
       success: 'Authenticated!',
       message: 'Welcome!',
       data: response.data
     };
   }

   return { error: response.error || 'Login failed' };
 }
}