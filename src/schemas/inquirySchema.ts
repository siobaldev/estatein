import { z } from "zod";

export const inquirySchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
  selectedProperty: z.string().min(1, "Selected property is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms",
  }),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
