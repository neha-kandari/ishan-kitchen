"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const REVIEWS = [
  {
    quote:
      "The team understood our brief better than we did. Our kitchen is now the soul of our home.",
    name: "Ananya & Vikram Mehra",
    city: "New Delhi",
    project: "Warm Minimal — 2025",
    avatar: "AM",
  },
  {
    quote:
      "Impeccable craftsmanship. Every detail — from the drawer mechanism to the marble selection — is faultless.",
    name: "Siddharth Bose",
    city: "Kolkata",
    project: "Monolith — 2024",
    avatar: "SB",
  },
  {
    quote:
      "We were nervous about a 20-week timeline. They delivered in 18 — and the result exceeded every expectation.",
    name: "Meera & Rahul Joshi",
    city: "Pune",
    project: "Contemporary — 2025",
    avatar: "MJ",
  },
  {
    quote:
      "What sets Arka apart is their complete honesty about materials and time. No surprises, only delight.",
    name: "Pooja Nair",
    city: "Bangalore",
    project: "Signature — 2024",
    avatar: "PN",
  },
  {
    quote:
      "Three months in and every single cabinet still opens perfectly. That says everything about their build quality.",
    name: "Arjun Kapoor",
    city: "Mumbai",
    project: "Contemporary — 2025",
    avatar: "AK",
  },
  {
    quote:
      "They didn't just design a kitchen — they redesigned how our family uses the space. Remarkable outcome.",
    name: "Deepa & Sriram Iyer",
    city: "Chennai",
    project: "Warm Minimal — 2024",
    avatar: "DI",
  },
];

function Stars({ size = 11 }: { size?: number }) {
  return (
    <div className="flex gap-[3px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill="#272624">
          <path d="M7 0l1.8 5.4H14L9.6 8.7l1.7 5.3L7 10.7l-4.3 3.3 1.7-5.3L0 5.4h5.2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [paused, setPaused] = useState(false);
  const cards = [...REVIEWS, ...REVIEWS];

  return (
    <section className="overflow-hidden border-t border-stone bg-cream py-16 md:py-24">
      <style>{`
        @keyframes reviewsScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <div className="mx-auto mb-8 max-w-[1600px] px-6 md:mb-12 md:px-16 lg:px-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-text">
                08 — Client Reviews
              </p>
              <h2 className="font-serif font-light leading-[1.02] text-ink text-[clamp(1.9rem,4vw,3.4rem)]">
                Heard from <em>our clients.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="text-right">
              <p className="font-serif text-4xl leading-none text-ink">5.0</p>
              <div className="my-2 flex justify-end">
                <Stars size={13} />
              </div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-stone-text">
                Based on 180+ kitchens
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex w-max gap-[3px]"
          style={{
            animation: "reviewsScroll 38s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {cards.map((r, i) => (
            <div
              key={i}
              className={`relative w-[380px] shrink-0 overflow-hidden px-10 pb-9 pt-10 ${
                i % 3 === 0 ? "bg-cream" : i % 3 === 1 ? "bg-beige/50" : "bg-stone/60"
              }`}
            >
              <span className="pointer-events-none absolute right-6 top-3 select-none font-serif text-[110px] leading-none text-ink/[0.09]">
                &rdquo;
              </span>

              <div className="mb-5">
                <Stars />
              </div>

              <blockquote className="mb-7 font-serif text-[16.5px] italic leading-relaxed text-ink">
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink">
                  <span className="text-[10px] font-semibold tracking-[0.04em] text-cream">
                    {r.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-[12.5px] font-medium text-ink">{r.name}</p>
                  <p className="text-[9.5px] tracking-[0.1em] text-stone-text">
                    {r.project} · {r.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
