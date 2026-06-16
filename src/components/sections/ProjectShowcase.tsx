import Link from "next/link";
import clsx from "clsx";
import {
  FiArrowLeft,
  FiPlay,
  FiArrowUpRight,
  FiPhone,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import WalkthroughVideo from "@/components/ui/WalkthroughVideo";
import InteriorCarousel from "@/components/ui/InteriorCarousel";
import EnquiryForm from "@/components/ui/EnquiryForm";
import { PlaceholderImage } from "@/components/ui/Media";
import type { ProjectData } from "@/data/content";

const BUILDERS_HREF = "/our-relations/sherwani-builders";

// Bento span patterns that perfectly tile a 4-col grid for a given tile count.
const BENTO: Record<number, string[]> = {
  8: [
    "md:col-span-2 md:row-span-2",
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-2 md:row-span-2",
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-1",
  ],
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

export default function ProjectShowcase({ project: d }: { project: ProjectData }) {
  const spans = BENTO[d.amenities.length] ?? [];

  return (
    <main className="bg-bg">
      {/* HERO */}
      <section className="relative flex h-screen min-h-[600px] w-full flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <PlaceholderImage
            src={d.heroImage}
            alt={d.name}
            priority
            sizes="100vw"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/45 to-black/60" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-5 pt-24 md:px-10 md:pt-28">
          <Link
            href={BUILDERS_HREF}
            className="inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.25em] text-text/70 transition-colors hover:text-gold"
          >
            <FiArrowLeft /> Sherwani Builders
          </Link>
          <p className="flex items-center gap-3 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            <span className="h-px w-10 bg-gold/60" />
            {d.overline}
          </p>
          <AnimatedTitle
            text={d.name}
            className="text-[clamp(2.4rem,8vw,7rem)] uppercase text-text"
          />
          <p className="max-w-xl font-ui text-lg italic tracking-wide text-gold-soft">
            {d.heroSubtitle}
          </p>
          <a
            href="#walkthrough"
            className="group mt-2 inline-flex items-center gap-3 font-ui text-sm uppercase tracking-widest text-text"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 text-gold transition-transform duration-300 group-hover:scale-110">
              <FiPlay className="ml-0.5" />
            </span>
            Watch Walkthrough
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
              {d.about.overline}
            </p>
            <AnimatedTitle
              text={d.about.heading}
              className="text-[clamp(2rem,5vw,3.4rem)] text-text"
            />
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {d.about.body}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <PlaceholderImage
              src={d.about.image}
              alt={d.name}
              sizes="(max-width: 768px) 100vw, 45vw"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* INTERIOR DESIGN — auto carousel */}
      <section className="bg-surface/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            Welcome to your oasis of comfort
          </p>
          <AnimatedTitle
            text="Interior Design"
            className="text-[clamp(2rem,5vw,3.6rem)] text-text"
          />
        </div>
        <div className="mt-12 md:mt-16">
          <InteriorCarousel items={d.interiors} />
        </div>
      </section>

      {/* AMENITIES — bento */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
          Gallery
        </p>
        <AnimatedTitle
          text="Amenities Beyond Expectation"
          className="max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-text"
        />
        <div className="mt-12 grid auto-rows-[8rem] grid-cols-2 gap-3 md:mt-16 md:auto-rows-[11rem] md:grid-cols-4 md:gap-4">
          {d.amenities.map((src, i) => {
            const mobileFull = d.amenities.length % 2 === 1 && i === d.amenities.length - 1;
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
                  alt={`${d.name} amenity ${i + 1}`}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/10" />
              </div>
            );
          })}
        </div>
      </section>

      {/* WALKTHROUGH */}
      <section id="walkthrough" className="bg-surface/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <p className="mb-4 text-center font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            Cinematic Walkthrough
          </p>
          <AnimatedTitle
            text={`Step inside ${d.name}`}
            className="mx-auto mb-12 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] text-text"
          />
          <WalkthroughVideo
            youtubeId={d.youtubeId}
            poster={d.heroImage}
            title={d.name}
          />
        </div>
      </section>

      {/* PAYMENT SCHEDULE */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
              Easy Installments
            </p>
            <AnimatedTitle
              text="Payment Schedule"
              className="text-[clamp(2rem,5vw,3.6rem)] text-text"
            />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              {d.payment.note}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {d.payment.units.map((u) => (
                <span
                  key={u}
                  className="rounded-full border border-gold/40 px-4 py-1.5 font-ui text-xs uppercase tracking-widest text-gold-soft"
                >
                  {u}
                </span>
              ))}
            </div>
            <Link
              href={d.paymentHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-ui text-xs font-semibold uppercase tracking-widest text-bg transition-colors hover:bg-gold-soft"
            >
              View Payment Schedule <FiArrowUpRight />
            </Link>
          </div>
          <ul className="flex flex-col divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10">
            {d.payment.rows.map((r, i) => (
              <li
                key={r.phase}
                className="flex items-center gap-5 bg-surface/40 px-6 py-6"
              >
                <span className="font-display text-2xl text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-lg uppercase tracking-wide text-text">
                    {r.phase}
                  </h4>
                  <p className="text-sm text-muted">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-white/10 bg-surface/40 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
            Contact
          </p>
          <AnimatedTitle
            text="Book your home today"
            className="max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-text"
          />
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-6">
              <p className="flex items-start gap-3 text-muted">
                <FiMapPin className="mt-1 shrink-0 text-gold" />
                {d.contact.address}
              </p>
              <a
                href={`tel:${d.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-text transition-colors hover:text-gold"
              >
                <FiPhone className="text-gold" /> {d.contact.phone}
              </a>
              <p className="flex items-center gap-3 text-muted">
                <FiClock className="text-gold" /> {d.contact.hours}
              </p>
              <div className="mt-2 aspect-video w-full overflow-hidden rounded-3xl border border-white/10">
                <iframe
                  src={d.contact.mapEmbed}
                  title={`${d.name} location`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <EnquiryForm
              projectName={d.name}
              options={d.contact.interestedOptions}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
