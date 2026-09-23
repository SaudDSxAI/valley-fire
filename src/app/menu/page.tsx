import type { Metadata } from "next";
import { MenuBrowser } from "@/components/MenuBrowser";
import { PageHeader } from "@/components/PageHeader";
import { brand, formatPrice } from "@/config/brand";
import { categories, menu } from "@/config/menu";

export const metadata: Metadata = {
  title: `Menu — Pizza, Burgers & Chicken in ${brand.city}`,
  description: `Full ${brand.fullName} menu with prices: stone-fired pizza, smash burgers, fried chicken, sides, desserts and deals. Order online for delivery or pickup in ${brand.city}.`,
};

// Menu structured data for search engines
const menuLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: `${brand.fullName} Menu`,
  hasMenuSection: categories.map((c) => ({
    "@type": "MenuSection",
    name: c.name,
    hasMenuItem: menu.filter((m) => m.category === c.id).map((m) => ({
      "@type": "MenuItem",
      name: m.name,
      description: m.description,
      offers: { "@type": "Offer", price: m.price, priceCurrency: "PKR" },
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuLd) }} />
      <PageHeader eyebrow="Menu" title={<>Our <em className="text-accent">menu</em></>} text={`Prices from ${formatPrice(Math.min(...menu.map((m) => m.price)))}. Tap any item to customise.`} />
      <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <MenuBrowser />
      </div>
    </>
  );
}
