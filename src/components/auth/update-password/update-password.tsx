"use client";

import { useAuth } from "@/lib/context/UserAuthContext";
import { UpdatePasswordSchema } from "@/lib/schemas/userschema";
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

interface UpdatePasswordProps {
  token: string;
}

export default function UpdatePassword({ token }: UpdatePasswordProps) {
  const { confirmPasswordReset } = useAuth();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      token: token,
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdatePasswordSchema>) => {
    try {
      setError("");
      setSuccess("");
      setIsPending(true);

      const result = await confirmPasswordReset(values);
      
      if (result.error) {
        setError(result.error);
        toast.error(result.error);
      } else if (result.success) {
        setSuccess(result.message);
        toast.success(result.message);
        
        // Set flag for dialog close
        localStorage.setItem("updatePassword", "true");
        window.dispatchEvent(new StorageEvent("storage", {
          key: "updatePassword",
          newValue: "true"
        }));
        
        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Update password error:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Failed to update password");
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
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full rounded-md bg-myColor py-2 text-center font-medium text-white hover:bg-myColor/90"
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
              Updating Password...
            </div>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </Form>
  );
}