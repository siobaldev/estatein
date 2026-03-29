"use client";

import { useState, useEffect, useEffectEvent } from "react";
import { adminNavItems } from "@/lib/data";
import AnimatedLink from "@/components/ui/animated-link";
import { usePathname } from "next/navigation";

export default function AdminNavigation() {
  const pathname = usePathname();

  // Searches NavItems to find a matching href, defaults to "Home" if no match found
  const getActiveSection = () => {
    const currentItem = adminNavItems.find((item) => {
      // Exact match for home page
      if (item.href === "/" && pathname === "/") return true;
      // For other pages, check if pathname starts with the href
      if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    });
    return currentItem ? currentItem.label : "Dashboard";
  };

  const [activeSection, setActiveSection] =
    useState<string>(getActiveSection());

  const handleLinkClick = (item: string) => {
    setActiveSection(item);
  };

  // Event handler that updates active section without triggering dependency warnings
  const activeSectionEvent = useEffectEvent(() => {
    setActiveSection(getActiveSection());
  });

  useEffect(() => {
    activeSectionEvent();
  }, [pathname]);

  return (
    <ul className="hidden gap-x-1 lg:flex">
      {adminNavItems
        .filter((item) => item.href !== "/contact")
        .map((item) => (
          <li key={item.label} className="relative">
            <AnimatedLink
              href={item.href}
              // Remove from tab order when link is already active (prevents redundant tab stops)
              tabIndex={activeSection === item.label ? -1 : 0}
              onClick={() => handleLinkClick(item.label)}
              className={`text-body inline-block font-medium md:px-4 md:py-3 lg:px-5 ${
                activeSection === item.label
                  ? "ring-purple-60 bg-background shadow-purple-60/40 shadow ring"
                  : "hover:text-purple-60"
              }`}
            >
              {item.label}
            </AnimatedLink>
          </li>
        ))}
    </ul>
  );
}
