"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo interactivo: una rejilla de puntos casi invisible que se enciende cerca del
 * cursor y en ondas desde cada clic o toque. Solo dibuja mientras queda energía viva,
 * así que en reposo no consume nada. Con "reducir movimiento" queda la rejilla estática.
 */
const GAP = 30;
const CYAN = [92, 200, 245];
const VIOLET = [124, 109, 242];

type Ripple = { x: number; y: number; t0: number; strength: number };

export function InteractiveBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let energy = new Float32Array(0);
    let base: HTMLCanvasElement | null = null;
    let ripples: Ripple[] = [];
    let running = false;
    let raf = 0;

    const isDark = () => document.documentElement.classList.contains("dark");
    const tint = (c: number, r: number) => ((c * 7 + r * 13) % 5 < 2 ? VIOLET : CYAN);

    function measure() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
      energy = new Float32Array(cols * rows);

      // La rejilla en reposo se pinta una sola vez y se reutiliza en cada cuadro.
      base = document.createElement("canvas");
      base.width = canvas!.width;
      base.height = canvas!.height;
      const b = base.getContext("2d")!;
      b.setTransform(dpr, 0, 0, dpr, 0, 0);
      b.fillStyle = isDark() ? "rgba(160,200,255,0.10)" : "rgba(31,58,95,0.13)";
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          b.beginPath();
          b.arc(c * GAP, r * GAP, 1, 0, Math.PI * 2);
          b.fill();
        }
      draw(performance.now());
    }

    function draw(now: number) {
      const t = now / 1000;
      ripples = ripples.filter((r) => t - r.t0 < 1.8);
      for (const rp of ripples) {
        const age = t - rp.t0;
        const radius = 40 + age * 420;
        const fade = (1 - age / 1.8) * rp.strength;
        const band = 34;
        const reach = radius + band;
        const c0 = Math.max(0, Math.floor((rp.x - reach) / GAP));
        const c1 = Math.min(cols - 1, Math.ceil((rp.x + reach) / GAP));
        const r0 = Math.max(0, Math.floor((rp.y - reach) / GAP));
        const r1 = Math.min(rows - 1, Math.ceil((rp.y + reach) / GAP));
        for (let r = r0; r <= r1; r++)
          for (let c = c0; c <= c1; c++) {
            const d = Math.hypot(c * GAP - rp.x, r * GAP - rp.y) - radius;
            if (Math.abs(d) > band) continue;
            const k = r * cols + c;
            energy[k] = Math.max(energy[k], Math.exp(-(d * d) / 260) * fade);
          }
      }

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      if (base) ctx!.drawImage(base, 0, 0);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const boost = isDark() ? 1 : 0.8;
      let alive = false;
      for (let k = 0; k < energy.length; k++) {
        const e = energy[k];
        if (e < 0.02) continue;
        alive = true;
        const c = k % cols;
        const r = (k / cols) | 0;
        const col = tint(c, r);
        ctx!.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${Math.min(0.95, e * boost).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(c * GAP, r * GAP, 1 + e * 1.9, 0, Math.PI * 2);
        ctx!.fill();
        energy[k] = e * 0.93;
      }
      return alive || ripples.length > 0;
    }

    function loop(now: number) {
      if (draw(now)) raf = requestAnimationFrame(loop);
      else running = false;
    }
    function wake() {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function glow(x: number, y: number) {
      const R = 150;
      const c0 = Math.max(0, Math.floor((x - R) / GAP));
      const c1 = Math.min(cols - 1, Math.ceil((x + R) / GAP));
      const r0 = Math.max(0, Math.floor((y - R) / GAP));
      const r1 = Math.min(rows - 1, Math.ceil((y + R) / GAP));
      for (let r = r0; r <= r1; r++)
        for (let c = c0; c <= c1; c++) {
          const d = Math.hypot(c * GAP - x, r * GAP - y);
          if (d > R) continue;
          const k = r * cols + c;
          const f = 1 - d / R;
          energy[k] = Math.max(energy[k], f * f * 0.75);
        }
      wake();
    }
    function ripple(x: number, y: number, strength = 1) {
      ripples.push({ x, y, t0: performance.now() / 1000, strength });
      if (ripples.length > 12) ripples.shift();
      wake();
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") glow(e.clientX, e.clientY);
    };
    const onDown = (e: PointerEvent) => ripple(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const p = e.touches[0];
      if (p) glow(p.clientX, p.clientY);
    };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    };

    measure();
    // Una onda de bienvenida, desde el retrato si está a la vista.
    const hello = setTimeout(() => ripple(w * 0.72, h * 0.42, 0.9), 700);

    const themeWatcher = new MutationObserver(measure);
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
    }
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(hello);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(raf);
      themeWatcher.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
