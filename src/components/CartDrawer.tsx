"use client";

import Link from "next/link";
import { useEffect } from "react";
import { formatPrice } from "@/config/brand";
import { useCart } from "@/lib/cart";
import { IconX } from "./Icons";

export function CartDrawer() {
  const { drawerOpen: open, setDrawerOpen, lines, setQty, subtotal, toast } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setDrawerOpen]);

  return (
    <>
      <div role="status" aria-live="polite" className={`fixed left-1/2 top-20 z-[60] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg shadow-xl transition-all ${toast ? "opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}>
        {toast}
      </div>
      <div className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setDrawerOpen(false)} />
      <aside
        aria-label="Your order"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-auto z-50 flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-surface shadow-2xl transition-transform duration-300 md:inset-y-0 md:right-0 md:left-auto md:top-0 md:h-full md:max-h-none md:max-w-md md:rounded-t-none ${open ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full"}`}
      >
        {/* Grab-handle affordance — signals this is a bottom sheet on mobile;
           the desktop right-side drawer hides it since it doesn't apply there. */}
        <div className="flex shrink-0 justify-center pb-1 pt-2 md:hidden">
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="font-display text-2xl">Your order</h2>
          <button onClick={() => setDrawerOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-line" aria-label="Close cart"><IconX /></button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 pb-[calc(2rem+env(safe-area-inset-bottom))] text-center">
            <p className="text-muted">Your bag is empty. Let's fix that.</p>
            <Link href="/menu" onClick={() => setDrawerOpen(false)} className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink">Browse the menu</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.key} className="py-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-medium">{l.name}</p>
                      {l.choices.length > 0 && <p className="text-xs text-muted">{l.choices.join(" · ")}</p>}
                      {l.note && <p className="text-xs italic text-muted">“{l.note}”</p>}
                    </div>
                    <p className="whitespace-nowrap font-medium">{formatPrice(l.unitPrice * l.qty)}</p>
                  </div>
                  <div className="mt-2 inline-flex items-center rounded-full border border-line">
                    <button onClick={() => setQty(l.key, l.qty - 1)} className="h-9 w-9" aria-label={`Decrease ${l.name}`}>−</button>
                    <span className="w-6 text-center text-sm">{l.qty}</span>
                    <button onClick={() => setQty(l.key, l.qty + 1)} className="h-9 w-9" aria-label={`Increase ${l.name}`}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <div className="flex justify-between text-lg"><span>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <p className="mt-1 text-xs text-muted">Delivery and discounts calculated at checkout.</p>
              <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="mt-4 block rounded-full bg-accent py-4 text-center font-semibold text-accent-ink hover:brightness-110">
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
