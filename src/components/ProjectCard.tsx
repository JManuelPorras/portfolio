import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={`card-glow group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white/50 dark:border-white/10 dark:bg-white/[0.04] ${
        featured ? "" : "h-full"
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-gradient">
        <div className="absolute inset-0 grid place-items-center">
          <span className="px-6 text-center font-display text-2xl font-bold text-white/90">
            {project.title}
          </span>
        </div>
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 bg-accent-gradient opacity-80"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
          {project.tag}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-navy/70 dark:text-slate-300">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-navy/5 px-2 py-0.5 text-xs text-navy/60 dark:bg-white/5 dark:text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-5">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-navy dark:text-slate-100"
          >
            VIEW PROJECT
            <ArrowRight
              size={15}
              className="text-accent-cyan transition-transform group-hover/link:translate-x-1"
            />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/live inline-flex items-center gap-1.5 text-sm font-medium text-accent-violet"
            >
              LIVE
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
