import { Check } from "lucide-react";
import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function Expertise() {
  const { expertise } = content;
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          {expertise.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.1}>
              <div className="card-glow h-full rounded-2xl border border-navy/10 bg-white/50 p-7 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="mb-5 h-1 w-12 rounded-full bg-accent-gradient" />
                <h3 className="font-display text-xl font-semibold">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.points.map((p) => (
                    <li key={p} className="flex gap-3 text-navy/75 dark:text-slate-300">
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-accent-cyan"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
