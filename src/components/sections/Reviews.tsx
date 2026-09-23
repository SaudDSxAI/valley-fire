import { brand } from "@/config/brand";
import { reviews } from "@/config/content";
import { IconStar } from "../Icons";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32" aria-labelledby="reviews-h">
      <SectionHeading
        eyebrow="Loved by our customers"
        title={<span id="reviews-h">Swat has spoken.</span>}
        action={
          <div className="flex items-center gap-4 rounded-2xl border border-line px-5 py-4">
            <p className="font-display text-5xl">{brand.rating.score}</p>
            <div>
              <div className="flex text-gold" aria-label={`${brand.rating.score} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => <IconStar key={i} />)}
              </div>
              <p className="mt-1 text-xs text-muted">{brand.rating.count.toLocaleString()} reviews on {brand.rating.source}</p>
            </div>
          </div>
        }
      />
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 80} direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"} className="mb-4 break-inside-avoid">
            <figure className="rounded-3xl border border-line bg-surface p-6">
              <div className="flex text-gold" aria-label={`${r.rating} stars`}>
                {Array.from({ length: r.rating }).map((_, k) => <IconStar key={k} />)}
              </div>
              <blockquote className="mt-3 text-lg leading-snug">“{r.text}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/20 font-semibold text-accent">{r.name[0]}</span>
                <span><span className="font-medium">{r.name}</span><span className="block text-xs text-muted">{r.area} · via Google</span></span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
