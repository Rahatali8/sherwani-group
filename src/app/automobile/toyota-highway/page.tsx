"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage } from "@/components/ui/Media";
import { Automobile } from "@/data/content";
import VehicleCarousel, { vehicles } from "@/components/ui/VehicleCarousel";
import ProjectPaymentSchedule from "@/components/sections/ProjectPaymentSchedule";
import { toyotaHighway as project } from "@/data/content"; 
import Project from "@/components/sections/Project";


export default function ToyotaHighwayPage() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number>(1);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const data = Automobile.companies.find((c) => c.slug === "toyota-highway");
  const activeVehicle = vehicles.find((v) => v.id === selectedVehicleId);

  if (!data) return null;

  const handleSelectVehicle = (id: number) => {
    setSelectedVehicleId(id);
    setIsDetailOpen(true);
  };

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

        {/* VEHICLES SECTION */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          {!isDetailOpen ? (
            <>
              <div className="mb-12 text-center">
                <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-tight text-text">
                  Our Vehicles
                </h2>
              </div>
              <VehicleCarousel 
                selectedId={selectedVehicleId} 
                onSelect={handleSelectVehicle} 
              />
            </>
          ) : (
            /* DEDICATED SIDE-BY-SIDE DETAIL VIEW */
            activeVehicle && (
              <div className="w-full text-text animate-fadeIn">
                {/* Back to Selection list */}
                <button
                  type="button"
                  onClick={() => setIsDetailOpen(false)}
                  className="mb-8 inline-flex items-center gap-2 font-ui text-xs uppercase tracking-wider text-gold hover:underline"
                >
                  &larr; Back to All Vehicles
                </button>

                {/* Headers */}
                <div className="mb-8">
                  <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-[#b31919] md:text-5xl">
                    {activeVehicle.name}
                  </h2>
                  <p className="mt-2 text-xl text-text/80">
                    Starting From {activeVehicle.price}
                  </p>
                </div>

                {/* Left Side: Image | Right Side: Spec Table Layout */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
                      <PlaceholderImage
                        src={activeVehicle.image}
                        alt={activeVehicle.name}
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Spec Table */}
                  <div className="lg:col-span-5">
                    <div className="overflow-hidden rounded-xl bg-surface/30 border border-white/5">
                      <table className="w-full text-left border-collapse">
                        <tbody>
                          {activeVehicle.specs?.map((spec, index) => (
                            <tr 
                              key={index} 
                              className={`${
                                index % 2 === 0 ? "bg-surface/50" : "bg-transparent"
                              } border-b border-white/5`}
                            >
                              <td className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text/60 w-2/5">
                                {spec.label}
                              </td>
                              <td className="px-5 py-3.5 text-sm text-text font-medium">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                          {activeVehicle.pdf && (
                            <tr className="border-t border-white/10">
                              <td className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text/60">
                                Manual
                              </td>
                              <td className="px-5 py-4">
                                <a
                                  href={activeVehicle.pdf}
                                  download
                                  className="inline-flex items-center justify-center rounded-lg bg-[#b31919] px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-opacity-90"
                                >
                                  View/Download
                                </a>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Bottom Baseline Summary Paragraph */}
                <div className="mt-12 max-w-5xl border-t border-white/10 pt-8 text-center">
                  <p className="text-sm leading-relaxed text-text/70">
                    The New Generation Hilux Revo carries forward the legacy of power &amp; performance with redefined ruggedness and a new upgraded engine for maximum power on and off the road.
                  </p>
                </div>
              </div>
            )
          )}
        </section>

        {/* WHO WE ARE */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
            <div>
              <h2 className="mb-6 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-tight text-text">
                Who We Are
              </h2>
              <p className="text-lg leading-relaxed text-muted">
                <span className="text-gold-soft">The Sherwani Group's</span> started way back 40 years ago in the Automobile market and by the passage of time attained highest glory and confidence of its trusted customers to become one of the household names not only in automobile but also as Builders, Developers &amp; Town Planners. The force behind this three decades phenomenal growth is the vision of its management which has set multi-dimensional goals to achieve through teamwork &amp; concerted efforts of dedicated manpower and above all millions of <span className="text-gold-soft">trusted customers</span>.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10">
                <PlaceholderImage
                  src="/images/projects/logo.jpg"
                  alt="Sherwani Group Logo"
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
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