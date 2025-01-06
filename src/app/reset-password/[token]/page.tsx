"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import UpdatePassword from "@/components/auth/update-password/update-password";

interface ResetPasswordPageProps {
  params: {
    token: string[];
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  // Combine all parts of the token
  const fullToken = params.token.join('/');

  if (!fullToken) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
          <p className="mt-2 text-gray-600">
            The password reset link is invalid or has expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <CardWrapper headerLabel="Reset Password">
          <div className="p-4 mobileM:p-2">
            <UpdatePassword token={fullToken} />
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}