import { menu, signatureIds } from "@/config/menu";
import { FoodCard } from "../FoodCard";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

export function Signature() {
  const items = signatureIds.map((id) => menu.find((m) => m.id === id)!).filter(Boolean);
  return (
    <section id="signature" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <SectionHeading eyebrow="Signature dishes" title={<>The ones people <em className="text-accent">drive</em> for.</>} text="Bestsellers, house signatures and what's new this month." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={(i % 3) * 90} direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}>
            <FoodCard item={it} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
