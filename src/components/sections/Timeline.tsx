"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { timeline } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Reduced motion: skip pin/scrub; let the desktop track scroll natively
      // so every card stays reachable.
      if (prefersReducedMotion()) {
        if (sectionRef.current) sectionRef.current.style.overflowX = "auto";
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop: pin + translate the horizontal track as the user scrolls.
      mm.add("(min-width: 768px)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const horizontal = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current)
                gsap.set(progressRef.current, { scaleX: self.progress });
            },
          },
        });

        // Emphasise each card as it reaches centre (drives off the h-scroll tween).
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.4, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: "left 75%",
                end: "center 55%",
                scrub: true,
              },
            },
          );
        });
      });

      // Mobile: vertical reveal-on-scroll (no pin).
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
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
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden bg-surface py-24 md:h-screen md:py-0"
    >
      <div
        ref={trackRef}
        className="relative flex flex-col gap-12 px-5 md:h-full md:flex-row md:items-center md:gap-0 md:px-0"
      >
        {/* Intro panel */}
        <div
          data-card
          className="relative w-full shrink-0 md:flex md:h-full md:w-[55vw] md:flex-col md:justify-center md:pl-16 lg:w-[40vw]"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            {timeline.overline}
          </p>
          <AnimatedTitle
            text={timeline.heading}
            className="text-[clamp(2.4rem,7vw,5.5rem)] text-text"
          />
          <p className="mt-6 max-w-sm text-muted">
            From a single dealership in 1984 to a diversified group —
            <span className="hidden md:inline"> scroll to explore the milestones.</span>
            <span className="md:hidden"> here are the milestones.</span>
          </p>
        </div>

        {/* Milestone cards */}
        {timeline.milestones.map((m) => (
          <article
            key={m.year}
            data-card
            className="relative shrink-0 md:flex md:h-full md:w-[40vw] md:flex-col md:justify-center md:px-12 lg:w-[30vw]"
          >
            {/* Mobile vertical connector */}
            <span className="absolute left-0 top-2 h-full w-px bg-white/10 md:hidden" />
            <span className="absolute -left-[5px] top-2 h-3 w-3 rounded-full bg-gold md:hidden" />

            <div className="pl-6 md:pl-0">
              <span className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-none text-gold">
                {m.year}
              </span>
              <h3 className="mt-4 font-display text-2xl tracking-wide text-text md:text-3xl">
                {m.title}
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">
                {m.desc}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop progress line */}
      <div className="absolute inset-x-8 bottom-10 hidden h-px bg-white/10 md:block">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-soft"
        />
      </div>
    </section>
  );
}
