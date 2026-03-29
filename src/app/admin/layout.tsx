import { Metadata } from "next";
import Image from "next/image";
import StickyAnimatedHeader from "@/components/header/header-wrapper";
import AnimatedLink from "@/components/ui/animated-link";
import AdminNavigation from "./_components/desktop-nav";
import ThemeToggle from "@/components/ui/theme-toggle";
import User from "./_components/user";
import MobileNav from "./_components/mobile-nav";

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
  return (
    <div className="bg-background flex h-svh flex-col">
      <StickyAnimatedHeader>
        <nav className="border-border flex h-20 items-center justify-center border-b md:h-25">
          <div className="wrapper flex w-full items-center justify-between px-6 md:px-0">
            <AnimatedLink
              href={"/admin/dashboard"}
              className="flex items-center gap-x-1.5 p-1 md:gap-x-2.5 md:p-2"
            >
              <Image
                src={"/assets/Estatein-Icon.svg"}
                alt="estatein-icon"
                className="size-6 sm:size-8 lg:size-10"
                width={100}
                height={100}
              />

              <span className="text-foreground text-lg font-bold sm:text-xl lg:text-2xl">
                Estatein
              </span>
            </AnimatedLink>

            {/* Desktop Navigation Menu */}
            <AdminNavigation />

            <div className="relative flex items-center gap-x-2">
              {/* Theme Switcher visible on all screen sizes */}
              <ThemeToggle />

              <User />

              {/* Mobile Navigation Drawer*/}
              <MobileNav />
            </div>
          </div>
        </nav>
      </StickyAnimatedHeader>

      <main>{children}</main>
    </div>
  );
}
