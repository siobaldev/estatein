"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatus(
  id: number,
  status: "new" | "read" | "archived",
) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("Inquiry")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Failed to update inquiry status:", error);
    return { error: "inquiry_update_failed" };
  }

  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: number) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("Inquiry").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete inquiry:", error);
    return { error: "inquiry_delete_failed" };
  }

  revalidatePath("/admin/inquiries");
}
