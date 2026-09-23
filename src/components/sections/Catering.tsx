"use client";

import { useState } from "react";
import { waLink } from "@/config/brand";
import { cateringTypes } from "@/config/content";
import { IconWhatsApp } from "../Icons";

const field = "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm placeholder:text-muted/60";

export function CateringForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", type: cateringTypes[0].title, date: "", guests: "50", details: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const msg = `Catering inquiry\nName: ${form.name}\nPhone: ${form.phone}\nEvent: ${form.type}\nDate: ${form.date}\nGuests: ${form.guests}\nDetails: ${form.details}`;

  if (sent)
    return (
      <div className="rounded-3xl border border-line bg-surface p-8 text-center">
        <p className="font-display text-3xl">Thank you, {form.name.split(" ")[0] || "friend"}!</p>
        <p className="mt-2 text-muted">Our events team will call you within 2 hours.</p>
        <a href={waLink(msg)} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-black"><IconWhatsApp /> Also send on WhatsApp</a>
      </div>
    );

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-3 rounded-3xl border border-line bg-surface p-6 md:grid-cols-2 md:p-8">
      <label className="text-sm">Name<input required value={form.name} onChange={set("name")} className={`mt-1 ${field}`} autoComplete="name" /></label>
      <label className="text-sm">Phone<input required type="tel" value={form.phone} onChange={set("phone")} className={`mt-1 ${field}`} autoComplete="tel" placeholder="03xx xxxxxxx" /></label>
      <label className="text-sm">Event type
        <select value={form.type} onChange={set("type")} className={`mt-1 ${field}`}>{cateringTypes.map((c) => <option key={c.title}>{c.title}</option>)}</select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">Date<input required type="date" value={form.date} onChange={set("date")} className={`mt-1 ${field}`} /></label>
        <label className="text-sm">Guests<input required type="number" min={10} value={form.guests} onChange={set("guests")} className={`mt-1 ${field}`} /></label>
      </div>
      <label className="text-sm md:col-span-2">Tell us more<textarea rows={3} value={form.details} onChange={set("details")} className={`mt-1 ${field}`} placeholder="Venue, menu ideas, budget…" /></label>
      <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">
        <button className="flex-1 rounded-full bg-accent py-3.5 font-semibold text-accent-ink hover:brightness-110">Send inquiry</button>
        <a href={waLink(msg)} target="_blank" rel="noopener" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line py-3.5 font-semibold hover:bg-white/5"><IconWhatsApp /> Chat on WhatsApp</a>
      </div>
    </form>
  );
}

export function CateringTypes() {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {cateringTypes.map((c) => (
        <li key={c.title} className="rounded-2xl border border-line p-4">
          <p className="font-semibold">{c.title}</p>
          <p className="mt-1 text-sm text-muted">{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
