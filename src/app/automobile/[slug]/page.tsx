import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Automobile } from "@/data/content";
import { PlaceholderImage } from "@/components/ui/Media";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Link from "next/link";

const companies = Automobile.companies;
const companyBySlug = new Map(companies.map((company) => [company.slug, company]));

export async function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const company = companyBySlug.get(params.slug);
  if (!company) {
    return { title: "Automobile — Sherwani Group" };
  }

  return {
    title: `${company.title} — Automobile`,
    description: company.desc,
  };
}

export default function AutomobileCompanyPage({ params }: { params: { slug: string } }) {
  const company = companyBySlug.get(params.slug);
  if (!company) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-bg text-text">
        {/* HERO */}
        <section className="relative flex h-screen min-h-[600px] w-full flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <PlaceholderImage
              src={company.image}
              alt={company.title}
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
              ← Automobile
            </Link>
            <p className="mb-4 flex items-center gap-3 font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-soft">
              <span className="h-px w-10 bg-gold/60" />
              {Automobile.overline}
            </p>
            <AnimatedTitle
              text={company.title}
              className="max-w-5xl text-[clamp(2.2rem,6.5vw,5.5rem)] uppercase text-text"
            />
            <p className="mt-6 max-w-xl font-ui text-lg italic tracking-wide text-gold-soft">
              {company.desc}
            </p>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <p className="max-w-4xl font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.15] tracking-tight text-text">
            {company.desc}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14">
            <p className="text-lg leading-relaxed text-muted">
              {company.desc}
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Our team supports sales, service and spare parts across authorised channels. For specialised enquiries, contact our corporate office.
            </p>
          </div>
        </section>

        {/* VISUAL */}
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-10 md:pb-28">
          <div className="mt-8 aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/30">
            <PlaceholderImage src={company.image} alt={company.title} sizes="100vw" className="h-full w-full" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
