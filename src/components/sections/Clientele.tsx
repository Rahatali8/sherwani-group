"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { clients } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage } from "@/components/ui/Media";

function LogoTile({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="group relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-surface transition-all duration-500 hover:border-gold/50">
      <PlaceholderImage
        src={src}
        alt={caption}
        sizes="160px"
        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
      />
      {/* Faint description appears on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-1.5 pt-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-gold-soft opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {caption}
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  speed = 40,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Content is rendered twice; animate one full width then loop seamlessly.
      gsap.set(trackRef.current, { xPercent: reverse ? -50 : 0 });
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: reverse ? 0 : -50,
        ease: "none",
        duration: speed,
        repeat: -1,
      });
    },
    { scope: trackRef },
  );

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div ref={trackRef} className="flex w-max gap-5 pr-5 will-change-transform">
        {[...items, ...items].map((src, i) => (
          <LogoTile key={`${src}-${i}`} src={src} caption="Trusted Partner" />
        ))}
      </div>
    </div>
  );
}

export default function Clientele() {
  const rootRef = useRef<HTMLElement>(null);
  const all = clients.logos;
  const half = Math.ceil(all.length / 2);
  const row1 = all.slice(0, half);
  const row2 = all.slice(half);

  return (
    <section ref={rootRef} id="clientele" className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {clients.overline}
        </p>
        <AnimatedTitle
          text={clients.heading}
          className="text-[clamp(2.4rem,6vw,5rem)] text-text"
        />
      </div>

      {/* Edge fade + marquee rows */}
      <div className="relative mt-14 md:mt-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
        <div className="flex flex-col gap-5">
          <MarqueeRow items={row1} speed={48} />
          <MarqueeRow items={row2} reverse speed={56} />
        </div>
      </div>
    </section>
  );
}
