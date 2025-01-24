// src/app/actions/register.ts
"use server";

import * as z from "zod";
import { RegisterSchema } from "@/lib/schemas/userschema";
import { APIErrorHandler } from "@/lib/api/error-handler";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, firstName, lastName, username, confirmPassword } = validatedFields.data;

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
    console.log("Registration response:", data);
    
    if (!response.ok) {
      const processedError = APIErrorHandler.getErrorMessage({
        ...data,
        status: response.status
      });

      return { 
        error: processedError.message,
        errorDetails: processedError
      };
    }
    
    return { 
      success: "Registration successful! Please check your email to verify your account.",
      data: { email } 
    };
    
  } catch (error) {
    console.error("Registration error:", error);
    const processedError = APIErrorHandler.getErrorMessage(error);
    return { 
      error: processedError.message,
      errorDetails: processedError
    };
  }
}