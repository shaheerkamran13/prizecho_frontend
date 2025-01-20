"use client";

import { register } from "@/app/actions/register";
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
import { RegisterSchema } from "@/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { toast } from "sonner";
import * as z from "zod";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // register-form.tsx

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(async () => {
      const result = await register(values);
  
      if (result.error) {
        setError(result.error);
        toast.error(result.error);
        return;
      }
  
      if (result.success) {
        form.reset();
        setSuccess(result.success);
        toast.success("Registration successful! Please check your email.");
        router.push(`/verify?email=${encodeURIComponent(values.email)}`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="First name"
                      type="text"
                      autoComplete="given-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Last name"
                      type="text"
                      autoComplete="family-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Choose a username"
                    type="text"
                    autoComplete="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="email@example.com"
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Create a password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => !isPending && setShowPassword(prev => !prev)}
                      disabled={isPending}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="h-5 w-5" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => !isPending && setShowConfirmPassword(prev => !prev)}
                      disabled={isPending}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible className="h-5 w-5" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="terms_agreed"
  render={({ field }) => (
    <FormItem>
      <div className="flex items-start space-x-2">
        <FormControl>
          <input
            type="checkbox"
            checked={field.value}
            onChange={field.onChange}
            className="mt-1"
          />
        </FormControl>
        <FormLabel className="text-sm font-normal">
          I agree to Prizecho's{" "}
          <Link href="/terms-and-policies" className="text-primary hover:underline">
            Terms and policies
          </Link>{" "}
        </FormLabel>
      </div>
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
          className="w-full rounded-md bg-accent py-2 text-center font-medium bg-myColor text-white hover:bg-myColor"
        >
          {isPending ? (
            <>
              <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <p className="w-full text-center text-xs font-medium text-textPrimary">
          Already have an account?&nbsp;&nbsp;
          <Link
            href="/login"
            aria-label="Go to Login page"
            replace
            className="group"
          >
            <span className="text-sm text-accent underline-offset-4 transition-colors duration-200 group-hover:underline">
              Login
            </span>
          </Link>
        </p>
      </form>
    </Form>
  );
};