"use client";

import { useState } from "react";
import Image from "next/image";
import InViewReveal from "@/components/InViewReveal";
import { unsplash } from "@/lib/images";

const kitchens = [
  {
    name: "The Bone White",
    style: "Minimal",
    category: "minimal",
    desc: "Bone white lacquer, integrated handles, and Calacatta marble — a study in deliberate restraint.",
    size: "lg",
    img: unsplash("1613545564267-b80e188a1541", 900, 700),
    alt: "Minimal white kitchen cabinets",
  },
  {
    name: "Carbon Monolith",
    style: "Contemporary",
    category: "contemporary",
    desc: "Matte carbon cabinetry, precision engineered with near-invisible hardware.",
    size: "sm",
    img: unsplash("1663811397261-916af74a9363", 600, 700),
    alt: "Contemporary black kitchen design",
  },
  {
    name: "The Warm Edit",
    style: "Luxury",
    category: "luxury",
    desc: "Smoked oak veneer, aged brass hardware, and a hand-selected Travertine island.",
    size: "sm",
    img: unsplash("1758448755927-e5c5ae14790c", 600, 700),
    alt: "Warm kitchen with marble accents",
  },
  {
    name: "Studio Concrete",
    style: "Minimal",
    category: "minimal",
    desc: "Polished concrete surfaces, integrated appliances, and raw steel details.",
    size: "sm",
    img: unsplash("1758565811430-3423f31396f9", 600, 700),
    alt: "Modern kitchen with concrete ceiling",
  },
  {
    name: "Calacatta Grand",
    style: "Classic",
    category: "classic",
    desc: "Book-matched Calacatta Oro marble from counter to ceiling — the definitive luxury statement.",
    size: "lg",
    img: unsplash("1671197244266-73129c97c096", 900, 600),
    alt: "Modern kitchen with marble countertops",
  },
  {
    name: "Island Living",
    style: "Contemporary",
    category: "contemporary",
    desc: "A generously proportioned kitchen centred around an oversized walnut island.",
    size: "sm",
    img: unsplash("1760072513457-651955c7074d", 600, 500),
    alt: "Kitchen with large island and dining area",
  },
  {
    name: "The Compact Edit",
    style: "Compact",
    category: "compact",
    desc: "Intelligent spatial design that delivers a full luxury experience within 8 sqm.",
    size: "sm",
    img: unsplash("1502005097973-6a7082348e28", 600, 700),
    alt: "Compact luxury kitchen design",
  },
  {
    name: "Signature Brass",
    style: "Luxury",
    category: "luxury",
    desc: "Unlacquered brass hardware, hand-rubbed limewash plaster, and bespoke oak joinery.",
    size: "lg",
    img: unsplash("1769737122085-97b1ee5ab104", 900, 700),
    alt: "Kitchen with ocean view and luxury finishes",
  },
];

const filters = ["All", "Contemporary", "Minimal", "Classic", "Luxury", "Compact"];

export default function KitchensGrid() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? kitchens
      : kitchens.filter((k) => k.category === active.toLowerCase());

  return (
    <>
      {/* Filters */}
      <div className="sticky top-[72px] z-40 border-b border-border bg-bg-warm/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-xl flex-wrap gap-2 px-8 py-5 md:px-16">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`border px-5 py-2 text-label tracking-[0.12em] transition-all duration-300 ${
                active === f
                  ? "border-dark bg-dark text-bg-warm"
                  : "border-border bg-transparent text-ink-muted"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Kitchen grid */}
      <div className="mx-auto max-w-screen-xl px-8 py-20 md:px-16">
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {visible.map((k, i) => (
            <InViewReveal key={k.name} delay={i * 60}>
              <div
                className={`group relative cursor-none overflow-hidden bg-bg ${
                  k.size === "lg" ? "aspect-[4/3]" : "aspect-[3/4]"
                }`}
                data-cursor="view"
              >
                <Image
                  src={k.img}
                  alt={k.alt}
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 text-bg-warm transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 md:p-8">
                  <p className="mb-2 text-label opacity-60">{k.style}</p>
                  <h3 className="mb-2 text-display text-[clamp(1.2rem,2vw,1.6rem)]">
                    {k.name}
                  </h3>
                  <p className="max-w-[300px] text-body text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-70">
                    {k.desc}
                  </p>
                  <div className="delay-100 mt-4 arrow-link text-label text-xs opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    EXPLORE
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path
                        d="M0 5h12M8 1l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </InViewReveal>
          ))}
        </div>
      </div>
    </>
  );
}
