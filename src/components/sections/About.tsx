"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { about } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage, PlaceholderVideo } from "@/components/ui/Media";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const surroundRef = useRef<SVGRectElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ceoImgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Vision / Mission + intro fade-up stagger on enter (always, light).
      if (!prefersReducedMotion()) {
        gsap.from("[data-about-fade]", {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: "[data-about-fade]", start: "top 85%" },
        });
      }

      // Reduced motion: skip the cinematic scrub — just show the full video,
      // drop the masking surround, and reveal the tagline statically.
      if (prefersReducedMotion()) {
        gsap.set(surroundRef.current, { autoAlpha: 0 });
        gsap.set([frameRef.current, taglineRef.current], { autoAlpha: 1 });
        return;
      }

      const taglineWords =
        taglineRef.current?.querySelectorAll("[data-tw]") ?? [];

      const buildReveal = (config: {
        end: string;
        pin: boolean;
        groupScale: number;
        videoScale: number;
      }) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: config.end,
            scrub: 1,
            pin: config.pin,
            anticipatePin: 1,
          },
        });

        // Footage-filled wordmark drifts/zooms while the dark surround dissolves
        // to reveal the full cinematic video underneath.
        tl.fromTo(
          maskGroupRef.current,
          { scale: 1 },
          { scale: config.groupScale, svgOrigin: "500 300" },
          0,
        )
          .fromTo(
            videoLayerRef.current,
            { scale: 1.18 },
            { scale: config.videoScale },
            0,
          )
          .to(surroundRef.current, { opacity: 0, ease: "power2.in" }, 0.42)
          .to(frameRef.current, { autoAlpha: 1, duration: 0.25 }, 0.6)
          .to(taglineRef.current, { autoAlpha: 1, duration: 0.2 }, 0.6)
          .fromTo(
            taglineWords,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.4 },
            0.62,
          );

        return tl;
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () =>
        buildReveal({
          end: "+=170%",
          pin: true,
          groupScale: 1.7,
          videoScale: 1.04,
        }),
      );
      mm.add("(max-width: 767px)", () =>
        buildReveal({
          end: "bottom top",
          pin: false,
          groupScale: 1.35,
          videoScale: 1.06,
        }),
      );

      // CEO parallax (desktop only).
      mm.add("(min-width: 768px)", () => {
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

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="about" className="relative bg-bg py-24 md:py-32">
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

      {/* Cinematic text-mask reveal: footage shows through the wordmark, then
          the dark surround dissolves to full video + tagline. */}
      <div
        ref={pinRef}
        className="relative mt-16 h-screen w-full overflow-hidden bg-bg md:mt-24"
      >
        {/* Full-bleed video underlay (always playing) */}
        <div
          ref={videoLayerRef}
          className="absolute inset-0 will-change-transform"
        >
          <PlaceholderVideo
            src={about.featureVideo}
            label="about-feature.mp4"
            className="h-full w-full"
          />
        </div>

        {/* Cinematic depth: vignette so the wordmark footage reads clearly */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_45%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

        {/* SVG mask overlay — dark surround with the wordmark knocked out so the
            video shows through the letters. Scaling + fading drives the reveal. */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id="about-reveal-mask">
              <rect x="0" y="0" width="1000" height="600" fill="white" />
              <g ref={maskGroupRef}>
                <text
                  x="500"
                  y="225"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  textLength="900"
                  lengthAdjust="spacingAndGlyphs"
                  style={{
                    fontFamily: "var(--font-anton), sans-serif",
                    fontSize: "150px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {about.revealLines[0]}
                </text>
                <text
                  x="500"
                  y="400"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  textLength="560"
                  lengthAdjust="spacingAndGlyphs"
                  style={{
                    fontFamily: "var(--font-anton), sans-serif",
                    fontSize: "150px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {about.revealLines[1]}
                </text>
              </g>
            </mask>
          </defs>
          <rect
            ref={surroundRef}
            x="0"
            y="0"
            width="1000"
            height="600"
            fill="#0a0a0a"
            mask="url(#about-reveal-mask)"
          />
        </svg>

        {/* Gold cinematic frame (revealed at the end) */}
        <div
          ref={frameRef}
          className="pointer-events-none absolute inset-5 z-10 rounded-lg border border-gold/35 opacity-0 md:inset-8"
        >
          <span className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-gold" />
          <span className="absolute -right-px -top-px h-6 w-6 border-r-2 border-t-2 border-gold" />
          <span className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-gold" />
          <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-gold" />
        </div>

        {/* Tagline (revealed at the end) */}
        <div
          ref={taglineRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-gold-soft">
            {about.revealEst}
          </p>
          <h3 className="font-display leading-[0.95] tracking-tight text-text">
            {about.revealTagline.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span
                  data-tw
                  className="block text-[clamp(2.4rem,8vw,7rem)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
                >
                  {line}
                </span>
              </span>
            ))}
          </h3>
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
