import Link from "next/link";
import { brand } from "@/config/brand";
import { about } from "@/config/content";
import { SmartImage } from "../Media";
import { Reveal } from "../Reveal";

export function About({ full = false }: { full?: boolean }) {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-10 md:grid-cols-12 md:gap-16">
        <Reveal direction="left" className="md:col-span-5">
          <div className="relative">
            {/* Eager-load only on the dedicated /about page (`full`), where
               this is the first thing in the viewport — Next.js flags it as
               the page's LCP image there. On the homepage it sits well
               below the fold, so it stays lazy as normal. */}
            <SmartImage src={brand.media.chef} alt={`${about.chef.name}, ${about.chef.role}`} label="Chef portrait" className="aspect-[4/5] rounded-3xl" priority={full} />
            <blockquote className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-line bg-surface/95 p-5 backdrop-blur md:-right-10 md:left-auto md:w-80">
              <p className="font-display text-lg italic leading-snug">“{about.chef.quote}”</p>
              <footer className="mt-3 text-xs text-muted">{about.chef.name} · {about.chef.role}</footer>
            </blockquote>
          </div>
        </Reveal>
        <div className="pt-6 md:col-span-7 md:pt-0">
          <Reveal direction="right">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our story</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl">{about.headline}</h2>
            <p className="mt-6 text-lg text-muted">{about.story}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {about.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="h-full rounded-2xl border border-line p-5">
                  <p className="font-display text-xl">{p.title}</p>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <ol className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
              {about.milestones.map((m) => (
                <li key={m.year}>
                  <p className="font-display text-3xl text-gold">{m.year}</p>
                  <p className="mt-1 text-sm text-muted">{m.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          {!full && <Link href="/about" className="mt-8 inline-block text-sm font-semibold text-accent hover:underline">Read our full story →</Link>}
        </div>
      </div>
      {full && (
        <div className="mt-20 grid gap-4 md:grid-cols-2">
          <SmartImage src={brand.media.interior} alt="Restaurant interior" label="Interior" className="aspect-[16/10] rounded-3xl" />
          <SmartImage src={brand.media.ingredients} alt="Fresh local ingredients" label="Ingredients" className="aspect-[16/10] rounded-3xl" />
        </div>
      )}
    </section>
  );
}
