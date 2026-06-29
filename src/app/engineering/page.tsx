import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PlaceholderImage } from "@/components/ui/Media";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import CountUp from "@/components/ui/CountUp";
import InteriorCarousel from "@/components/ui/InteriorCarousel";
import Project from "@/components/sections/Project";
import { sherwaniEngineering } from "@/data/content";

const galleryItems = Array.from({ length: 9 }, (_, i) => ({
  title: `Gallery ${i + 1}`,
  tagline: "Sherwani Engineering",
  image: `/engimages/gallery/img${i + 1}.webp`,
}));

export const metadata: Metadata = {
  title: "Sherwani Engineering — Sherwani Group",
  description: "Vehicle bodies, generators and industrial machinery engineered for durability.",
};

export default function EngineeringPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg text-text">
        <section className="relative flex h-screen min-h-[600px] w-full flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <PlaceholderImage
              src="/images/projects/event-custom.jpg"
              alt="Sherwani Engineering"
              priority
              sizes="100vw"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/50 to-black/60" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-5 pt-24 md:px-10">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.25em] text-text/70 transition-colors hover:text-gold"
            >
              <FiArrowLeft /> Home
            </Link>
            <p className="mb-4 flex items-center gap-3 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
              <span className="h-px w-10 bg-gold/60" />
              Engineering
            </p>
            <AnimatedTitle
              text="Sherwani Engineering"
              className="max-w-5xl text-[clamp(2.2rem,6.5vw,5.5rem)] uppercase text-text"
            />
            <p className="mt-6 max-w-xl font-ui text-lg italic tracking-wide text-gold-soft">
              Vehicle bodies, generators and industrial machinery engineered for durability.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <p className="max-w-4xl font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.15] tracking-tight text-text">
            Vehicle bodies, generators and industrial machinery engineered for durability.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14">
            <p className="text-lg leading-relaxed text-muted">
              Sherwani Engineering is the Sherwani Group's dedicated engineering arm, specializing in custom vehicle body fabrication, generator manufacturing and industrial machinery. With decades of automotive expertise backing every project, we deliver robust, reliable solutions for commercial and industrial clients across Pakistan.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              From bespoke vehicle bodies to heavy machinery, every product is built to withstand demanding conditions. Our team combines traditional craftsmanship with modern engineering practices to ensure durability, safety and performance in every unit we produce.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/10 bg-surface/40">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-16 md:grid-cols-4 md:px-10">
            {[
              { value: 1984, suffix: "", label: "Established" },
              { value: 25, suffix: "+", label: "Years of Engineering" },
              { value: 1000, suffix: "+", label: "Projects Delivered" },
              { value: 100, suffix: "%", label: "Commitment to Quality" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <CountUp
                  end={s.value}
                  suffix={s.suffix}
                  className="font-display text-[clamp(2.4rem,5vw,4rem)] text-gold"
                />
                <p className="mt-2 font-ui text-xs uppercase tracking-[0.25em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services row */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            What We Do
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.15] tracking-tight text-text">
            Engineered for Excellence
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            <div className="group bg-bg p-8 transition-colors duration-500 hover:bg-surface md:p-10">
              <div className="mb-6 aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <PlaceholderImage
                  src="/engimages/our mission.webp"
                  alt="Our Mission"
                  sizes="33vw"
                  className="h-full w-full"
                />
              </div>
              <span className="font-display text-sm text-gold/70">01</span>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-text md:text-3xl">
                Our Mission
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                To deliver high-quality fabricated vehicles, generators and industrial machinery engineered for maximum durability, safety and performance — backed by decades of automotive expertise.
              </p>
            </div>
            <div className="group bg-bg p-8 transition-colors duration-500 hover:bg-surface md:p-10">
              <div className="mb-6 aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <PlaceholderImage
                  src="/engimages/our philosophy.webp"
                  alt="Our Philosophy"
                  sizes="33vw"
                  className="h-full w-full"
                />
              </div>
              <span className="font-display text-sm text-gold/70">02</span>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-text md:text-3xl">
                Our Philosophy
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                Quality is non-negotiable. We uphold precision, reliability and continuous improvement — blending hands-on experience with modern engineering to deliver solutions that perform under pressure.
              </p>
            </div>
            <div className="group bg-bg p-8 transition-colors duration-500 hover:bg-surface md:p-10">
              <div className="mb-6 aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <PlaceholderImage
                  src="/engimages/services.webp"
                  alt="Services"
                  sizes="33vw"
                  className="h-full w-full"
                />
              </div>
              <span className="font-display text-sm text-gold/70">03</span>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-text md:text-3xl">
                Our Services
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                End-to-end fabrication services — custom vehicle bodies, emergency response vehicles, industrial generators and heavy machinery — tailored to exceed expectations.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery carousel */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
              Gallery
            </p>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.15] tracking-tight text-text">
              A Look at Our Work
            </h2>
          </div>
          <div className="mt-14">
            <InteriorCarousel items={galleryItems} />
          </div>
        </section>

      </main>
      <Project project={sherwaniEngineering} />
      <Footer />
    </>
  );
}
