import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const role = user?.app_metadata?.user_role;
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  // Admin visiting /admin → redirect to dashboard
  if (user && role === "admin" && pathname === "/admin") {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/admin/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  // Not logged in trying to access admin
  if (!user && isAdminRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Logged in but not admin trying to access admin
  if (user && role !== "admin" && isAdminRoute) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  // Regular user visiting login — redirect to home
  if (user && isLoginPage) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = role === "admin" ? "/admin/dashboard" : "/";
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
