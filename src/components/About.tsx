import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { SectionLabel } from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";

export function About() {
  const { about, quickFacts } = content;
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <SectionLabel index="01">About</SectionLabel>
        <Reveal>
          <p className="max-w-3xl text-xl leading-relaxed text-navy/80 sm:text-2xl dark:text-slate-200">
            {about}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className="border-l-2 border-accent-cyan pl-4"
              >
                <dt className="font-mono text-xs uppercase tracking-widest text-navy/50 dark:text-slate-400">
                  {f.label}
                </dt>
                <dd className="mt-1 text-navy/90 dark:text-slate-100">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
