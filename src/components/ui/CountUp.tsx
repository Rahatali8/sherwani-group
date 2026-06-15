"use client";

import { useRef } from "react";
import clsx from "clsx";
import { gsap, useGSAP } from "@/lib/gsap";

/** Counts from 0 to `end` when it scrolls into view. */
export default function CountUp({
  end,
  suffix = "",
  className,
  duration = 1.8,
}: {
  end: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration,
        ease: "power2.out",
        snap: { v: 1 },
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = `${Math.round(obj.v)}${suffix}`;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={clsx(className)}>
      0{suffix}
    </span>
  );
}
