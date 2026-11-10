"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { content } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { identity, nav } = content;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Resalta en la barra la sección que cruza el centro de la pantalla.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setActive(href);
          else setActive((current) => (current === href ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [nav]);

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-4">
      <div className="glass mx-auto w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-navy/10 dark:border-white/10">
        <nav className="flex h-14 items-center justify-between pl-6 pr-3">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight"
          >
            {identity.monogram}
            <span className="text-accent-cyan">.</span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors hover:text-accent-cyan ${
                  active === item.href
                    ? "text-navy dark:text-white"
                    : "text-navy/70 dark:text-slate-300"
                }`}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            ))}
            <a
              href={identity.cvPath}
              className="ml-2 rounded-full bg-accent-gradient px-4 py-1.5 text-sm font-medium text-ink-0 transition-opacity hover:opacity-90"
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
              <div className="flex flex-col gap-1 px-4 py-4">
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
      </div>
    </header>
  );
}
