"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { clients } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage } from "@/components/ui/Media";

function LogoTile({ n }: { n: number }) {
  return (
    <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-surface grayscale transition-all duration-500 hover:grayscale-0 hover:border-gold/40">
      <PlaceholderImage
        src={`/images/clients/${n}.png`}
        alt={`Client ${n}`}
        sizes="160px"
        label={`logo-${n}`}
        className="h-full w-full"
      />
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  speed = 40,
}: {
  items: number[];
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
        {[...items, ...items].map((n, i) => (
          <LogoTile key={`${n}-${i}`} n={n} />
        ))}
      </div>
    </div>
  );
}

export default function Clientele() {
  const rootRef = useRef<HTMLElement>(null);
  const all = Array.from({ length: clients.count }, (_, i) => i + 1);
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
