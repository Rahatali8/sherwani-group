"use client";

import { useRef, type MouseEvent } from "react";
import clsx from "clsx";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { diversification } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderVideo } from "@/components/ui/Media";

 export default function Diversification() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-div-card]");
      const mm = gsap.matchMedia();

      // Desktop: deck effect — each covered card scales down + dims as the
      // next card scrolls up over it.
      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      });

      // Mobile: clean vertical reveal-on-scroll, no pinning/stacking.
      mm.add("(max-width: 767px)", () => {
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // Subtle 3D tilt following the cursor (desktop only).
  const handleTilt = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 8,
      rotateX: -py * 8,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };
  const resetTilt = (e: MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={rootRef}
      id="diversification"
      className="relative bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {diversification.overline}
        </p>
        <AnimatedTitle
          text={diversification.heading}
          className="max-w-4xl text-[clamp(2rem,5vw,4.2rem)] text-text"
        />
      </div>

      {/* Stacked deck */}
      <div className="mx-auto mt-16 max-w-6xl px-5 md:mt-24 md:px-8">
        {diversification.companies.map((c, i) => (
          <div
            key={c.slug}
            data-div-card
            className="relative mb-8 md:sticky md:mb-0 md:py-6"
            style={{ top: `${5 + i * 1.5}rem` }}
          >
            <div
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className={clsx(
                "grid overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/40 [transform-style:preserve-3d] md:grid-cols-2",
                i % 2 === 1 && "md:[direction:rtl]",
              )}
            >
              {/* Media */}
              <PlaceholderVideo
                src={`/videos/diversification/${c.slug}.mp4`}
                label={`${c.slug}.mp4`}
                className="aspect-video w-full [direction:ltr] md:aspect-auto md:h-full md:min-h-[22rem]"
              />

              {/* Text */}
              <div className="flex flex-col justify-center gap-4 p-8 [direction:ltr] md:p-12">
                <span className="w-fit rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-widest text-gold">
                  {c.tag}
                </span>
                <h3 className="font-display text-3xl tracking-wide text-text md:text-4xl">
                  {c.title}
                </h3>
                <p className="leading-relaxed text-muted">{c.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
