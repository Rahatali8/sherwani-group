"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { PlaceholderImage } from "@/components/ui/Media";

type Item = { title: string; tagline: string; image: string };

/**
 * Continuously auto-scrolling horizontal carousel (marquee). The list is
 * rendered twice and translated -50% on an infinite loop for a seamless wrap.
 * Pauses on hover; falls back to a manual scroll under reduced motion.
 */
export default function InteriorCarousel({ items }: { items: Item[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = trackRef.current;
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: items.length * 6,
        repeat: -1,
      });

      const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
      const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
      track.addEventListener("mouseenter", slow);
      track.addEventListener("mouseleave", resume);

      return () => {
        track.removeEventListener("mouseenter", slow);
        track.removeEventListener("mouseleave", resume);
        tween.kill();
      };
    },
    { scope: trackRef },
  );

  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max gap-5 px-5 md:px-10">
        {loop.map((it, i) => (
          <article
            key={i}
            className="group relative aspect-[3/4] w-[78vw] flex-none overflow-hidden rounded-3xl border border-white/10 sm:w-[360px] lg:w-[420px]"
          >
            <PlaceholderImage
              src={it.image}
              alt={it.title}
              sizes="(max-width: 640px) 78vw, 420px"
              className="h-full w-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-ui text-[11px] uppercase tracking-[0.3em] text-gold">
                {it.title}
              </p>
              <p className="mt-2 font-display text-xl uppercase leading-tight tracking-wide text-text">
                {it.tagline}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
