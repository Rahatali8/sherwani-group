"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
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

/** Split a word into per-letter spans for staggered mask reveals. */
function SplitWord({ text, className }: { text: string; className?: string }) {
  return (
    <span className="inline-flex">
      {[...text].map((ch, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-word className={clsx("block", className)}>
            {ch}
          </span>
        </span>
      ))}
    </span>
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

      // Gold flank rules draw outward.
      gsap.from("[data-hero-line]", {
        scaleX: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.9,
      });

      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.9,
      });

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
        {/* Top scrim so the navbar always reads cleanly over the footage */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
      </div>

      {/* Heading — one cohesive, centered SHERWANI / GROUP lockup */}
      <div
        ref={headingRef}
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-5 text-center font-display"
      >
        <p
          data-hero-fade
          className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-gold-soft md:mb-7 md:text-sm"
        >
          {hero.overline}
        </p>

        <h1 className="leading-[0.82] tracking-tight">
          {/* SHERWANI — per-letter mask reveal */}
          <SplitWord
            text={hero.titleLines[0]}
            className="text-[clamp(3rem,13vw,11rem)] text-text drop-shadow-[0_6px_40px_rgba(0,0,0,0.75)]"
          />

          {/* GROUP — gold shimmer wordmark flanked by gold rules */}
          <span className="mt-3 flex items-center justify-center gap-4 md:mt-5 md:gap-6">
            <span
              data-hero-line
              className="h-px w-8 origin-right bg-gradient-to-l from-gold to-transparent md:w-24"
            />
            <span className="block overflow-hidden">
              <span
                data-word
                className="gold-shimmer block text-[clamp(1.2rem,5vw,3.6rem)] tracking-[0.28em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:tracking-[0.45em]"
              >
                {hero.titleLines[1]}
              </span>
            </span>
            <span
              data-hero-line
              className="h-px w-8 origin-left bg-gradient-to-r from-gold to-transparent md:w-24"
            />
          </span>
        </h1>

        <p
          data-hero-fade
          className="mt-7 max-w-md font-body text-xs font-medium uppercase tracking-[0.32em] text-text/85 md:mt-9 md:text-sm"
        >
          {hero.subheading}
        </p>
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
