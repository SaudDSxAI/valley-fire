import type { Metadata } from "next";
import { OfferGrid } from "@/components/sections/Offers";

export const metadata: Metadata = { title: "Offers & Deals", description: "Today's deals, combos, weekend offers and seasonal specials." };

export default function OffersPage() {
  return (
    <div className="flex h-[100svh] flex-col overflow-hidden pb-20 pt-16 md:pb-0 md:pt-20">
      <div className="mx-auto w-full max-w-7xl shrink-0 px-4 pb-4 pt-6 md:px-8 md:pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Offers</p>
        <h1 className="mt-1.5 font-display text-3xl leading-tight md:text-5xl">Deals worth <em className="text-accent">leaving home</em> for</h1>
      </div>
      <div className="mx-auto min-h-0 w-full max-w-4xl flex-1 px-4 pb-2 md:px-8 md:pb-6">
        <OfferGrid compact />
      </div>
    </div>
  );
}
