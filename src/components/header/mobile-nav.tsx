"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NavItems } from "@/lib/data";
import Link from "next/link";

export default function MobileNav() {
  // Controls the open/closed state of the navigation drawer
  const [open, setOpen] = useState<boolean>(false);

  // Toggles the drawer's state
  // Used when navigation links are clicked to close the drawer after selection
  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        {/* Animated Hamburger Menu Button - Only visible on mobile */}
        <DrawerTrigger className="bg-background ring-border hover:ring-purple-60 active:ring-purple-60 relative p-2 ring active:ring-2 lg:hidden">
          <svg
            viewBox="0 0 32 32"
            className={`stroke-foreground h-6 transition-transform duration-500 sm:h-7 ${
              open ? "-rotate-45" : ""
            }`}
          >
            <path
              className={`line line-top-bottom stroke-2 md:stroke-3 ${
                open ? "line-open" : "line-closed"
              }`}
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>

            <path className="line stroke-2 md:stroke-3" d="M7 16 27 16"></path>
          </svg>
        </DrawerTrigger>

        {/* Drawer Panel - Slides up from bottom, takes 75% of screen height */}
        <DrawerContent className="border-border flex h-3/4 flex-col items-center">
          <DrawerHeader>
            {/* Empty title for accessibility - required by Drawer component */}
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          {/* Navigation Links List */}
          <ul className="items flex flex-col items-center justify-center gap-y-10 text-2xl">
            {NavItems.map((item) => (
              <li key={item.label}>
                {/* Link that closes drawer when clicked */}
                <Link onClick={toggleMenu} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
