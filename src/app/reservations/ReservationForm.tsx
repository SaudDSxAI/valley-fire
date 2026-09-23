"use client";

import { useMemo, useState } from "react";
import { branches } from "@/config/content";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/Reveal";

const field = "w-full rounded-xl border border-line bg-bg px-3.5 py-2 text-sm placeholder:text-muted/60 sm:px-4 sm:py-3";
const fieldLabel = "text-xs sm:text-sm";
// A curated set of slots (lunch + dinner peaks) rather than every half-hour —
// fewer, larger, easier-to-tap options reads as considered, not cramped.
const slots = ["13:00", "14:00", "15:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const full = new Set(["20:00"]); // demo: pretend this one is booked

export function ReservationForm() {
  const { branch, setBranch } = useCart();
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() + i);
      return { iso: d.toISOString().slice(0, 10), label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" }) };
    }),
    []
  );
  const [date, setDate] = useState(days[0].iso);
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [info, setInfo] = useState({ name: "", phone: "", requests: "" });
  const [done, setDone] = useState<string | null>(null);
  const b = branches.find((x) => x.slug === branch) ?? branches[0];
  const chip = (on: boolean, disabled = false) =>
    `rounded-full border px-3.5 py-2 text-sm transition ${disabled ? "cursor-not-allowed border-line text-muted/40 line-through" : on ? "border-accent bg-accent text-accent-ink" : "border-line hover:border-ink/40"}`;

  if (done) {
    const msg = `Table booking ${done}\n${b.name}\n${date} at ${time}\n${guests} guests\nName: ${info.name}\nPhone: ${info.phone}\n${info.requests}`;
    return (
      <Reveal direction="scale" className="flex h-full flex-col items-center justify-center rounded-3xl border border-line bg-surface p-8 text-center" role="status">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-3 font-display text-4xl">You&apos;re booked!</h2>
        <p className="mt-3 text-muted">{b.name} · {days.find((d) => d.iso === date)?.label} at {time} · {guests} guests</p>
        <p className="mt-1 font-mono text-sm">Ref {done}</p>
        <a href={`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener" className="mt-6 inline-block rounded-full bg-[#25D366] px-6 py-3 font-semibold text-black">Confirm on WhatsApp</a>
      </Reveal>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setDone(`R-${Math.floor(1000 + Math.random() * 8999)}`); }}
      className="grid h-full grid-cols-1 content-start gap-2 overflow-hidden rounded-3xl border border-line bg-surface p-3.5 sm:gap-5 sm:p-6 lg:grid-cols-2 lg:content-center lg:gap-6 lg:p-8"
    >
      <Reveal direction="left" className="flex flex-col justify-center gap-2.5 sm:gap-5 lg:gap-6 lg:border-r lg:border-line lg:pr-8">
        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Branch</legend>
          <div className="flex flex-wrap gap-2">{branches.map((x) => <button type="button" key={x.slug} aria-pressed={x.slug === branch} onClick={() => setBranch(x.slug)} className={chip(x.slug === branch)}>{x.area}</button>)}</div>
        </fieldset>
        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Date</legend>
          <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:overflow-visible">{days.map((d) => <button type="button" key={d.iso} aria-pressed={d.iso === date} onClick={() => setDate(d.iso)} className={`${chip(d.iso === date)} whitespace-nowrap`}>{d.label}</button>)}</div>
        </fieldset>
        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Time</legend>
          <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:overflow-visible">{slots.map((s) => <button type="button" key={s} disabled={full.has(s)} aria-pressed={s === time} onClick={() => setTime(s)} className={`${chip(s === time, full.has(s))} whitespace-nowrap`}>{s}</button>)}</div>
        </fieldset>
        <fieldset className="flex items-center justify-between">
          <legend className="text-xs font-semibold uppercase tracking-wide text-muted">Guests</legend>
          <div className="inline-flex items-center rounded-full border border-line">
            <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="h-8 w-8 text-base sm:h-9 sm:w-9" aria-label="Fewer guests">−</button>
            <span className="w-8 text-center text-sm sm:w-9" aria-live="polite">{guests}</span>
            <button type="button" onClick={() => setGuests((g) => Math.min(30, g + 1))} className="h-8 w-8 text-base sm:h-9 sm:w-9" aria-label="More guests">+</button>
          </div>
        </fieldset>
        {guests > 12 && <p className="-mt-2 text-xs text-muted">Large group? Our team will call to arrange the family hall.</p>}
      </Reveal>

      <Reveal direction="right" delay={80} className="flex flex-col justify-center gap-2 sm:gap-4 lg:gap-5 lg:pl-8">
        <div className="hidden rounded-2xl border border-line bg-bg/60 px-4 py-3 text-sm text-muted sm:block">
          <span className="text-ink">{b.area}</span> · {days.find((d) => d.iso === date)?.label} at {time} · {guests} {guests === 1 ? "guest" : "guests"}
        </div>
        <div className="grid gap-1.5 sm:gap-3">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
            <label className={fieldLabel}>Name<input required value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} autoComplete="name" className={`mt-1 ${field}`} /></label>
            <label className={fieldLabel}>Mobile<input required type="tel" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} autoComplete="tel" className={`mt-1 ${field}`} /></label>
          </div>
          <label className={fieldLabel}>
            Special requests <span className="font-normal normal-case text-muted">(optional)</span>
            <input value={info.requests} onChange={(e) => setInfo({ ...info, requests: e.target.value })} placeholder="Birthday, high chair, window seat…" className={`mt-1 ${field}`} />
          </label>
        </div>
        <button className="w-full rounded-full bg-accent py-2 text-sm font-semibold text-accent-ink hover:brightness-110 sm:py-3.5">Confirm booking</button>
      </Reveal>
    </form>
  );
}
