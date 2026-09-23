"use client";

import { useState } from "react";
import { formatPrice } from "@/config/brand";
import { branches, offers, reviews } from "@/config/content";
import { categories, menu } from "@/config/menu";

const tabs = ["Orders", "Menu", "Offers", "Branches", "Reservations", "Reviews"] as const;
type Tab = (typeof tabs)[number];

const sampleOrders = [
  { id: "EM-48213", name: "Ayesha K.", branch: "Mingora", type: "Delivery", total: 2480, status: "New" },
  { id: "EM-48212", name: "Hamza R.", branch: "Saidu Sharif", type: "Pickup", total: 890, status: "Preparing" },
  { id: "EM-48211", name: "Office order", branch: "Mingora", type: "Delivery", total: 11940, status: "Preparing" },
  { id: "EM-48210", name: "Sana M.", branch: "Kalam", type: "Dine-in", total: 3990, status: "Ready" },
  { id: "EM-48209", name: "Bilal A.", branch: "Mingora", type: "Delivery", total: 1540, status: "Out for delivery" },
];
const statuses = ["New", "Preparing", "Ready", "Out for delivery", "Completed"];
const sampleBookings = [
  { ref: "R-2231", name: "Usman T.", branch: "Mingora", when: "Today 19:30", guests: 6 },
  { ref: "R-2232", name: "Maryam S.", branch: "Saidu Sharif", when: "Today 20:00", guests: 2 },
  { ref: "R-2233", name: "Khan family", branch: "Kalam", when: "Tomorrow 13:00", guests: 14 },
];

export function AdminPanel() {
  const [tab, setTab] = useState<Tab>("Orders");
  const [items, setItems] = useState(menu.map((m) => ({ ...m, available: true })));
  const [orders, setOrders] = useState(sampleOrders);
  const [offerOn, setOfferOn] = useState<Record<string, boolean>>(Object.fromEntries(offers.map((o) => [o.id, true])));
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 1500); };
  const input = "rounded-lg border border-line bg-bg px-3 py-2 text-sm";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Admin / CMS · demo</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Manage your restaurant</h1>
      <p className="mt-2 text-muted">Update menu, prices, photos, offers, hours and orders — no developer needed.</p>

      <div className="mt-8 flex gap-2 overflow-x-auto border-b border-line no-scrollbar" role="tablist">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm ${tab === t ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"}`}>{t}</button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-4 md:p-6">
        {tab === "Orders" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted"><tr><th className="py-2">Order</th><th>Customer</th><th>Branch</th><th>Type</th><th>Total</th><th>Status</th></tr></thead>
              <tbody className="divide-y divide-line">
                {orders.map((o, i) => (
                  <tr key={o.id}>
                    <td className="py-3 font-mono">{o.id}</td><td>{o.name}</td><td>{o.branch}</td><td>{o.type}</td><td>{formatPrice(o.total)}</td>
                    <td>
                      <select aria-label={`Status for ${o.id}`} value={o.status} onChange={(e) => setOrders(orders.map((x, k) => (k === i ? { ...x, status: e.target.value } : x)))} className={input}>
                        {statuses.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Menu" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted"><tr><th className="py-2">Item</th><th>Category</th><th>Price (Rs)</th><th>Photo</th><th>Available</th></tr></thead>
              <tbody className="divide-y divide-line">
                {items.map((m, i) => (
                  <tr key={m.id}>
                    <td className="py-2.5">{m.name}</td>
                    <td className="text-muted">{categories.find((c) => c.id === m.category)?.name}</td>
                    <td><input aria-label={`Price of ${m.name}`} type="number" value={m.price} onChange={(e) => setItems(items.map((x, k) => (k === i ? { ...x, price: Number(e.target.value) } : x)))} className={`${input} w-28`} /></td>
                    <td><button className="rounded-lg border border-dashed border-line px-3 py-1.5 text-xs text-muted hover:text-ink">Upload</button></td>
                    <td>
                      <button role="switch" aria-checked={m.available} aria-label={`${m.name} available`} onClick={() => setItems(items.map((x, k) => (k === i ? { ...x, available: !x.available } : x)))} className={`relative h-6 w-11 rounded-full transition ${m.available ? "bg-green-500" : "bg-line"}`}>
                        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${m.available ? "left-5" : "left-0.5"}`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Offers" && (
          <ul className="divide-y divide-line">
            {offers.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                <div><p className="font-medium">{o.title}</p><p className="text-xs text-muted">{o.tag}{o.code && ` · code ${o.code}`}</p></div>
                <button role="switch" aria-checked={offerOn[o.id]} aria-label={`${o.title} live`} onClick={() => setOfferOn({ ...offerOn, [o.id]: !offerOn[o.id] })} className={`rounded-full px-3 py-1 text-xs font-semibold ${offerOn[o.id] ? "bg-green-500/15 text-green-400" : "bg-line text-muted"}`}>{offerOn[o.id] ? "Live" : "Paused"}</button>
              </li>
            ))}
            <li className="pt-4"><button className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink">+ New offer</button></li>
          </ul>
        )}

        {tab === "Branches" && (
          <div className="grid gap-4 md:grid-cols-3">
            {branches.map((b) => (
              <div key={b.slug} className="space-y-2 rounded-xl border border-line p-4 text-sm">
                <p className="font-semibold">{b.name}</p>
                <label className="block text-xs text-muted">Opens<input type="time" defaultValue={b.hours.open} className={`mt-1 block w-full ${input}`} /></label>
                <label className="block text-xs text-muted">Closes<input type="time" defaultValue={b.hours.close} className={`mt-1 block w-full ${input}`} /></label>
                <label className="block text-xs text-muted">Phone<input defaultValue={b.phone} className={`mt-1 block w-full ${input}`} /></label>
              </div>
            ))}
          </div>
        )}

        {tab === "Reservations" && (
          <ul className="divide-y divide-line text-sm">
            {sampleBookings.map((r) => (
              <li key={r.ref} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <span><span className="font-mono text-muted">{r.ref}</span> · {r.name} · {r.guests} guests</span>
                <span className="text-muted">{r.branch} · {r.when}</span>
                <span className="flex gap-2"><button className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-400">Confirm</button><button className="rounded-full bg-line px-3 py-1 text-xs">Message</button></span>
              </li>
            ))}
          </ul>
        )}

        {tab === "Reviews" && (
          <ul className="divide-y divide-line text-sm">
            {reviews.map((r) => (
              <li key={r.name} className="flex items-start justify-between gap-4 py-3">
                <div><p><span className="text-gold">{"★".repeat(r.rating)}</span> {r.name}</p><p className="text-muted">{r.text}</p></div>
                <label className="flex shrink-0 items-center gap-2 text-xs"><input type="checkbox" defaultChecked className="accent-[var(--brand-accent)]" /> Show on site</label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={save} className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink">Save changes</button>
        {saved && <span className="text-sm text-green-400" role="status">Saved ✓ (demo — changes aren't stored)</span>}
      </div>
    </div>
  );
}
