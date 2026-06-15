"use client";

import { useRef, useState } from "react";
import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact, site } from "@/data/content";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-bg/60 px-4 py-3 text-text placeholder:text-muted/60 outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/30";

const details = [
  { icon: FiPhone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: FiMail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: FiClock, label: "Hours", value: site.hours },
  { icon: FiMapPin, label: "Address", value: contact.address },
];

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useGSAP(
    () => {
      gsap.from("[data-contact-reveal]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    },
    { scope: rootRef },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet — log the payload.
    console.log("Contact form submitted:", form);
  };

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section ref={rootRef} id="contact" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {contact.overline}
        </p>
        <AnimatedTitle
          text={contact.heading}
          className="text-[clamp(2.4rem,6vw,5rem)] text-text"
        />

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-2">
          {/* Left: details + map */}
          <div className="flex flex-col gap-8">
            <div data-contact-reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {details.map((d) => {
                const Icon = d.icon;
                const inner = (
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-surface p-5 transition-colors hover:border-gold/40">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                      <Icon />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted">
                        {d.label}
                      </p>
                      <p className="mt-0.5 text-text">{d.value}</p>
                    </div>
                  </div>
                );
                return d.href ? (
                  <a key={d.label} href={d.href}>
                    {inner}
                  </a>
                ) : (
                  <div key={d.label}>{inner}</div>
                );
              })}
            </div>

            <div
              data-contact-reveal
              className="placeholder-gradient relative h-72 overflow-hidden rounded-2xl border border-white/10"
            >
              <iframe
                title="Sherwani Group location"
                src={contact.mapEmbed}
                className="h-full w-full grayscale-[0.4] invert-[0.9] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: form */}
          <form
            data-contact-reveal
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={fieldClass}
                placeholder="Your name"
                value={form.name}
                onChange={update("name")}
                required
              />
              <input
                type="email"
                className={fieldClass}
                placeholder="Email address"
                value={form.email}
                onChange={update("email")}
                required
              />
            </div>
            <input
              className={fieldClass}
              placeholder="Subject"
              value={form.subject}
              onChange={update("subject")}
            />
            <textarea
              className={`${fieldClass} min-h-40 resize-y`}
              placeholder="Your message"
              value={form.message}
              onChange={update("message")}
              required
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-gold py-3 font-semibold uppercase tracking-widest text-bg transition-colors hover:bg-gold-soft"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
