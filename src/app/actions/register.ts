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

    if (!response.ok) {
      // Log error response for debugging
      console.error("Registration failed:", data);
      
      if (response.status === 400) {
        // Handle validation errors
        if (data.username) return { error: data.username[0] };
        if (data.email) return { error: data.email[0] };
        if (data.password) return { error: data.password[0] };
        if (data.non_field_errors) return { error: data.non_field_errors[0] };
      }

      return { 
        error: "Registration failed. Please try again." 
      };
    }

    return { 
      success: "Registration successful! Please check your email to verify your account.",
      data: { email: email }  // Add this line to return the email
    };

  } catch (error) {
    console.error("Registration error:", error);
    return { 
      error: "An error occurred during registration." 
    };
  }
};