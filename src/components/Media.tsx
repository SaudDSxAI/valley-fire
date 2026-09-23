"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Photo with a styled placeholder when the file hasn't been uploaded yet. */
export function SmartImage({
  src, alt, className = "", sizes = "(max-width: 768px) 100vw, 33vw", priority = false, label,
}: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean; label?: string }) {
  const [failed, setFailed] = useState(false);
  // One retry with a cache-busted URL before giving up. Real-world mobile
  // networks drop the occasional request; without this, a single flaky
  // load permanently swaps the photo for the "coming soon" placeholder
  // for the rest of the page's life even once the network recovers.
  const attemptRef = useRef(0);
  const [bust, setBust] = useState(0);

  const onError = () => {
    if (attemptRef.current < 1) {
      attemptRef.current += 1;
      setBust((b) => b + 1);
    } else {
      setFailed(true);
    }
  };

  return (
    <div className={`relative overflow-hidden media-ph ${className}`}>
      {!failed ? (
        <Image
          key={bust}
          src={bust ? `${src}${src.includes("?") ? "&" : "?"}retry=${bust}` : src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={onError}
        />
      ) : (
        <div className="absolute inset-0 flex items-end p-3" role="img" aria-label={alt}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">{label ?? "Photo coming soon"}</span>
        </div>
      )}
    </div>
  );
}

/** Muted looping video that only loads/plays when on screen. Falls back to a placeholder. */
export function SmartVideo({
  src, poster, className = "", eager = false, label,
}: { src: string; poster?: string; className?: string; eager?: boolean; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const attemptedRef = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduce) {
          if (!v.src) {
            attemptedRef.current = true;
            v.src = src;
          }
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className={`relative overflow-hidden media-ph ${className}`}>
      {!failed && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload={eager ? "auto" : "none"}
          aria-hidden="true"
          // A <video> with no src yet fires a spurious "error" event in some
          // browsers — only treat it as a real failure once we've actually
          // attempted to load a source.
          onError={() => attemptedRef.current && setFailed(true)}
        />
      )}
      {failed && label && (
        <div className="absolute inset-0 flex items-end p-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">{label} · video coming soon</span>
        </div>
      )}
    </div>
  );
}
