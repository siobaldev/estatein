"use client";

import { useState, useRef, useEffect } from "react";
import AnimatedButton from "@/components/ui/animated-button";
import {
  PaperPlaneTiltIcon,
  CheckFatIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";

// Message validation schema
const messageSchema = z.object({
  message: z
    .string("Message is required")
    .min(2, "Message must be at least 2 characters"),
});

type FormData = z.infer<typeof messageSchema>;

export default function SendMessage() {
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
    resolver: zodResolver(messageSchema),
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
    console.log(data.message);
    setStatus("success");

    // Reset after showing success message
    setTimeout(() => {
      setStatus("idle");
      reset();
    }, 3000);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full items-center"
      >
        {/* Message Input Field */}
        <input
          {...register("message")}
          id="message"
          disabled={status === "loading" || status === "success"}
          placeholder="Say Hello 👋"
          className={`ring-border hover:ring-purple-60 placeholder:text-foreground caret-purple-60 focus:ring-purple-60 text-body w-full rounded-full py-3.5 pr-12.5 pl-6 font-medium ring outline-none lg:pr-14 ${errors.message ? "ring-red-400" : "ring-border"}`}
        />

        {/* Submit Button with animated icons */}
        <AnimatedButton
          type="submit"
          aria-label="Send message"
          disabled={status === "loading" || status === "success"}
          className={`bg-purple-60 absolute right-1.5 rounded-full p-2.5 transition-colors duration-300 ${status === "success" ? "bg-background!" : ""}`}
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
              Successfully sent!
            </p>
          </motion.div>
        )}

        {/* Error message */}
        {errors.message && (
          <motion.div key="error" {...statusVariants}>
            <p className="mt-1 text-sm font-medium text-red-400">
              {errors.message.message}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
