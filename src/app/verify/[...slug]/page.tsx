// src/app/verify/[...token]/page.tsx
import { CardWrapper } from "@/components/auth/card-wrapper";
import { VerifyEmail } from "@/components/auth/verification/verify-email";

interface PageProps {
  params: {
    token: string[];
  };
}

export default function VerificationPage({ params }: PageProps) {
  const { token } = params;
  
  // Join token segments directly without storing in storage
  const verificationToken = token.join('/');

  return (
    <div className="min-h-screen">
      <CardWrapper headerLabel="Email Verification">
        <div className="p-4 mobileM:p-2">
          <VerifyEmail token={verificationToken} />
        </div>
      </CardWrapper>
    </div>
  );
}