import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

export function SectionHeading({ eyebrow, title, text, action, center }: { eyebrow: string; title: ReactNode; text?: string; action?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={`mb-10 flex flex-col gap-4 md:mb-14 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl">{title}</h2>
        {text && <p className="mt-4 text-muted md:text-lg">{text}</p>}
      </div>
      {action}
    </Reveal>
  );
}
