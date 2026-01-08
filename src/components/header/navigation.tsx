"use client";

import { useState, useEffect, useEffectEvent } from "react";
import { NavItems } from "@/lib/data";
import AnimatedLink from "../ui/animated-link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  // Helper function to determine the active navigation section based on current URL
  // Searches NavItems to find a matching href, defaults to "Home" if no match found
  const getActiveSection = () => {
    const currentItem = NavItems.find((item) => item.href === pathname);
    return currentItem ? currentItem.label : "Home";
  };

  // Tracks the currently active navigation section
  const [activeSection, setActiveSection] =
    useState<string>(getActiveSection());

  // Handles navigation link click events
  // Update the active section state to highlight the clicked navigation item
  const handleLinkClick = (item: string) => {
    setActiveSection(item);
  };

  // Event handler that updates active section without triggering dependency warnings
  // Wrapped in useEffectEvent to ensure it always uses the latest getActiveSection logic
  const activeSectionEvent = useEffectEvent(() => {
    setActiveSection(getActiveSection());
  });

  // Syncs active section with URL changes (e.g., browser back/forward, refresh, direct navigation)
  // Runs whenever the pathname changes to keep UI state aligned with the current route
  useEffect(() => {
    activeSectionEvent();
  }, [pathname]);

  return (
    <ul className="hidden gap-x-1 lg:flex">
      {NavItems.filter((item) => item.href !== "/contact").map((item) => (
        <li key={item.label} className="relative">
          {/* Animated Link */}
          <AnimatedLink
            href={item.href}
            // Remove from tab order when link is already active (prevents redundant tab stops)
            tabIndex={activeSection === item.label ? -1 : 0}
            onClick={() => handleLinkClick(item.label)}
            className={`text-body inline-block md:px-4 md:py-3 lg:px-5 ${
              activeSection === item.label
                ? // // Active state: highlighted with ring, background, and shadow
                  "ring-purple-60 bg-background shadow-purple-60/40 shadow ring"
                : // Inactive state: hover effect
                  "hover:text-purple-60"
            }`}
          >
            {item.label}
          </AnimatedLink>
        </li>
      ))}
    </ul>
  );
}
