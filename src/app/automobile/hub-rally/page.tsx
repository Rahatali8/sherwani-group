import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { PlaceholderImage } from "@/components/ui/Media";
import { Automobile, hubRally as project } from "@/data/content";
import Project from "@/components/sections/Project";
const data = Automobile.companies.find((c) => c.slug === "hub-rally");

export const metadata: Metadata = {
  title: `${data?.title ?? "Hub Rally"} — Sherwani Group`,
  description: data?.desc ?? "Hub Rally — Pakistan's premier off-road motorsport event.",
};

export default function HubRallyPage() {
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
        <section className="mx-auto max-w-5xl px-5 py-20 md:px-10 md:py-28">
          <div className="mb-12">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-none tracking-tight text-text">
              Motor Sports
            </h2>
            <h3 className="mt-3 font-display text-[clamp(1.2rem,2.5vw,2rem)] uppercase tracking-wider text-gold">
              Hub Rally Cross
            </h3>
          </div>

          <div className="flex flex-col gap-8 text-base md:text-lg leading-relaxed text-muted/95">
            <p>
              The introduction of motor-sports in Pakistan has injected a new wave of excitement for the route drivers. The contributions of Shujat Sherwani, Chief Executive of Toyota Highway | Hub Motors, for the promotion of this new thriller sport can never fade. The initiative taken by Toyota Highway to hold &ldquo;Hub Rally Cross&rdquo; events is the reason we are witnessing dozens of motorsport races in the various regions of Pakistan. Whether deserts or mountains, Shujat Sherwani always leads from the front.
            </p>
            <p>
              Chief Executive of Toyota Highway, Shujat Sherwani, is considered the pioneer of motor-sport in Pakistan. Due to his vision of the &ldquo;Hub Rally Cross&rdquo; concept, this sport is progressing all over the country at a rapid pace.
            </p>
            <p>
              Pakistan&apos;s famous Hub Rally Cross is annually organized, and the track is extended to the Gadani Coast where a 50 km track is prepared specially for the race. It involves mountainous and desert portions as well, which makes it a three-in-one track field. Top rally drivers feature from across the country, including Nadir Magsi, Rony Patel, Amir Magsi, Sahibzada Sultan Muhammad Ali, Nadeem, Shiraz Qureshi, and women drivers Tushna Patel, Mariam Shiraaz, Nida Wasti, and Salma Khan. They exhibit their skills and experience driving on unbalanced surface levels with more than 50+ racers participating. In addition, a new category named &ldquo;Veteran&rdquo; has been announced by the Chief Organizer Mr. Shujaat Sherwani, in which racers above 60+ who haven&apos;t raced for at least 3 years can take part and feel the thrill of rally racing again.
            </p>
            <p>
              Spectators do not only enjoy the race at Hub Rally Cross; there are many fun activities like power gliding, test drives of new vehicles on a small racing track, camping, food stalls, and music.
            </p>
            <p>
              This 50 km track is the smallest but most challenging route for the drivers due to rocky and sandy obstructions, plus the coastal Gadani portion is a big test for the racers. This is the reason why the Hub Rally is the most awaited event for these riders. Roll-bar along with a helmet, seat-belt, fire-extinguisher, and first-aid box in every vehicle is mandatory for participants. Keeping the covid safety measures, use of the mask is a necessity.
            </p>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="bg-black py-24 border-t border-white/10">
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
                  src="/images/gallery/1.jpg"
                  alt="Reception"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Lobby */}
              <div className="col-span-6 overflow-hidden rounded-3xl md:col-span-3">
                <img
                  src="/images/gallery/2.jpg"
                  alt="Lobby"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Cinema */}
              <div className="col-span-6 overflow-hidden rounded-3xl md:col-span-3">
                <img
                  src="/images/gallery/3.jpg"
                  alt="Cinema"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Kids Area */}
              <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-6">
                <img
                  src="/images/gallery/4.jpg"
                  alt="Kids Area"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Gaming */}
              <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-3 md:row-span-2">
                <img
                  src="/images/gallery/5.jpg"
                  alt="Gaming"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Gym */}
              <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-3">
                <img
                  src="/images/gallery/6.jpg"
                  alt="Gym"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Mechanical Plant */}
              <div className="col-span-12 overflow-hidden rounded-3xl md:col-span-6">
                <img
                  src="/images/gallery/7.jpg"
                  alt="Mechanical Plant"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Water Plant */}
              <div className="col-span-6 overflow-hidden rounded-3xl md:col-span-3">
                <img
                  src="/images/gallery/8.jpg"
                  alt="Water Plant"
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
