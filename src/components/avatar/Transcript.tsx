"use client";

/**
 * El elemento firma de la página: la respuesta no son burbujas de chat, es karaoke.
 *
 * Cada palabra se resalta sincronizada con la voz, accionada por el MISMO array de
 * timings que mueve los visemas de la boca. Es honesto con lo que es el proyecto —un
 * motor de lipsync— y a la vez es la pista de subtítulos sincronizada que exige
 * WCAG 1.2.4 (nivel AA) para media con audio en vivo.
 *
 * El texto es seleccionable y está completo en el DOM desde el primer momento: quien use
 * lector de pantalla lo lee entero sin esperar al audio.
 */
export function Transcript({
  words,
  activeIndex,
  speaking,
}: {
  words: string[];
  activeIndex: number;
  speaking: boolean;
}) {
  return (
    <p
      className="text-pretty text-lg leading-relaxed sm:text-xl"
      // Se anuncia como región viva solo mientras habla; el texto ya está completo, así
      // que no hay que leerlo palabra a palabra.
      aria-live="polite"
      aria-atomic="true"
    >
      {words.map((word, i) => {
        const spoken = i < activeIndex;
        const current = speaking && i === activeIndex;
        return (
          <span
            key={`${i}-${word}`}
            className={
              current
                ? "gradient-text font-semibold"
                : spoken || !speaking
                  ? "text-navy dark:text-slate-100"
                  : "text-navy/35 dark:text-slate-500"
            }
            style={{ transition: "color 120ms linear" }}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}
