import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, AudioLines } from "lucide-react";
import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./ui/BrandIcons";

export function Hero() {
  const { identity } = content;

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-20 pb-24 sm:pt-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute -right-32 -top-24 h-[480px] w-[480px] rounded-full bg-accent-cyan/25 blur-3xl dark:bg-accent-cyan/20"
      />
      <div
        aria-hidden
        className="animate-float-slower pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-accent-violet/20 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 font-mono text-sm tracking-widest text-accent-cyan">
            <span className="h-px w-8 bg-accent-cyan" />
            HI, I&apos;M
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {identity.shortName.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="gradient-text">
              {identity.shortName.split(" ").slice(2).join(" ")}
            </span>
          </h1>
          <p className="mt-5 max-w-xl font-mono text-base text-navy/70 sm:text-lg dark:text-slate-300">
            Software Engineer ·{" "}
            <span className="gradient-text font-semibold">AI &amp; Automation</span>
          </p>
          <p className="mt-3 max-w-xl text-navy/60 dark:text-slate-400">
            Computer Science @ University of Havana — shipping production
            software, solo, at a startup.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 font-medium text-ink-0 shadow-lg shadow-accent-cyan/20 transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
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
              <a
                href={identity.whatsapp}
                aria-label="WhatsApp"
                target="_blank"
                rel="noreferrer"
                className="text-navy/60 transition-colors hover:text-accent-cyan dark:text-slate-400"
              >
                <WhatsappIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* El retrato ya era "su cara" en la página, así que es el sitio natural del
            avatar — pero montar WebGL aquí arruinaría el LCP. En su lugar el marco se
            convierte en portal: sigue siendo la misma imagen priority, y solo suma un
            enlace. Coste añadido: cero bytes. */}
        <div className="animate-fade-up justify-self-center md:justify-self-end">
          <Link
            href="/avatar"
            aria-label="Talk to my AI avatar"
            className="group/portal relative block h-64 w-64 rounded-[1.75rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-cyan sm:h-72 sm:w-72"
          >
            <div
              aria-hidden
              className="animate-spin-slow absolute -inset-3 rounded-[2rem] opacity-70 blur-[6px]"
              style={{
                background:
                  "conic-gradient(from 0deg,#5CC8F5,#7C6DF2,#5CC8F5,#7C6DF2,#5CC8F5)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center overflow-hidden rounded-[1.75rem] border border-white/20 bg-brand-gradient">
              <span className="absolute font-display text-7xl font-bold text-white/10">
                {identity.monogram}
              </span>
              <Image
                src="/profile.jpg"
                alt={identity.name}
                fill
                priority
                sizes="(min-width:640px) 288px, 256px"
                className="object-cover transition-transform duration-500 group-hover/portal:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-0/70 via-transparent to-transparent"
              />
              <span className="absolute bottom-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-ink-0/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors group-hover/portal:border-accent-cyan/60 group-hover/portal:text-accent-cyan">
                <AudioLines size={16} />
                Talk to me
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
