export type AvatarLang = "en" | "es";

export interface AvatarAnswer {
  text: string;
  audio: string;
  durationMs: number;
  words: string[];
  wtimes: number[];
  wdurations: number[];
  /** "whisper" = timings de alineación real; "estimate" = heurística de reserva. */
  timingSource?: "whisper" | "estimate";
}

export interface AvatarQuestion {
  id: string;
  label: Record<AvatarLang, string>;
  keywords: Partial<Record<AvatarLang, string[]>>;
  answer: Partial<Record<AvatarLang, AvatarAnswer>>;
}

export interface AvatarPack {
  version: number;
  languages: AvatarLang[];
  questions: AvatarQuestion[];
}

export const PACK_URL = "/avatar/pack/manifest.json";

/** Quita tildes, puntuación y mayúsculas para poder comparar lo que escribe el visitante. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Palabras que aparecen en casi cualquier pregunta y no discriminan nada. Sin esto,
// "what do you do" casaría con todo lo que contenga "you".
const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "do", "does", "did", "you", "your", "yours", "me", "my",
  "i", "of", "to", "in", "on", "for", "and", "or", "what", "how", "who", "tell", "about",
  "can", "could", "would", "have", "has", "with", "that", "this", "it", "s", "am", "was",
  "el", "la", "los", "las", "un", "una", "de", "del", "que", "y", "o", "en", "es", "eres",
  "tu", "tus", "mi", "mis", "me", "te", "se", "lo", "al", "por", "para", "con", "como",
  "cual", "cuales", "quien", "sobre", "hablame", "dime", "tienes", "puedes", "cuentame",
]);

function tokens(s: string): string[] {
  return normalize(s).split(" ").filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/**
 * Empareja lo que escribe el visitante con una de las preguntas grabadas.
 *
 * Es deliberadamente léxico y no semántico: un modelo de embeddings en el navegador
 * costaría decenas de megas y este avatar responde de un repertorio cerrado de veinte
 * preguntas. Cuando no hay match suficiente se devuelve null y la página ofrece el
 * contacto real, que es una salida mejor que una respuesta equivocada con voz clonada.
 */
export function matchQuestion(
  input: string,
  pack: AvatarPack,
  lang: AvatarLang
): AvatarQuestion | null {
  const asked = tokens(input);
  if (!asked.length) return null;

  let best: { q: AvatarQuestion; score: number } | null = null;

  for (const q of pack.questions) {
    if (!q.answer[lang]) continue;

    const bag = new Set<string>();
    for (const t of tokens(q.label[lang] ?? "")) bag.add(t);
    for (const kw of q.keywords[lang] ?? []) for (const t of tokens(kw)) bag.add(t);

    // Un keyword multi-palabra ("real estate") vale más que la suma de sus partes.
    let score = 0;
    for (const t of asked) if (bag.has(t)) score += 1;
    for (const kw of q.keywords[lang] ?? []) {
      if (kw.includes(" ") && normalize(input).includes(normalize(kw))) score += 1.5;
    }

    if (score > 0 && (!best || score > best.score)) best = { q, score };
  }

  // Al menos un término discriminante en común; con cero, más vale admitir que no se sabe.
  return best && best.score >= 1 ? best.q : null;
}
