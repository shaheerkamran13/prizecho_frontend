// src/app/actions/register.ts
"use server";
import * as z from "zod";
import { RegisterSchema } from "@/lib/schemas/userschema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, firstName, lastName, username, confirmPassword } = validatedFields.data;

    // Log the request payload for debugging
    console.log("Sending registration request with:", {
      email,
      username,
      password,
      password2: confirmPassword,
      first_name: firstName,
      last_name: lastName,
      terms_agreed: true
    });

    const response = await fetch('http://localhost:8000/api/register/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password2: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        terms_agreed: values.terms_agreed,  
      }),
    });

    const data = await response.json();

    // Log response data for debugging
    console.log("Registration response:", data);

    if (!response.ok) {
      // Check if the error has a detail object with message
      if (data.detail && data.detail.message) {
        return { error: data.detail.message };
      }

      // Check for specific field errors
      if (data.message) {
        return { error: data.message };
      }

      // Handle field-specific errors
      const fieldErrors = ['username', 'email', 'password', 'non_field_errors'];
      for (const field of fieldErrors) {
        if (data[field] && data[field].length > 0) {
          return { error: data[field][0] };
        }
      }

      // Fallback error message
      return { error: "Registration failed. Please try again." };
    }

    return { 
      success: "Registration successful! Please check your email to verify your account.",
      data: { email } 
    };

  } catch (error) {
    console.error("Registration error:", error);
    return { 
      error: "An error occurred during registration. Please try again later." 
    };
  }
};