import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/config/brand";
import { branches } from "@/config/content";
import { menu } from "@/config/menu";

export const metadata: Metadata = { title: "Owner Dashboard (Demo)", robots: { index: false } };

// Sample data — in production this comes from the orders database / analytics.
const revenue = [182, 164, 201, 238, 312, 356, 290, 196, 188, 214, 251, 334, 389, 305]; // thousands PKR
const topItems = [
  { id: "ember-supreme", orders: 412 }, { id: "fire-burger", orders: 367 }, { id: "loaded-fries", orders: 344 },
  { id: "family-feast", orders: 221 }, { id: "hot-wings", orders: 198 },
];
const branchPerf = [
  { slug: "mingora", revenue: 1_920_000, orders: 2310, growth: 14 },
  { slug: "saidu-sharif", revenue: 1_240_000, orders: 1580, growth: 9 },
  { slug: "kalam", revenue: 460_000, orders: 610, growth: 31 },
];
const funnel = [
  { label: "Website visits", v: 48200 }, { label: "Menu views", v: 31400 }, { label: "Added to cart", v: 9800 }, { label: "Orders placed", v: 4500 },
];
const campaigns = [
  { name: "Weekend Family Feast −20%", channel: "Instagram", reach: "84k", orders: 612, roi: "7.4×" },
  { name: "Student Tuesday", channel: "TikTok", reach: "121k", orders: 488, roi: "9.1×" },
  { name: "Late-night wings", channel: "WhatsApp", reach: "6.2k", orders: 301, roi: "15.2×" },
  { name: "Google Business posts", channel: "Google", reach: "22k", orders: 257, roi: "—" },
];

function Tile({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      <p className="mt-1 text-xs text-green-400">▲ {delta} vs last week</p>
    </div>
  );
}

export default function Dashboard() {
  const max = Math.max(...revenue);
  const topMax = topItems[0].orders;
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Owner dashboard · demo data</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Good evening, Imran.</h1>
        </div>
        <Link href="/admin" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-white/5">Open admin / CMS →</Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label="Orders (7 days)" value="1,284" delta="12%" />
        <Tile label="Revenue (7 days)" value="Rs 2.08M" delta="18%" />
        <Tile label="Avg order value" value="Rs 1,620" delta="5%" />
        <Tile label="Conversion rate" value="9.3%" delta="1.1 pt" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-line bg-surface p-6 lg:col-span-2" aria-labelledby="rev-h">
          <h2 id="rev-h" className="font-semibold">Revenue · last 14 days <span className="text-xs font-normal text-muted">(thousand Rs)</span></h2>
          <div className="mt-6 flex h-56 items-end gap-1.5" role="img" aria-label="Bar chart of daily revenue, peaking on weekends">
            {revenue.map((r, i) => (
              <div key={i} className="group relative flex-1">
                <div className={`w-full rounded-t-md ${i >= 7 ? "bg-accent" : "bg-accent/35"}`} style={{ height: `${(r / max) * 208}px` }} />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100">{r}k</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted"><span>2 weeks ago</span><span>Today</span></div>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="funnel-h">
          <h2 id="funnel-h" className="font-semibold">Customer funnel</h2>
          <ul className="mt-5 space-y-4">
            {funnel.map((f) => (
              <li key={f.label}>
                <div className="flex justify-between text-sm"><span className="text-muted">{f.label}</span><span>{f.v.toLocaleString()}</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-line"><div className="h-2 rounded-full bg-gold" style={{ width: `${(f.v / funnel[0].v) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="top-h">
          <h2 id="top-h" className="font-semibold">Most ordered dishes</h2>
          <ol className="mt-5 space-y-4">
            {topItems.map((t, i) => (
              <li key={t.id}>
                <div className="flex justify-between text-sm"><span>{i + 1}. {menu.find((m) => m.id === t.id)?.name}</span><span className="text-muted">{t.orders}</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-line"><div className="h-2 rounded-full bg-accent" style={{ width: `${(t.orders / topMax) * 100}%` }} /></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6 lg:col-span-2" aria-labelledby="br-h">
          <h2 id="br-h" className="font-semibold">Branch performance · this month</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted"><tr><th className="py-2">Branch</th><th>Orders</th><th>Revenue</th><th>Growth</th></tr></thead>
              <tbody className="divide-y divide-line">
                {branchPerf.map((b) => (
                  <tr key={b.slug}><td className="py-3">{branches.find((x) => x.slug === b.slug)?.area}</td><td>{b.orders.toLocaleString()}</td><td>{formatPrice(b.revenue)}</td><td className="text-green-400">+{b.growth}%</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6 lg:col-span-3" aria-labelledby="mk-h">
          <h2 id="mk-h" className="font-semibold">Marketing campaigns</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted"><tr><th className="py-2">Campaign</th><th>Channel</th><th>Reach</th><th>Orders</th><th>Return</th></tr></thead>
              <tbody className="divide-y divide-line">
                {campaigns.map((c) => (
                  <tr key={c.name}><td className="py-3">{c.name}</td><td className="text-muted">{c.channel}</td><td>{c.reach}</td><td>{c.orders}</td><td className="text-gold">{c.roi}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <p className="mt-6 text-xs text-muted">Also tracked: repeat customers (38%), loyalty members (2,140), peak hours (8–10 PM), most-viewed dishes and offer redemptions.</p>
    </div>
  );
}
