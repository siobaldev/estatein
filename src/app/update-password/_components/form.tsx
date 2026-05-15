"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import AnimatedButton from "@/components/ui/animated-button";

import {
  updatePasswordSchema,
  type UpdatePasswordSchema,
} from "@/schemas/updatePasswordSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { showCustomToast } from "@/components/customToast";
import { errorMessages } from "@/lib/data";
import { signOut, updatePassword } from "@/actions/auth";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (formData: UpdatePasswordSchema) => {
    const loadingId = showCustomToast.loading("Resetting password...");

    startTransition(async () => {
      const result = await updatePassword(formData);

      if (result?.error) {
        const message = errorMessages[result.error] ?? "Something went wrong.";
        showCustomToast.error(message, "", {
          id: loadingId,
          duration: 5000,
        });
        return;
      }

      showCustomToast.success("Password changed successfuly.", "", {
        id: loadingId,
        duration: 5000,
      });

      await signOut();

      router.push("/login");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sub-foreground text-xs font-medium"
        >
          New password
        </label>

        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Min. 8 characters"
          className={`bg-sub-background caret-purple-60 focus:ring-purple-60 placeholder:text-sub-foreground ring-border w-full rounded px-4 py-3 ring outline-none ${
            errors.password ? "ring-red-400" : ""
          }`}
        />

        {errors.password && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="confirm"
          className="text-sub-foreground text-xs font-medium"
        >
          Confirm password
        </label>

        <input
          id="confirm"
          type="password"
          {...register("confirmPassword")}
          placeholder="Repeat your password"
          className={`bg-sub-background caret-purple-60 focus:ring-purple-60 placeholder:text-sub-foreground ring-border w-full rounded px-4 py-3 ring outline-none ${
            errors.confirmPassword ? "ring-red-400" : ""
          }`}
        />

        {errors.confirmPassword && (
          <p className="text-xs text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <AnimatedButton
        type="submit"
        disabled={isPending}
        className="bg-purple-60 hover:bg-purple-60/90 mt-1 w-full rounded-lg px-4 py-2.5 text-sm text-white"
      >
        {isPending ? "Updating…" : "Update password"}
      </AnimatedButton>
    </form>
  );
}
