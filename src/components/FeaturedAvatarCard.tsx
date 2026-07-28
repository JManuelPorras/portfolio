import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AudioLines } from "lucide-react";
import type { Project } from "@/lib/types";

/**
 * El avatar es un proyecto, así que vive en Projects — pero no como una card más entre
 * siete: a todo el ancho, encima del grid. Es el único del conjunto que se puede tocar,
 * y el encuadre lidera con la ingeniería (pipeline de voz en 6 GB) y no con el avatar,
 * porque como truco de contacto compite con el email y pierde.
 */
export function FeaturedAvatarCard({ project }: { project: Project }) {
  return (
    <article className="card-glow group mb-6 overflow-hidden rounded-2xl border border-navy/10 bg-white/50 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="grid gap-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-gradient sm:aspect-auto sm:min-h-[15rem]">
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-2xl font-bold text-white/20">
              {project.title}
            </span>
          </div>
          {project.image && (
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1 bg-accent-gradient opacity-80 sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-1"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
            {project.tag}
          </span>
          <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70 dark:text-slate-300">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-navy/5 px-2 py-0.5 text-xs text-navy/60 dark:bg-white/5 dark:text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                className="group/live inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-medium text-ink-0 shadow-lg shadow-accent-cyan/20 transition-transform hover:scale-[1.03]"
              >
                <AudioLines size={16} />
                Talk to it
              </Link>
            )}
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
          </div>
        </div>
      </div>
    </article>
  );
}
