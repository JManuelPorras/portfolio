export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: string;
}) {
  return (
    <div className="mb-8 flex items-center gap-4 font-mono text-sm tracking-widest text-accent-cyan">
      <span>{`Section ${index} //`}</span>
      <span className="uppercase text-navy/60 dark:text-slate-400">
        {children}
      </span>
      <span className="h-px flex-1 bg-navy/15 dark:bg-white/10" />
    </div>
  );
}
