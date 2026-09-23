"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { brand } from "@/config/brand";
import { SmartVideo } from "../Media";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

/** One gallery tile that drifts at its own pace as it crosses the viewport —
 * alternating columns move opposite directions, so the row breathes as a
 * whole instead of every tile moving in lockstep with the scrollbar. */
function ParallaxClip({ clip, delay, offset }: { clip: { src: string; label: string }; delay: number; offset: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref}>
      <motion.div style={reduceMotion ? undefined : { y }}>
        <Reveal delay={delay}>
          <figure className="relative">
            <SmartVideo src={clip.src} label={clip.label} className="aspect-[3/4] rounded-3xl" />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs backdrop-blur">{clip.label}</figcaption>
          </figure>
        </Reveal>
      </motion.div>
    </div>
  );
}

export function Experience() {
  const clips = brand.media.clips;
  return (
    <section className="overflow-hidden py-24 md:py-32" aria-label="Food experience">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="From our kitchen" title={<>Made slow. <em className="text-accent">Served fast.</em></>} text="Every pizza hand-stretched, every patty smashed to order, every batch fried fresh." />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-5 md:gap-4 md:px-8">
        {clips.map((c, i) => (
          <ParallaxClip key={c.src} clip={c} delay={i * 80} offset={i % 2 ? 20 : -20} />
        ))}
      </div>
      <div className="mt-20 flex overflow-hidden border-y border-line py-5" aria-hidden="true">
        <div className="marquee flex shrink-0 gap-12 whitespace-nowrap pr-12 font-display text-4xl italic text-accent/45 md:text-6xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Stone-fired", "Smash burgers", "48-hour dough", "Halal", "Made in Swat"].map((w, i) => <span key={`${k}-${i}`}>{w}</span>)
          )}
        </div>
      </div>
    </section>
  );
}
