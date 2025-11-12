// components/theme-toggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Compute the next theme from the actual DOM state at click time.
  const handleClick = () => {
    const domIsDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    const isDark = theme === "dark" || (theme !== "light" && domIsDark);
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={handleClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-muted-foreground hover:text-foreground"
    >
      {/* Deterministic markup: render both; CSS shows the right one */}
      <span aria-hidden className="relative block h-4 w-4">
        <Sun className="h-4 w-4 dark:hidden" />
        <Moon className="hidden h-4 w-4 dark:block" />
      </span>
    </button>
  );
}
