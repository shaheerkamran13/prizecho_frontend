"use server";

import { RecoverPasswordSchema, UpdatePasswordSchema } from "@/lib/schemas/userschema";
import * as z from "zod";

export const resetPassword = async (
  values: z.infer<typeof RecoverPasswordSchema>,
) => {
  const validatedFields = RecoverPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email address" };
  }

  const { email } = validatedFields.data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_AUTH_SERVER_URL}/password-reset/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-store",
      }
    );

    console.log("Password reset response:", response.status);
    
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse response:", text);
      return { error: "Invalid server response" };
    }

    // Handle unverified email response
    if (data.code === 'unverified_email') {
      return {
        code: 'unverified_email',
        email: data.email,
        message: data.message
      };
    }

    if (!response.ok) {
      return { 
        error: data.detail || data.message || "Failed to send reset email" 
      };
    }

    return { 
      success: true,
      message: data.message || "Password reset link sent successfully"
    };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "An unexpected error occurred" };
  }
};

export const confirmPasswordReset = async (
  values: z.infer<typeof UpdatePasswordSchema>
) => {
  const validatedFields = UpdatePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid password format" };
  }

  const { token, new_password } = validatedFields.data;

  // Split the token to get uidb64 and token parts
  const [uidb64, resetToken] = token.split('/');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_AUTH_SERVER_URL}/password-reset-confirm/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uidb64,
          token: resetToken,
          new_password
        }),
        cache: "no-store",
      }
    );

    console.log("Password reset confirm response:", response.status);
    
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse response:", text);
      return { error: "Invalid server response" };
    }

    if (!response.ok) {
      return { 
        error: data.detail || data.message || "Failed to reset password" 
      };
    }

    return { 
      success: true,
      message: "Password updated successfully"
    };
  } catch (error) {
    console.error("Password reset confirm error:", error);
    return { error: "An unexpected error occurred" };
  }
};