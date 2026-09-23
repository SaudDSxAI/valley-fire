import type { Branch } from "@/config/content";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Is the branch open right now (Pakistan time)? Handles closing after midnight. */
export function isOpenNow(b: Branch, now = new Date()) {
  const pk = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
  const cur = pk.getHours() * 60 + pk.getMinutes();
  const open = toMin(b.hours.open);
  const close = toMin(b.hours.close);
  return close > open ? cur >= open && cur < close : cur >= open || cur < close;
}

export const mapsEmbed = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
export const mapsDirections = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
