"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { content } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { identity, nav } = content;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-surface-light/80 backdrop-blur-md dark:border-white/10 dark:bg-ink-0/70">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight"
        >
          {identity.monogram}
          <span className="text-accent-cyan">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-navy/70 transition-colors hover:text-accent-cyan dark:text-slate-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href={identity.cvPath}
            className="rounded-full bg-accent-gradient px-4 py-1.5 text-sm font-medium text-ink-0 transition-opacity hover:opacity-90"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 dark:border-white/15"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-navy/10 md:hidden dark:border-white/10"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-navy/80 hover:bg-navy/5 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={identity.cvPath}
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md bg-accent-gradient px-2 py-2 text-center font-medium text-ink-0"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
