// src/lib/api/error-handler.ts

import { ERROR_MESSAGES, type ErrorCode, type ErrorAction, type ErrorConfig } from '../constants/error-messages';
import { toast } from 'sonner';

interface ErrorResponse {
  message: string;
  code: string;
  extra?: Record<string, any>;
}

interface ProcessedError extends ErrorConfig {
  code: ErrorCode;
  extra?: Record<string, any>;
  shouldDisable?: boolean;
  permanent?: boolean;
}

export class APIErrorHandler {
  static getErrorMessage(error: any): ProcessedError {
    // Default error configuration
    const defaultConfig = ERROR_MESSAGES.DEFAULT;
    let errorConfig = { ...defaultConfig };
    let errorCode: ErrorCode = 'DEFAULT';
    let extra = {};

    // If error is null or undefined
    if (!error) {
      return {
        ...errorConfig,
        code: errorCode
      };
    }

    // Handle error object from backend
    if (typeof error === 'object') {
      const errorResponse = error as ErrorResponse;
      
      // Check if the error code exists in our messages
      if (errorResponse.code && errorResponse.code in ERROR_MESSAGES) {
        errorCode = errorResponse.code as ErrorCode;
        errorConfig = { ...ERROR_MESSAGES[errorCode] };
        extra = errorResponse.extra || {};

        // For throttling errors, use frontend message but keep the wait time
        if (this.isThrottlingError(errorResponse.code)) {
          const waitMinutes = errorResponse.extra?.wait_minutes;
          return {
            ...errorConfig,
            message: waitMinutes 
              ? `${errorConfig.message} Please try again in ${waitMinutes} minutes.`
              : errorConfig.message,
            code: errorCode,
            extra,
            disableTime: waitMinutes ? parseInt(waitMinutes) * 60 * 1000 : errorConfig.disableTime
          };
        }

        // Handle other messages
        const message = this.getCustomMessage(errorResponse, errorConfig);
        return {
          ...errorConfig,
          message,
          code: errorCode,
          extra
        };
      }

      // Handle HTTP status codes
      if (error.status) {
        const statusError = this.handleHttpStatus(error.status);
        if (statusError) return statusError;
      }
    }

    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        message: "Unable to connect. Please check your internet connection.",
        code: 'DEFAULT',
        action: 'RETRY'
      };
    }

    // Return default error if nothing else matches
    return {
      ...errorConfig,
      code: errorCode
    };
  }

  private static isThrottlingError(code: string): boolean {
    return code.includes('THROTTLED') || code === 'RATE_LIMIT_EXCEEDED';
  }

  private static getCustomMessage(errorResponse: ErrorResponse, errorConfig: ErrorConfig): string {
    // Use backend message for validation errors
    if (errorResponse.code.startsWith('INVALID_') || errorResponse.code === 'VALIDATION_ERROR') {
      return errorResponse.message;
    }

    // Use frontend message for throttling errors
    if (this.isThrottlingError(errorResponse.code)) {
      return errorConfig.message;
    }

    // Use backend message if it includes non-throttling dynamic data
    if (errorResponse.extra && 
        Object.keys(errorResponse.extra).length > 0 && 
        !('wait_minutes' in errorResponse.extra)) {
      return errorResponse.message;
    }

    // Otherwise use our frontend message
    return errorConfig.message;
  }

  private static handleHttpStatus(status: number): ProcessedError | null {
    switch (status) {
      case 400:
        return {
          ...ERROR_MESSAGES.VALIDATION_ERROR,
          code: 'VALIDATION_ERROR'
        };
      case 401:
        return {
          ...ERROR_MESSAGES.AUTH_ERROR,
          code: 'AUTH_ERROR'
        };
      case 403:
        return {
          message: "You don't have permission to perform this action.",
          code: 'AUTH_ERROR',
          action: 'SHOW'
        };
      case 404:
        return {
          ...ERROR_MESSAGES.DEFAULT,
          code: 'DEFAULT'
        };
      case 429:
        return {
          ...ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
          code: 'RATE_LIMIT_EXCEEDED'
        };
      default:
        return null;
    }
  }

  static handleError(error: any): ProcessedError {
    const processedError = this.getErrorMessage(error);
    
    // Show error message
    toast.error(processedError.message);

    // Handle specific actions
    switch (processedError.action) {
      case 'REDIRECT_LOGIN':
        window.location.href = '/login';
        break;
      case 'REDIRECT_VERIFY':
        window.location.href = '/verify';
        break;
      case 'REDIRECT_SUPPORT':
        window.location.href = '/support';
        break;
      case 'REDIRECT_PRODUCTS':
        window.location.href = '/products';
        break;
      case 'REDIRECT_ORDERS':
        window.location.href = '/orders';
        break;
      case 'REDIRECT_WALLET':
        window.location.href = '/wallet';
        break;
      case 'REDIRECT_CATEGORIES':
        window.location.href = '/categories';
        break;
      case 'REFRESH':
        window.location.reload();
        break;
      case 'DISABLE_TEMPORARY':
        return {
          ...processedError,
          shouldDisable: true
        };
    }

    return processedError;
  }
}