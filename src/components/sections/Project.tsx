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

export default function Project({ project: d }: { project: ProjectData }) {
  const spans = BENTO[d.amenities.length] ?? [];

  return (
    <main className="bg-bg">


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
