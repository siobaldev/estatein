import Link from "next/link";
import Image from "next/image";
import Banner from "./banner";
import Navigation from "./navigation";
import ThemeToggle from "../ui/theme-toggle";
import MobileNav from "./mobile-nav";

export default function Header() {
  return (
    <header className="bg-sub-background">
      <Banner />
      <nav className="border-border flex h-20 items-center justify-center border-b md:h-[100px]">
        <div className="container flex items-center justify-between px-6 md:mx-14 md:px-0 xl:mx-[162px]">
          <Link
            href={"/"}
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
          </Link>
          <Navigation />
          <div className="relative flex items-center gap-x-2">
            <ThemeToggle />
            <Link
              href={"/"}
              className="bg-background ring-border shadow-border hover:ring-purple-60 hidden rounded-lg shadow ring md:block md:px-4 md:py-3 md:text-sm lg:px-5 xl:text-lg"
            >
              Contact Us
            </Link>
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
}
