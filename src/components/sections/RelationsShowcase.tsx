"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { FiArrowUpRight } from "react-icons/fi";
import { ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { relations } from "@/data/content";
import { PlaceholderImage } from "@/components/ui/Media";
import { scrollToY } from "@/lib/lenis";

const items = relations.items;
const count = items.length;

export default function RelationsShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Drive the active index from scroll progress across the tall section. The
  // sticky inner viewport stays put while the right visual + left list update.
  useGSAP(
    () => {
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
      return () => trigger.kill();
    },
    { scope: rootRef },
  );

  // Jump to a company when its name is clicked.
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

  return (
    <section
      ref={rootRef}
      className="relative bg-bg"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* faint index watermark */}
        <span className="pointer-events-none absolute right-6 top-24 font-display text-[12vw] leading-none text-white/[0.03] md:right-16">
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 md:grid-cols-2 md:px-10">
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
                            ? "text-[clamp(1.6rem,3.4vw,2.9rem)] text-text"
                            : "text-[clamp(1.2rem,2.4vw,2rem)] text-muted/45 group-hover:text-muted/80",
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

          {/* RIGHT — visual that follows the selection */}
          <div className="relative order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10">
              {items.map((it, i) => (
                <div
                  key={it.name}
                  className={clsx(
                    "absolute inset-0 transition-all duration-700 ease-out",
                    i === active
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0",
                  )}
                >
                  <PlaceholderImage
                    src={it.image}
                    alt={it.name}
                    sizes="(max-width: 768px) 100vw, 28rem"
                    className="h-full w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
              ))}

              {/* Caption overlay (active company) */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="mb-2 font-ui text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                  {items[active].sector}
                </p>
                <h3 className="font-display text-2xl leading-tight tracking-wide text-text md:text-3xl">
                  {items[active].name}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-text/80">
                  {items[active].desc}
                </p>
                {items[active].href !== "#" && (
                  <a
                    href={items[active].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 font-ui text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-bg"
                  >
                    Visit Site <FiArrowUpRight />
                  </a>
                )}
              </div>
            </div>

            {/* progress dots */}
            <div className="mt-6 flex justify-center gap-2">
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
        </div>
      </div>
    </section>
  );
}
