"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { IconBag } from "./Icons";
import { coreNav } from "@/config/nav";

export function Header() {
  const { count, setDrawerOpen } = useCart();
  const path = usePathname();

  // Home / the logo always scroll back to the hero. Link only changes the
  // route, so clicking it while already on "/" does nothing on its own —
  // this makes it act like a "back to top" instead.
  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (path === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link href="/" aria-label="Home" onClick={goHome}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {coreNav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={n.href === "/" ? goHome : undefined}
                  className={`flex items-center gap-1.5 transition-colors hover:text-ink ${path === n.href ? "text-ink" : "text-ink/70"}`}
                >
                  <n.Icon className="h-4 w-4" aria-hidden="true" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-line hover:bg-white/5"
            aria-label={`Open cart, ${count} items`}
          >
            <IconBag />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-ink">
                {count}
              </span>
            )}
          </button>
          <Link
            href="/menu"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition hover:brightness-110 sm:inline-block"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
}
