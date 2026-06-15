"use client";

import { useRef, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { hero } from "@/data/content";

const total = hero.videos.length;
const nextIndex = (i: number) => (i + 1) % total;

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
  const tileRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const [busy, setBusy] = useState(false);

  // On-load reveals + scroll parallax (scoped, mobile-aware via matchMedia).
  useGSAP(
    () => {
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

  // Center preview tile -> expand to full screen, then swap background.
  const handleExpand = () => {
    if (busy || !tileRef.current) return;
    setBusy(true);

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Simplified crossfade on mobile.
      gsap.to(tileRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          setCurrent((c) => nextIndex(c));
          gsap.set(tileRef.current, { clearProps: "all" });
          gsap.fromTo(
            tileRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.45, ease: "power2.out" },
          );
          setBusy(false);
          ScrollTrigger.refresh();
        },
      });
      return;
    }

    // Desktop: expand the tile to fill the viewport (clip + scale), then swap.
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent((c) => nextIndex(c));
        // Reset tile back to its small centered state (now shows new "next").
        gsap.set(tileRef.current, { clearProps: "all" });
        setBusy(false);
        ScrollTrigger.refresh();
      },
    });

    tl.to(tileRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      borderColor: "rgba(201,162,39,0)",
      duration: 1.05,
      ease: "expo.inOut",
    });
  };

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background video */}
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

      {/* Center preview tile (the zentry trick) */}
      <button
        ref={tileRef}
        onClick={handleExpand}
        aria-label="Play next showcase video"
        className="placeholder-gradient group absolute left-1/2 top-1/2 z-20 h-[30vh] w-[62vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-gold/60 shadow-2xl shadow-black/50 sm:w-[42vw] md:h-[34vh] md:w-[30vw]"
        style={{ willChange: "width,height" }}
      >
        <video
          key={hero.videos[nextIndex(current)]}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={hero.videos[nextIndex(current)]}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-black/40 text-gold backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <FiPlay className="ml-0.5 text-2xl" />
          </span>
        </span>
      </button>

      {/* Heading */}
      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-5 text-center">
        <h1
          ref={headingRef}
          className="font-display leading-[0.85] tracking-tight"
        >
          <span className="block overflow-hidden">
            <span
              data-word
              className="block text-[clamp(3rem,13vw,11rem)] text-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
            >
              {hero.titleLines[0]}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-word
              className="ml-[0.15em] block -skew-x-6 text-[clamp(3rem,13vw,11rem)] text-gold drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
            >
              {hero.titleLines[1]}
            </span>
          </span>
        </h1>
        <p
          data-hero-fade
          className="mt-6 max-w-xl text-balance text-sm font-medium uppercase tracking-[0.3em] text-text/80 sm:text-base"
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
