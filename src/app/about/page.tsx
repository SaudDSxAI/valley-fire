import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Reviews } from "@/components/sections/Reviews";

export const metadata: Metadata = { title: "Our Story", description: "How a single wood-fired oven in Mingora became Swat's favourite kitchen." };

export default function AboutPage() {
  return (
    <div className="pt-12">
      <About full />
      <Reviews />
    </div>
  );
}
