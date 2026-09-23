"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, formatPrice, waLink } from "@/config/brand";
import { branches, promoCodes } from "@/config/content";
import { useCart } from "@/lib/cart";
import { IconPhone, IconWhatsApp } from "@/components/Icons";

const field = "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm placeholder:text-muted/60";
const DELIVERY_FEE = 150;
const FREE_DELIVERY_OVER = 2500;

export default function Checkout() {
  const { lines, subtotal, setQty, branch, setBranch, clear } = useCart();
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [info, setInfo] = useState({ name: "", phone: "", address: "", when: "ASAP", pay: "Cash on delivery", notes: "" });
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [placed, setPlaced] = useState<{ id: string; total: number; summary: string } | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => { document.title = `Checkout · ${brand.fullName}`; }, []);
  useEffect(() => {
    if (!placed) return;
    const t = setInterval(() => setStep((s) => Math.min(s + 1, 3)), 4000);
    return () => clearInterval(t);
  }, [placed]);

  const b = branches.find((x) => x.slug === branch) ?? branches[0];
  const p = promo ? promoCodes[promo] : null;
  const discount = p ? (p.type === "percent" ? Math.round((subtotal * p.value) / 100) : Math.min(p.value, subtotal)) : 0;
  const delivery = mode === "delivery" && subtotal - discount < FREE_DELIVERY_OVER ? DELIVERY_FEE : 0;
  const total = subtotal - discount + delivery;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (promoCodes[code]) { setPromo(code); setPromoError(""); }
    else { setPromo(null); setPromoError("That code isn't valid. Try WELCOME10."); }
  };

  const summaryText = () =>
    [
      `New ${mode} order — ${b.name}`,
      ...lines.map((l) => `• ${l.qty}× ${l.name}${l.choices.length ? ` (${l.choices.join(", ")})` : ""}${l.note ? ` — ${l.note}` : ""}`),
      `Total: ${formatPrice(total)}${promo ? ` (code ${promo})` : ""}`,
      `Name: ${info.name}`, `Phone: ${info.phone}`,
      mode === "delivery" ? `Address: ${info.address}` : `Pickup: ${info.when}`,
      `Payment: ${info.pay}`,
      info.notes && `Notes: ${info.notes}`,
    ].filter(Boolean).join("\n");

  const place = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `EM-${Math.floor(10000 + Math.random() * 89999)}`;
    setPlaced({ id, total, summary: `Order ${id}\n${summaryText()}` });
    clear();
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    const stages = ["Order received", "Preparing", mode === "delivery" ? "Out for delivery" : "Ready for pickup", mode === "delivery" ? "Delivered" : "Collected"];
    return (
      <div className="mx-auto max-w-xl px-4 pb-24 pt-32 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-500/15 text-3xl text-green-400">✓</div>
        <h1 className="mt-6 font-display text-5xl">Order placed!</h1>
        <p className="mt-3 text-muted">Order <span className="font-mono text-ink">{placed.id}</span> · {formatPrice(placed.total)} · {b.name}</p>
        <ol className="mt-10 space-y-3 text-left" aria-label="Order status">
          {stages.map((s, i) => (
            <li key={s} className={`flex items-center gap-3 rounded-2xl border p-4 transition ${i <= step ? "border-accent bg-accent/10" : "border-line opacity-50"}`}>
              <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${i <= step ? "bg-accent text-accent-ink" : "bg-line"}`}>{i + 1}</span>
              {s} {i === step && i < 3 && <span className="ml-auto text-xs text-accent">In progress…</span>}
            </li>
          ))}
        </ol>
        <a href={`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(placed.summary)}`} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-black">
          <IconWhatsApp /> Send order to WhatsApp
        </a>
        <p className="mt-6 text-xs text-muted">Demo: live tracking is simulated. In production this connects to the kitchen / POS.</p>
        <Link href="/" className="mt-6 block text-sm text-accent underline">Back to home</Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 pb-24 pt-36 text-center">
        <h1 className="font-display text-5xl">Your bag is empty</h1>
        <p className="mt-3 text-muted">Add something delicious first.</p>
        <Link href="/menu" className="mt-8 inline-block rounded-full bg-accent px-8 py-4 font-semibold text-accent-ink">Browse the menu</Link>
        <AltOrdering />
      </div>
    );
  }

  const set = (k: keyof typeof info) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInfo({ ...info, [k]: e.target.value });
  const seg = (on: boolean) => `flex-1 rounded-full py-3 text-sm font-semibold transition ${on ? "bg-accent text-accent-ink" : "text-ink/70 hover:text-ink"}`;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-32 pt-28 md:px-8 md:pt-36">
      <h1 className="font-display text-5xl md:text-6xl">Checkout</h1>
      <form onSubmit={place} className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">1 · How do you want it?</legend>
            <div className="flex rounded-full border border-line p-1" role="radiogroup">
              <button type="button" role="radio" aria-checked={mode === "delivery"} onClick={() => setMode("delivery")} className={seg(mode === "delivery")}>Delivery</button>
              <button type="button" role="radio" aria-checked={mode === "pickup"} onClick={() => setMode("pickup")} className={seg(mode === "pickup")}>Pickup</button>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold">2 · Branch</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {branches.map((x) => (
                <label key={x.slug} className={`cursor-pointer rounded-2xl border p-4 text-sm transition ${x.slug === branch ? "border-accent bg-accent/10" : "border-line"}`}>
                  <input type="radio" name="branch" className="sr-only" checked={x.slug === branch} onChange={() => setBranch(x.slug)} />
                  <span className="font-semibold">{x.area}</span>
                  <span className="mt-1 block text-xs text-muted">{x.hoursLabel.replace("Daily · ", "")}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="mb-3 text-sm font-semibold">3 · Your details</legend>
            <label className="text-sm">Full name<input required value={info.name} onChange={set("name")} autoComplete="name" className={`mt-1 ${field}`} /></label>
            <label className="text-sm">Mobile number<input required type="tel" value={info.phone} onChange={set("phone")} autoComplete="tel" placeholder="03xx xxxxxxx" className={`mt-1 ${field}`} /></label>
            {mode === "delivery" && (
              <label className="text-sm sm:col-span-2">Delivery address<textarea required rows={2} value={info.address} onChange={set("address")} autoComplete="street-address" placeholder="House, street, area, landmark" className={`mt-1 ${field}`} /></label>
            )}
            <label className="text-sm">When
              <select value={info.when} onChange={set("when")} className={`mt-1 ${field}`}>
                <option>ASAP</option><option>In 1 hour</option><option>In 2 hours</option><option>Tonight 8 PM</option>
              </select>
            </label>
            <label className="text-sm">Payment
              <select value={info.pay} onChange={set("pay")} className={`mt-1 ${field}`}>
                <option>{mode === "delivery" ? "Cash on delivery" : "Pay at counter"}</option><option>Card</option><option>JazzCash / Easypaisa</option><option>Bank transfer</option>
              </select>
            </label>
            <label className="text-sm sm:col-span-2">Special instructions<textarea rows={2} value={info.notes} onChange={set("notes")} placeholder="e.g. ring the bell, extra napkins" className={`mt-1 ${field}`} /></label>
          </fieldset>
          <AltOrdering compact />
        </div>

        <aside className="h-fit rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="mt-4 divide-y divide-line text-sm">
            {lines.map((l) => (
              <li key={l.key} className="flex items-start justify-between gap-3 py-3">
                <div>
                  <p><span className="text-muted">{l.qty}×</span> {l.name}</p>
                  {l.choices.length > 0 && <p className="text-xs text-muted">{l.choices.join(" · ")}</p>}
                  <button type="button" onClick={() => setQty(l.key, 0)} className="text-xs text-muted underline hover:text-accent">Remove</button>
                </div>
                <span className="whitespace-nowrap">{formatPrice(l.unitPrice * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <label htmlFor="promo" className="sr-only">Promo code</label>
            <input id="promo" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Promo code" className={`${field} uppercase`} />
            <button type="button" onClick={applyPromo} className="rounded-xl border border-line px-4 text-sm font-semibold hover:bg-white/5">Apply</button>
          </div>
          {promoError && <p className="mt-2 text-xs text-red-300" role="alert">{promoError}</p>}
          {p && <p className="mt-2 text-xs text-green-400" role="status">✓ {promo}: {p.label}</p>}
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-green-400"><dt>Discount</dt><dd>−{formatPrice(discount)}</dd></div>}
            {mode === "delivery" && <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{delivery ? formatPrice(delivery) : "Free"}</dd></div>}
            <div className="flex justify-between pt-2 text-lg font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          {mode === "delivery" && delivery > 0 && <p className="mt-2 text-xs text-muted">Free delivery on orders over {formatPrice(FREE_DELIVERY_OVER)}.</p>}
          <button className="mt-6 w-full rounded-full bg-accent py-4 font-semibold text-accent-ink hover:brightness-110">Place order · {formatPrice(total)}</button>
        </aside>
      </form>
    </div>
  );
}

function AltOrdering({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? "" : "mt-12"} rounded-3xl border border-line p-6 text-left`}>
      <p className="text-sm font-semibold">Prefer another way to order?</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <a href={waLink(`Hi ${brand.fullName}, I'd like to order:`)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-semibold text-black"><IconWhatsApp className="h-4 w-4" /> WhatsApp</a>
        <a href={brand.contact.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5"><IconPhone className="h-4 w-4" /> Call {brand.contact.phone}</a>
        <a href="https://www.foodpanda.pk" target="_blank" rel="noopener" className="inline-flex items-center rounded-full border border-line px-4 py-2.5">foodpanda</a>
      </div>
    </div>
  );
}
