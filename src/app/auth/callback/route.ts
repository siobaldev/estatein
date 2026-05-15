import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorCode = requestUrl.searchParams.get("error_code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  // 1. Handle auth errors (expired OTP, invalid link, etc.)
  if (error || errorCode) {
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/error?reason=${
        errorCode ?? error ?? "invalid"
      }`,
    );
  }

  // 2. Handle recovery/login code exchange
  if (code) {
    const supabase = await createSupabaseServerClient();

    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/error?reason=${
          exchangeError.code ?? "invalid"
        }`,
      );
    }

    return NextResponse.redirect(`${requestUrl.origin}${next}`);
  }

  // 3. Fallback
  return NextResponse.redirect(
    `${requestUrl.origin}/auth/error?reason=invalid`,
  );
}
