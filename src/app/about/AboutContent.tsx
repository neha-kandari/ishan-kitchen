"use client";

import { useState } from "react";
import Image from "next/image";
import InViewReveal from "@/components/InViewReveal";
import ZoomImage from "@/components/ZoomImage";
import { unsplash } from "@/lib/images";

const values: { label: string; img: string; alt: string }[] = [
  {
    label: "Craft",
    img: unsplash("1736506159893-22cca29b8018", 1600, 900),
    alt: "Brushed European oak grain",
  },
  {
    label: "Precision",
    img: unsplash("1566305977571-5666677c6e98", 1600, 900),
    alt: "Nero Marquina dark marble",
  },
  {
    label: "Material",
    img: unsplash("1551554781-c46200ea959d", 1600, 900),
    alt: "Calacatta marble texture",
  },
  {
    label: "Detail",
    img: unsplash("1603369425250-b276f2006ec0", 1600, 900),
    alt: "Roman travertine stone",
  },
  {
    label: "Longevity",
    img: unsplash("1736506159776-22ca388780fa", 1600, 900),
    alt: "Smoked walnut grain",
  },
];

const craftStats: [string, string][] = [
  ["12", "Years"],
  ["180+", "Kitchens"],
  ["8", "Cities"],
];

const commitmentStats = [
  { n: "10", l: "Year Warranty" },
  { n: "∞", l: "Lifetime Support" },
  { n: "180+", l: "Kitchens Delivered" },
  { n: "100%", l: "Client Satisfaction" },
];

const team = [
  {
    name: "Priya Mehta",
    role: "Founder & Lead Designer",
    desc: "Trained at the Architectural Association, London. 18 years of residential kitchen design across Europe and India.",
    img: unsplash("1613545564267-b80e188a1541", 400, 500),
    alt: "Priya Mehta portrait",
  },
  {
    name: "Arjun Rao",
    role: "Head of Materials",
    desc: "Former stone specialist with quarries in Rajasthan and Italy. Expert in natural material selection and aging.",
    img: unsplash("1728745277862-bc0b2d68c50c", 400, 500),
    alt: "Arjun Rao portrait",
  },
  {
    name: "Leila Kapoor",
    role: "Design Director",
    desc: "From the Politecnico di Milano. Specialises in spatial sequence, light, and the architecture of daily ritual.",
    img: unsplash("1671197244266-73129c97c096", 400, 500),
    alt: "Leila Kapoor portrait",
  },
];

