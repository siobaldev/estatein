"use client";

import { useState, useRef, useEffect } from "react";
import AnimatedButton from "../ui/animated-button";
import {
  PaperPlaneTiltIcon,
  EnvelopeSimpleIcon,
  CheckFatIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";

// Email validation schema
const emailSchema = z.object({
  email: z.email("Please enter a valid email"),
});

type FormData = z.infer<typeof emailSchema>;

export default function Newsletter() {
  // Track form submission state
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Setup form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef!.current) {
        clearTimeout(timeoutRef!.current);
      }
    };
  }, []);

  // Animation variants for status icons
  const statusVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.1 },
    },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.1 } },
  };

  /**
   * Handle form submission
   * 1. Show loading state (1s simulated API call)
   * 2. Show success state (3s)
   * 3. Reset form and return to idle
   */
  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data.email);
    setStatus("success");

    // Reset after showing success message
    setTimeout(() => {
      setStatus("idle");
      reset();
    }, 3000);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full items-center gap-x-2.5 md:w-fit"
      >
        {/* Email Icon */}
        <EnvelopeSimpleIcon className="stroke-sub-foreground text-sub-foreground absolute left-5 size-5 md:size-5" />

        {/* Email Input Field */}
        <input
          {...register("email")}
          autoComplete="email"
          type="email"
          id="email"
          disabled={status === "loading" || status === "success"}
          placeholder="Enter your email"
          className={`ring-border hover:ring-purple-60 placeholder:text-sub-foreground caret-purple-60 focus:ring-purple-60 text-body w-full rounded-lg px-12 py-3.5 font-medium ring outline-none md:w-fit ${errors.email ? "ring-red-400" : "ring-border"}`}
        />

        {/* Submit Button with animated icons */}
        <AnimatedButton
          type="submit"
          aria-label="Subscribe to newsletter"
          disabled={status === "loading" || status === "success"}
          className="absolute right-1.5 p-3.5"
        >
          <AnimatePresence mode="wait">
            {/* Idle: Paper plane icon */}
            {status === "idle" && (
              <motion.div key="send" {...statusVariants}>
                <PaperPlaneTiltIcon
                  weight="fill"
                  aria-hidden="true"
                  className="fill-foreground size-5 md:size-6"
                />
              </motion.div>
            )}
            {/* Loading: Spinning icon */}
            {status === "loading" && (
              <motion.div key="loading" {...statusVariants}>
                <SpinnerGapIcon
                  aria-hidden="true"
                  className="fill-foreground size-5 animate-spin md:size-6"
                />
              </motion.div>
            )}
            {/* Success: Checkmark icon */}
            {status === "success" && (
              <motion.div key="success" {...statusVariants}>
                <CheckFatIcon
                  weight="fill"
                  aria-hidden="true"
                  className="size-5 fill-green-400 md:size-6"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedButton>
      </form>

      {/* Status messages */}
      <div>
        {/* Success message */}
        {status === "success" && (
          <motion.div key="check" {...statusVariants}>
            <p className="mt-1 text-sm font-medium text-green-400">
              Successfully subscribed!
            </p>
          </motion.div>
        )}

        {/* Error message */}
        {errors.email && (
          <motion.div key="error" {...statusVariants}>
            <p className="mt-1 text-sm font-medium text-red-400">
              {errors.email.message}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
