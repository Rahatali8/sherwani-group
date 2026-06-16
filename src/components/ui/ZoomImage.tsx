"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiMaximize2, FiX } from "react-icons/fi";

/**
 * Document-style image (payment plan, floor plan) with a click-to-zoom
 * fullscreen lightbox. Locks scroll while open; closes on click or Escape.
 */
export default function ZoomImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50"
        aria-label={`View ${alt} fullscreen`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-contain"
        />
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-gold/60 bg-black/55 px-4 py-2 font-ui text-[11px] uppercase tracking-widest text-gold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <FiMaximize2 /> Click to view fullscreen
        </span>
        {caption && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 font-ui text-[11px] uppercase tracking-widest text-text/90 backdrop-blur-sm">
            {caption}
          </span>
        )}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-xl text-text transition-colors hover:border-gold hover:text-gold"
          >
            <FiX />
          </button>
          <Image
            src={src}
            alt={alt}
            width={1400}
            height={1980}
            unoptimized
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-auto max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
