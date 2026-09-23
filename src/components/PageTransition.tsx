"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Gives every route change the same smooth "arriving" feel as the Home
 * scroll-to-top, instead of navigation just cutting instantly from one page
 * to the next. Keyed by pathname so React remounts (and re-animates) this
 * wrapper on every navigation. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  // Opacity-only (no y-offset): some routes are viewport-locked single-screen
  // layouts with zero scroll budget, so translating the wrapper could cause
  // a transient overflow. A pure fade stays perfectly safe there while still
  // reading as a deliberate, smooth arrival everywhere else.
  return (
    <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
