import { CardWrapper } from "@/components/auth/card-wrapper";
import ResetPassword from "@/components/auth/reset-password/reset-password";
;
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: `Forgot your password? Reset your Panaversity account password securely to regain access to your learning dashboard and courses.`,
};

const resetPassword = () => {
  return (
    <>
     
      <div className="flex min-h-[85vh] items-center justify-center">
        <Suspense>
          <CardWrapper headerLabel="Reset Password">
            <ResetPassword />
          </CardWrapper>
        </Suspense>
      </div>

    </>
  );
};

export default resetPassword;
