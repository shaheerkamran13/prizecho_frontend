// src/lib/context/UserAuthContext.tsx
"use client";

import { createContext, useContext, useCallback, ReactNode, useState, useEffect } from 'react';
import { LoginSchema, RegisterSchema, UpdatePasswordSchema } from '@/lib/schemas/userschema';
import { fetchAPI } from '../api/config';
import AuthenticationService from '../api/services/AuthenticationService';
import * as z from 'zod';

interface AuthContextType {
    login: (values: z.infer<typeof LoginSchema>) => Promise<{
        success?: string;
        error?: string;
        message?: string;
        data?: {
          email?: string;
          user?: any;
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
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    user: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const userData = await AuthenticationService.getUserProfile();
            setIsAuthenticated(true);
            setUser(userData);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const login = useCallback(async (values: z.infer<typeof LoginSchema>) => {
        try {
            const response = await AuthenticationService.login(values);

            if (response) {
                setIsAuthenticated(true);
                if (response.user) {
                    setUser(response.user);
                }

                return {
                    success: 'Authenticated!',
                    message: 'Welcome!',
                    data: {
                        email: response.email,
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
                body: JSON.stringify({
                    email: values.email,
                    username: values.username,
                    password: values.password,
                    password2: values.confirmPassword,
                    first_name: values.firstName,
                    last_name: values.lastName,
                    terms_agreed: values.terms_agreed,
                }),
                credentials: 'include'
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
            const response = await AuthenticationService.verifyEmail(token);
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
            const response = await AuthenticationService.resendVerificationEmail(email);
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
            const response = await AuthenticationService.resetPassword(email);
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
            const response = await AuthenticationService.confirmPasswordReset(
                values.token,
                values.new_password
            );
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

    const logout = useCallback(async () => {
        try {
            await AuthenticationService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsAuthenticated(false);
            setUser(null);
        }
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
            isAuthenticated,
            user
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