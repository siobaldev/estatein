"use client";

import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="Theme-Switcher"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-background shadow-border ring-border hover:ring-purple-60 active:ring-purple-60 rounded-lg p-3 shadow ring active:ring-2"
    >
      <MoonIcon
        aria-hidden="true"
        className="size-4 cursor-pointer sm:size-5 lg:size-7 dark:hidden"
      />
      <SunIcon
        aria-hidden="true"
        className="hidden size-4 cursor-pointer sm:size-5 lg:size-7 dark:block"
      />
    </button>
  );
}
