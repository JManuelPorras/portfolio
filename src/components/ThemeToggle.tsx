"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-accent-cyan hover:text-accent-cyan dark:border-white/15 dark:text-slate-200 dark:hover:text-accent-cyan"
    >
      {mounted ? (
        isDark ? (
          <Sun size={17} />
        ) : (
          <Moon size={17} />
        )
      ) : (
        <span className="h-[17px] w-[17px]" />
      )}
    </button>
  );
}
