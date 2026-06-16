"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Ambient gold spotlight that trails the cursor across the whole site. A fixed,
 * pointer-events-none layer using `mix-blend-mode: screen` — so it glows warmly
 * over dark/black sections and naturally fades to nothing over bright video and
 * imagery. Smoothed with gsap.quickTo. Disabled for touch / reduced-motion.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;

    const el = glowRef.current;
    if (!el) return;

    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(el, { opacity: 1, duration: 0.7, ease: "power2.out" });
      }
    };

    // Gentle "breathing" pulse so the glow feels alive while idle.
    const pulse = gsap.to(el, {
      scale: 1.12,
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      pulse.kill();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-screen"
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[40rem] w-[40rem] rounded-full opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.20) 0%, rgba(232,212,154,0.12) 28%, rgba(201,162,39,0.05) 50%, transparent 72%)",
        }}
      />
    </div>
  );
}
