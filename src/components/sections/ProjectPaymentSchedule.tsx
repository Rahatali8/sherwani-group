import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import type { ProjectData } from "@/data/content";

export default function ProjectPaymentSchedule({
  project: d,
  projectHref,
}: {
  project: ProjectData;
  projectHref: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
      {/* Main 2-Column Grid Split */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        
        {/* LEFT SIDE: Heading, Description & Chips */}
        <div className="flex flex-col items-start">
          <p className="mb-2 font-ui text-[11px] font-bold uppercase tracking-[0.35em] text-gold-soft">
            Easy Installments
          </p>
          
          <AnimatedTitle
            text="Payment Schedule"
            className="font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold uppercase tracking-tight text-text leading-none"
          />
          
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {d?.payment?.note || "Flexible, easy-installment plans tailored to you. Explore the full payment plan and unit layouts below, or contact our team for the latest availability."}
          </p>

          {/* Unit Chips (Pills with thin borders) */}
          {d?.payment?.units && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              {d.payment.units.map((u) => (
                <span
                  key={u}
                  className="rounded-full border border-white/20 bg-transparent px-4 py-2 font-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-text/90 transition-colors hover:border-gold/50"
                >
                  {u}
                </span>
              ))}
            </div>
          )}

          {/* Gold Action Button */}
          <div className="mt-10">
            <Link
              href={`${projectHref}/payment-schedule`}
              className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 font-ui text-xs font-bold uppercase tracking-[0.2em] text-bg transition-all duration-300 hover:bg-gold-soft hover:scale-[1.02]"
            >
              View Payment Schedule <FiArrowUpRight className="text-sm stroke-[3]" />
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Styled Schedule Card Box */}
        <div className="rounded-[2rem] border border-white/10 bg-[#0d0d0d]/60 p-4 md:p-6 backdrop-blur-sm">
          <ol className="flex flex-col divide-y divide-white/10">
            {d?.payment?.rows?.map((r, i) => (
              <li
                key={r.phase}
                className="flex items-start gap-6 px-4 py-6 md:px-6 first:pt-2 last:pb-2"
              >
                {/* Step Number */}
                <span className="font-display text-2xl font-black text-gold/80 leading-none pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                
                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-wider text-text leading-tight">
                    {r.phase}
                  </h3>
                  <p className="mt-1.5 text-xs tracking-wide text-muted/70">
                    {r.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}