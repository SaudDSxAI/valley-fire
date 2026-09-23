"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { branches } from "@/config/content";
import { isOpenNow, mapsDirections, mapsEmbed } from "@/lib/hours";
import { useCart } from "@/lib/cart";
import { IconClock, IconPhone, IconPin, IconWhatsApp } from "../Icons";
import { Reveal } from "../Reveal";

const dist = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => Math.hypot(a.lat - b.lat, a.lng - b.lng);

/** `compact`: fills its container edge-to-edge with no overflow — used on the
 * dedicated /locations page so the whole thing fits one screen, no scrolling. */
export function Branches({ compact = false }: { compact?: boolean }) {
  const { branch, setBranch } = useCart();
  const [status, setStatus] = useState<Record<string, boolean>>({});
  const [locating, setLocating] = useState(false);
  const active = branches.find((b) => b.slug === branch) ?? branches[0];

  useEffect(() => setStatus(Object.fromEntries(branches.map((b) => [b.slug, isOpenNow(b)]))), []);

  const findNearest = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const me = { lat: p.coords.latitude, lng: p.coords.longitude };
        const near = [...branches].sort((a, b) => dist(a, me) - dist(b, me))[0];
        setBranch(near.slug);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  if (compact) {
    return (
      <div className="grid h-full grid-cols-1 gap-5 overflow-hidden lg:grid-cols-5">
        <div className="flex h-full min-h-0 flex-col gap-3 lg:col-span-2">
          <Reveal direction="left">
            <button onClick={findNearest} className="flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-accent/50 py-2.5 text-sm font-medium text-accent transition hover:border-accent hover:bg-accent/10">
              <IconPin className="h-4 w-4" /> {locating ? "Finding you…" : "Find my nearest branch"}
            </button>
          </Reveal>
          <div className="flex flex-1 flex-col gap-3 overflow-hidden">
            {branches.map((b, i) => {
              const on = b.slug === active.slug;
              return (
                <Reveal key={b.slug} delay={60 + i * 80} direction="left" className="flex-1 min-h-0">
                  <article className={`flex h-full flex-col justify-start overflow-hidden rounded-2xl border px-5 py-2.5 transition-colors lg:justify-center ${on ? "border-accent/70 bg-accent/[0.06]" : "border-line hover:border-ink/20"}`}>
                    <button onClick={() => setBranch(b.slug)} className="w-full text-left" aria-pressed={on}>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-xl leading-tight md:text-2xl">{b.area}</h3>
                        {b.slug in status && (
                          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status[b.slug] ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-300"}`}>
                            {status[b.slug] ? "Open now" : "Closed"}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-sm text-muted">{b.address}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted"><IconClock className="h-3.5 w-3.5" /> {b.hoursLabel}</p>
                    </button>
                    {on && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link href="/menu" className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink">Order from here</Link>
                        <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-white/5"><IconWhatsApp className="h-4 w-4" /></a>
                        <a href={b.phoneHref} aria-label="Call" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-white/5"><IconPhone className="h-4 w-4" /></a>
                      </div>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Reveal direction="right" className="h-full min-h-0 lg:col-span-3">
          <div className="relative h-full overflow-hidden rounded-3xl border border-line">
            <iframe key={active.slug} title={`Map of ${active.name}`} src={mapsEmbed(active.mapQuery)} className="h-full w-full grayscale-[0.6] invert-[0.9] hue-rotate-180" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <a
              href={mapsDirections(active.lat, active.lng)}
              target="_blank"
              rel="noopener"
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/90 px-4 py-2.5 text-sm font-semibold shadow-lg backdrop-blur transition hover:bg-bg"
            >
              <IconPin className="h-4 w-4 text-accent" /> Directions
            </a>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-3 lg:col-span-2">
        <Reveal direction="left">
          <button onClick={findNearest} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-accent/60 py-3 text-sm font-semibold text-accent hover:bg-accent/10">
            <IconPin className="h-4 w-4" /> {locating ? "Finding you…" : "Find my nearest branch"}
          </button>
        </Reveal>
        {branches.map((b, i) => {
          const on = b.slug === active.slug;
          return (
            <Reveal key={b.slug} delay={80 + i * 90} direction="left">
              <article className={`rounded-2xl border p-5 transition ${on ? "border-accent bg-accent/5" : "border-line"}`}>
                <button onClick={() => setBranch(b.slug)} className="w-full text-left" aria-pressed={on}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl">{b.area}</h3>
                    {b.slug in status && (
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${status[b.slug] ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-300"}`}>
                        {status[b.slug] ? "Open now" : "Closed"}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">{b.address}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><IconClock className="h-4 w-4" /> {b.hoursLabel}</p>
                </button>
                {on && (
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <a href={b.phoneHref} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2"><IconPhone className="h-4 w-4" /> Call</a>
                    <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2"><IconWhatsApp className="h-4 w-4" /> WhatsApp</a>
                    <a href={mapsDirections(b.lat, b.lng)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2"><IconPin className="h-4 w-4" /> Directions</a>
                    <Link href={`/locations/${b.slug}`} className="inline-flex items-center rounded-full border border-line px-3 py-2">Branch page</Link>
                    <Link href="/menu" className="inline-flex items-center rounded-full bg-accent px-4 py-2 font-semibold text-accent-ink">Order from here</Link>
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={120} direction="right" className="min-h-80 overflow-hidden rounded-3xl border border-line lg:col-span-3">
        <iframe key={active.slug} title={`Map of ${active.name}`} src={mapsEmbed(active.mapQuery)} className="h-full min-h-80 w-full grayscale-[0.6] invert-[0.9] hue-rotate-180" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </Reveal>
    </div>
  );
}
