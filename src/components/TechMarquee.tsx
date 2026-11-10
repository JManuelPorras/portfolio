import { content } from "@/lib/content";

/** Cinta decorativa con el stack; el listado accesible sigue estando en TechStack. */
export function TechMarquee() {
  const items = content.techStack.flatMap((g) => g.items);
  return (
    <div aria-hidden className="marquee py-6 sm:py-10">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={i % 2 ? "marquee-outline" : ""}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
