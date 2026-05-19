import { Mail } from "lucide-react";
import { content } from "@/lib/content";
import { Container } from "./ui/Container";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./ui/BrandIcons";

export function Footer() {
  const { identity, socials } = content;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-navy/10 py-10 dark:border-white/10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-navy/60 dark:text-slate-400">
          © {year} {identity.name}. Crafted with care.
        </p>
        <div className="flex items-center gap-5">
          {socials
            .filter((s) => s.kind !== "cv")
            .map((s) => {
              const cls =
                "text-navy/60 transition-colors hover:text-accent-cyan dark:text-slate-400";
              return (
                <a
                  key={s.kind}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className={cls}
                >
                  {s.kind === "github" && <GithubIcon size={19} />}
                  {s.kind === "linkedin" && <LinkedinIcon size={19} />}
                  {s.kind === "whatsapp" && <WhatsappIcon size={19} />}
                  {s.kind === "email" && <Mail size={19} />}
                </a>
              );
            })}
        </div>
      </Container>
    </footer>
  );
}
