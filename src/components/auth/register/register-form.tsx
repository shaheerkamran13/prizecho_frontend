"use client";

import { useAuth } from "@/lib/context/auth-context";
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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { toast } from "sonner";
import * as z from "zod";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [disableEndTime, setDisableEndTime] = useState<number | null>(null);
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
      terms_agreed: false
    },
  });

  useEffect(() => {
    if (disableEndTime) {
      const now = Date.now();
      if (now < disableEndTime) {
        setIsDisabled(true);
        const timeout = setTimeout(() => {
          setIsDisabled(false);
          setDisableEndTime(null);
          toast.success("You can now try registering again");
        }, disableEndTime - now);

        return () => clearTimeout(timeout);
      } else {
        setIsDisabled(false);
        setDisableEndTime(null);
      }
    }
  }, [disableEndTime]);

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      setError("");
      setSuccess("");
      setIsPending(true);

      const result = await register(values);

      if (result.error) {
        setError(result.error);
        toast.error(result.message || result.error);

        if (result.error === 'REGISTRATION_THROTTLED' || 
            result.error === 'RATE_LIMIT_EXCEEDED') {
          const waitTime = result.extra?.wait_minutes 
            ? result.extra.wait_minutes * 60 * 1000 
            : 3600000; // Default 1 hour
          setDisableEndTime(Date.now() + waitTime);
        }
        return;
      }

      if (result.success) {
        form.reset();
        setSuccess(result.success);
        toast.success("Registration successful! Please check your email.");
        
        if (result.data?.email) {
          router.push(`/verify/pending?email=${encodeURIComponent(result.data.email)}`);
        }
      }
    } catch (error: any) {
      setError('Registration failed. Please try again.');
      toast.error('An unexpected error occurred');
    } finally {
      setIsPending(false);
    }
  };

  const getButtonText = () => {
    if (isPending) {
      return (
        <>
          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      );
    }
    
    if (isDisabled && disableEndTime) {
      const timeLeft = Math.ceil((disableEndTime - Date.now()) / 60000);
      return `Try again in ${timeLeft} minute${timeLeft === 1 ? '' : 's'}`;
    }

    return "Create account";
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
                      disabled={isPending || isDisabled}
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
                      disabled={isPending || isDisabled}
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
                    disabled={isPending || isDisabled}
                    placeholder="Choose a username"
                    type="text"
                    autoComplete="off"
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
                    disabled={isPending || isDisabled}
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
                      disabled={isPending || isDisabled}
                      placeholder="Create a password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => !isPending && !isDisabled && setShowPassword(prev => !prev)}
                      disabled={isPending || isDisabled}
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
                      disabled={isPending || isDisabled}
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => !isPending && !isDisabled && setShowConfirmPassword(prev => !prev)}
                      disabled={isPending || isDisabled}
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
                      disabled={isPending || isDisabled}
                      className="mt-1"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    I agree to Prizecho's{" "}
                    <Link href="/terms-and-policies" className="text-primary hover:underline">
                      Terms and policies
                    </Link>
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
          disabled={isPending || isDisabled}
          type="submit"
          className={`w-full rounded-md py-2 text-center font-medium text-white transition-all ${
            isDisabled 
              ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'
              : 'bg-myColor hover:bg-myColor/90'
          }`}
        >
          {getButtonText()}
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