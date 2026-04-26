"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { clientSchema, type ClientFormData } from "@/schemas/contactSchema";

export async function submitContactForm(formData: ClientFormData) {
  const parsedData = clientSchema.safeParse(formData);

  if (!parsedData.success) {
    return { error: "validation_error" };
  }

  const clientData = parsedData.data;

  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from("Inquiry").insert({
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      email: clientData.email,
      phone: clientData.phone,
      message: clientData.message,
      type: "contact",
      inquiryType: clientData.inquiryType,
      hearAboutUs: clientData.howDidYouHear,
    });

    if (error) {
      return { error: "inquiry_create_failed" };
    }
  } catch (err) {
    console.error("Unexpected error submitting inquiry:", err);
    return { error: "unknown_error" };
  }
}
