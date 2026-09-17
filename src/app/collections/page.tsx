import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InViewReveal from "@/components/InViewReveal";
import { unsplash } from "@/lib/images";

export const metadata: Metadata = {
  title: "Collections | Arka Kitchen Studio",
  description:
    "Four distinct kitchen design languages — Monolith, Warm Minimal, Contemporary and Signature — each a complete world.",
};

const collections = [
  {
    id: "monolith",
    name: "MONOLITH",
    tagline: "Stone-forward architecture.",
    desc: "A collection defined by the rawness and permanence of natural stone. Monolith kitchens treat surfaces as architecture — counters that become walls, islands that become sculptures. Every slab is hand-selected.",
    materials: ["Calacatta Nero", "Honed Concrete", "Brushed Steel", "Smoked Glass"],
    img: unsplash("1663811397261-916af74a9363", 1400, 900),
    alt: "Monolith dark contemporary kitchen",
  },
  {
    id: "warm-minimal",
    name: "WARM MINIMAL",
    tagline: "Walnut + neutral tones.",
    desc: "Restraint is the design. Warm Minimal is a collection that finds its character in texture and proportion rather than ornamentation. Smoked walnut, linen-white lacquer, and unlacquered brass — nothing more.",
    materials: ["Smoked Walnut", "Linen Lacquer", "Aged Brass", "Travertine"],
    img: unsplash("1758448755927-e5c5ae14790c", 1400, 900),
    alt: "Warm minimal kitchen with marble accents",
  },
  {
    id: "contemporary",
    name: "CONTEMPORARY",
    tagline: "Clean geometry + modern materials.",
    desc: "Precise geometry, seamless integration, and a commitment to the invisible — where the refrigerator disappears and the kitchen becomes architecture. Contemporary is for those who demand performance without compromise.",
    materials: ["Calacatta Marble", "Matte White", "Integrated Steel", "White Oak"],
    img: unsplash("1671197244266-73129c97c096", 1400, 900),
    alt: "Contemporary kitchen with marble countertops",
  },
  {
    id: "signature",
    name: "SIGNATURE",
    tagline: "Highly customized luxury kitchens.",
    desc: "No catalogue. No precedent. Signature is a fully bespoke service for spaces that require singular solutions. We begin with a blank page and build entirely around your architecture, your life, and your vision.",
    materials: ["By Commission", "Any Material", "Custom Hardware", "Bespoke Joinery"],
    img: unsplash("1769737122085-97b1ee5ab104", 1400, 900),
    alt: "Signature luxury kitchen with ocean view",
  },
];

export default function CollectionsPage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="mx-auto max-w-screen-xl px-8 pb-20 pt-36 md:px-16">
        <InViewReveal>
          <p className="mb-6 text-label text-accent">COLLECTIONS</p>
        </InViewReveal>
        <InViewReveal delay={100}>
          <h1 className="text-display text-[clamp(2.8rem,6vw,7.5rem)] leading-[1.02] text-ink">
            A Collection of
            <br />
            <em>Possibilities.</em>
          </h1>
        </InViewReveal>
        <InViewReveal delay={200}>
          <p className="mt-8 max-w-[560px] text-body text-[17px] text-ink-muted">
            Four distinct design languages, each a complete world. Find the
            one that resonates — or begin a Signature commission with a blank
            page.
          </p>
        </InViewReveal>
      </div>

      {/* Collections */}
      {collections.map((col, i) => (
        <section key={col.id} className={i % 2 === 0 ? "bg-bg" : "bg-bg-warm"}>
          <div
            className={`mx-auto grid max-w-screen-xl items-center gap-0 px-8 py-20 md:grid-cols-2 md:px-16 ${
              i % 2 !== 0 ? "md:[direction:rtl]" : ""
            }`}
          >
            <div className={i % 2 !== 0 ? "md:[direction:ltr] md:pl-20" : "md:pr-20"}>
              <InViewReveal delay={0}>
                <p className="section-num mb-4">0{i + 1}</p>
              </InViewReveal>
              <InViewReveal delay={80}>
                <h2 className="mb-3 text-display text-[clamp(2rem,3.5vw,3.5rem)] text-ink">
                  {col.name}
                </h2>
              </InViewReveal>
              <InViewReveal delay={160}>
                <p className="mb-6 text-label text-accent">{col.tagline}</p>
              </InViewReveal>
              <InViewReveal delay={200}>
                <p className="mb-8 max-w-[440px] text-body text-[16px] text-ink-muted">
                  {col.desc}
                </p>
              </InViewReveal>
              <InViewReveal delay={240}>
                <div className="mb-8">
                  <p className="mb-3 text-label text-ink-muted">
                    SIGNATURE MATERIALS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {col.materials.map((m) => (
                      <span
                        key={m}
                        className="border border-border px-3 py-1.5 text-label text-[9px] text-ink-muted"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </InViewReveal>
              <InViewReveal delay={280}>
                <button
                  type="button"
                  className="arrow-link border-b border-ink pb-1 text-label text-ink"
                  data-cursor="open"
                >
                  EXPLORE COLLECTION
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path
                      d="M0 6h14M9 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </button>
              </InViewReveal>
            </div>

            <div
              className={`${i % 2 !== 0 ? "md:[direction:ltr]" : ""} cursor-none`}
              data-cursor="view"
            >
              <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                <Image
                  src={col.img}
                  alt={col.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="section-dark py-32">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-12 px-8 md:flex-row md:items-end md:px-16">
          <InViewReveal>
            <div>
              <p className="mb-6 text-label text-accent">BEGIN YOURS</p>
              <h2 className="text-display text-[clamp(2rem,4vw,4.5rem)] text-bg-warm">
                Not seeing
                <br />
                <em>what you imagined?</em>
              </h2>
            </div>
          </InViewReveal>
          <InViewReveal delay={150}>
            <div className="flex flex-col gap-4">
              <p className="max-w-[320px] text-body text-bg-warm/55">
                Every Signature kitchen is designed from scratch. Tell us
                what you&rsquo;re imagining.
              </p>
              <Link
                href="/contact"
                className="magnetic-btn inline-block bg-accent px-10 py-4 text-center text-label tracking-widest text-bg-warm transition-colors duration-500 hover:bg-highlight"
                data-cursor="open"
              >
                BEGIN A COMMISSION
              </Link>
            </div>
          </InViewReveal>
        </div>
      </section>
    </div>
  );
}
