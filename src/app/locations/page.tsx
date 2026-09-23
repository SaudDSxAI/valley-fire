import type { Metadata } from "next";
import { Branches } from "@/components/sections/Branches";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: `Locations — Restaurants in Mingora, Saidu Sharif & Kalam`,
  description: `Find your nearest ${brand.fullName} in ${brand.city}. Opening hours, directions, phone and WhatsApp for every branch.`,
};

export default function Locations() {
  return (
    <div className="flex h-[100svh] flex-col overflow-hidden pt-16 md:pt-20">
      <div className="mx-auto w-full max-w-7xl shrink-0 px-4 pb-2 pt-4 md:px-8 md:pb-4 md:pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Locations</p>
        <h1 className="mt-1 font-display text-2xl leading-tight md:mt-1.5 md:text-5xl">Find your <em className="text-accent">nearest</em> EMBER</h1>
      </div>
      <div className="min-h-0 flex-1 px-4 pb-20 md:px-8 md:pb-6">
        <Branches compact />
      </div>
    </div>
  );
}
