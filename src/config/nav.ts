import { House, UtensilsCrossed, MapPin, Info, Percent, ChefHat, CalendarCheck, Phone } from "lucide-react";

/** The single source of truth for site navigation. Header's desktop bar,
 * the mobile bottom nav, and the footer's "Quick links" all read from this
 * instead of keeping their own separate lists — add a page here once and
 * every nav surface picks it up automatically. */
export const nav = [
  { href: "/", label: "Home", Icon: House, core: true },
  { href: "/menu", label: "Menu", Icon: UtensilsCrossed, core: true },
  { href: "/locations", label: "Locations", Icon: MapPin, core: true },
  { href: "/about", label: "About", Icon: Info, core: false },
  { href: "/offers", label: "Offers", Icon: Percent, core: true },
  { href: "/catering", label: "Catering", Icon: ChefHat, core: false },
  { href: "/reservations", label: "Reservations", Icon: CalendarCheck, core: true },
  { href: "/#contact", label: "Contact", Icon: Phone, core: false },
] as const;

// The always-visible desktop bar only carries these — everything else
// (About, Catering, Contact) lives in the footer instead.
export const coreNav = nav.filter((n) => n.core);
