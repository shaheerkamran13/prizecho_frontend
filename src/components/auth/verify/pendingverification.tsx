"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { APIErrorHandler } from "@/lib/api/error-handler";

export function PendingVerification() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isVerified, setIsVerified] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const router = useRouter();

  const resendVerificationEmail = async (email: string) => {
    if (!email) {
      toast.error("No email address provided");
      return;
    }

    try {
      console.log("Attempting to resend verification email to:", email);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_AUTH_SERVER_URL}/send-verification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        cache: 'no-store'
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        // Handle rate limiting specifically
        if (response.status === 429) {
          console.log("Rate limit hit");
          setIsResendDisabled(true);
          const waitMinutes = data.detail?.extra?.wait_minutes || 60;
          toast.error(`Too many attempts. Please wait ${waitMinutes} minutes before trying again.`);
          
          // Re-enable after wait time
          setTimeout(() => {
            setIsResendDisabled(false);
            toast.success("You can now resend the verification email");
          }, waitMinutes * 60 * 1000);
          return;
        }

        // Handle other errors
        const error = APIErrorHandler.getErrorMessage(data);
        toast.error(error.message);
        return;
      }

      // Success case
      toast.success("A new verification email has been sent!");

    } catch (error) {
      console.error('Error sending verification email:', error);
      const processedError = APIErrorHandler.getErrorMessage(error);
      toast.error(processedError.message);
    }
  };

  useEffect(() => {
    if (!email) {
      toast.error("No email provided for verification");
      return;
    }

    // Initial verification email send
    (async () => {
      await resendVerificationEmail(email);
    })();

    // Status check
    const checkVerification = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_AUTH_SERVER_URL}/check-verification/?email=${encodeURIComponent(email)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Verification check response:", data);

        if (!response.ok) {
          const error = APIErrorHandler.getErrorMessage(data);
          toast.error(error.message);
          return;
        }

        setIsVerified(data.isVerified);
        
        if (data.isVerified) {
          toast.success("Email verified successfully!");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
        const processedError = APIErrorHandler.getErrorMessage(error);
        toast.error(processedError.message);
      }
    };

    // Check immediately and then every 5 seconds
    checkVerification();
    const interval = setInterval(checkVerification, 500000);

    return () => clearInterval(interval);
  }, [email, router]);

  if (isVerified) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="mb-4 rounded-full bg-green-100 p-4">
          <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">Email Verified Successfully!</h1>
        <p className="text-center text-gray-600">
          You will be redirected to the login page shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-myColor border-t-transparent"></div>
      <h1 className="text-2xl font-semibold">Verify your email</h1>
      <h2 className="text-xl">Email Verification Pending</h2>
      <p className="text-center text-gray-600">
        {email ? (
          <>We have sent a verification email to {email}. Please follow the instructions in the email to verify your account.</>
        ) : (
          <>No email address provided. Please try the verification process again.</>
        )}
      </p>
      <button
        onClick={() => email && resendVerificationEmail(email)}
        disabled={isResendDisabled}
        className={`mt-4 rounded-md px-6 py-2 text-white transition ${
          isResendDisabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-myColor hover:bg-myColor/90'
        }`}
      >
        {isResendDisabled 
          ? "Please wait before resending" 
          : "Resend Verification Email"
        }
      </button>
    </div>
  );
}