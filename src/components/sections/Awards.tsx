"use client";

import { useRef } from "react";
import { FaTrophy } from "react-icons/fa";
import { gsap, useGSAP } from "@/lib/gsap";
import { awards } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import CountUp from "@/components/ui/CountUp";

export default function Awards() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-award]", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-award-grid]", start: "top 80%" },
      });
      gsap.from("[data-stat]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: "[data-stats]", start: "top 85%" },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="awards" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {awards.overline}
        </p>
        <AnimatedTitle
          text={awards.heading}
          className="text-[clamp(2.4rem,6vw,5rem)] text-text"
        />

        {/* Big stat row */}
        <div
          data-stats
          className="mt-12 grid grid-cols-1 gap-8 border-y border-white/10 py-10 sm:grid-cols-3 md:mt-16"
        >
          {awards.stats.map((s) => (
            <div key={s.label} data-stat className="text-center">
              <CountUp
                end={s.value}
                suffix={s.suffix}
                className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-gold"
              />
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Award cards */}
        <div
          data-award-grid
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {awards.list.map((a, i) => (
            <article
              key={i}
              data-award
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-gold/40"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/10 text-xl text-gold transition-transform duration-300 group-hover:scale-110">
                <FaTrophy />
              </span>
              <div>
                <h3 className="font-display text-xl tracking-wide text-text">
                  {a.title}
                </h3>
                <p className="text-sm text-muted">{a.org}</p>
                <p className="mt-2 font-display text-2xl text-gold">
                  <CountUp end={a.value} />
                  <span className="ml-1 text-base">× Won</span>
                </p>
                {a.note && (
                  <p className="mt-1 text-xs uppercase tracking-widest text-gold-soft">
                    {a.note}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
