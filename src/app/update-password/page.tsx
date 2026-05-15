import { Metadata } from "next";
import Image from "next/image";
import ResetPasswordForm from "./_components/form";

export const metadata: Metadata = {
  title: "Reset Password - Estatein",
  description: "Set a new password for your Estatein account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function UpdatePassword() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="border-border bg-sub-background relative rounded-2xl border p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-center gap-x-2">
            <Image
              src={"/assets/Estatein-Icon.svg"}
              alt="estatein-icon"
              className="size-6"
              width={100}
              height={100}
            />
            <span className="text-foreground text-lg font-bold">Estatein</span>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white">
              New <span className="text-purple-60 italic">password.</span>
            </h1>
            <p className="text-sub-foreground text-sm">
              Choose a strong password for your account
            </p>
          </div>

          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}
