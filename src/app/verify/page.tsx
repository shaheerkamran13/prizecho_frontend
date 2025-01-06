// src/app/verify/[...token]/page.tsx
import { CardWrapper } from "@/components/auth/card-wrapper";
import { VerifyEmail } from "@/components/auth/verification/verify-email";


export default function VerifyEmailPage({
  params
}: {
  params: { token: string[] }
}) {
  // Join the token parts back together
  const token = params.token.join('/');
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-20 mt-10">
        <CardWrapper headerLabel="Email Verification">
          <div className="p-4 mobileM:p-2">
            <VerifyEmail token={token} />
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}