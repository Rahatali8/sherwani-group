import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiPhone, FiClock } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import ZoomImage from "@/components/ui/ZoomImage";
import { bloomGardens as d } from "@/data/content";

export const metadata: Metadata = {
  title: `${d.name} — Payment Schedule`,
  description: `Payment plan and unit options for ${d.name}.`,
};

export default function BloomGardensPaymentPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <section className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-10 md:pt-40">
          <Link
            href="/our-relations/sherwani-builders/bloom-gardens"
            className="mb-6 inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.25em] text-text/70 transition-colors hover:text-gold"
          >
            <FiArrowLeft /> {d.name}
          </Link>
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            {d.name} · Easy Installments
          </p>
          <AnimatedTitle
            text="Payment Schedule"
            className="text-[clamp(2.4rem,7vw,5rem)] text-text"
          />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {d.payment.note}
          </p>

          {/* Unit chips */}
          <div className="mt-10 flex flex-wrap gap-2">
            {d.payment.units.map((u) => (
              <span
                key={u}
                className="rounded-full border border-gold/40 px-4 py-1.5 font-ui text-xs uppercase tracking-widest text-gold-soft"
              >
                {u}
              </span>
            ))}
          </div>

          {/* Project-specific documents: payment plan + unit layouts */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="mb-3 font-ui text-xs uppercase tracking-[0.3em] text-gold-soft">
                Payment Plan
              </h3>
              <ZoomImage
                src={d.payment.pricingImage}
                alt={`${d.name} payment plan`}
                caption="Payment Plan"
              />
            </div>
            <div>
              <h3 className="mb-3 font-ui text-xs uppercase tracking-[0.3em] text-gold-soft">
                Unit Layouts &amp; Sizes
              </h3>
              <ZoomImage
                src={d.payment.sizeImage}
                alt={`${d.name} unit layouts and sizes`}
                caption="Floor Plans"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-start gap-6 rounded-3xl border border-gold/30 bg-black/40 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h3 className="font-display text-2xl uppercase tracking-wide text-text">
                Request the full payment plan
              </h3>
              <p className="mt-2 text-muted">
                Our team will share the latest pricing, unit availability and
                installment breakdown.
              </p>
            </div>
            <div className="flex flex-col gap-3 font-ui text-sm">
              <a
                href={`tel:${d.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 font-semibold uppercase tracking-widest text-bg transition-colors hover:bg-gold-soft"
              >
                <FiPhone /> {d.contact.phone}
              </a>
              <span className="inline-flex items-center gap-3 px-2 text-muted">
                <FiClock /> {d.contact.hours}
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
