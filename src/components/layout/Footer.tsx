"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { navLinks, affiliatedCompanies, site, contact } from "@/data/content";
import { scrollToHash } from "@/lib/lenis";

const socials = [
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { Icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const goSection = useCallback(
    (href: string) => {
      if (href.startsWith("/")) {
        router.push(href);
        return;
      }
      if (pathname === "/") {
        requestAnimationFrame(() => scrollToHash(href));
      } else {
        router.push(`/${href}`);
      }
    },
    [pathname, router],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Oversized text: word-by-word mask reveal.
      gsap.from(bigRef.current?.querySelectorAll("[data-fword]") ?? [], {
        yPercent: 120,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: bigRef.current, start: "top 90%" },
      });

      // Columns stagger in.
      gsap.from("[data-foot-col]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-foot-cols]", start: "top 90%" },
      });
    },
    { scope: rootRef },
  );

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-bg pt-20">
      {/* Animated gold gradient top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Columns */}
        <div
          data-foot-cols
          className="grid grid-cols-2 gap-10 border-b border-white/10 pb-16 md:grid-cols-4"
        >
          <div data-foot-col>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Explore
            </h4>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href.startsWith("/") ? l.href : `/${l.href}`}
                      onClick={(e) => {
                        e.preventDefault();
                        goSection(l.href);
                      }}
                      className="cursor-pointer text-sm text-muted transition-colors hover:text-gold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
          </div>

          <div data-foot-col>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Companies
            </h4>
            <ul className="space-y-2">
              {affiliatedCompanies.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-foot-col>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-gold">
                  {contact.email}
                </a>
              </li>
              <li>{site.hours}</li>
              <li>{contact.address}</li>
            </ul>
          </div>

          <div data-foot-col>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Follow
            </h4>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Oversized brand text */}
        <div ref={bigRef} className="py-10 text-center md:py-16">
          <div className="font-display leading-[0.82] tracking-tight">
            <span className="block overflow-hidden">
              <span
                data-fword
                className="block text-[clamp(3.5rem,18vw,16rem)] text-text"
              >
                SHERWANI
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-fword
                className="block text-[clamp(3.5rem,18vw,16rem)] text-gold"
              >
                GROUP
              </span>
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-8 text-sm text-muted md:flex-row">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="tracking-wide">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
