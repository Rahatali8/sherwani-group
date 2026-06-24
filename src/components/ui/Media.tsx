"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

/**
 * Placeholder media system — degrades gracefully while real assets are missing.
 *
 * PlaceholderVideo: native <video> (muted/loop/playsInline/autoPlay) layered over
 * a gold-tinted gradient poster, so the section looks good even when the .mp4
 * file does not exist yet.
 *
 * PlaceholderImage: next/image; on load error it falls back to a solid
 * gold-tinted gradient block with an optional label.
 */

type VideoProps = {
  src: string;
  className?: string;
  /** Optional label shown faintly while no real file exists (dev hint). */
  label?: string;
};

export function PlaceholderVideo({ src, className, label }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  // Only play while on-screen (perf); respect reduced motion.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || failed) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [failed]);

  return (
    <div className={clsx("relative overflow-hidden placeholder-gradient", className)}>
      {!failed ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm uppercase tracking-widest text-muted/70">
          {label ?? "Video unavailable"}
        </div>
      )}
      {label && (
        <span className="pointer-events-none absolute bottom-2 left-2 z-10 select-none text-[10px] uppercase tracking-widest text-muted/60">
          {label}
        </span>
      )}
    </div>
  );
}

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
};

export function PlaceholderImage({
  src,
  alt,
  className,
  sizes,
  priority,
  label,
}: ImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={clsx("relative overflow-hidden placeholder-gradient", className)}>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          // Placeholder assets may be missing; skip optimization so a 404 just
          // triggers onError (gradient fallback) instead of a server image error.
          unoptimized
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {(failed || label) && (
        <span className="pointer-events-none absolute bottom-2 left-2 z-10 select-none text-[10px] uppercase tracking-widest text-muted/60">
          {label ?? alt}
        </span>
      )}
    </div>
  );
}
