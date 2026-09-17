"use client";

import { useState } from "react";
import Image from "next/image";
import InViewReveal from "@/components/InViewReveal";
import { unsplash } from "@/lib/images";

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  kitchenType: string;
  space: string;
  budget: string;
  message: string;
}

const studioInfo = [
  { l: "STUDIO", v: "41 Design District, Sector 44, Gurugram" },
  { l: "PHONE", v: "+91 98765 43210" },
  { l: "EMAIL", v: "hello@arka.studio" },
];

const locationStrip = [
  {
    l: "STUDIO ADDRESS",
    v: "41 Design District, Sector 44\nGurugram, Haryana 122003",
  },
  {
    l: "STUDIO HOURS",
    v: "Mon–Sat: 10am – 7pm\nSunday: By appointment",
  },
  { l: "CONTACT", v: "+91 98765 43210\nhello@arka.studio" },
  { l: "SHOWROOMS", v: "Gurugram · New Delhi\nMumbai · Bangalore" },
];

const inputClass =
  "w-full bg-transparent border-b border-border py-3 text-ink text-body placeholder-ink-muted/50 focus:outline-none focus:border-accent transition-colors duration-300";

export default function ContactContent() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    city: "",
    kitchenType: "",
    space: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Split layout */}
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Left — Image side */}
        <div className="relative hidden min-h-screen md:block">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Image
              src={unsplash("1758565811352-a439bd6f956e", 1200, 1600)}
              alt="Luxury kitchen design consultation"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/30 to-dark/65" />
            <div className="absolute inset-0 flex flex-col justify-end p-16 text-bg-warm">
              <p className="mb-4 text-label text-accent">
                Arka Kitchen Studio
              </p>
              <h2 className="mb-6 font-serif font-light leading-[1.05] text-bg-warm text-[clamp(2rem,3vw,3.5rem)]">
                Let&rsquo;s Build Something
                <br />
                <em>Beautiful Together.</em>
              </h2>
              <p className="mb-10 max-w-[360px] text-body opacity-60">
                The first consultation is complimentary. We&rsquo;d love to
                hear about your space.
              </p>
              <div className="flex flex-col gap-4">
                {studioInfo.map(({ l, v }) => (
                  <div key={l}>
                    <p className="mb-1 text-label opacity-50">{l}</p>
                    <p className="text-body text-sm opacity-80">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form side */}
        <div className="bg-bg-warm px-5 pb-20 pt-28 md:px-16 md:pt-40">
          {submitted ? (
            <div className="flex min-h-[60vh] h-full flex-col justify-center">
              <InViewReveal>
                <div className="mb-10 h-px w-12 bg-accent" />
                <p className="mb-6 text-label text-accent">Thank You</p>
                <h2 className="mb-6 font-serif font-light leading-[1.05] text-ink text-[clamp(2rem,3vw,3rem)]">
                  We&rsquo;ve received
                  <br />
                  <em>your enquiry.</em>
                </h2>
                <p className="max-w-[400px] text-body text-ink-muted">
                  One of our designers will be in touch within 48 hours to
                  arrange your first consultation.
                </p>
              </InViewReveal>
            </div>
          ) : (
            <>
              <InViewReveal>
                <p className="mb-4 text-label text-accent">
                  Book a Consultation
                </p>
              </InViewReveal>
              <InViewReveal delay={80}>
                <h1 className="mb-12 font-serif font-light leading-[1.05] text-ink text-[clamp(2rem,3.5vw,3.5rem)]">
                  Tell Us About
                  <br />
                  <em>Your Space.</em>
                </h1>
              </InViewReveal>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <InViewReveal delay={120}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Priya Sharma"
                        className={inputClass}
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={inputClass}
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </InViewReveal>

                <InViewReveal delay={160}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="priya@example.com"
                        className={inputClass}
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="New Delhi"
                        className={inputClass}
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </InViewReveal>

                <InViewReveal delay={200}>
                  <div>
                    <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                      Kitchen Type
                    </label>
                    <select
                      className={`${inputClass} cursor-pointer`}
                      value={form.kitchenType}
                      onChange={(e) =>
                        setForm({ ...form, kitchenType: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select a collection...
                      </option>
                      <option>Monolith</option>
                      <option>Warm Minimal</option>
                      <option>Contemporary</option>
                      <option>Signature (Bespoke)</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </InViewReveal>

                <InViewReveal delay={240}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        Approx. Space (sqm)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 12–18 sqm"
                        className={inputClass}
                        value={form.space}
                        onChange={(e) =>
                          setForm({ ...form, space: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        Budget Range
                      </label>
                      <select
                        className={`${inputClass} cursor-pointer`}
                        value={form.budget}
                        onChange={(e) =>
                          setForm({ ...form, budget: e.target.value })
                        }
                      >
                        <option value="" disabled>
                          Select range...
                        </option>
                        <option>₹10L – ₹20L</option>
                        <option>₹20L – ₹40L</option>
                        <option>₹40L – ₹75L</option>
                        <option>₹75L+</option>
                        <option>Prefer to discuss</option>
                      </select>
                    </div>
                  </div>
                </InViewReveal>

                <InViewReveal delay={280}>
                  <div>
                    <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                      Tell Us More
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your space, your vision, or anything you'd like us to know..."
                      className={`${inputClass} resize-none`}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                    />
                  </div>
                </InViewReveal>

                <InViewReveal delay={320}>
                  <button
                    type="submit"
                    className="magnetic-btn w-full bg-ink py-5 text-label tracking-widest text-bg-warm transition-colors duration-500 hover:bg-accent"
                    data-cursor="open"
                  >
                    Book My Consultation
                  </button>
                </InViewReveal>

                <InViewReveal delay={360}>
                  <p className="text-center text-[9px] font-semibold uppercase leading-[1.6] tracking-[0.18em] text-ink-muted">
                    By submitting this form you agree to be contacted by our
                    studio team.
                    <br />
                    We do not share your information with third parties.
                  </p>
                </InViewReveal>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Location strip */}
      <div className="bg-bg py-12 md:py-16">
        <div className="mx-auto max-w-[1600px] px-5 md:px-16">
          <div className="grid grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4">
            {locationStrip.map(({ l, v }) => (
              <div key={l}>
                <p className="mb-3 text-label text-accent">{l}</p>
                <p className="whitespace-pre-line text-body text-sm text-ink-muted">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
