"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItems } from "@/lib/data";

export default function Navigation() {
  // Tracks the currently active navigation section
  const [activeSection, setActiveSection] = useState<string>("Home");

  // Handles navigation link click events
  // Update the active section state to highlight the clicked navigation item
  const handleLinkClick = (item: string) => {
    setActiveSection(item);
  };

  return (
    <ul className="hidden gap-x-1 md:flex">
      {NavItems.map((item) => (
        <li key={item.label} className="relative">
          <Link
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
