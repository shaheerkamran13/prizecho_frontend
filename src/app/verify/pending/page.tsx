// src/app/verify/pending/page.tsx
import { CardWrapper } from "@/components/auth/card-wrapper";
import { PendingVerification } from "@/components/auth/verify/pendingverification";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-20 mt-10">
        <CardWrapper headerLabel="Verify your email">
          <div className="p-4 mobileM:p-2">
            <PendingVerification />
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}