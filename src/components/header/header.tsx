import Image from "next/image";
import Banner from "./banner";
import Navigation from "./navigation";
import ThemeToggle from "../ui/theme-toggle";
import MobileNav from "./mobile-nav";
import AnimatedLink from "../ui/animated-link";
import StickyAnimatedHeader from "./header-wrapper";
import ContactButton from "./contact-button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import User from "@/app/admin/_components/user";
import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default async function Header() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <StickyAnimatedHeader>
      {/* Promotional Banner appears at the very top */}
      <Banner />

      {/* Main Navigation Bar */}
      <nav className="border-border flex h-20 items-center justify-center border-b md:h-25">
        {/* Navigation Container */}
        <div className="wrapper flex w-full items-center justify-between px-6 md:px-0">
          {/* Logo and Brand Name links to homepage */}
          <AnimatedLink
            href={"/"}
            className="flex items-center gap-x-1.5 p-1 md:gap-x-2.5 md:p-2"
          >
            {/* Brand Icon */}
            <Image
              src={"/assets/Estatein-Icon.svg"}
              alt="estatein-icon"
              className="size-6 sm:size-8 lg:size-10"
              width={100}
              height={100}
            />
            {/* Brand Name Text */}
            <span className="text-foreground text-lg font-bold sm:text-xl lg:text-2xl">
              Estatein
            </span>
          </AnimatedLink>

          {/* Desktop Navigation Menu hidden on mobile */}
          <Navigation />

          {/* Right Side Actions: Theme toggle, contact button, and mobile menu */}
          <div className="relative flex items-center gap-x-2">
            {/* Theme Switcher visible on all screen sizes */}
            <ThemeToggle />

            {/* Contact Button only visible on desktop (md and above) */}
            <ContactButton />

            {user ? (
              <User />
            ) : (
              <AnimatedLink
                aria-label="Go to login page"
                href="/login"
                className="bg-background shadow-border ring-border hover:ring-purple-60 rounded-lg p-3 shadow ring"
              >
                <UserCircleIcon
                  weight="fill"
                  aria-hidden
                  className="size-4 cursor-pointer sm:size-5 lg:size-6.5"
                />
              </AnimatedLink>
            )}

            {/* Mobile Navigation Drawer only visible on mobile (below md) */}
            <MobileNav />
          </div>
        </div>
      </nav>
    </StickyAnimatedHeader>
  );
}
