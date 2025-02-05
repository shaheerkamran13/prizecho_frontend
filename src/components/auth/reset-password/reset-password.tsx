"use client";

import { useAuth } from "@/lib/context/UserAuthContext";
import { RecoverPasswordSchema } from "@/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { Input } from "../ui/input";

export default function ResetPassword() {
  const { requestPasswordReset } = useAuth();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof RecoverPasswordSchema>>({
    resolver: zodResolver(RecoverPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RecoverPasswordSchema>) => {
    try {
      setError("");
      setSuccess("");
      setUnverifiedEmail(null);
      setIsPending(true);

      const result = await requestPasswordReset(values.email);
      
      if (result.error) {
        setError(result.error);
        if (result.code === 'unverified_email') {
          setUnverifiedEmail(values.email);
          setError("Please verify your email address before resetting your password.");
          toast.error("Email not verified");
        } else {
          toast.error(result.message || result.error);
        }
      } else {
        setSuccess(result.message);
        toast.success("Check your email for the password reset link");
        form.reset();
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  const handleSendVerification = async () => {
    if (!unverifiedEmail) return;
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_AUTH_SERVER_URL}/send-verification/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: unverifiedEmail })
        }
      );

      if (response.ok) {
        toast.success("Verification email sent. Please check your inbox.");
      } else {
        toast.error("Failed to send verification email. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send verification email. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending || !!success}
                    placeholder="Enter your email"
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        {unverifiedEmail && (
          <Button
            type="button"
            onClick={handleSendVerification}
            className="w-full rounded-md bg-blue-500 py-2 text-center font-medium text-white hover:bg-blue-600"
          >
            Resend Verification Email
          </Button>
        )}

        {!success && (
          <Button
            disabled={isPending}
            type="submit"
            className="w-full rounded-md bg-myColor py-2 text-center font-medium text-white hover:bg-myColor/90"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </div>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}