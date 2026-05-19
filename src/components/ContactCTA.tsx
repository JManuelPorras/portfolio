import { ArrowUpRight, Mail } from "lucide-react";
import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function ContactCTA() {
  const { identity } = content;
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container className="text-center">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-widest text-accent-cyan">
            Get in touch
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            Let&apos;s build something{" "}
            <span className="gradient-text">great</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-navy/70 dark:text-slate-300">
            Open to internships and software engineering roles —
            remote-friendly. The fastest way to reach me is email.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 font-medium text-ink-0 transition-opacity hover:opacity-90"
            >
              <Mail size={18} />
              {identity.email}
            </a>
            <a
              href={identity.cvPath}
              className="group inline-flex items-center gap-2 rounded-full border border-navy/20 px-6 py-3 font-medium transition-colors hover:border-accent-cyan dark:border-white/20"
            >
              Download CV
              <ArrowUpRight
                size={18}
                className="text-accent-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
