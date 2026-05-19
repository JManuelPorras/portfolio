export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: string;
}) {
  return (
    <div className="mb-8 flex items-center gap-4 font-mono text-sm tracking-widest">
      <span className="gradient-text font-semibold">{`Section ${index} //`}</span>
      <span className="uppercase text-navy/60 dark:text-slate-400">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-accent-cyan/40 to-transparent" />
    </div>
  );
}
