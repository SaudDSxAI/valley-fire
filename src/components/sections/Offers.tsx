"use client";

import { useState } from "react";
import { offers } from "@/config/content";
import { Reveal } from "../Reveal";

const tones = {
  accent: "bg-accent text-accent-ink",
  gold: "bg-gold text-black",
  dark: "bg-surface text-ink border border-line",
} as const;

/** `compact`: sizes cards to fill the container height instead of a fixed
 * min-height — used on the dedicated /offers page so it all fits one screen. */
export function OfferGrid({ limit, compact = false }: { limit?: number; compact?: boolean }) {
  const [copied, setCopied] = useState<string | null>(null);
  const list = limit ? offers.slice(0, limit) : offers;
  const copy = async (code: string) => {
    try { await navigator.clipboard.writeText(code); } catch {}
    setCopied(code);
    setTimeout(() => setCopied(null), 1600);
  };

  if (compact) {
    // Only the strongest, currently-relevant deals — a premium page shows
    // four things well rather than six things squeezed down to fit.
    const featured = list.slice(0, 4);
    return (
      <div className="grid h-full auto-rows-fr grid-cols-2 gap-2.5 sm:gap-4">
        {featured.map((o, i) => (
          <Reveal key={o.id} delay={i * 90} direction={i % 2 === 0 ? "left" : "right"} className="h-full">
            <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-3.5 transition hover:-translate-y-1 sm:rounded-3xl sm:p-6 md:p-7 ${tones[o.tone]}`}>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-150" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] opacity-80 sm:text-xs sm:tracking-[0.25em]">{o.tag}</p>
              <h3 className="mt-1.5 font-display text-lg leading-tight sm:mt-2 sm:text-2xl md:text-3xl">{o.title}</h3>
              <p className="mt-1 line-clamp-2 max-w-sm text-xs opacity-80 sm:mt-2 sm:text-sm">{o.text}</p>
              {o.code && (
                <button onClick={() => copy(o.code)} className="mt-auto w-fit self-start rounded-full border border-current/30 px-3 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white/10 sm:px-4 sm:py-2 sm:text-sm">
                  {copied === o.code ? "Copied ✓" : <>Code: <span className="font-mono">{o.code}</span></>}
                </button>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {list.map((o, i) => (
        <Reveal key={o.id} delay={(i % 3) * 90} direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"} className="h-full">
          <article className={`group relative flex h-full min-h-64 flex-col overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1 ${tones[o.tone]}`}>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-150" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">{o.tag}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight">{o.title}</h3>
            <p className="mt-2 text-sm opacity-80">{o.text}</p>
            {o.code && (
              <button onClick={() => copy(o.code)} className="mt-auto self-start rounded-full border border-current/30 px-4 py-2 pt-2 text-sm font-semibold backdrop-blur">
                {copied === o.code ? "Copied ✓" : <>Code: <span className="font-mono">{o.code}</span></>}
              </button>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
