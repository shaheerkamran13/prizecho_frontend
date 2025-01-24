// src/types/api.ts

export interface APIError {
    message: string;
    code: string;
    extra?: Record<string, any>;
}
  
export interface APIResponse<T = any> {
    data?: T;
    error?: APIError;
    success?: boolean;
    message?: string;
}

// Authentication related error codes
export type AuthErrorCode = 
  | "AUTH_INVALID_CREDENTIALS"
  | "AUTH_EMAIL_NOT_VERIFIED"
  | "AUTH_TOKEN_INVALID"
  | "AUTH_ACCOUNT_LOCKED"
  | "AUTH_UNVERIFIED_ACCOUNT";

// User related error codes
export type UserErrorCode = 
  | "USER_NOT_FOUND"
  | "USER_EMAIL_EXISTS"
  | "USER_USERNAME_EXISTS"
  | "USER_REGISTRATION_FAILED"
  | "USER_UPDATE_FAILED"
  | "USER_DELETION_FAILED"
  | "USER_VERIFICATION_FAILED"
  | "USER_PASSWORD_RESET_FAILED"
  | "USER_ALREADY_VERIFIED";

// Validation related error codes
export type ValidationErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_USERNAME"
  | "INVALID_EMAIL"
  | "INVALID_PASSWORD"
  | "INVALID_PASSWORD2";

// General error codes
export type GeneralErrorCode =
  | "UNKNOWN_ERROR"
  | "NETWORK_ERROR"
  | "RATE_LIMIT_EXCEEDED";

export type ErrorCode = 
  | AuthErrorCode 
  | UserErrorCode 
  | ValidationErrorCode 
  | GeneralErrorCode;