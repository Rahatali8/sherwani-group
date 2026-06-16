import Link from "next/link";
import clsx from "clsx";
import { FiArrowLeft, FiPhone, FiClock } from "react-icons/fi";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import ZoomImage from "@/components/ui/ZoomImage";
import type { ProjectData } from "@/data/content";

export default function ProjectPaymentSchedule({
  project: d,
  projectHref,
}: {
  project: ProjectData;
  projectHref: string;
}) {
  // Prefer an explicit docs list; otherwise fall back to pricing/size images.
  const docs =
    d.payment.docs ??
    [
      d.payment.pricingImage && {
        src: d.payment.pricingImage,
        label: "Payment Plan",
      },
      d.payment.sizeImage && {
        src: d.payment.sizeImage,
        label: "Unit Layouts & Sizes",
      },
    ].filter(Boolean as unknown as (x: unknown) => x is { src: string; label: string });
  const hasDocs = docs.length > 0;

  return (
    <main className="bg-bg">
      <section className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-10 md:pt-40">
        <Link
          href={projectHref}
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

        {/* Project-specific documents (when provided) */}
        {hasDocs ? (
          <div
            className={clsx(
              "mt-12 grid gap-6 md:gap-8",
              docs.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-2xl",
            )}
          >
            {docs.map((doc) => (
              <div key={doc.src}>
                <h3 className="mb-3 font-ui text-xs uppercase tracking-[0.3em] text-gold-soft">
                  {doc.label}
                </h3>
                <ZoomImage
                  src={doc.src}
                  alt={`${d.name} — ${doc.label}`}
                  caption={doc.label}
                />
              </div>
            ))}
          </div>
        ) : (
          <ol className="mt-10 flex flex-col divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10">
            {d.payment.rows.map((r, i) => (
              <li
                key={r.phase}
                className="flex items-center gap-6 bg-surface/40 px-6 py-7 md:px-8"
              >
                <span className="font-display text-3xl text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-xl uppercase tracking-wide text-text md:text-2xl">
                    {r.phase}
                  </h3>
                  <p className="text-sm text-muted">{r.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        )}

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
  );
}
