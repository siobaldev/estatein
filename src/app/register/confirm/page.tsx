// app/register/confirm/page.tsx
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Email - Estatein",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConfirmPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="border-border bg-sub-background relative rounded-2xl border p-10 text-center shadow-2xl">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-center gap-x-2">
            <Image
              src={"/assets/Estatein-Icon.svg"}
              alt="estatein-icon"
              className="size-6"
              width={100}
              height={100}
            />

            {/* Brand Name Text */}
            <span className="text-foreground text-lg font-bold">Estatein</span>
          </div>

          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="bg-purple-60/10 rounded-full p-4">
              <EnvelopeSimpleIcon
                aria-label="Email Icon"
                className="text-purple-60 size-8"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white">
            Check your <span className="text-purple-60 italic">email.</span>
          </h1>
          <p className="text-sub-foreground mb-8 text-sm leading-relaxed">
            We sent a confirmation link to your email address. Click the link to
            activate your account.
          </p>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-4">
            <hr className="border-border flex-1" />
            <span className="text-grey-30 text-xs">or</span>
            <hr className="border-border flex-1" />
          </div>

          <p className="text-grey-30 text-xs">
            Already confirmed?{" "}
            <Link
              href="/login"
              className="text-purple-60 hover:text-purple-60/80 underline underline-offset-4 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
