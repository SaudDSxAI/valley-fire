"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/config/brand";
import { menuImage } from "@/config/menu";
import { useCart } from "@/lib/cart";
import { SmartImage } from "./Media";
import { Badges } from "./FoodCard";
import { IconX } from "./Icons";

/** Item detail + customization sheet (bottom sheet on mobile, modal on desktop). */
export function Customizer() {
  const { customizing: item, closeCustomizer, add } = useCart();
  const [sel, setSel] = useState<Record<string, string[]>>({});
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!item) return;
    const init: Record<string, string[]> = {};
    item.options?.forEach((g) => {
      if (g.required || !g.multi) init[g.id] = [g.choices[0].name];
    });
    setSel(init);
    setQty(1);
    setNote("");
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCustomizer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, closeCustomizer]);

  const unit = useMemo(() => {
    if (!item) return 0;
    let p = item.price;
    item.options?.forEach((g) => g.choices.forEach((c) => sel[g.id]?.includes(c.name) && (p += c.price)));
    return p;
  }, [item, sel]);

  const toggle = (gid: string, name: string, multi?: boolean) =>
    setSel((s) => {
      const cur = s[gid] ?? [];
      if (!multi) return { ...s, [gid]: [name] };
      return { ...s, [gid]: cur.includes(name) ? cur.filter((x) => x !== name) : [...cur, name] };
    });

  const submit = () => {
    if (!item) return;
    const choices = item.options?.flatMap((g) => sel[g.id] ?? []).filter((c) => !c.startsWith("No,")) ?? [];
    add({ id: item.id, name: item.name, unitPrice: unit, qty, choices, note: note.trim() || undefined });
    closeCustomizer();
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center"
          onClick={closeCustomizer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cz-title"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-surface outline-none md:rounded-3xl"
            initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0.6 }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0.6 }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            {/* Small grab-handle affordance — mobile-only visual cue that this
               sheet slides up from the bottom, matching native bottom-sheet
               conventions even though drag-to-dismiss isn't wired up. */}
            <div className="flex shrink-0 justify-center pb-1 pt-2 md:hidden">
              <span className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <div className="relative">
              <SmartImage src={menuImage(item.id)} alt={item.name} className="aspect-[16/10] w-full" sizes="512px" />
              <button onClick={closeCustomizer} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/60" aria-label="Close">
                <IconX />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <Badges item={item} max={4} />
              <h2 id="cz-title" className="mt-2 font-display text-2xl">{item.name}</h2>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                {item.kcal && <span>{item.kcal} kcal</span>}
                {item.allergens?.length ? <span>Contains: {item.allergens.join(", ")}</span> : <span>No major allergens</span>}
              </div>

              {item.options?.map((g) => (
                <fieldset key={g.id} className="mt-6">
                  <legend className="flex w-full items-center justify-between text-sm font-semibold">
                    {g.name}
                    <span className="text-xs font-normal text-muted">{g.required ? "Required" : g.multi ? "Optional · choose any" : "Optional"}</span>
                  </legend>
                  <div className="mt-2 space-y-2">
                    {g.choices.map((c) => {
                      const on = sel[g.id]?.includes(c.name) ?? false;
                      return (
                        <label key={c.name} className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${on ? "border-accent bg-accent/10" : "border-line hover:border-ink/30"}`}>
                          <span className="flex items-center gap-3">
                            <input type={g.multi ? "checkbox" : "radio"} name={g.id} checked={on} onChange={() => toggle(g.id, c.name, g.multi)} className="accent-[var(--brand-accent)]" />
                            {c.name}
                          </span>
                          <span className="text-muted">{c.price ? `+${formatPrice(c.price)}` : ""}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}

              <label className="mt-6 block text-sm font-semibold" htmlFor="cz-note">Special instructions</label>
              <textarea id="cz-note" value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="e.g. no onions, extra sauce" className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm placeholder:text-muted/60" />
            </div>
            <div className="flex items-center gap-3 border-t border-line p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <div className="flex items-center rounded-full border border-line">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 text-lg" aria-label="Decrease quantity">−</button>
                <span className="w-6 text-center" aria-live="polite">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 text-lg" aria-label="Increase quantity">+</button>
              </div>
              <motion.button
                onClick={submit}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="h-12 flex-1 rounded-full bg-accent font-semibold text-accent-ink hover:brightness-110"
              >
                Add · {formatPrice(unit * qty)}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
