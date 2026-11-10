import { ArrowUpRight, Mail } from "lucide-react";
import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { WhatsappIcon } from "./ui/BrandIcons";
import { Magnetic } from "./ui/Motion";

export function ContactCTA() {
  const { identity } = content;
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container className="text-center">
        <Reveal>
          <div className="glass spotlight overflow-hidden rounded-[2rem] border border-navy/10 px-6 py-14 sm:px-12 sm:py-20 dark:border-white/10">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-accent-cyan/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-20 -z-10 h-80 w-80 rounded-full bg-accent-violet/25 blur-3xl"
          />
          <p className="font-mono text-sm uppercase tracking-widest text-accent-cyan">
            Get in touch
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            Let&apos;s build something{" "}
            <span className="gradient-text">great</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-navy/70 dark:text-slate-300">
            Open to internships and software engineering roles —
            remote-friendly. The fastest way to reach me is WhatsApp.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={identity.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 font-medium text-ink-0 shadow-lg shadow-accent-cyan/30 transition-shadow hover:shadow-xl hover:shadow-accent-cyan/40"
              >
                <WhatsappIcon size={18} />
                WhatsApp · {identity.phoneDisplay}
              </a>
            </Magnetic>
            <a
              href={identity.emailCompose}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-navy/20 px-6 py-3 font-medium transition-colors hover:border-accent-cyan dark:border-white/20"
            >
              <Mail size={18} className="text-accent-cyan" />
              Email me
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
