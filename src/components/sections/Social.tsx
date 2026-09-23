import { brand } from "@/config/brand";
import { SmartImage } from "../Media";
import { IconFacebook, IconInstagram, IconTikTok } from "../Icons";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "../Reveal";

/** Replace with a live Instagram/TikTok feed for real clients. */
export function Social() {
  const posts = [1, 2, 3, 4, 5, 6];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="@valleyfire.swat"
        title={<>Tag us. <em className="text-accent">Get featured.</em></>}
        text="Real plates from real customers. Share yours with #ValleyFireSwat."
        action={
          <div className="flex gap-2">
            <a href={brand.socials.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm hover:bg-white/5"><IconInstagram className="h-4 w-4" /> Instagram</a>
            <a href={brand.socials.tiktok} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm hover:bg-white/5"><IconTikTok className="h-4 w-4" /> TikTok</a>
            <a href={brand.socials.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-line hover:bg-white/5"><IconFacebook className="h-4 w-4" /></a>
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {posts.map((n, i) => (
          <Reveal key={n} delay={(i % 6) * 70} direction={i % 2 === 0 ? "scale" : "up"}>
            <a href={brand.socials.instagram} target="_blank" rel="noopener" className="group relative block" aria-label={`Customer post ${n} on Instagram`}>
              <SmartImage src={`/media/social-${n}.jpg`} alt={`Customer food photo ${n}`} label="#ValleyFireSwat" className="aspect-square rounded-2xl" sizes="(max-width:768px) 50vw, 16vw" />
              <span className="absolute inset-0 grid place-items-center rounded-2xl bg-black/50 opacity-0 transition group-hover:opacity-100"><IconInstagram /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
