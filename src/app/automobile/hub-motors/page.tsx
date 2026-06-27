import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage } from "@/components/ui/Media";
import { Automobile, hubMotors as project } from "@/data/content";
import Project from "@/components/sections/Project";

const data = Automobile.companies.find((c) => c.slug === "hub-motors");

export const metadata: Metadata = {
  title: `${data?.title ?? "Toyota Hub Motors"} — Sherwani Group`,
  description: data?.desc ?? "Toyota Hub Motors — Sherwani Group",
};

export default function ToyotaHubMotorsPage() {
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

        {/* INTRO */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            {project.about.overline}
          </p>
          <h2 className="max-w-4xl font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.15] tracking-tight text-text">
            {project.about.heading}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            {project.about.body}
          </p>
        </section>

        {/* GALLERY SECTION */}
<section className="bg-black py-24">
  <div className="mx-auto max-w-7xl px-5 md:px-10">

    {/* Heading */}
    <div className="mb-14">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#d4af37]">
        Gallery
      </p>

      <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-bold leading-none text-white">
        Amenities Beyond Expectation
      </h2>
    </div>

    {/* Gallery Grid */}
    <div className="grid auto-rows-[140px] grid-cols-12 gap-4">

      {/* Reception - Large */}
      <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-6 md:row-span-3">
        <img
          src="/images/gallery/grid.jpg"
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Lobby */}
      <div className="col-span-6 overflow-hidden rounded-3xl md:col-span-3">
        <img
          src="/images/gallery/grie.jpg"
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Cinema */}
      <div className="col-span-6 overflow-hidden rounded-3xl md:col-span-3">
        <img
          src="/images/gallery/grid1.jpg"
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Kids Area */}
      <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-6">
        <img
          src="/images/gallery/gridy.avif"
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Gaming */}
      <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-3 md:row-span-2">
        <img
          src="/images/gallery/grid3.jpg"
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Gym */}
      <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-3">
        <img
          src="/images/gallery/grid9.jpg"
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Mechanical Plant */}
      <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-6">
        <img
          src="/images/gallery/grid6.jpg"
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Water Plant */}
      <div className="col-span-6 overflow-hidden rounded-3xl md:col-span-3">
        <img
          src="/images/gallery/grid7.jpg"
          alt=""
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

  

    </div>
  </div>
</section>

       
      </main>

      
      <Project project={project} />
    

      <Footer />
    </>
  );
}
