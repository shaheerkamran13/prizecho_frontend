// src/lib/constants/error-messages.ts

export interface ErrorConfig {
    message: string;
    action: ErrorAction;
    disableTime?: number;
  }
  
  // Error Actions
  export type ErrorAction =
    | "SHOW"               // Just show the error message
    | "RETRY"              // Allow retry
    | "REFRESH"            // Refresh the current page
    | "DISABLE_TEMPORARY"  // Temporarily disable with timer
    | "REDIRECT_LOGIN"     // Redirect to login
    | "REDIRECT_VERIFY"    // Redirect to email verification
    | "REDIRECT_SUPPORT"   // Redirect to support
    | "REDIRECT_PRODUCTS"  // Redirect to products page
    | "REDIRECT_ORDERS"    // Redirect to orders page
    | "REDIRECT_WALLET"    // Redirect to wallet page
    | "REDIRECT_CATEGORIES"; // Redirect to categories page
  
  export const ERROR_MESSAGES: Record<string, ErrorConfig> = {
    // Base Application Errors
    ERROR: {
      message: "Something went wrong. Please try again.",
      action: "RETRY"
    },
  
    // Authentication Errors
    AUTH_ERROR: {
      message: "Authentication failed. Please try again.",
      action: "RETRY"
    },
    AUTH_EMAIL_NOT_VERIFIED: {
      message: "Please verify your email address before logging in.",
      action: "REDIRECT_VERIFY"
    },
    AUTH_INVALID_CREDENTIALS: {
      message: "Incorrect username or password.",
      action: "RETRY"
    },
    AUTH_ACCOUNT_LOCKED: {
      message: "Your account has been temporarily locked due to too many failed attempts.",
      action: "DISABLE_TEMPORARY",
      disableTime: 3600000 // 1 hour
    },
    AUTH_TOKEN_INVALID: {
      message: "Your session has expired. Please log in again.",
      action: "REDIRECT_LOGIN"
    },
    AUTH_UNVERIFIED_ACCOUNT: {
      message: "Please verify your email address. Check your inbox for the verification link.",
      action: "REDIRECT_VERIFY"
    },
  
    // Validation Errors
    VALIDATION_ERROR: {
      message: "Please check your input and try again.",
      action: "SHOW"
    },
    INVALID_EMAIL: {
      message: "Please enter a valid email address.",
      action: "SHOW"
    },
    INVALID_PASSWORD: {
      message: "Please check your password requirements and try again.",
      action: "SHOW"
    },
    INVALID_USERNAME: {
      message: "Please enter a valid username.",
      action: "SHOW"
    },
  
    // Resource Not Found Errors
    USER_NOT_FOUND: {
      message: "Account not found. Please check your details.",
      action: "SHOW"
    },
    PRODUCT_NOT_FOUND: {
      message: "The product you're looking for couldn't be found.",
      action: "REDIRECT_PRODUCTS"
    },
    ORDER_NOT_FOUND: {
      message: "Order not found. Please check the order number.",
      action: "REDIRECT_ORDERS"
    },
    NOTIFICATION_NOT_FOUND: {
      message: "This notification no longer exists.",
      action: "REFRESH"
    },
  
    // User Related Errors
    USER_ERROR: {
      message: "Unable to process your request. Please try again.",
      action: "RETRY"
    },
    USER_EMAIL_EXISTS: {
      message: "An account with this email already exists.",
      action: "SHOW"
    },
    USER_USERNAME_EXISTS: {
      message: "This username is already taken. Please choose another.",
      action: "SHOW"
    },
    USER_DELETION_SCHEDULED: {
      message: "This account is scheduled for deletion. Please contact support if this was a mistake.",
      action: "REDIRECT_SUPPORT"
    },
    USER_VERIFICATION_FAILED: {
      message: "Unable to verify your email. Please try again in a few minutes.",
      action: "RETRY"
    },
    USER_INVALID_VERIFICATION_LINK: {
      message: "This verification link is invalid or has expired. Please request a new one.",
      action: "REDIRECT_VERIFY"
    },
    USER_PASSWORD_RESET_FAILED: {
      message: "Unable to reset password. Please try again.",
      action: "RETRY"
    },
  
    // Order Related Errors
    ORDER_ERROR: {
      message: "Unable to process your order. Please try again.",
      action: "RETRY"
    },
    ORDER_EMPTY: {
      message: "Your cart is empty. Please add items before checking out.",
      action: "REDIRECT_PRODUCTS"
    },
    ORDER_INVALID_STATUS: {
      message: "Unable to update order status.",
      action: "SHOW"
    },
  
    // Payment Related Errors
    PAYMENT_ERROR: {
      message: "Payment processing failed. Please try again.",
      action: "RETRY"
    },
    PAYMENT_INVALID_AMOUNT: {
      message: "Invalid payment amount. Please try again.",
      action: "SHOW"
    },
    PAYMENT_INSUFFICIENT_FUNDS: {
      message: "Insufficient funds for this transaction.",
      action: "REDIRECT_WALLET"
    },
    PAYMENT_WALLET_NOT_FOUND: {
      message: "Your wallet was not found. Please contact support.",
      action: "REDIRECT_SUPPORT"
    },
  
    // Product Related Errors
    PRODUCT_ERROR: {
      message: "Unable to process product request.",
      action: "RETRY"
    },
    PRODUCT_INVALID_CATEGORY: {
      message: "Invalid product category selected.",
      action: "REDIRECT_CATEGORIES"
    },
    PRODUCT_INVALID_PRICE_RANGE: {
      message: "Please enter a valid price range.",
      action: "SHOW"
    },
    PRODUCT_INVALID_SEARCH_TERM: {
      message: "Search term must be at least 2 characters long.",
      action: "SHOW"
    },
  
    // Rate Limiting Errors
    RATE_LIMIT_EXCEEDED: {
      message: "Too many attempts. Please try again later.",
      action: "DISABLE_TEMPORARY",
      disableTime: 3600000 // 1 hour
    },
    EMAIL_VERIFICATION_THROTTLED: {
      message: "Too many verification attempts. Please wait before trying again.",
      action: "DISABLE_TEMPORARY",
      disableTime: 3600000
    },
    REGISTRATION_THROTTLED: {
      message: "Too many registration attempts.",
      action: "DISABLE_TEMPORARY",
      disableTime: 3600000
    },
  
    // Default Error
    DEFAULT: {
      message: "Something went wrong. Please try again later.",
      action: "RETRY"
    }
  };
  
  export type ErrorCode = keyof typeof ERROR_MESSAGES;