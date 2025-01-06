// src/app/actions/verify.ts
export const verify = async (token: string) => {
  try {
    if (!token) {
      console.error("No token provided");
      return { success: false };
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

    // Return both success/failure and email
    return {
      success: response.ok && (
        data.message === "Email successfully verified" || 
        data.message === "Email already verified"
      ),
      email: data.email, // Backend should always return this
      message: data.message
    };

  } catch (error) {
    console.error("Verification error:", error);
    return { success: false };
  }
};