"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema, type LoginSchema } from "@/schemas/loginShema";
import { registerSchema, type RegisterSchema } from "@/schemas/registerSchema";

export async function signIn(formData: LoginSchema) {
  const supabase = await createSupabaseServerClient();

  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    return { error: "validation_error" };
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.code };
  }

  const role = data.user.app_metadata?.user_role;

  revalidatePath("/", "layout");
  redirect(role === "admin" ? "/admin/dashboard" : "/");
}

export async function signUp(formData: RegisterSchema) {
  const supabase = await createSupabaseServerClient();

  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    return { error: "validation_error" };
  }

  const { name, email, password } = parsed.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      data: {
        name,
      },
    },
  });

  if (error) {
    return { error: error.code };
  }

  revalidatePath("/", "layout");
  redirect("/register/confirm");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
