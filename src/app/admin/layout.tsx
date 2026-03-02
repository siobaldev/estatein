import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/require-admin";
import SignOutButton from "@/app/_components/signOut-button";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex h-screen">
      <aside className="border-r-border w-64 border-r">
        <SignOutButton />
      </aside>
      {children}
    </div>
  );
}
