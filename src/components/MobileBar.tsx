"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { House, UtensilsCrossed, MapPin, Percent, CalendarCheck, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart";

const tabs = [
  { href: "/", label: "Home", Icon: House },
  { href: "/menu", label: "Menu", Icon: UtensilsCrossed },
  { href: "/locations", label: "Locations", Icon: MapPin },
  { href: "/offers", label: "Offers", Icon: Percent },
  { href: "/reservations", label: "Reservations", Icon: CalendarCheck },
] as const;
const cols = tabs.length + 2; // + the AI assistant tab + the cart tab

/** Fixed, icon-only bottom navigation for mobile/tablet — the primary way to
 * move between sections below the desktop nav's breakpoint. Stays static
 * (present on every route, no hide-on-scroll), with a sliding highlight
 * behind the active tab and a springy tap response on every icon. */
export function MobileBar() {
  const path = usePathname();
  const { count, setDrawerOpen } = useCart();
  const activeIndex = tabs.findIndex((t) => (t.href === "/" ? path === "/" : path.startsWith(t.href)));

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="relative grid items-center" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {activeIndex >= 0 && (
          <motion.div
            layoutId="mobile-nav-active"
            className="absolute inset-y-1.5 rounded-2xl bg-accent/12"
            style={{ width: `${100 / cols}%`, left: `${(activeIndex * 100) / cols}%` }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          />
        )}

        {tabs.map((t, i) => {
          const active = i === activeIndex;
          return (
            <Link key={t.href} href={t.href} aria-label={t.label} aria-current={active ? "page" : undefined} className="relative flex justify-center py-2.5">
              <motion.span whileTap={{ scale: 0.78 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                <motion.span
                  animate={active ? { y: -2 } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  className="flex flex-col items-center gap-1"
                >
                  <t.Icon className={active ? "h-5 w-5 text-accent" : "h-5 w-5 text-ink/55"} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
                  <span className={`h-1 w-1 rounded-full transition-colors ${active ? "bg-accent" : "bg-transparent"}`} />
                </motion.span>
              </motion.span>
            </Link>
          );
        })}

        <button
          onClick={() => window.dispatchEvent(new Event("open-assistant"))}
          aria-label="Ask the food assistant"
          className="relative flex justify-center py-2.5"
        >
          <motion.span whileTap={{ scale: 0.78 }} transition={{ type: "spring", stiffness: 500, damping: 20 }} className="flex flex-col items-center gap-1">
            <Sparkles className="h-5 w-5 text-ink/55" strokeWidth={2} aria-hidden="true" />
            <span className="h-1 w-1 rounded-full bg-transparent" />
          </motion.span>
        </button>

        <button onClick={() => setDrawerOpen(true)} aria-label={`Cart, ${count} items`} className="relative flex justify-center py-2.5">
          <motion.span whileTap={{ scale: 0.78 }} transition={{ type: "spring", stiffness: 500, damping: 20 }} className="relative flex flex-col items-center gap-1">
            <ShoppingBag className={count > 0 ? "h-5 w-5 text-accent" : "h-5 w-5 text-ink/55"} strokeWidth={count > 0 ? 2.5 : 2} aria-hidden="true" />
            <span className="h-1 w-1 rounded-full bg-transparent" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -right-2.5 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-ink"
              >
                {count}
              </motion.span>
            )}
          </motion.span>
        </button>
      </div>
    </nav>
  );
}
