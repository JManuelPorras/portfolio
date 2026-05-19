import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

export function Hero() {
  const { identity } = content;

  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-24 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[480px] w-[480px] rounded-full bg-accent-cyan/20 blur-3xl dark:bg-accent-cyan/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-accent-violet/15 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="animate-fade-up">
          <p className="mb-5 font-mono text-sm tracking-widest text-accent-cyan">
            HI, I&apos;M
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {identity.shortName}
          </h1>
          <p className="mt-5 max-w-xl font-mono text-base text-navy/70 sm:text-lg dark:text-slate-300">
            {identity.title}
          </p>
          <p className="mt-3 max-w-xl text-navy/60 dark:text-slate-400">
            Computer Science @ University of Havana — shipping production
            software, solo, at a startup.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 font-medium text-navy dark:text-slate-100"
            >
              View Projects
              <ArrowRight
                size={18}
                className="text-accent-cyan transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={identity.cvPath}
              className="group inline-flex items-center gap-2 font-medium text-navy dark:text-slate-100"
            >
              Download CV
              <ArrowUpRight
                size={18}
                className="text-accent-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <div className="flex items-center gap-3">
              <a
                href={identity.github}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                className="text-navy/60 transition-colors hover:text-accent-cyan dark:text-slate-400"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={identity.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className="text-navy/60 transition-colors hover:text-accent-cyan dark:text-slate-400"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="animate-fade-up justify-self-center md:justify-self-end">
          <div className="relative h-60 w-60 sm:h-72 sm:w-72">
            <div className="absolute inset-0 rotate-6 rounded-3xl bg-accent-gradient opacity-70 blur-[2px]" />
            <div className="absolute inset-0 grid place-items-center overflow-hidden rounded-3xl border border-white/15 bg-brand-gradient">
              <span className="font-display text-7xl font-bold text-white/15">
                {identity.monogram}
              </span>
              <Image
                src="/profile.jpg"
                alt={identity.name}
                fill
                priority
                sizes="288px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
