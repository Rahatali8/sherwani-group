"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Premium custom cursor: a precise gold dot plus a ring that smoothly trails
 * behind it (gsap.quickTo lerp). The ring expands over interactive elements.
 * Replaces the native cursor on fine-pointer devices; disabled for touch and
 * prefers-reduced-motion (native cursor stays).
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.documentElement.classList.add("custom-cursor-active");
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    // Ring trails with a longer ease (smooth flow); dot tracks tightly.
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.4, ease: "power2.out" });
      }
    };

    const interactiveSel = "a, button, [data-cursor-grow], input, textarea, select";
    const onOver = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSel)) {
        gsap.to(ring, { scale: 1.9, borderColor: "rgba(201,162,39,0.9)", duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power3.out" });
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSel)) {
        gsap.to(ring, { scale: 1, borderColor: "rgba(201,162,39,0.6)", duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    const onLeave = () => gsap.to([ring, dot], { opacity: 0, duration: 0.25 });
    const onEnter = () => gsap.to([ring, dot], { opacity: 1, duration: 0.25 });

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border border-gold/60 opacity-0 shadow-[0_0_14px_rgba(201,162,39,0.35)] will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-gold opacity-0 will-change-transform"
      />
    </>
  );
}
