import { Metadata } from "next";
import Image from "next/image";
import Form from "./_components/form";
import AnimatedLink from "@/components/ui/animated-link";

export const metadata: Metadata = {
  title: "Sign In - Estatein",
  description: "Sign in to your Estatein account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="border-border bg-sub-background relative rounded-2xl border p-10 shadow-2xl backdrop-blur-xl">
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

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white">
              Welcome <span className="text-purple-60 italic">back.</span>
            </h1>
            <p className="text-sub-foreground text-sm">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <Form></Form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/6" />
            <span className="text-grey-30 text-xs">or</span>
            <div className="h-px flex-1 bg-white/6" />
          </div>

          {/* Sign up link */}
          <p className="text-grey-30 text-center text-xs">
            Don&apos;t have an account?{" "}
            <AnimatedLink
              href="/register"
              className="text-purple-60 hover:text-purple-60/80 underline underline-offset-4"
            >
              Create one
            </AnimatedLink>
          </p>
        </div>
      </div>
    </main>
  );
}
