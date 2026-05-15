"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import AnimatedButton from "@/components/ui/animated-button";
import { errorMessages } from "@/lib/data";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schemas/updatePasswordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type State = "idle" | "loading" | "sent" | "error";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (formData: ForgotPasswordSchema) => {
    setState("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        // After clicking the link, Supabase redirects here so the user can set a new password.
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
      },
    );

    if (error) {
      const code = error.code ?? "unknown_error";
      setErrorMessage(errorMessages[code] ?? errorMessages["unknown_error"]);
      setState("error");
      return;
    }

    setState("sent");
  };

  // early return if condition is true
  if (state === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Icon */}
        <div className="bg-purple-60/10 border-purple-60/20 flex size-14 items-center justify-center rounded-full border">
          <EnvelopeSimpleIcon aria-hidden className="text-purple-60 size-6" />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-white">
            Check your inbox
          </p>
          <p className="text-sub-foreground text-xs">
            We sent a password reset link to{" "}
            <span className="text-foreground font-medium">{email}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setState("idle");
            setEmail("");
          }}
          className="text-grey-30 hover:text-foreground mt-2 text-xs underline underline-offset-4 transition-colors"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-sub-foreground text-xs font-medium"
        >
          Email address
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          className={`bg-sub-background caret-purple-60 focus:ring-purple-60 placeholder:text-sub-foreground ring-border w-full rounded px-4 py-3 ring outline-none ${errors.email ? "ring-red-400" : ""}`}
        />
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {state === "error" && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-center text-xs text-red-400">
          {errorMessage}
        </p>
      )}

      <AnimatedButton
        type="submit"
        disabled={state === "loading"}
        className="bg-purple-60 hover:bg-purple-60/90 mt-1 w-full rounded-lg px-4 py-2.5 text-sm text-white"
      >
        {state === "loading" ? "Sending link…" : "Send reset link"}
      </AnimatedButton>
    </form>
  );
}
