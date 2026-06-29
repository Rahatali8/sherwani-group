import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import CountUp from "@/components/ui/CountUp";
import { PlaceholderImage } from "@/components/ui/Media";
import { farmsPage as data } from "@/data/content";

const BENTO: Record<number, string[]> = {
  9: [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-2",
    "md:col-span-1 md:row-span-2",
    "md:col-span-1",
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-2",
  ],
};

export const metadata: Metadata = {
  title: `${data.name} — Sherwani Group`,
  description: data.tagline,
};

export default function FarmsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg">
        {/* HERO */}
        <section className="relative flex h-screen min-h-150 w-full flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <PlaceholderImage
              src={data.heroImage}
              alt={data.name}
              priority
              sizes="100vw"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg via-black/50 to-black/60" />
            <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/70 to-transparent" />
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
              {data.overline}
            </p>
            <AnimatedTitle
              text={data.name}
              className="max-w-5xl text-[clamp(2.2rem,6.5vw,5.5rem)] uppercase text-text"
            />
            <p className="mt-6 max-w-xl font-ui text-lg italic tracking-wide text-gold-soft">
              {data.tagline}
            </p>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <p className="max-w-4xl font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.15] tracking-tight text-text">
            {data.intro}
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14">
            {data.about.map((para) => (
              <p key={para} className="text-lg leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* STATS */}
               <section className="border-y border-white/10 bg-surface/40">
                 <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-16 md:grid-cols-4 md:px-10">
                   {data.stats.map((s) => (
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

        {/* SERVICES */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            What We Offer
          </p>
          <AnimatedTitle
            text="Relax, celebrate, and reconnect with nature"
            className="max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-text"
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {data.services.map((srv, i) => (
              <div
                key={srv.title}
                className="group bg-bg p-8 transition-colors duration-500 hover:bg-surface md:p-10"
              >
                <span className="font-display text-sm text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-text md:text-3xl">
                  {srv.title}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            Gallery
          </p>
          <AnimatedTitle
            text="Scenes from Sherwani Farms"
            className="max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-text"
          />
          <div className="mt-12 grid auto-rows-[8rem] grid-cols-2 gap-3 md:mt-16 md:auto-rows-[11rem] md:grid-cols-4 md:gap-4">
            {data.gallery.map((src, i) => {
              const spans = BENTO[data.gallery.length] ?? [];
              const mobileFull = data.gallery.length % 2 === 1 && i === data.gallery.length - 1;
              return (
                <div
                  key={src}
                  className={clsx(
                    "group relative overflow-hidden rounded-2xl border border-white/10",
                    mobileFull && "col-span-2",
                    spans[i],
                  )}
                >
                  <PlaceholderImage
                    src={src}
                    alt={`${data.name} gallery ${i + 1}`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/10" />
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}