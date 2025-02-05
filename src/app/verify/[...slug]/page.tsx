// src/app/verify/[...slug]/page.tsx
import { CardWrapper } from "@/components/auth/card-wrapper";
import { VerifyEmail } from "@/components/auth/verification/verify-email";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug?: string[];
  };
}

export default function VerificationPage({ params }: PageProps) {
  // Check if slug exists and has segments
  if (!params?.slug || params.slug.length === 0) {
    notFound();
  }

  // Safely join slug segments
  const verificationToken = params.slug.join('/');

  if (!verificationToken) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-20 mt-10">
        <CardWrapper headerLabel="Email Verification">
          <div className="p-4 mobileM:p-2">
            <VerifyEmail token={verificationToken} />
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}