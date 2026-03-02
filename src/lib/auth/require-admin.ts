import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) redirect("/login");

  const role = user.app_metadata?.user_role;
  if (role !== "admin") redirect("/");

  return user;
}
