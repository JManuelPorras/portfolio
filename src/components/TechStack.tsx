import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function TechStack() {
  const { techStack, spokenLanguages } = content;
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Tech Stack
          </h2>
        </Reveal>
        <div className="mt-8 space-y-7">
          {techStack.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05}>
              <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-6">
                <div className="font-mono text-sm uppercase tracking-widest text-accent-cyan">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-navy/15 px-3 py-1 text-sm text-navy/80 transition-colors hover:border-accent-cyan hover:text-accent-cyan dark:border-white/15 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-6">
              <div className="font-mono text-sm uppercase tracking-widest text-accent-cyan">
                Languages
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-navy/70 dark:text-slate-300">
                {spokenLanguages.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
