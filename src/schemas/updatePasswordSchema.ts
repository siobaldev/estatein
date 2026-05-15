import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
