import Link from "next/link";
import { brand } from "@/config/brand";
import { branches } from "@/config/content";
import { nav } from "@/config/nav";
import { Logo } from "./Logo";
import { IconFacebook, IconInstagram, IconTikTok, IconWhatsApp } from "./Icons";
import { waLink } from "@/config/brand";

// Same list the header nav reads from, minus Home (the logo already covers
// that) and Contact (this footer IS the contact section) — plus the one
// link that isn't a top-level page. Keeping a single source means a page
// added to the site's nav shows up here automatically, instead of the
// footer quietly drifting out of sync and turning into a pile of one-off links.
const quickLinks: { href: string; label: string }[] = [
  ...nav.filter((n) => n.href !== "/" && n.href !== "/#contact").map((n) => ({ href: n.href, label: n.label })),
  { href: "/loyalty", label: "Join the Club" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="border-t border-line bg-surface/40 pb-24 pt-16 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">{brand.description}</p>
          <div className="mt-6 flex gap-3">
            {[
              { href: brand.socials.instagram, label: "Instagram", Icon: IconInstagram },
              { href: brand.socials.facebook, label: "Facebook", Icon: IconFacebook },
              { href: brand.socials.tiktok, label: "TikTok", Icon: IconTikTok },
              { href: waLink("Hi!"), label: "WhatsApp", Icon: IconWhatsApp },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-line hover:bg-white/5">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={brand.contact.phoneHref} className="hover:text-accent">{brand.contact.phone}</a></li>
            <li><a href={waLink("Hi!")} className="hover:text-accent">WhatsApp us</a></li>
            <li><a href={`mailto:${brand.contact.email}`} className="hover:text-accent">{brand.contact.email}</a></li>
          </ul>
          <h2 className="mt-8 text-xs uppercase tracking-[0.2em] text-muted">Quick links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {quickLinks.map(({ href, label }) => (
              <li key={href}><Link href={href} className="text-ink/80 hover:text-accent">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted">Branches & hours</h2>
          <ul className="mt-4 space-y-4 text-sm">
            {branches.map((b) => (
              <li key={b.slug}>
                <Link href={`/locations/${b.slug}`} className="font-medium hover:text-accent">{b.name}</Link>
                <p className="text-muted">{b.address}</p>
                <p className="text-muted">{b.hoursLabel} · <a href={b.phoneHref} className="hover:text-accent">{b.phone}</a></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-line px-4 pt-6 text-xs text-muted md:flex-row md:justify-between md:px-8">
        <p>© {year} {brand.fullName}. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-ink">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
          <Link href="/dashboard" className="hover:text-ink">Owner dashboard</Link>
        </div>
      </div>
    </footer>
  );
}
