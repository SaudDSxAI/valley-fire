import type { Metadata } from "next";
import { ReservationForm } from "./ReservationForm";

export const metadata: Metadata = { title: "Book a Table", description: "Reserve a table at EMBER in Mingora, Saidu Sharif or Kalam in under a minute." };

export default function Reservations() {
  return (
    <div className="flex h-[100svh] flex-col overflow-hidden pt-16 md:pt-20">
      <div className="mx-auto w-full max-w-4xl shrink-0 px-4 pb-2 pt-4 md:px-8 md:pb-4 md:pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Reservations</p>
        <h1 className="mt-1 font-display text-2xl leading-tight md:mt-1.5 md:text-5xl">Book a <em className="text-accent">table</em></h1>
      </div>
      <div className="mx-auto min-h-0 w-full max-w-4xl flex-1 px-4 pb-2 md:px-8 md:pb-6">
        <ReservationForm />
      </div>
    </div>
  );
}
