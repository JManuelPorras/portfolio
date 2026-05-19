import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { SectionLabel } from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const featured = content.projects.filter((p) => p.featured);
  const rest = content.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <Container>
        <SectionLabel index="02">Projects</SectionLabel>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <ProjectCard project={p} featured />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mb-6 mt-14 font-mono text-sm uppercase tracking-widest text-navy/50 dark:text-slate-400">
            More work
          </h3>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
