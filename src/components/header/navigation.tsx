"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItems } from "@/lib/data";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("Home");

  const handleLinkClick = (item: string) => {
    setActiveSection(item);
  };

  return (
    <ul className="hidden gap-x-1 md:flex">
      {NavItems.map((item) => (
        <li key={item.label} className="relative">
          <Link
            href={item.href}
            tabIndex={activeSection === item.label ? -1 : 0}
            onClick={() => handleLinkClick(item.label)}
            className={`inline-block md:px-4 md:py-3 md:text-sm lg:px-5 xl:text-lg ${
              activeSection === item.label
                ? "ring-purple-60 bg-background shadow-purple-60/40 rounded-lg shadow ring"
                : "hover:text-purple-60"
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
