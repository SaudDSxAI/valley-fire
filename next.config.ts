import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AVIF was dropped: some mobile browsers/WebViews advertise AVIF support
  // in their Accept header but fail to actually decode it, which shows up
  // as a photo that silently never renders (exactly a "picture not
  // loading on mobile, fine on desktop" symptom) rather than a visible
  // error. WebP alone has much more consistent real-world mobile support.
  images: { formats: ["image/webp"] },
};

export default nextConfig;