export default function AboutContent() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[460px] w-full overflow-hidden bg-charcoal">
        <ZoomImage
          src={unsplash("1502005097973-6a7082348e28", 1800, 1000)}
          alt="Architectural kitchen design studio"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/25 to-dark/55" />
        <div className="absolute inset-0 flex items-end px-6 pb-20 md:px-16 lg:px-24">
          <div>
            <p className="text-label mb-5 text-accent">About</p>
            <h1 className="max-w-3xl font-serif font-light leading-[1.02] text-bg-warm text-[clamp(2.4rem,5vw,5.5rem)]">
              We Believe Great Design
              <br />
              <em>Should Feel Effortless.</em>
            </h1>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-bg-warm py-32 md:py-44">
        <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-6 md:grid-cols-2 md:gap-24 md:px-16 lg:px-24">
          <div>
            <InViewReveal>
              <p className="mb-6 text-label text-accent">Our Philosophy</p>
            </InViewReveal>
            <InViewReveal delay={100}>
              <h2 className="mb-8 font-serif font-light leading-[1.05] text-ink text-[clamp(2rem,3.5vw,3.5rem)]">
                A Kitchen Is Not
                <br />
                <em>Furniture. It&rsquo;s Architecture.</em>
              </h2>
            </InViewReveal>
            <InViewReveal delay={180}>
              <p className="mb-6 max-w-[480px] text-body text-[17px] text-ink-muted">
                Founded in 2014 by Priya Mehta after a decade of residential
                architecture practice in London, Arka was born from one
                conviction: that the kitchen deserves the same design
                intelligence as every other part of the home.
              </p>
            </InViewReveal>
            <InViewReveal delay={240}>
              <p className="max-w-[480px] text-body text-[17px] text-ink-muted">
                We are not a furniture company. We are a design studio that
                happens to build kitchens — and the distinction is visible in
                every project we complete.
              </p>
            </InViewReveal>
          </div>
          <InViewReveal delay={150} direction="scale">
            <div
              className="img-zoom relative aspect-[3/4] w-full cursor-none overflow-hidden"
              data-cursor="view"
            >
              <Image
                src={unsplash("1758565811352-a439bd6f956e", 800, 1000)}
                alt="Arka kitchen design studio philosophy"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
          </InViewReveal>
        </div>
      </section>

      {/* Brand values — typographic, with a hover backdrop photo per row */}
      <section className="relative overflow-hidden bg-bg py-24">
        <div className="pointer-events-none absolute inset-0 z-0">
          {values.map((v, i) => (
            <Image
              key={v.label}
              src={v.img}
              alt={v.alt}
              fill
              sizes="100vw"
              className="object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ opacity: hoveredValue === i ? 1 : 0 }}
            />
          ))}
          <div
            className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/55 to-dark/40 transition-opacity duration-500"
            style={{ opacity: hoveredValue !== null ? 1 : 0 }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-16 lg:px-24">
          <InViewReveal>
            <p
              className={`mb-12 text-label transition-colors duration-500 ${
                hoveredValue !== null ? "text-cream/60" : "text-accent"
              }`}
            >
              Our Values
            </p>
          </InViewReveal>
        </div>
        {values.map((v, i) => (
          <InViewReveal key={v.label} delay={i * 80}>
            <div
              onMouseEnter={() => setHoveredValue(i)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`relative z-10 flex cursor-default items-center justify-between overflow-hidden border-b px-6 py-6 transition-colors duration-500 md:px-16 lg:px-24 ${
                hoveredValue !== null ? "border-cream/15" : "border-border"
              }`}
            >
              <h3
                className={`font-serif font-light leading-[0.95] tracking-[-0.02em] transition-colors duration-500 text-[clamp(2.5rem,7vw,9rem)] ${
                  hoveredValue === i
                    ? "italic text-bg-warm"
                    : hoveredValue !== null
                      ? "text-cream/50"
                      : "text-ink"
                }`}
              >
                {v.label}
              </h3>
              <p
                className={`hidden text-[9px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 md:block ${
                  hoveredValue !== null ? "text-cream/40" : "text-ink-muted"
                }`}
              >
                0{i + 1}
              </p>
            </div>
          </InViewReveal>
        ))}
      </section>

      {/* Our craft */}
      <section className="bg-bg-warm py-32 md:py-44">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16 lg:px-24">
          <div className="grid items-start gap-16 md:grid-cols-2 md:gap-24">
            <div>
              <InViewReveal>
                <p className="mb-6 text-label text-accent">Our Craft</p>
              </InViewReveal>
              <InViewReveal delay={100}>
                <h2 className="mb-8 font-serif font-light leading-[1.05] text-ink text-[clamp(2rem,3.5vw,3.5rem)]">
                  Made by Hand.
                  <br />
                  <em>Built to Last.</em>
                </h2>
              </InViewReveal>
              <InViewReveal delay={180}>
                <p className="mb-6 max-w-[460px] text-body text-[16px] text-ink-muted">
                  Every kitchen we produce is made in our workshop in Gurugram
                  by a team of specialist craftspeople. We do not outsource
                  manufacturing. We do not use standard modules. Every
                  component is made to drawing.
                </p>
              </InViewReveal>
              <InViewReveal delay={240}>
                <p className="mb-8 max-w-[460px] text-body text-[16px] text-ink-muted">
                  We work with stone fabricators, metal workers, and glass
                  specialists who understand that a kitchen made with this
                  level of intention demands an equivalent level of
                  execution.
                </p>
              </InViewReveal>
              <InViewReveal delay={300}>
                <div className="grid grid-cols-3 gap-8 border-t border-border pt-8">
                  {craftStats.map(([n, l]) => (
                    <div key={l}>
                      <p className="mb-1 font-serif font-light leading-none text-ink text-[2.5rem]">
                        {n}
                      </p>
                      <p className="text-label text-ink-muted">{l}</p>
                    </div>
                  ))}
                </div>
              </InViewReveal>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InViewReveal delay={100}>
                <div
                  className="img-zoom relative aspect-[3/4] w-full cursor-none overflow-hidden"
                  data-cursor="view"
                >
                  <Image
                    src={unsplash("1760072513457-651955c7074d", 500, 700)}
                    alt="Kitchen craftsmanship detail"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 22vw, 45vw"
                  />
                </div>
              </InViewReveal>
              <InViewReveal delay={200}>
                <div
                  className="img-zoom relative mt-12 aspect-[3/4] w-full cursor-none overflow-hidden"
                  data-cursor="view"
                >
                  <Image
                    src={unsplash("1639405069836-f82aa6dcb900", 500, 700)}
                    alt="Material precision detail"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 22vw, 45vw"
                  />
                </div>
              </InViewReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bg py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16 lg:px-24">
          <InViewReveal>
            <p className="mb-6 text-label text-accent">The Studio</p>
          </InViewReveal>
          <InViewReveal delay={100}>
            <h2 className="mb-20 font-serif font-light leading-[1.05] text-ink text-[clamp(2rem,3.5vw,3.5rem)]">
              <em>People</em> Behind
              <br />
              the Kitchens.
            </h2>
          </InViewReveal>

          <div className="grid gap-12 md:grid-cols-3">
            {team.map((member, i) => (
              <InViewReveal key={member.name} delay={i * 100}>
                <div className="group cursor-none" data-cursor="view">
                  <div className="img-zoom relative mb-6 aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={member.img}
                      alt={member.alt}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      sizes="(min-width: 768px) 30vw, 90vw"
                    />
                  </div>
                  <h3 className="mb-1 font-serif font-light text-ink text-[22px]">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-label text-accent">{member.role}</p>
                  <p className="text-body text-sm text-ink-muted">
                    {member.desc}
                  </p>
                </div>
              </InViewReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="section-dark py-40">
        <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-6 md:grid-cols-2 md:px-16 lg:px-24">
          <InViewReveal>
            <div>
              <p className="mb-6 text-label text-accent">Our Commitment</p>
              <h2 className="mb-8 font-serif font-light text-bg-warm text-[clamp(2rem,3.5vw,3.5rem)]">
                A Kitchen That
                <br />
                <em>Outlasts Trends.</em>
              </h2>
              <p className="mb-6 max-w-[440px] text-body text-[16px] text-cream/60">
                We offer a 10-year structural warranty on every kitchen we
                produce. We are available for the lifetime of the kitchen —
                for adjustments, additions, and repairs.
              </p>
              <p className="max-w-[440px] text-body text-[16px] text-cream/60">
                We also offer a material re-treatment service for stone and
                wood surfaces, so your kitchen looks as considered at twenty
                years as it did on day one.
              </p>
            </div>
          </InViewReveal>
          <InViewReveal delay={150}>
            <div className="grid grid-cols-2 gap-px bg-cream/10">
              {commitmentStats.map(({ n, l }) => (
                <div key={l} className="bg-dark p-8">
                  <p className="mb-2 font-serif font-light text-accent text-[3rem]">
                    {n}
                  </p>
                  <p className="text-label text-cream/50">{l}</p>
                </div>
              ))}
            </div>
          </InViewReveal>
        </div>
      </section>
    </>
  );
}
