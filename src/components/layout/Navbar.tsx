"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { navLinks, site } from "@/data/content";
import { scrollToHash, scrollToTop } from "@/lib/lenis";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // On the home page anchors smooth-scroll; from other routes we navigate home
  // (to /#hash) so the link still works.
  const goSection = (href: string) => {
    if (pathname === "/") scrollToHash(href);
    else router.push(`/${href}`);
  };
  const contactHash = "#contact";

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
          <div className="hidden items-center gap-8 font-ui text-[13px] font-medium uppercase tracking-[0.16em] lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={`/${l.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  goSection(l.href);
                }}
                className="group relative text-text/85 transition-colors hover:text-gold"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Our Milestones — dedicated page */}
            <Link
              href="/our-relations"
              className="group relative text-text/85 transition-colors hover:text-gold"
            >
              Our Milestones
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Contact — last */}
            <a
              href={`/${contactHash}`}
              onClick={(e) => {
                e.preventDefault();
                goSection(contactHash);
              }}
              className="group relative text-text/85 transition-colors hover:text-gold"
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
                  href={`/${l.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    goSection(l.href);
                  }}
                  className="block py-2 font-display text-4xl tracking-wide text-text transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </div>
            ))}

            <div className="overflow-hidden">
              <Link
                data-mobile-link
                href="/our-relations"
                onClick={() => setMenuOpen(false)}
                className="block py-2 font-display text-4xl tracking-wide text-text transition-colors hover:text-gold"
              >
                Our Milestones
              </Link>
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
                className="block py-2 font-display text-4xl tracking-wide text-text transition-colors hover:text-gold"
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
