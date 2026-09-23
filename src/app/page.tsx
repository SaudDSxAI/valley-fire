import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Signature } from "@/components/sections/Signature";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { MenuBrowser } from "@/components/MenuBrowser";
import { OfferGrid } from "@/components/sections/Offers";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Branches } from "@/components/sections/Branches";
import { Reviews } from "@/components/sections/Reviews";
import { CateringForm, CateringTypes } from "@/components/sections/Catering";
import { Loyalty } from "@/components/sections/Loyalty";
import { Social } from "@/components/sections/Social";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Signature />

      <section id="menu" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <SectionHeading
          eyebrow="The menu"
          title={<>Find your <em className="text-accent">favourite.</em></>}
          text="Search, filter by diet or allergens, customise and add to your order."
          action={<Link href="/menu" className="text-sm font-semibold text-accent hover:underline">Open full menu →</Link>}
        />
        <MenuBrowser headingLevel="h3" />
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow="Offers & deals" title={<>More food. <em className="text-accent">Less spend.</em></>} action={<Link href="/offers" className="text-sm font-semibold text-accent hover:underline">All offers →</Link>} />
        <OfferGrid limit={3} />
      </section>

      <Experience />
      <About />

      <section id="locations" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow="Branches" title={<>Three kitchens. <em className="text-accent">One valley.</em></>} text="Pick your nearest branch for delivery, pickup or dine-in." />
        <Branches />
      </section>

      <Reviews />

      <section id="catering" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Catering & events</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl">Feeding 20 or <em className="text-accent">2,000.</em></h2>
            <p className="mt-4 mb-8 text-muted">Weddings, office lunches, university fests and private parties — we bring the fire to you.</p>
            <CateringTypes />
          </Reveal>
          <Reveal delay={120}><CateringForm /></Reveal>
        </div>
      </section>

      <Loyalty />
      <Social />
    </>
  );
}
