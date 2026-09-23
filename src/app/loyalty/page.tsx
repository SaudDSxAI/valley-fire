import type { Metadata } from "next";
import { Loyalty } from "@/components/sections/Loyalty";

export const metadata: Metadata = { title: "Join the Club", description: "Earn points, get birthday treats and member-only deals." };

export default function LoyaltyPage() {
  return <div className="pt-12"><Loyalty /></div>;
}
