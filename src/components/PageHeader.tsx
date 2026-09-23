import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 md:px-8 md:pb-12 md:pt-36">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
      <h1 className="mt-3 font-display text-5xl leading-[1] md:text-7xl">{title}</h1>
      {text && <p className="mt-4 max-w-2xl text-muted md:text-lg">{text}</p>}
    </div>
  );
}
