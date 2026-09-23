"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/config/brand";
import { menuImage, type MenuItem } from "@/config/menu";
import { useCart } from "@/lib/cart";
import { SmartImage } from "./Media";

const badgeStyle: Record<string, string> = {
  Bestseller: "bg-gold text-black",
  New: "bg-white text-black",
  Signature: "bg-accent text-accent-ink",
  Spicy: "bg-red-700 text-white",
  Veg: "bg-green-700 text-white",
};

export function Badges({ item, max = 2 }: { item: MenuItem; max?: number }) {
  if (!item.badges?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {item.badges.slice(0, max).map((b) => (
        <span key={b} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeStyle[b]}`}>
          {b}
        </span>
      ))}
    </div>
  );
}

export function FoodCard({ item, layout = "grid" }: { item: MenuItem; layout?: "grid" | "row" }) {
  const { customize, add } = useCart();
  const onAdd = () =>
    item.options?.length ? customize(item.id) : add({ id: item.id, name: item.name, unitPrice: item.price, qty: 1, choices: [] });

  if (layout === "row") {
    return (
      <article className="flex gap-4 rounded-2xl border border-line bg-surface p-3 transition hover:border-accent/40">
        <button onClick={() => customize(item.id)} className="shrink-0" aria-label={`View ${item.name}`}>
          <SmartImage src={menuImage(item.id)} alt={item.name} className="h-28 w-28 rounded-xl" sizes="112px" />
        </button>
        <div className="flex min-w-0 flex-1 flex-col">
          <Badges item={item} />
          <h3 className="mt-1 font-semibold leading-tight">{item.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-semibold">{formatPrice(item.price)}</span>
            <motion.button
              onClick={onAdd}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:brightness-110"
              aria-label={`Add ${item.name} to order`}
            >
              Add
            </motion.button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent/40">
      <button onClick={() => customize(item.id)} className="relative block" aria-label={`View ${item.name}`}>
        <SmartImage src={menuImage(item.id)} alt={item.name} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute left-3 top-3"><Badges item={item} /></div>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl">{item.name}</h3>
        <p className="mt-1.5 text-sm text-muted">{item.description}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-lg font-semibold">{formatPrice(item.price)}</span>
          <motion.button
            onClick={onAdd}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink hover:brightness-110"
            aria-label={`Add ${item.name} to order`}
          >
            Add to Order
          </motion.button>
        </div>
      </div>
    </article>
  );
}
