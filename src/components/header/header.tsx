import Link from "next/link";
import Image from "next/image";
import Banner from "./banner";
import Navigation from "./navigation";
import ThemeToggle from "../ui/theme-toggle";
import MobileNav from "./mobile-nav";

export default function Header() {
  return (
    <header className="bg-sub-background">
      {/* Promotional Banner appears at the very top */}
      <Banner />

      {/* Main Navigation Bar */}
      <nav className="border-border flex h-20 items-center justify-center border-b md:h-[100px]">
        {/* Navigation Container */}
        <div className="wrapper flex w-full items-center justify-between px-6 md:px-0">
          {/* Logo and Brand Name links to homepage */}
          <Link
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
          </Link>

          {/* Desktop Navigation Menu hidden on mobile */}
          <Navigation />

          {/* Right Side Actions: Theme toggle, contact button, and mobile menu */}
          <div className="relative flex items-center gap-x-2">
            {/* Theme Switcher visible on all screen sizes */}
            <ThemeToggle />

            {/* Contact Button only visible on desktop (md and above) */}
            <Link
              href={"/"}
              className="bg-background ring-border shadow-border hover:ring-purple-60 text-body hidden shadow ring md:px-4 md:py-3 lg:block lg:px-5"
            >
              Contact Us
            </Link>

            {/* Mobile Navigation Drawer only visible on mobile (below md) */}
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
}
