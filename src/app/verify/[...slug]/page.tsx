// src/app/verify/[...slug]/page.tsx
import { VerificationDialog } from "@/components/auth/verification/verify-dialog";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default function VerificationPage({ params }: PageProps) {
  // Join all segments to reconstruct the token
  const token = params.slug.join('/');

  return (
    <div className="min-h-screen">
      <VerificationDialog verificationToken={token} />
    </div>
  );
}