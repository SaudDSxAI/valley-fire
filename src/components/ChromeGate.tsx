"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// These pages are built to fit one screen with no scrolling, so the global
// footer (which would add height below the fold) is skipped here. The
// mobile bottom nav stays on every route — see layout.tsx — since it's the
// primary way to move around on mobile/tablet.
export const noChromeRoutes = new Set(["/locations", "/offers", "/reservations"]);

export function ChromeGate({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (noChromeRoutes.has(path)) return null;
  return <>{children}</>;
}
