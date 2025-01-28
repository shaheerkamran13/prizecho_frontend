"use client";

import { createContext, useContext, useCallback, ReactNode } from 'react';
import { LoginSchema, RegisterSchema, UpdatePasswordSchema } from '@/lib/schemas/userschema'; // Added UpdatePasswordSchema
import { fetchAPI } from '../api/config';
import * as z from 'zod';

interface AuthContextType {
    login: (values: z.infer<typeof LoginSchema>) => Promise<{
        success?: string;
        error?: string;
        message?: string;
        data?: {
          email?: string;
          user?: any;
          tokens?: {
            access: string;
            refresh: string;
          };
        };
    }>;
    register: (values: z.infer<typeof RegisterSchema>) => Promise<{
        success?: string;
        error?: string;
        message?: string;
        data?: {
          email?: string;
        };
        extra?: {
          wait_minutes?: number;
          [key: string]: any;
        };
    }>;
    verifyEmail: (token: string) => Promise<{
        success?: boolean;
        error?: string;
        message?: string;
        email?: string;
    }>;
    resendVerification: (email: string) => Promise<{
        success?: string;
        error?: string;
        message?: string;
    }>;
    requestPasswordReset: (email: string) => Promise<{
        success?: boolean;
        error?: string;
        message?: string;
        code?: string;
        email?: string;
    }>;
    confirmPasswordReset: (values: z.infer<typeof UpdatePasswordSchema>) => Promise<{
        success?: boolean;
        error?: string;
        message?: string;
    }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const login = useCallback(async (values: z.infer<typeof LoginSchema>) => {
        try {
          const response = await fetchAPI('/api/token/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (response.access && response.refresh) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
    
            return {
              success: 'Authenticated!',
              message: 'Welcome!',
              data: {
                email: response.email,
                tokens: { access: response.access, refresh: response.refresh },
                user: response.user
              }
            };
          }
          return { 
            error: 'Authentication failed',
            message: 'Invalid credentials'
          };
        } catch (error: any) {
          if (error.code === "email_not_verified") {
            return {
              error: "unverified_email",
              message: error.message,
              data: { email: error.email }
            };
          }
          return { 
            error: error.message || 'Login failed',
            message: "Authentication failed" 
          };
        }
    }, []);

    const register = useCallback(async (values: z.infer<typeof RegisterSchema>) => {
        try {
          const response = await fetchAPI('/api/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              username: values.username,
              password: values.password,
              password2: values.confirmPassword,
              first_name: values.firstName,
              last_name: values.lastName,
              terms_agreed: values.terms_agreed,
            }),
          });
      
          return { 
            success: "Registration successful! Please check your email to verify your account.",
            message: "Registration successful!",
            data: { email: values.email } 
          };
        } catch (error: any) {
          if (error.code === 'REGISTRATION_THROTTLED' || 
              error.code === 'RATE_LIMIT_EXCEEDED') {
            return {
              error: error.code,
              message: error.message,
              extra: {
                wait_minutes: error.extra?.wait_minutes || 60
              }
            };
          }
      
          return { 
            error: error.message || 'Registration failed',
            message: "Registration failed" 
          };
        }
    }, []);

    const verifyEmail = useCallback(async (token: string) => {
        try {
          const response = await fetchAPI(`/verify-email/${token}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          return {
            success: true,
            message: "Email verified successfully",
            email: response.email
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message,
            message: "Verification failed"
          };
        }
    }, []);

    const resendVerification = useCallback(async (email: string) => {
        try {
          const response = await fetchAPI('/send-verification/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          return {
            success: "Verification email sent",
            message: response.message
          };
        } catch (error: any) {
          return {
            error: error.message,
            message: "Failed to send verification email"
          };
        }
    }, []);

    const requestPasswordReset = useCallback(async (email: string) => {
        try {
          const response = await fetchAPI('/password-reset/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
      
          return {
            success: true,
            message: response.message || "Password reset link sent successfully"
          };
        } catch (error: any) {
          if (error.code === 'unverified_email') {
            return {
              error: 'unverified_email',
              code: error.code,
              message: error.message,
              email: error.email
            };
          }
      
          return {
            success: false,
            error: error.message || "Failed to send reset email"
          };
        }
    }, []);
  
    const confirmPasswordReset = useCallback(async (values: z.infer<typeof UpdatePasswordSchema>) => {
        try {
          const [uidb64, resetToken] = values.token.split('/');
      
          const response = await fetchAPI('/password-reset-confirm/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uidb64,
              token: resetToken,
              new_password: values.new_password
            }),
          });
      
          return {
            success: true,
            message: "Password updated successfully"
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message || "Failed to reset password"
          };
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }, []);

    return (
        <AuthContext.Provider value={{
            login,
            register,
            verifyEmail,
            resendVerification,
            logout,
            requestPasswordReset,
            confirmPasswordReset,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};