"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Play } from "lucide-react";
import type { AvatarAnswer, AvatarLang } from "@/lib/avatarPack";

const EMBED_SRC = "/avatar/index.html";
const POSTER_SRC = "/avatar/poster.webp";

export interface AvatarStageHandle {
  speak: (answer: AvatarAnswer, lang: AvatarLang) => void;
  stop: () => void;
}

interface Props {
  onReady?: () => void;
  onWord?: (index: number) => void;
  onEnded?: () => void;
  onError?: (message: string) => void;
  /** Texto de la divulgación de IA. Se muestra ANTES de que el visitante active nada. */
  disclosure: string;
  activateLabel: string;
  loadingLabel: string;
}

/**
 * El canvas 3D vive en un iframe a un HTML estático, no en este árbol de React.
 *
 * La copia vendorizada de talkinghead.mjs lleva un parche (meshopt, ver
 * public/avatar/vendor/PATCHES.md) y así el bundler no interviene: nada de three.js entra
 * en el bundle de la página, un fallo de WebGL en un móvil viejo no se lleva la página por
 * delante, y public/avatar/index.html se puede abrir suelto para depurar sin compilar Next.
 *
 * Nada 3D se descarga hasta que el visitante pulsa. Ese clic hace tres cosas a la vez:
 * protege el LCP, desbloquea el AudioContext que los navegadores exigen tras un gesto, y
 * es el momento del consentimiento informado — por eso la divulgación va en el póster.
 */
export const AvatarStage = forwardRef<AvatarStageHandle, Props>(function AvatarStage(
  { onReady, onWord, onEnded, onError, disclosure, activateLabel, loadingLabel },
  ref
) {
  const [activated, setActivated] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [posterOk, setPosterOk] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const post = useCallback((message: Record<string, unknown>) => {
    frameRef.current?.contentWindow?.postMessage(
      { source: "avatar-page", ...message },
      window.location.origin
    );
  }, []);

  useImperativeHandle(ref, () => ({
    speak(answer, lang) {
      post({
        type: "speak",
        audioUrl: `/avatar/pack/${answer.audio}`,
        words: answer.words,
        wtimes: answer.wtimes,
        wdurations: answer.wdurations,
        lang,
      });
    },
    stop() {
      post({ type: "stop" });
    },
  }));

  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      if (ev.origin !== window.location.origin) return;
      const msg = ev.data;
      if (!msg || typeof msg !== "object" || msg.source !== "avatar-embed") return;

      if (msg.type === "boot") post({ type: "load" });
      else if (msg.type === "progress") setProgress(msg.pct ?? 0);
      else if (msg.type === "ready") {
        setReady(true);
        onReady?.();
      } else if (msg.type === "word") onWord?.(msg.i ?? 0);
      else if (msg.type === "ended") onEnded?.();
      else if (msg.type === "error") onError?.(String(msg.message ?? "unknown"));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [post, onReady, onWord, onEnded, onError]);

  return (
    // bg-ink-0 y no bg-brand-gradient: es el mismo color que pinta el documento del
    // iframe y sobre el que se capturó el póster, así que los tres coinciden.
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-navy/10 bg-ink-0 dark:border-white/10 sm:aspect-[3/4]">
      {activated && (
        <iframe
          ref={frameRef}
          src={EMBED_SRC}
          title="3D avatar"
          // El iframe es same-origin a propósito: comparte el origin para que postMessage
          // esté acotado y para que la activación de usuario del clic se propague al
          // AudioContext de dentro.
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          allow="autoplay"
        />
      )}

      {/* El póster es un render del mismo GLB en el mismo encuadre, así que al activarse
          la imagen se funde con el canvas en vivo en la misma pose: cobra vida, no salta. */}
      {!ready && (
        <div className="absolute inset-0">
          {posterOk ? (
            // eslint-disable-next-line @next/next/no-img-element -- estático fuera del pipeline de next/image
            <img
              src={POSTER_SRC}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              onError={() => setPosterOk(false)}
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-brand-gradient">
              <span className="font-display text-7xl font-bold text-white/10">JMP</span>
            </div>
          )}
          <div aria-hidden className="absolute inset-0 bg-ink-0/45" />
        </div>
      )}

      {!activated && (
        <div className="absolute inset-0 flex flex-col items-center justify-end gap-4 p-6 text-center">
          <button
            type="button"
            onClick={() => setActivated(true)}
            className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 font-medium text-ink-0 shadow-lg shadow-accent-cyan/20 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
          >
            <Play size={18} className="transition-transform group-hover:translate-x-0.5" />
            {activateLabel}
          </button>
          {/* Divulgación de IA en texto real del DOM, no pintada dentro del canvas:
              un lector de pantalla no alcanzaría nada dibujado en WebGL. Con fondo propio
              porque va sobre una imagen de contraste variable (WCAG 1.4.11). */}
          <p className="max-w-xs text-balance rounded-lg bg-ink-0/70 px-3 py-2 text-xs leading-relaxed text-white/90 backdrop-blur-sm">
            {disclosure}
          </p>
        </div>
      )}

      {activated && !ready && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full bg-accent-gradient transition-[width] duration-200"
                style={{ width: `${Math.max(progress, 8)}%` }}
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">
              {loadingLabel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});
