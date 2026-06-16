"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { FiMenu, FiX, FiChevronDown, FiPhone } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { navLinks, affiliatedCompanies, projects, site } from "@/data/content";
import { scrollToHash, scrollToTop } from "@/lib/lenis";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Show / hide on scroll direction + add blurred bg once scrolled past hero top.
  useGSAP(
    () => {
      const el = navRef.current;
      if (!el) return;

      const showTo = gsap.quickTo(el, "yPercent", {
        duration: 0.4,
        ease: "power3.out",
      });
      // Use opacity (not autoAlpha) — quickTo can't reset the composite autoAlpha.
      const fadeTo = gsap.quickTo(el, "opacity", {
        duration: 0.4,
        ease: "power3.out",
      });

      let lastY = window.scrollY;

      const onScroll = () => {
        const y = window.scrollY;
        const goingDown = y > lastY;

        setScrolled(y > 40);

        if (menuOpen) {
          // never hide while the mobile menu is open
          showTo(0);
          fadeTo(1);
        } else if (goingDown && y > 120) {
          showTo(-110);
          fadeTo(0);
        } else {
          showTo(0);
          fadeTo(1);
        }
        lastY = y;
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: navRef, dependencies: [menuOpen] },
  );

  // Staggered reveal for the full-screen mobile overlay.
  useGSAP(
    () => {
      if (!menuOpen || !overlayRef.current) return;
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.out" },
      ).fromTo(
        overlayRef.current.querySelectorAll("[data-mobile-link]"),
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.25",
      );
    },
    { scope: overlayRef, dependencies: [menuOpen] },
  );

  return (
    <>
      <nav
        ref={navRef}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/5"
            : "bg-transparent",
        )}
      >
        <div className="flex w-full items-center justify-between px-5 py-4 md:px-10 md:py-5">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex items-center"
            aria-label="Sherwani Group — Home"
          >
            <Image
              src="/images/textures/logo.png"
              alt="Sherwani Group"
              width={488}
              height={120}
              priority
              className="h-9 w-auto object-contain md:h-11"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 font-ui text-[13px] font-medium uppercase tracking-[0.16em] lg:flex">
            {navLinks.map((l) =>
              l.label === "Projects" ? (
                // Projects dropdown — jump to a specific development
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  <button
                    onClick={() => scrollToHash(l.href)}
                    className="flex items-center gap-1 text-text/85 transition-colors hover:text-gold"
                    aria-haspopup="true"
                    aria-expanded={projectsOpen}
                  >
                    {l.label}
                    <FiChevronDown
                      className={clsx(
                        "transition-transform duration-300",
                        projectsOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={clsx(
                      "absolute left-1/2 top-full w-64 origin-top -translate-x-1/2 pt-3 transition-all duration-300",
                      projectsOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0",
                    )}
                  >
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-surface/95 p-2 backdrop-blur-md">
                      {projects.items.map((p) => (
                        <a
                          key={p.slug}
                          href={`#project-${p.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToHash(`#project-${p.slug}`);
                          }}
                          className="block rounded-lg px-3 py-2 normal-case tracking-normal text-text/80 transition-colors hover:bg-white/5 hover:text-gold"
                        >
                          {p.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(l.href);
                  }}
                  className="group relative text-text/85 transition-colors hover:text-gold"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ),
            )}

            {/* Affiliated Companies dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-text/85 transition-colors hover:text-gold"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                Affiliated Companies
                <FiChevronDown
                  className={clsx(
                    "transition-transform duration-300",
                    dropdownOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={clsx(
                  "absolute right-0 top-full w-60 origin-top pt-3 transition-all duration-300",
                  dropdownOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0",
                )}
              >
                <div className="overflow-hidden rounded-xl border border-white/10 bg-surface/95 p-2 backdrop-blur-md">
                  {affiliatedCompanies.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg px-3 py-2 normal-case tracking-normal text-text/80 transition-colors hover:bg-white/5 hover:text-gold"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Mobile hamburger */}
          <button
            className="text-2xl text-text lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[60] flex flex-col bg-bg/98 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Image
              src="/images/textures/logo.png"
              alt="Sherwani Group"
              width={488}
              height={120}
              className="h-9 w-auto object-contain"
            />
            <button
              className="text-3xl text-text"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-1 px-6">
            {navLinks.map((l) => (
              <div key={l.href} className="overflow-hidden">
                <a
                  data-mobile-link
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    scrollToHash(l.href);
                  }}
                  className="block py-2 font-display text-4xl tracking-wide text-text transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
                {l.label === "Projects" && (
                  <div className="mb-1 flex flex-wrap gap-x-4 gap-y-1 pl-1">
                    {projects.items.map((p) => (
                      <a
                        key={p.slug}
                        data-mobile-link
                        href={`#project-${p.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuOpen(false);
                          scrollToHash(`#project-${p.slug}`);
                        }}
                        className="block py-1 font-ui text-sm text-text/70 transition-colors hover:text-gold"
                      >
                        {p.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-6 overflow-hidden">
              <p
                data-mobile-link
                className="mb-2 text-xs uppercase tracking-widest text-muted"
              >
                Affiliated Companies
              </p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {affiliatedCompanies.map((c) => (
                <div key={c.label} className="overflow-hidden">
                  <a
                    data-mobile-link
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1 text-sm text-text/70 transition-colors hover:text-gold"
                  >
                    {c.label}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden">
              <a
                data-mobile-link
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-gold"
              >
                <FiPhone /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
