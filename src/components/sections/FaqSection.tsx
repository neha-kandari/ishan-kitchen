"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "What is the typical lead time for a kitchen project?",
    a: "Our typical end-to-end timeline is 16–26 weeks, depending on the complexity of the design and material availability. This includes the design phase (3–5 weeks), manufacturing (10–16 weeks), and installation (1–2 weeks). We work to an agreed timeline from the moment you sign off on the design.",
  },
  {
    q: "Do you handle the entire project, or just manufacture the kitchen?",
    a: "We are a full-service studio. We manage design, material sourcing, manufacturing in our Gurugram workshop, logistics, and supervised installation. You have one point of contact throughout, and we coordinate directly with your architect or interior designer if needed.",
  },
  {
    q: "What warranty do you offer?",
    a: "Every Arka kitchen comes with a 10-year structural warranty covering cabinetry, hardware, and joinery. Natural stone and solid wood surfaces carry a 5-year warranty against defects in workmanship. We also offer an annual maintenance programme to keep your kitchen in perfect condition.",
  },
  {
    q: "Can you work with my existing architect or designer?",
    a: "Absolutely. We regularly collaborate with architects and interior designers across India. We provide detailed technical drawings, material samples, and 3D visualisations for design team review. We adapt to your project's coordination structure.",
  },
  {
    q: "What is the minimum project size you work with?",
    a: "We work with kitchens from 6 sqm upward. Whether it is a compact apartment kitchen or a 40 sqm culinary space, our design process and quality standards are identical. Some of our most considered work has been in smaller spaces.",
  },
  {
    q: "How do I get started?",
    a: "Book a discovery call or visit one of our showrooms. We will discuss your space, brief, and timeline — no commitment required. If you would like, bring your architect's drawings or rough floor plan. From there, we will outline a proposal within five working days.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-beige py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-14">
        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_1.6fr] md:gap-24">
          <div className="md:sticky md:top-32">
            <Reveal>
              <p className="mb-4 text-label text-accent md:mb-6">
                FREQUENTLY ASKED
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mb-5 font-serif font-light leading-[1.05] text-ink text-[clamp(2rem,3.5vw,4rem)] md:mb-7">
                Questions
                <br />
                <em>Worth Asking.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mb-6 max-w-[300px] text-body text-[14px] text-ink-muted md:mb-10">
                Designing a kitchen is a considered investment. Here are the
                questions our clients ask most.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-[12px] tracking-[0.1em] text-accent">
                STILL HAVE QUESTIONS?
                <br />
                <a
                  href="mailto:hello@arka.studio"
                  className="border-b border-border pb-0.5 text-ink"
                >
                  hello@arka.studio
                </a>
              </p>
            </Reveal>
          </div>

          <div>
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={faq.q} delay={i * 0.04} className="border-t border-border">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-7 text-left"
                  >
                    <span className="flex-1 font-serif text-lg leading-snug text-ink">
                      {faq.q}
                    </span>
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isOpen ? "border-ink bg-ink" : "border-border"
                      }`}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                      >
                        <path
                          d="M5 0v10M0 5h10"
                          stroke={isOpen ? "#FAF5F0" : "#1E0E06"}
                          strokeWidth="1"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-500"
                    style={{ maxHeight: isOpen ? 300 : 0 }}
                  >
                    <p className="max-w-[580px] pb-7 text-[14.5px] leading-[1.8] text-ink-muted">
                      {faq.a}
                    </p>
                  </div>
                </Reveal>
              );
            })}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
