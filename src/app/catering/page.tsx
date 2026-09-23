import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CateringForm, CateringTypes } from "@/components/sections/Catering";

export const metadata: Metadata = { title: "Catering & Events in Swat", description: "Corporate catering, weddings, parties and university events across Swat." };

export default function CateringPage() {
  return (
    <>
      <PageHeader eyebrow="Catering & events" title={<>We bring <em className="text-accent">the fire</em> to you</>} text="Tell us about your event and we'll call you back with a menu and quote within 2 hours." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 md:px-8 lg:grid-cols-2">
        <CateringTypes />
        <CateringForm />
      </div>
    </>
  );
}
