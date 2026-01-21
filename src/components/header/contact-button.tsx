"use client";

import { usePathname } from "next/navigation";
import AnimatedLink from "../ui/animated-link";

export default function ContactButton() {
  // Get current pathname to determine if Contact page is active
  const pathname = usePathname();
  const isContactActive = pathname === "/contact";

  return (
    <AnimatedLink
      href={"/contact"}
      tabIndex={isContactActive ? -1 : 0}
      className={`bg-background ring-border shadow-border hover:ring-purple-60 text-body hidden font-medium shadow ring md:px-4 md:py-3 lg:block lg:px-5 ${
        isContactActive ? "ring-purple-60" : ""
      }`}
    >
      Contact Us
    </AnimatedLink>
  );
}
