"use client";

import { verify } from "@/app/actions/verify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function VerifyEmail({ token }: { token: string }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setStatus('error');
          toast.error("Invalid verification link");
          return;
        }

        console.log("Verifying with token:", token);
        const result = await verify(token);
        console.log("Verification result:", result);

        // Always store the email if it's returned, even in error cases
        if (result?.email) {
          setUserEmail(result.email);
        }

        if (result.success) {
          setStatus('success');
          toast.success("Email verified successfully!");
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          setStatus('error');
          toast.error(result.message || "Failed to verify email");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus('error');
        toast.error("Failed to verify email");
      }
    };

    verifyEmail();
  }, [token, router]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-myColor border-t-transparent"></div>
        <h2 className="text-xl font-semibold">Verifying your email...</h2>
        <p className="mt-2 text-gray-600">Please wait while we verify your email address.</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 rounded-full bg-green-100 p-4">
          <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Email Verified Successfully!</h2>
        <p className="mt-2 text-center text-gray-600">
          Your email has been verified. You can now log in to your account.
        </p>
        <Link 
          href="/login"
          className="mt-4 rounded-md bg-myColor px-6 py-2 text-white transition hover:bg-myColor/90"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Error state with email redirect
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-4 rounded-full bg-red-100 p-4">
        <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold">Verification Failed</h2>
      <p className="mt-2 text-center text-gray-600">
        We couldn't verify your email. The link might be expired or invalid.
      </p>
      <Link 
        href={`/verify/pending${userEmail ? `?email=${encodeURIComponent(userEmail)}` : ''}`}
        className="mt-4 rounded-md bg-myColor px-6 py-2 text-white transition hover:bg-myColor/90"
      >
        Request New Link
      </Link>
    </div>
  );
}