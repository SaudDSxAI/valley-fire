"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { brand } from "@/config/brand";
import { SmartVideo } from "../Media";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // A subtle cinematic dolly: the video slowly zooms and drifts as you scroll
  // through the hero, and the copy eases up and fades — like a shot handing
  // off to the next scene, rather than the page just cutting away.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-start overflow-hidden" aria-label="Welcome">
      {/* Mobile: portrait video shot specifically for narrow screens. */}
      <motion.div className="absolute inset-0 md:hidden" style={reduceMotion ? undefined : { scale: videoScale, y: videoY }}>
        <SmartVideo src={brand.media.heroVideoMobile} poster={brand.media.heroPosterMobile} eager className="h-full w-full" />
      </motion.div>
      {/* Desktop: original landscape video. */}
      <motion.div className="absolute inset-0 hidden md:block" style={reduceMotion ? undefined : { scale: videoScale, y: videoY }}>
        <SmartVideo src={brand.media.heroVideo} poster={brand.media.heroPoster} eager className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-transparent" />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pt-36"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <h1 className="max-w-4xl font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
          {brand.tagline.split(" ").slice(0, -1).join(" ")}{" "}
          <em className="text-accent">{brand.tagline.split(" ").slice(-1)}</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink/80 md:text-xl">{brand.description}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/menu" className="rounded-full bg-accent px-8 py-4 text-center text-base font-semibold text-accent-ink transition hover:brightness-110">
            Order Now
          </Link>
          <Link href="#menu" className="rounded-full border border-white/25 bg-white/5 px-8 py-4 text-center text-base font-semibold backdrop-blur transition hover:bg-white/10">
            Explore Menu
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
