import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { branches } from "@/config/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/menu", "/locations", "/offers", "/about", "/catering", "/reservations", "/loyalty"];
  return [
    ...pages.map((p) => ({ url: `${brand.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...branches.map((b) => ({ url: `${brand.url}/locations/${b.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
