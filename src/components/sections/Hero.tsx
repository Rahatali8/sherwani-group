"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/data/content";

/** Background video layer; gold-tinted gradient shows through if file missing. */
function BgVideo({ src }: { src: string }) {
  return (
    <video
      key={src}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);

  // Start deterministic for SSR, then pick a random clip on the client (avoids
  // hydration mismatch). One of the 4 hero videos auto-plays on load.
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    // Intentional client-only randomization (deterministic 0 on the server keeps
    // hydration stable, then we pick a random clip after mount).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(Math.floor(Math.random() * hero.videos.length));
  }, []);

  // On-load reveals + scroll parallax (scoped, mobile-aware via matchMedia).
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Heading words: mask reveal from below, staggered.
      gsap.from(headingRef.current?.querySelectorAll("[data-word]") ?? [], {
        yPercent: 120,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.9,
      });

      // Animated gold frame corners on load.
      gsap.fromTo(
        "[data-hero-frame]",
        { clipPath: "inset(50% 50% 50% 50%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          delay: 0.5,
        },
      );

      // Scroll: zoom bg + parallax heading. Desktop only (heavy effect).
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        tl.to(bgWrapRef.current, { scale: 1.18, ease: "none" }, 0).to(
          headingRef.current,
          { yPercent: -40, opacity: 0.2, ease: "none" },
          0,
        );
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background video (random clip, auto-plays) */}
      <div
        ref={bgWrapRef}
        className="placeholder-gradient absolute inset-0 will-change-transform"
      >
        <BgVideo src={hero.videos[current]} />
        {/* Dark + gold tint overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Animated gold frame accent */}
      <div
        data-hero-frame
        className="pointer-events-none absolute inset-5 z-10 rounded-2xl border border-gold/25 md:inset-8"
      />

      {/* Heading — zentry-style split to opposite corners */}
      <div
        ref={headingRef}
        className="pointer-events-none absolute inset-0 z-30 font-display leading-[0.85] tracking-tight"
      >
        {/* SHERWANI — top-left */}
        <div className="absolute left-5 top-24 md:left-12 md:top-28">
          <span className="block overflow-hidden">
            <span
              data-word
              className="block text-[clamp(2.6rem,11vw,9.5rem)] text-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
            >
              {hero.titleLines[0]}
            </span>
          </span>
          <p
            data-hero-fade
            className="mt-3 max-w-xs font-body text-xs font-medium uppercase tracking-[0.3em] text-text/80 sm:text-sm"
          >
            {hero.subheading}
          </p>
        </div>

        {/* GROUP — bottom-right */}
        <div className="absolute bottom-24 right-5 text-right md:bottom-28 md:right-12">
          <span className="block overflow-hidden">
            <span
              data-word
              className="block -skew-x-6 text-[clamp(2.6rem,11vw,9.5rem)] text-gold drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
            >
              {hero.titleLines[1]}
            </span>
          </span>
        </div>
      </div>

      {/* Bottom-left tagline */}
      <p
        data-hero-fade
        className="absolute bottom-8 left-5 z-30 max-w-[60vw] text-xs uppercase tracking-widest text-text/70 md:left-10 md:text-sm"
      >
        {hero.bottomTagline}
      </p>

      {/* Scroll-down indicator */}
      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text/60">
          Scroll
        </span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-text/40">
          <span className="mt-1.5 h-2 w-1 animate-bounce rounded-full bg-gold" />
        </span>
      </div>
    </section>
  );
}
