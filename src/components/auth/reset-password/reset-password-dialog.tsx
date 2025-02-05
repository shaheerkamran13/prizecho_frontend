// src/components/auth/reset-password/reset-password-dialog.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import ResetPassword from "./reset-password";
import { useAuth } from "@/lib/context/UserAuthContext";

export default function ResetPasswordDialog() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handlePasswordReset = (event: CustomEvent) => {
      if (event.detail.success) {
        router.push('/login');
      }
    };

    // Use custom event instead of storage
    window.addEventListener('passwordReset' as any, handlePasswordReset);
    return () => {
      window.removeEventListener('passwordReset' as any, handlePasswordReset);
    };
  }, [router]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  return (
    <Dialog.Root open={true} onOpenChange={() => router.back()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 w-[300px] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-background p-6 shadow-lg mobileM:w-[350px] xs:w-[400px] md:w-[400px]"
        >
          <Dialog.Title className="mb-4 text-xl font-semibold">
            Reset Password
          </Dialog.Title>
          
          <ResetPassword />
          
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 p-1" aria-label="Close">
              <IoClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}