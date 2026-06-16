"use client";

import { useState } from "react";
import { FiCheck } from "react-icons/fi";

/**
 * Site-tour enquiry form. Front-end only (no backend wired) — on submit it
 * builds a mailto so the lead reaches the sales inbox, then shows a thank-you.
 */
export default function EnquiryForm({
  projectName,
  options,
  toEmail = "info@sherwanigroup.com",
}: {
  projectName: string;
  options: string[];
  toEmail?: string;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    interest: options[0] ?? "",
  });

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${projectName} — Site Tour Enquiry`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nContact: ${form.contact}\nInterested in: ${form.interest}\n\nProject: ${projectName}`,
    );
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-text placeholder:text-muted/60 outline-none transition-colors focus:border-gold/60";

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gold/30 bg-black/40 p-10 text-center backdrop-blur-md">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 text-2xl text-gold">
          <FiCheck />
        </span>
        <h4 className="font-display text-2xl uppercase tracking-wide text-text">
          Thank you
        </h4>
        <p className="max-w-xs text-sm text-muted">
          Your enquiry is on its way. Our team will be in touch shortly to
          schedule your exclusive site tour.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md md:p-8"
    >
      <h4 className="mb-1 font-display text-xl uppercase tracking-wide text-text">
        Schedule a Site Tour
      </h4>
      <p className="mb-6 text-sm text-muted">
        Fill the form below for exclusive project details.
      </p>
      <div className="flex flex-col gap-3">
        <input
          required
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={update("name")}
          className={inputCls}
        />
        <input
          required
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={update("email")}
          className={inputCls}
        />
        <input
          required
          type="tel"
          placeholder="Contact Number"
          value={form.contact}
          onChange={update("contact")}
          className={inputCls}
        />
        <div>
          <label className="mb-1.5 block font-ui text-xs uppercase tracking-widest text-muted">
            Interested in
          </label>
          <select
            value={form.interest}
            onChange={update("interest")}
            className={inputCls}
          >
            {options.map((o) => (
              <option key={o} value={o} className="bg-surface text-text">
                {o}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-2 rounded-full bg-gold py-3.5 font-ui text-sm font-semibold uppercase tracking-widest text-bg transition-colors hover:bg-gold-soft"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
