"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { FiMenu, FiX, FiPhone, FiChevronDown } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { navLinks, site, Automobile, projects } from "@/data/content";
import { scrollToHash, scrollToTop } from "@/lib/lenis";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileAutoOpen, setMobileAutoOpen] = useState(true);
  const [mobileBuildersOpen, setMobileBuildersOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const contactHash = "#contact";

  const goSection = (href: string) => {
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    if (pathname === "/") {
      requestAnimationFrame(() => scrollToHash(href));
    } else {
      router.push(`/${href}`);
    }
  };

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
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToTop();
              }
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
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 font-display text-sm uppercase tracking-[0.16em] lg:flex">
            {navLinks
              
              .map((l) => (
                <a
                  key={l.href}
                  href={l.href.startsWith("/") ? l.href : `/${l.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goSection(l.href);
                  }}
                  className="group relative text-sm uppercase tracking-[0.16em] text-text/85 transition-colors hover:text-gold"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

            {/* Automobile dropdown */}
            <div
              className="relative group"
              onMouseEnter={(e) => {
                const dd = e.currentTarget.querySelector<HTMLElement>("[data-dd]");
                if (!dd) return;
                gsap.killTweensOf(dd);
                gsap.set(dd, { display: "flex" });
                gsap.fromTo(dd, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 1.45, ease: "power3.out" });
                gsap.fromTo(
                  dd.querySelectorAll("[data-dd-item]"),
                  { opacity: 0, y: -15 },
                  { opacity: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" },
                );
              }}
              onMouseLeave={(e) => {
                const dd = e.currentTarget.querySelector<HTMLElement>("[data-dd]");
                if (!dd) return;
                gsap.killTweensOf(dd);
                gsap.set(dd, { display: "none", opacity: 0, y: -40 });
              }}
            >
              <Link
                href="/automobile"
                className="relative inline-flex text-sm uppercase tracking-[0.16em] text-text/85 transition-colors hover:text-gold"
              >
                Automobile
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
              <div
                data-dd
                className="absolute left-0 top-full z-30 mt-1 hidden min-w-[220px] flex-col rounded-3xl border border-white/10 bg-bg/95 p-4 opacity-0 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] after:absolute after:left-0 after:right-0 after:-top-3 after:h-3 after:bg-transparent"
              >
                {Automobile.companies.map((company) => (
                  <Link
                    key={company.slug}
                    data-dd-item
                    href={company.page!}
                    className="whitespace-nowrap py-3 font-ui text-sm uppercase tracking-[0.08em] text-text transition-colors hover:text-gold"
                  >
                    {company.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sherwani Builders — dedicated page */}
            <div
              className="relative group"
              onMouseEnter={(e) => {
                const dd = e.currentTarget.querySelector<HTMLElement>("[data-dd]");
                if (!dd) return;
                gsap.killTweensOf(dd);
                gsap.set(dd, { display: "flex" });
                gsap.fromTo(dd, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 1.45, ease: "power3.out" });
                gsap.fromTo(
                  dd.querySelectorAll("[data-dd-item]"),
                  { opacity: 0, y: -15 },
                  { opacity: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" },
                );
              }}
              onMouseLeave={(e) => {
                const dd = e.currentTarget.querySelector<HTMLElement>("[data-dd]");
                if (!dd) return;
                gsap.killTweensOf(dd);
                gsap.set(dd, { display: "none", opacity: 0, y: -40 });
              }}
            >
              <Link
                href="/our-relations/sherwani-builders"
                className="relative text-sm uppercase tracking-[0.16em] text-text/85 transition-colors hover:text-gold"
              >
                Sherwani Builders
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
              <div
                data-dd
                className="absolute left-0 top-full mt-2 hidden min-w-55 rounded-3xl border border-white/10 bg-bg/95 p-3 opacity-0 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              >
                <div className="flex flex-col gap-1">
                  {projects.items
                    .filter((item) => item.page)
                    .map((item) => (
                      <Link
                        key={item.slug}
                        data-dd-item
                        href={item.page!}
                        className="whitespace-nowrap block rounded-2xl px-4 py-3 font-ui text-sm uppercase tracking-[0.08em] text-text/85 transition-colors hover:bg-white/5 hover:text-gold"
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Contact — last */}
              <a
                href={`/${contactHash}`}
                onClick={(e) => {
                  e.preventDefault();
                  goSection(contactHash);
                }}
                className="group relative text-sm uppercase tracking-[0.16em] text-text/85 transition-colors hover:text-gold"
              >
                Contact
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
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
          className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-bg/98 backdrop-blur-xl lg:hidden"
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
                  href={l.href.startsWith("/") ? l.href : `/${l.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    goSection(l.href);
                  }}
                  className="block py-2 font-ui text-4xl tracking-wide text-text transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </div>
            ))}

            {/* Automobile dropdown */}
            <div className="overflow-hidden">
              <button
                data-mobile-link
                onClick={() => setMobileAutoOpen(!mobileAutoOpen)}
                className="flex w-full items-center justify-between py-2 font-ui text-4xl tracking-wide text-text transition-colors hover:text-gold"
              >
                Automobile
                <FiChevronDown className={`text-2xl transition-transform ${mobileAutoOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAutoOpen && (
                <div className="mt-1 space-y-1 border-l border-white/10 pl-4">
                  <Link
                    href="/automobile"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 font-ui text-3xl tracking-wide text-text/80 transition-colors hover:text-gold"
                  >
                    Overview
                  </Link>
                  {Automobile.companies.map((company) => (
                    <Link
                      key={company.slug}
                      href={company.page!}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 font-ui text-3xl tracking-wide text-text/80 transition-colors hover:text-gold"
                    >
                      {company.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sherwani Builders dropdown */}
            <div className="overflow-hidden">
              <button
                data-mobile-link
                onClick={() => setMobileBuildersOpen(!mobileBuildersOpen)}
                className="flex w-full items-center justify-between py-2 font-ui text-4xl tracking-wide text-text transition-colors hover:text-gold"
              >
                Sherwani Builders
                <FiChevronDown className={`text-2xl transition-transform ${mobileBuildersOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileBuildersOpen && (
                <div className="mt-1 space-y-1 border-l border-white/10 pl-4">
                  <Link
                    href="/our-relations/sherwani-builders"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 font-ui text-3xl tracking-wide text-text/80 transition-colors hover:text-gold"
                  >
                    Overview
                  </Link>
                  {projects.items
                    .filter((item) => item.page)
                    .map((item) => (
                      <Link
                        key={item.slug}
                        href={item.page!}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 font-ui text-3xl tracking-wide text-text/80 transition-colors hover:text-gold"
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>

            <div className="overflow-hidden">
              <a
                data-mobile-link
                href={`/${contactHash}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  goSection(contactHash);
                }}
                className="block py-2 font-ui text-4xl tracking-wide text-text transition-colors hover:text-gold"
              >
                Contact
              </a>
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

