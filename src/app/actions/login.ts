// src/app/actions/login.ts
"use server";

import { LoginSchema } from "@/lib/schemas/userschema";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password } = validatedFields.data;

  try {
    const tokenResponse = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    });

    // Parse error response
    const data = await tokenResponse.json();

    if (!tokenResponse.ok) {
      // Check specifically for unverified email error
      if (data.code === "email_not_verified") {
        return {
          error: "unverified_email",
          message: data.message,
          email: data.email
        };
      }

      if (tokenResponse.status === 400) {
        return {
          error: "Invalid credentials",
          message: "No active account found with the given credentials"
        };
      }
      return {
        error: data.message || "Login failed",
        message: "Authentication failed"
      };
    }

    const { access, refresh } = data;
    
    // Now get user details
    const userResponse = await fetch('http://localhost:8000/api/user/', {
      headers: {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      return {
        error: "Failed to get user details",
        message: "Authentication failed"
      };
    }

    const userData = await userResponse.json();

    return {
      success: "Authenticated!",
      message: "Welcome!",
      data: {
        user: userData,
        tokens: { access, refresh }
      }
    };

  } catch (error) {
    return { 
      error: "Login failed!",
      message: "An unexpected error occurred" 
    };
  }
};