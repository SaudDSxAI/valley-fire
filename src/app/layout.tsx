import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";
import { brand } from "@/config/brand";
import { branches } from "@/config/content";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { ChromeGate } from "@/components/ChromeGate";
import { PageTransition } from "@/components/PageTransition";
import { CartDrawer } from "@/components/CartDrawer";
import { Customizer } from "@/components/Customizer";
import { AIAssistant } from "@/components/AIAssistant";


export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: `${brand.fullName} — Best Pizza & Burgers in ${brand.city}`, template: `%s · ${brand.fullName}` },
  description: brand.description,
  keywords: [...brand.seo.keywords],
  openGraph: { title: brand.fullName, description: brand.description, type: "website", locale: "en_PK", images: [brand.media.heroPoster] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: brand.colors.bg, width: "device-width", initialScale: 1 };

const cssVars = {
  "--brand-bg": brand.colors.bg,
  "--brand-surface": brand.colors.surface,
  "--brand-ink": brand.colors.ink,
  "--brand-muted": brand.colors.muted,
  "--brand-accent": brand.colors.accent,
  "--brand-accent-ink": brand.colors.accentInk,
  "--brand-gold": brand.colors.gold,
} as React.CSSProperties;

// Structured data: one Restaurant per branch (local SEO)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": branches.map((b) => ({
    "@type": "Restaurant",
    name: b.name,
    url: `${brand.url}/locations/${b.slug}`,
    telephone: b.phone,
    servesCuisine: ["Pizza", "Burgers", "Fried Chicken", "Fast Food"],
    priceRange: "$$",
    address: { "@type": "PostalAddress", streetAddress: b.address, addressLocality: b.area, addressRegion: brand.region, addressCountry: brand.country },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    openingHours: `Mo-Su ${b.hours.open}-${b.hours.close}`,
    aggregateRating: { "@type": "AggregateRating", ratingValue: brand.rating.score, reviewCount: brand.rating.count },
    sameAs: Object.values(brand.socials),
    hasMenu: `${brand.url}/menu`,
    acceptsReservations: true,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={cssVars}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CartProvider>
          <Header />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <ChromeGate>
            <Footer />
          </ChromeGate>
          <MobileBar />
          <CartDrawer />
          <Customizer />
          <AIAssistant />
        </CartProvider>
      </body>
    </html>
  );
}
