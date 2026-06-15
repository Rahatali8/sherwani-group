"use client";

import { useState } from "react";
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
  return (
    <div className={clsx("relative overflow-hidden placeholder-gradient", className)}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
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
