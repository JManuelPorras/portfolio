"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

const finePointer = () =>
  typeof window !== "undefined" && matchMedia("(pointer: fine)").matches;

/** Barra de progreso de lectura, pegada arriba. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent-gradient"
    />
  );
}

/**
 * Un solo listener para toda la página: guarda la posición del puntero en la tarjeta
 * que tiene debajo, y el CSS (.card-glow / .spotlight) pinta el brillo ahí.
 */
export function PointerGlow() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: globalThis.PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(
        ".card-glow, .spotlight",
      );
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

/** Inclina el contenido en 3D siguiendo al cursor. */
export function Tilt({
  children,
  className = "",
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className={className}
      style={{ perspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}

/** El botón se deja atraer un poco por el cursor. */
export function Magnetic({
  children,
  className = "",
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/** Línea de tiempo que se va dibujando a medida que bajas por su contenido. */
export function ScrollLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} className={`relative ${className}`}>
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-accent-cyan/15"
      />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute left-0 top-0 h-full w-0.5 origin-top rounded-full bg-gradient-to-b from-accent-cyan to-accent-violet shadow-[0_0_12px_rgba(92,200,245,0.6)]"
      />
      <div className="space-y-10">{children}</div>
    </div>
  );
}
