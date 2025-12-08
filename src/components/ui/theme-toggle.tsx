"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="Theme-Switcher"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-background shadow-border ring-border hover:ring-purple-60 active:ring-purple-60 rounded-lg p-3 shadow ring active:ring-2"
    >
      <Moon className="size-4 cursor-pointer sm:size-5 xl:size-7 dark:hidden" />
      <Sun className="hidden size-4 cursor-pointer sm:size-5 xl:size-7 dark:block" />
    </button>
  );
}
