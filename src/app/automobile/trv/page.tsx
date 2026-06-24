import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage } from "@/components/ui/Media";
import { Automobile, trv as project } from "@/data/content";
import Project from "@/components/sections/Project";

const data = Automobile.companies.find((c) => c.slug === "trv");

export const metadata: Metadata = {
  title: `${data?.title ?? "TRV Pakistan"} — Sherwani Group`,
  description: data?.desc ?? "TRV Pakistan — Sherwani Group",
};

export default function TRVPakistanPage() {
  if (!data) return null;

  return (
    <>
      <Navbar />
      <main className="bg-bg">
        {/* HERO */}
        <section className="relative flex h-screen min-h-[600px] w-full flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <PlaceholderImage
              src={data.image}
              alt={data.title}
              priority
              sizes="100vw"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/50 to-black/60" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-5 pt-24 md:px-10">
            <Link
              href="/automobile"
              className="mb-6 inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.25em] text-text/70 transition-colors hover:text-gold"
            >
              <FiArrowLeft /> Automobile
            </Link>

            <p className="mb-4 flex items-center gap-3 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
              <span className="h-px w-10 bg-gold/60" />
              {Automobile.overline}
            </p>

            <AnimatedTitle
              text={data.title}
              className="max-w-5xl text-[clamp(2.2rem,6.5vw,5.5rem)] uppercase text-text"
            />

            <p className="mt-6 max-w-xl font-ui text-lg italic tracking-wide text-gold-soft">
              {data.desc}
            </p>
          </div>
        </section>

     
      </main>
      <Project project={project} />
      <Footer />
    </>
  );
}
