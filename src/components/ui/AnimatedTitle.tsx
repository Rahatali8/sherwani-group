"use client";

import { useRef, createElement } from "react";
import clsx from "clsx";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Word-by-word mask reveal on scroll-into-view.
 * Splits text on spaces, wraps each word in an overflow-hidden span,
 * and staggers them up from below as the title enters the viewport.
 */
export default function AnimatedTitle({
  text,
  as = "h2",
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      gsap.from(ref.current?.querySelectorAll("[data-word]") ?? [], {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    },
    { scope: ref },
  );

  return createElement(
    as,
    { ref, className: clsx("font-display leading-[0.95]", className) },
    words.map((w, i) => (
      <span key={i} className="mr-[0.22em] inline-block overflow-hidden">
        <span data-word className="inline-block">
          {w}
        </span>
      </span>
    )),
  );
}
