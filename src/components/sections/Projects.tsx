"use client";

import { useRef } from "react";
import clsx from "clsx";
import { FiMapPin } from "react-icons/fi";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage } from "@/components/ui/Media";

// Bento layout — varied tile spans (fills a 4-col x 2-row grid on desktop).
const span = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
];

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-project]");

      // Titles / cards reveal with stagger as they enter.
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      // Image parallax inside each card (image drifts slower than the card).
      cards.forEach((card) => {
        const img = card.querySelector("[data-parallax]");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="projects" className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {projects.overline}
        </p>
        <AnimatedTitle
          text={projects.heading}
          className="text-[clamp(2.4rem,6vw,5rem)] text-text"
        />

        {/* Bento grid */}
        <div className="mt-14 grid auto-rows-[16rem] grid-cols-1 gap-4 md:mt-20 md:grid-cols-4">
          {projects.items.map((p, i) => (
            <article
              key={p.slug}
              id={`project-${p.slug}`}
              data-project
              className={clsx(
                "group relative scroll-mt-28 overflow-hidden rounded-3xl border border-white/10",
                span[i],
              )}
            >
              {/* Parallax image (taller than card so it can drift) */}
              <div
                data-parallax
                className="absolute inset-x-0 -top-[10%] h-[120%] w-full"
              >
                <PlaceholderImage
                  src={p.image}
                  alt={p.name}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Bottom gradient + always-visible name/location */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Gold overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/15" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <h3 className="font-display text-2xl tracking-wide text-text md:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-gold-soft">
                  <FiMapPin /> {p.location}
                </p>
                {/* Description reveals on hover */}
                <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-text/85 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  {p.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
