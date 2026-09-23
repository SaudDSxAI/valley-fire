import Image from "next/image";
import { brand } from "@/config/brand";

/** Logo mark (from /public/logo-icon.png) + wordmark. Replace the image to rebrand. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image src="/logo-icon.png" alt="" width={144} height={144} priority className="h-9 w-9 object-contain" />
      <span className="font-display text-xl font-semibold tracking-[0.18em]">{brand.name}</span>
    </span>
  );
}
