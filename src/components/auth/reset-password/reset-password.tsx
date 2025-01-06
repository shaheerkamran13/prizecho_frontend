"use client";

import { resetPassword } from "@/app/actions/recover-password";
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
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RecoverPasswordSchema>>({
    resolver: zodResolver(RecoverPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RecoverPasswordSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);

    try {
      const response = await resetPassword(values);
      
      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        // Show success message
        setSuccess("Password reset link has been sent to your email");
        toast.success("Check your email for the password reset link");
        
        // Simply stay on the page showing the success message
        form.reset(); // Reset the form
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
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