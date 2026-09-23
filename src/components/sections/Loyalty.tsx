"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { loyaltyTiers } from "@/config/content";
import { Reveal } from "../Reveal";

export function Loyalty() {
  const [joined, setJoined] = useState(false);
  const [phone, setPhone] = useState("");
  return (
    <section id="club" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-[#2a1f12] via-surface to-bg p-8 md:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{brand.name} Club</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl">Eat. Earn. <em className="text-gold">Repeat.</em></h2>
            <p className="mt-4 max-w-md text-muted">Earn points on every order, unlock free food, get a birthday treat and member-only deals. Free to join.</p>
            {joined ? (
              <p className="mt-8 rounded-2xl bg-gold/15 p-4 text-gold" role="status">Welcome to the Club! 150 bonus points added. Check WhatsApp for your member card.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (phone) setJoined(true); }} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <label htmlFor="club-phone" className="sr-only">Mobile number</label>
                <input id="club-phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your mobile number" className="flex-1 rounded-full border border-line bg-bg px-5 py-3.5 text-sm" />
                <button className="rounded-full bg-gold px-7 py-3.5 font-semibold text-black hover:brightness-110">Join the Club</button>
              </form>
            )}
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {loyaltyTiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 90} direction="right">
                <div className="flex h-full flex-col gap-2 rounded-2xl border border-line bg-bg/60 p-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-display text-2xl">{t.name}</p>
                    <p className="text-xs text-gold">{t.points} points</p>
                  </div>
                  <ul className="text-sm text-muted lg:text-right">{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
