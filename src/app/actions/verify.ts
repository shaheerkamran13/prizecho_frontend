// src/app/actions/verify.ts
import { APIErrorHandler } from "@/lib/api/error-handler";

export const verify = async (token: string) => {
  try {
    if (!token) {
      return { 
        success: false,
        message: "This verification link is invalid or has expired. Please request a new one.",
        error: {
          code: "USER_INVALID_VERIFICATION_LINK",
          message: "Invalid verification link",
        }
      };
    }

    console.log("Starting verification for token:", token);
    const verifyUrl = `${process.env.NEXT_PUBLIC_BACKEND_AUTH_SERVER_URL}/verify-email/${token}/`;
    
    const response = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    });

    const data = await response.json();
    console.log("Verification response:", data);

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 429) {
        const waitMinutes = data.detail?.extra?.wait_minutes || 60;
        return {
          success: false,
          message: `Too many verification attempts. Please try again in ${waitMinutes} minutes.`,
          error: {
            code: "EMAIL_VERIFICATION_THROTTLED",
            message: `Too many verification attempts. Please wait ${waitMinutes} minutes.`,
            extra: {
              wait_minutes: waitMinutes
            }
          },
          email: data.email
        };
      }

      // Handle expired/invalid token
      if (response.status === 400 && data.code === "VERIFICATION_LINK_EXPIRED") {
        return {
          success: false,
          message: "This verification link has expired. Please request a new one.",
          error: {
            code: "USER_INVALID_VERIFICATION_LINK",
            message: "Verification link expired"
          },
          email: data.email
        };
      }

      // Handle already verified
      if (response.status === 400 && data.code === "ALREADY_VERIFIED") {
        return {
          success: true,
          message: "Your email is already verified. You can now log in to your account.",
          email: data.email
        };
      }

      // Handle other errors
      const error = APIErrorHandler.getErrorMessage(data);
      return {
        success: false,
        message: error.message,
        error: error,
        email: data.email
      };
    }

    return {
      success: true,
      email: data.email,
      message: "Your email has been verified successfully. You can now log in to your account."
    };

  } catch (error) {
    console.error("Verification error:", error);
    const processedError = APIErrorHandler.getErrorMessage(error);
    return { 
      success: false,
      message: processedError.message,
      error: processedError
    };
  }
};