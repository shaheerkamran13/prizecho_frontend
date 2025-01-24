"use client";

import { verify } from "@/app/actions/verify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { APIErrorHandler } from "@/lib/api/error-handler";

interface VerificationState {
  status: 'loading' | 'success' | 'error';
  message?: string;
  email?: string | null;
  isRateLimited?: boolean;
  disableEndTime?: number | null;
}

export function VerifyEmail({ token }: { token: string }) {
  const [verificationState, setVerificationState] = useState<VerificationState>({
    status: 'loading'
  });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const router = useRouter();

  // Handle countdown timer
  useEffect(() => {
    if (verificationState.disableEndTime) {
      const updateTimer = () => {
        const now = Date.now();
        const remaining = Math.ceil((verificationState.disableEndTime! - now) / 60000);
        
        if (remaining <= 0) {
          setTimeLeft(null);
          setVerificationState(prev => ({ ...prev, isRateLimited: false, disableEndTime: null }));
        } else {
          setTimeLeft(remaining);
        }
      };

      // Update immediately and then every minute
      updateTimer();
      const interval = setInterval(updateTimer, 60000);
      return () => clearInterval(interval);
    }
  }, [verificationState.disableEndTime]);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setVerificationState({
            status: 'error',
            message: "Invalid verification link. Please request a new one."
          });
          return;
        }

        const result = await verify(token);

        if (result.success) {
          setVerificationState({
            status: 'success',
            message: "Your email has been verified. You can now log in to your account.",
            email: result.email
          });
          toast.success("Email verified successfully!");
          
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          // Handle rate limiting
          if (result.error?.code === "EMAIL_VERIFICATION_THROTTLED" || 
              result.error?.code === "RATE_LIMIT_EXCEEDED") {
            const waitMinutes = result.error.extra?.wait_minutes || 60;
            setVerificationState({
              status: 'error',
              email: result.email,
              isRateLimited: true,
              disableEndTime: Date.now() + (waitMinutes * 60 * 1000),
              message: "Too many attempts. Please try again later."
            });
          }
          // Handle invalid/expired link
          else if (result.error?.code === "USER_INVALID_VERIFICATION_LINK") {
            setVerificationState({
              status: 'error',
              message: "This verification link has expired. Please request a new one.",
              email: result.email
            });
          }
          // Handle other errors
          else {
            setVerificationState({
              status: 'error',
              message: "Unable to verify email. Please try again.",
              email: result.email
            });
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationState({
          status: 'error',
          message: "Something went wrong. Please try again later."
        });
      }
    };

    verifyEmail();
  }, [token, router]);

  if (verificationState.status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <h2 className="text-2xl font-semibold text-gray-900">Verifying your email...</h2>
        <p className="mt-2 text-gray-600">Please wait while we verify your email address.</p>
      </div>
    );
  }

  if (verificationState.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <div className="mb-6 flex items-center justify-center rounded-full bg-green-50 p-3">
          <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Email Verified Successfully!</h2>
        <p className="mt-2 text-center text-gray-600">
          {verificationState.message}
        </p>
        <Link 
          href="/login"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Error state with email redirect
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="mb-6 flex items-center justify-center rounded-full bg-red-50 p-3">
        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">Verification Failed</h2>
      <p className="mt-2 text-center text-gray-600">
        {verificationState.message}
        {timeLeft && ` Try again in ${timeLeft} minutes.`}
      </p>
      {!verificationState.isRateLimited && verificationState.email && (
        <Link 
          href={`/verify/pending?email=${encodeURIComponent(verificationState.email)}`}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Request New Link
        </Link>
      )}
    </div>
  );
}