"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/**
 * Initializes Lenis smooth scrolling and keeps it in sync with GSAP ScrollTrigger.
 * - Drives Lenis from gsap.ticker (single rAF loop, no double rAF).
 * - lenis.on('scroll', ScrollTrigger.update) so triggers fire while smooth-scrolling.
 * - Respects prefers-reduced-motion (disables smoothing).
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: !prefersReduced,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);
    setLenis(lenis);

    const update = (time: number) => {
      // gsap.ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
