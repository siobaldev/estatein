import { WarningCircleIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AnimatedLink from "@/components/ui/animated-link";

export const metadata: Metadata = {
  title: "Authentication Error - Estatein",
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  searchParams: Promise<{
    reason?: string;
  }>;
}

const ERROR_MAP: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  otp_expired: {
    title: "Reset link expired",
    description:
      "This password reset link has expired or has already been used. Please request a new one.",
  },

  access_denied: {
    title: "Access denied",
    description:
      "You don’t have permission to access this link. It may be invalid or already used.",
  },

  invalid: {
    title: "Invalid link",
    description:
      "This authentication link is invalid or malformed. Please try again.",
  },

  default: {
    title: "Authentication error",
    description:
      "Something went wrong during authentication. Please try again.",
  },
};

export default async function AuthErrorPage({ searchParams }: Props) {
  const params = await searchParams;

  const reason = params.reason ?? "default";

  const content = ERROR_MAP[reason] ?? ERROR_MAP.default;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const isLoggedIn = !!user;

  const role = user?.user_metadata?.user_role ?? null;

  const getPrimaryRecoveryAction = () => {
    if (!isLoggedIn) {
      return {
        href: "/forgot-password",
        label: "Request New Reset Link",
      };
    }

    if (role === "admin") {
      return {
        href: "/admin",
        label: "Go to Admin Panel",
      };
    }

    return {
      href: "/settings/security",
      label: "Change Password",
    };
  };

  const getSecondaryNavigationAction = () => {
    if (!isLoggedIn) {
      return {
        href: "/login",
        label: "Back to Login",
      };
    }

    if (role === "admin") {
      return {
        href: "/admin",
        label: "Go to Dashboard",
      };
    }

    return {
      href: "/",
      label: "Go to Homepage",
    };
  };

  const primaryRecoveryAction = getPrimaryRecoveryAction();
  const secondaryNavigationAction = getSecondaryNavigationAction();

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="border-border bg-sub-background relative rounded-2xl border p-10 text-center shadow-2xl">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-center gap-x-2">
            <Image
              src="/assets/Estatein-Icon.svg"
              alt="estatein-icon"
              className="size-6"
              width={100}
              height={100}
            />
            <span className="text-foreground text-lg font-bold">Estatein</span>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-500/10 p-4">
              <WarningCircleIcon
                className="size-8 text-red-400"
                aria-label="Error Icon"
              />
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white">
            {content.title}
          </h1>

          <p className="text-sub-foreground mb-8 text-sm leading-relaxed">
            {content.description}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <AnimatedLink
              href={primaryRecoveryAction.href}
              className="bg-purple-60 text-white-99 block w-full rounded-md px-6 py-3 text-sm font-medium transition hover:opacity-90"
            >
              {primaryRecoveryAction.label}
            </AnimatedLink>

            <AnimatedLink
              href={secondaryNavigationAction.href}
              className="border-border text-sub-foreground hover:bg-background block w-full rounded-md border px-6 py-3 text-sm transition"
            >
              {secondaryNavigationAction.label}
            </AnimatedLink>
          </div>
        </div>
      </div>
    </main>
  );
}
