"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { about } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage } from "@/components/ui/Media";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);
  const ceoImgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Vision / Mission + intro fade-up stagger on enter.
      gsap.from("[data-about-fade]", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: "[data-about-fade]", start: "top 85%" },
      });

      const mm = gsap.matchMedia();

      // Desktop: zentry-style central media grows from a small rect to full,
      // pinned briefly while scrubbing the clip-path. + CEO image parallax.
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          mediaInnerRef.current,
          { clipPath: "inset(22% 30% 22% 30% round 18px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: mediaWrapRef.current,
              start: "top top",
              end: "+=90%",
              scrub: true,
              pin: true,
            },
          },
        );

        gsap.fromTo(
          ceoImgRef.current?.querySelector("img") ?? ceoImgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ceoImgRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Mobile: lighter clip reveal, no pin.
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          mediaInnerRef.current,
          { clipPath: "inset(12% 12% 12% 12% round 16px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 12px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: mediaWrapRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative bg-bg py-24 md:py-32"
    >
      {/* Overline + heading */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {about.overline}
        </p>
        <AnimatedTitle
          text={about.heading}
          className="max-w-4xl text-[clamp(2.2rem,6vw,5rem)] text-text"
        />
        <p
          data-about-fade
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {about.intro}
        </p>
      </div>

      {/* Central growing media (clip-path expand on scroll) */}
      <div ref={mediaWrapRef} className="mt-16 h-screen w-full md:mt-24">
        <div
          ref={mediaInnerRef}
          className="placeholder-gradient relative h-full w-full overflow-hidden"
        >
          <PlaceholderImage
            src={about.featureImage}
            alt="Sherwani Group headquarters"
            sizes="100vw"
            label="about-feature.jpg"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>

      {/* CEO + Vision / Mission */}
      <div className="mx-auto mt-20 grid max-w-7xl gap-12 px-5 md:mt-28 md:grid-cols-2 md:px-8">
        {/* CEO block */}
        <div data-about-fade className="flex flex-col">
          <div
            ref={ceoImgRef}
            className="placeholder-gradient relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border-2 border-gold/40"
          >
            <PlaceholderImage
              src={about.ceo.image}
              alt={about.ceo.name}
              sizes="(max-width: 768px) 100vw, 400px"
              label="ceo.jpg"
              className="h-full w-full"
            />
          </div>
          <h3 className="mt-6 font-display text-3xl tracking-wide text-text">
            {about.ceo.name}
          </h3>
          <p className="text-gold">{about.ceo.title}</p>
        </div>

        {/* Vision / Mission */}
        <div className="flex flex-col justify-center gap-10">
          <div data-about-fade>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Our Vision
            </h4>
            <p className="text-lg leading-relaxed text-text/85">
              {about.vision}
            </p>
          </div>
          <div data-about-fade>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Our Mission
            </h4>
            <p className="text-lg leading-relaxed text-text/85">
              {about.mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
