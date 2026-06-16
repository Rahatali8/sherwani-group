"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { relations } from "@/data/content";
import { PlaceholderImage } from "@/components/ui/Media";
import { scrollToY } from "@/lib/lenis";

const items = relations.items;
const count = items.length;

// 3D transform for each card based on its distance from the active card.
function cardTransform(delta: number) {
  if (delta < 0) {
    // already passed — slide out to the left and fade
    return {
      transform: "translateX(-65%) translateZ(-220px) rotateY(22deg) scale(0.78)",
      opacity: 0,
      zIndex: 0,
    };
  }
  const x = delta * 27; // % to the right
  const z = delta * -150; // px deeper
  const scale = Math.max(0.6, 1 - delta * 0.12);
  const opacity = delta === 0 ? 1 : Math.max(0, 0.5 - (delta - 1) * 0.22);
  return {
    transform: `translateX(${x}%) translateZ(${z}px) rotateY(-13deg) scale(${scale})`,
    opacity,
    zIndex: 100 - delta,
  };
}

export default function RelationsShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      // Active index follows scroll progress across the tall section.
      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const idx = Math.min(
            count - 1,
            Math.round(self.progress * (count - 1)),
          );
          setActive((prev) => (prev !== idx ? idx : prev));
        },
      });

      // Subtle mouse-driven 3D tilt of the whole deck for depth (desktop only).
      let cleanupTilt: (() => void) | undefined;
      if (!prefersReducedMotion() && deckRef.current) {
        const rotX = gsap.quickTo(deckRef.current, "rotationX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const rotY = gsap.quickTo(deckRef.current, "rotationY", {
          duration: 0.6,
          ease: "power3.out",
        });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rotX(-ny * 8);
          rotY(nx * 10);
        };
        window.addEventListener("pointermove", onMove);
        cleanupTilt = () => window.removeEventListener("pointermove", onMove);
      }

      return () => {
        trigger.kill();
        cleanupTilt?.();
      };
    },
    { scope: rootRef },
  );

  const onPick = (i: number) => {
    const el = rootRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const y = el.offsetTop + (count > 1 ? (i / (count - 1)) * total : 0);
    if (prefersReducedMotion()) {
      window.scrollTo({ top: y });
      setActive(i);
    } else {
      scrollToY(y);
    }
  };

  const activeItem = items[active];

  return (
    <section
      ref={rootRef}
      className="relative bg-bg"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* faint index watermark */}
        <span className="pointer-events-none absolute right-6 top-20 font-display text-[14vw] leading-none text-white/[0.03] md:right-20">
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 md:grid-cols-2 md:gap-4 md:px-10">
          {/* LEFT — company list */}
          <div className="order-2 md:order-1">
            <p className="mb-6 flex items-center gap-3 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
              <span className="h-px w-8 bg-gold/60" />
              {relations.hint}
            </p>

            <ul className="flex flex-col gap-1">
              {items.map((it, i) => {
                const isActive = i === active;
                return (
                  <li key={it.name} className="h-12 overflow-hidden md:h-16">
                    <button
                      onClick={() => onPick(i)}
                      className="group flex h-full w-full origin-left items-center text-left"
                    >
                      <span
                        className={clsx(
                          "block font-display uppercase leading-none tracking-tight transition-all duration-500",
                          isActive
                            ? "gold-shimmer text-[clamp(1.7rem,3.6vw,3rem)]"
                            : "text-[clamp(1.2rem,2.4vw,2rem)] text-muted/40 group-hover:text-muted/80",
                        )}
                      >
                        {it.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT — 3D card deck that follows the selection */}
          <div className="relative order-1 md:order-2">
            <div
              className="relative h-[58vh] max-h-[34rem] w-full"
              style={{ perspective: "1500px" }}
            >
              <div
                ref={deckRef}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {items.map((it, i) => {
                  const t = cardTransform(i - active);
                  return (
                    <div
                      key={it.name}
                      className="absolute left-0 top-0 aspect-[3/4] h-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] transition-all duration-[800ms] ease-out"
                      style={{
                        transform: t.transform,
                        opacity: t.opacity,
                        zIndex: t.zIndex,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <PlaceholderImage
                        src={it.image}
                        alt={it.name}
                        sizes="(max-width: 768px) 90vw, 26rem"
                        className="h-full w-full"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                      {/* glossy gold edge sheen */}
                      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/10" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Caption (active company) */}
            <div className="mt-8 md:absolute md:bottom-2 md:right-0 md:mt-0 md:max-w-xs md:text-right">
              <p className="mb-2 font-ui text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                {activeItem.sector}
              </p>
              <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-text md:text-3xl">
                {activeItem.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text/75">
                {activeItem.desc}
              </p>
              {activeItem.href !== "#" && (
                <a
                  href={activeItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 font-ui text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-bg"
                >
                  Visit Site <FiArrowUpRight />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* progress dots */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {items.map((it, i) => (
            <button
              key={it.name}
              aria-label={it.name}
              onClick={() => onPick(i)}
              className={clsx(
                "h-1.5 rounded-full transition-all duration-500",
                i === active ? "w-8 bg-gold" : "w-1.5 bg-white/25",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
