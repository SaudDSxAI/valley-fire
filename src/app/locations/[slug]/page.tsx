import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { branches } from "@/config/content";
import { menu } from "@/config/menu";
import { mapsDirections, mapsEmbed } from "@/lib/hours";
import { FoodCard } from "@/components/FoodCard";
import { IconClock, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = branches.find((x) => x.slug === slug);
  if (!b) return {};
  return {
    title: `Best Pizza & Burgers in ${b.area}, ${brand.city}`,
    description: `${b.name}: ${b.address}. ${b.hoursLabel}. ${b.features.join(", ")}. Order online or call ${b.phone}.`,
  };
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = branches.find((x) => x.slug === slug);
  if (!b) notFound();
  const popular = menu.filter((m) => m.badges?.includes("Bestseller")).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-8 md:pt-36">
      <nav aria-label="Breadcrumb" className="text-xs text-muted"><Link href="/locations" className="hover:text-ink">Locations</Link> / {b.area}</nav>
      <h1 className="mt-3 font-display text-5xl md:text-7xl">{b.name}</h1>
      <p className="mt-3 text-lg text-muted">Fast food restaurant in {b.area}, {brand.city} — stone-fired pizza, smash burgers and fried chicken.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-3xl border border-line p-6">
            <p className="flex gap-2"><IconPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {b.address}</p>
            <p className="mt-3 flex gap-2"><IconClock className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {b.hoursLabel}</p>
            <p className="mt-3 flex gap-2"><IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> <a href={b.phoneHref} className="hover:underline">{b.phone}</a></p>
            <ul className="mt-5 flex flex-wrap gap-2">{b.features.map((f) => <li key={f} className="rounded-full border border-line px-3 py-1 text-xs">{f}</li>)}</ul>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <a href={b.phoneHref} className="flex items-center justify-center gap-2 rounded-full border border-line py-3"><IconPhone className="h-4 w-4" /> Call</a>
            <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-full border border-line py-3"><IconWhatsApp className="h-4 w-4" /> WhatsApp</a>
            <a href={mapsDirections(b.lat, b.lng)} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-full border border-line py-3"><IconPin className="h-4 w-4" /> Directions</a>
            <Link href="/menu" className="flex items-center justify-center rounded-full bg-accent py-3 text-accent-ink">Order Now</Link>
          </div>
        </div>
        <iframe title={`Map of ${b.name}`} src={mapsEmbed(b.mapQuery)} className="min-h-96 w-full rounded-3xl border border-line grayscale-[0.6] invert-[0.9] hue-rotate-180 lg:col-span-3" loading="lazy" />
      </div>

      <h2 className="mt-20 font-display text-4xl">Popular at {b.area}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">{popular.map((m) => <FoodCard key={m.id} item={m} />)}</div>
    </div>
  );
}
