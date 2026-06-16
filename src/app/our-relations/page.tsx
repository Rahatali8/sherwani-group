import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RelationsShowcase from "@/components/sections/RelationsShowcase";
import { relations } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Relations — Sherwani Group",
  description:
    "The affiliated companies that power the Sherwani Group — automobiles, engineering, real estate, e-commerce and more.",
};

export default function OurRelationsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        {/* Intro header */}
        <section className="px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32">
          <div className="mx-auto w-full max-w-7xl">
            <p className="mb-5 flex items-center gap-3 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
              <span className="h-px w-10 bg-gold/60" />
              {relations.overline}
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(2.4rem,7vw,6rem)] uppercase leading-[0.9] tracking-tight text-text">
              {relations.heading}
            </h1>
          </div>
        </section>

        {/* Scroll-to-select showcase */}
        <RelationsShowcase />
      </main>
      <Footer />
    </>
  );
}
