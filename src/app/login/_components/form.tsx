"use client";

import {
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
} from "@phosphor-icons/react";
import AnimatedButton from "@/components/ui/animated-button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/loginShema";
import { showCustomToast } from "@/components/customToast";
import { useState, useTransition } from "react";
import { signIn } from "@/actions/auth";

const ERROR_MESSAGES: Record<string, string> = {
  email_not_confirmed: "Please confirm your email before logging in.",
  invalid_credentials: "Incorrect email or password.",
  validation_error: "Please check your input and try again.",
};

export default function Form() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const passwordValue = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async (formData: LoginSchema) => {
    startTransition(async () => {
      const result = await signIn(formData);

      if (result.error) {
        const message = ERROR_MESSAGES[result.error] ?? "Something went wrong.";
        showCustomToast.error(message);
        return;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base">
      {/* Email */}
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div
          className={`border-border bg-sub-background focus-within:border-purple-60 relative z-10 flex items-center rounded-md border px-4 py-3 ${errors.email && "border-red-400"}`}
        >
          <EnvelopeSimpleIcon aria-hidden className="size-5" />
          <input
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="caret-purple-60 placeholder:text-grey-30 w-full pl-4 outline-none"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="mb-1 block">
            Password
          </label>
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div
          className={`border-border bg-sub-background focus-within:border-purple-60 relative z-10 flex items-center rounded-md border px-4 py-3 ${errors.password && "border-red-400"}`}
        >
          <LockIcon aria-hidden className="size-5" />
          <input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="caret-purple-60 placeholder:text-grey-30 w-full pr-2 pl-4 outline-none"
          />
          {passwordValue && (
            <AnimatedButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Show password"
            >
              {showPassword ? (
                <EyeSlashIcon aria-hidden className="size-5" />
              ) : (
                <EyeIcon aria-hidden className="size-5" />
              )}
            </AnimatedButton>
          )}
        </div>
      </div>

      <AnimatedButton
        type="button"
        className="hover:text-purple-60 ml-auto flex text-xs"
      >
        Forgot password?
      </AnimatedButton>

      {/* Submit button */}
      <AnimatedButton
        type="submit"
        disabled={isPending}
        className="bg-purple-60 text-white-99 mt-4 w-full rounded px-6 py-3 text-base"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </AnimatedButton>
    </form>
  );
}
