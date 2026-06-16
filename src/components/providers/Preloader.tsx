"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * First-load preloader: gold 0->100 counter over the brand, then a staggered
 * panel-slide wipe reveals the page. Scroll is locked until the wipe finishes.
 * Respects prefers-reduced-motion (near-instant dismiss).
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Lock scroll during the preload.
      const html = document.documentElement;
      const body = document.body;
      const prevHtml = html.style.overflow;
      const prevBody = body.style.overflow;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      window.scrollTo(0, 0);

      const unlock = () => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
        setDone(true);
      };

      if (reduce) {
        gsap.set(rootRef.current, { autoAlpha: 0, delay: 0.2, onComplete: unlock });
        return;
      }

      const obj = { v: 0 };
      const tl = gsap.timeline({ onComplete: unlock });

      tl.to(obj, {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        snap: { v: 1 },
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = String(Math.round(obj.v));
        },
      })
        .to("[data-pre-content]", {
          autoAlpha: 0,
          y: -30,
          duration: 0.4,
          ease: "power2.in",
        })
        .to(
          "[data-pre-panel]",
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            stagger: 0.08,
          },
          "-=0.1",
        );
    },
    { scope: rootRef },
  );

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]">
      {/* Sliding panels */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} data-pre-panel className="h-full flex-1 bg-bg" />
        ))}
      </div>

      {/* Cinematic loader footage behind the brand */}
      <div data-pre-content className="absolute inset-0">
        <Image
          src="/images/textures/loader.gif"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
      </div>

      {/* Centered brand + counter */}
      <div
        data-pre-content
        className="absolute inset-0 grid place-items-center"
      >
        <div className="text-center">
          <Image
            src="/images/textures/favicon.png"
            alt="Sherwani Group"
            width={72}
            height={72}
            priority
            className="mx-auto mb-6 h-14 w-14 object-contain md:h-16 md:w-16"
          />
          <p className="font-display text-3xl tracking-[0.2em] text-text md:text-5xl">
            SHERWANI <span className="text-gold">GROUP</span>
          </p>
          <div className="mt-6 flex items-end justify-center gap-1 font-display text-gold">
            <span ref={counterRef} className="text-6xl leading-none md:text-8xl">
              0
            </span>
            <span className="text-2xl md:text-4xl">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
