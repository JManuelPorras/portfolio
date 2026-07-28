"use client";

import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { AvatarLang, AvatarQuestion } from "@/lib/avatarPack";

const COPY = {
  en: {
    eyebrow: "Pick a question",
    placeholder: "or type your own question",
    ask: "Ask",
  },
  es: {
    eyebrow: "Elige una pregunta",
    placeholder: "o escribe tu propia pregunta",
    ask: "Preguntar",
  },
} as const;

export function QuestionList({
  questions,
  lang,
  activeId,
  collapsed,
  disabled,
  onPick,
  onFreeText,
}: {
  questions: AvatarQuestion[];
  lang: AvatarLang;
  activeId: string | null;
  /** Al responder, la lista se repliega a chips y el espacio pasa al transcript. */
  collapsed: boolean;
  disabled: boolean;
  onPick: (id: string) => void;
  onFreeText: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const t = COPY[lang];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    setDraft("");
    onFreeText(value);
  }

  return (
    <div className="flex flex-col gap-4">
      {collapsed ? (
        <div className="flex flex-wrap gap-2">
          {questions.map((q) => (
            <button
              key={q.id}
              type="button"
              disabled={disabled}
              onClick={() => onPick(q.id)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:opacity-50 ${
                q.id === activeId
                  ? "border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan"
                  : "border-navy/15 text-navy/70 hover:border-accent-cyan/50 hover:text-navy dark:border-white/15 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              {q.label[lang]}
            </button>
          ))}
        </div>
      ) : (
        <>
          <p className="font-mono text-xs uppercase tracking-widest text-navy/50 dark:text-slate-400">
            {t.eyebrow}
          </p>
          <ul className="flex flex-col">
            {questions.map((q) => (
              <li key={q.id}>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onPick(q.id)}
                  className="group flex w-full items-center justify-between gap-4 border-b border-navy/10 py-3 text-left transition-colors hover:text-accent-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:opacity-50 dark:border-white/10"
                >
                  <span className="font-display text-base sm:text-lg">{q.label[lang]}</span>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-accent-cyan opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* La entrada de texto es un camino de primera clase, no un fallback: no hay
          micrófono en ninguna parte de esta página. Exigirlo excluiría a personas sordas,
          a quien no produce habla estándar y a cualquiera en un sitio público. */}
      <form onSubmit={submit} className="relative mt-1">
        <Search
          size={16}
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 dark:text-slate-500"
        />
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          className="w-full rounded-full border border-navy/15 bg-white/60 py-2.5 pl-10 pr-20 text-sm outline-none transition-colors placeholder:text-navy/40 focus:border-accent-cyan dark:border-white/15 dark:bg-white/[0.04] dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          {t.ask}
        </button>
      </form>
    </div>
  );
}
