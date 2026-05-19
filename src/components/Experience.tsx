import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function Experience() {
  const { experience } = content;
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Experi<span className="gradient-text">ence</span>
          </h2>
        </Reveal>
        <div className="mt-10 space-y-10">
          {experience.map((job, i) => (
            <Reveal key={job.org} delay={i * 0.08}>
              <article className="relative border-l-2 border-accent-cyan/30 pl-6 before:absolute before:-left-[7px] before:top-1.5 before:h-3 before:w-3 before:rounded-full before:bg-accent-gradient before:shadow-[0_0_12px_2px_rgba(92,200,245,0.5)]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-semibold">
                    {job.role}{" "}
                    <span className="text-accent-cyan">· {job.org}</span>
                  </h3>
                  <span className="font-mono text-sm text-navy/55 dark:text-slate-400">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-navy/45 dark:text-slate-500">
                  {job.location}
                </p>
                <p className="mt-3 text-navy/70 dark:text-slate-300">
                  {job.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      className="relative pl-5 text-navy/75 dark:text-slate-300 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent-violet"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
