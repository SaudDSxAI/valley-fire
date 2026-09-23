"use client";

import { useMemo, useState } from "react";
import { categories, menu, type Allergen, type CategoryId } from "@/config/menu";
import { FoodCard } from "./FoodCard";
import { IconSearch } from "./Icons";
import { Reveal } from "./Reveal";
import {
  LayoutGrid, Pizza, Hamburger, Drumstick, Utensils, CupSoda, IceCreamCone, BadgePercent,
  Star, Sparkles, Flame, Leaf, WheatOff, MilkOff, NutOff, EggOff, type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<CategoryId, LucideIcon> = {
  pizza: Pizza,
  burgers: Hamburger,
  chicken: Drumstick,
  sides: Utensils,
  drinks: CupSoda,
  desserts: IceCreamCone,
  deals: BadgePercent,
};
const quickFilters = [
  { id: "Bestseller", label: "Bestsellers", Icon: Star },
  { id: "New", label: "New", Icon: Sparkles },
  { id: "Spicy", label: "Spicy", Icon: Flame },
  { id: "Veg", label: "Vegetarian", Icon: Leaf },
] as const;
const allergenFilters: { id: Allergen; Icon: LucideIcon }[] = [
  { id: "Gluten", Icon: WheatOff },
  { id: "Dairy", Icon: MilkOff },
  { id: "Nuts", Icon: NutOff },
  { id: "Egg", Icon: EggOff },
];

export function MenuBrowser({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [flags, setFlags] = useState<string[]>([]);
  const [avoid, setAvoid] = useState<Allergen[]>([]);
  const H = headingLevel;

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return menu.filter(
      (m) =>
        (cat === "all" || m.category === cat) &&
        (!t || `${m.name} ${m.description} ${m.tags?.join(" ")}`.toLowerCase().includes(t)) &&
        flags.every((f) => m.badges?.includes(f as never)) &&
        avoid.every((a) => !m.allergens?.includes(a))
    );
  }, [q, cat, flags, avoid]);

  const grouped = categories
    .map((c) => ({ ...c, items: results.filter((r) => r.category === c.id) }))
    .filter((g) => g.items.length);

  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const chip = (on: boolean) =>
    `inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
      on ? "border-accent bg-accent text-accent-ink shadow-[0_0_0_3px_rgba(228,87,46,0.15)]" : "border-line text-ink/80 hover:border-ink/40 hover:text-ink"
    }`;

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-b border-line bg-bg/90 px-4 pb-3 pt-3 backdrop-blur-md md:top-20 md:mx-0 md:rounded-2xl md:border md:px-4">
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <label htmlFor="menu-search" className="sr-only">Search the menu</label>
          <input
            id="menu-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pizza, spicy, cheese…"
            className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-sm placeholder:text-muted/70"
          />
        </div>
        <div className="scroller-fade">
          <div className="mt-4 flex snap-x snap-proximity gap-2 overflow-x-auto overscroll-x-contain no-scrollbar" role="tablist" aria-label="Categories">
            <button role="tab" aria-selected={cat === "all"} onClick={() => setCat("all")} className={`${chip(cat === "all")} snap-start`}>
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" /> All
            </button>
            {categories.map((c) => {
              const CatIcon = categoryIcons[c.id];
              return (
                <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)} className={`${chip(cat === c.id)} snap-start`}>
                  <CatIcon className="h-3.5 w-3.5" aria-hidden="true" /> {c.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="scroller-fade">
          <div className="mt-3 flex snap-x snap-proximity items-center gap-2 overflow-x-auto overscroll-x-contain no-scrollbar">
            {quickFilters.map((f) => (
              <button key={f.id} aria-pressed={flags.includes(f.id)} onClick={() => setFlags(toggle(flags, f.id))} className={`${chip(flags.includes(f.id))} !px-3 !py-1.5 !text-xs snap-start`}>
                <f.Icon className="h-3.5 w-3.5" aria-hidden="true" /> {f.label}
              </button>
            ))}
            <span className="mx-1 h-4 w-px shrink-0 bg-line" />
            <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">Free from</span>
            {allergenFilters.map((a) => (
              <button key={a.id} aria-pressed={avoid.includes(a.id)} onClick={() => setAvoid(toggle(avoid, a.id))} className={`${chip(avoid.includes(a.id))} !px-3 !py-1.5 !text-xs snap-start`}>
                <a.Icon className="h-3.5 w-3.5" aria-hidden="true" /> {a.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{results.length} items found</p>

      {grouped.length === 0 && (
        <div className="py-20 text-center text-muted">
          Nothing matches that. <button className="text-accent underline" onClick={() => { setQ(""); setFlags([]); setAvoid([]); setCat("all"); }}>Clear filters</button>
        </div>
      )}

      {grouped.map((g) => (
        <section key={g.id} aria-labelledby={`cat-${g.id}`} className="pt-10">
          <Reveal direction="left">
            <H id={`cat-${g.id}`} className="mb-4 flex items-baseline gap-3 font-display text-3xl">
              {g.name} <span className="font-sans text-sm text-muted">{g.items.length}</span>
            </H>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {g.items.map((it, i) => (
              <Reveal key={it.id} delay={(i % 3) * 80} direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}>
                <FoodCard item={it} layout="row" />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
