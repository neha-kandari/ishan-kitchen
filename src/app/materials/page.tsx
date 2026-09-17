import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InViewReveal from "@/components/InViewReveal";
import { unsplash } from "@/lib/images";

export const metadata: Metadata = {
  title: "Materials | Arka Kitchen Studio",
  description:
    "Stone, wood and metal — the material library behind every Arka kitchen, hand-selected from quarries and studios worldwide.",
};

const materialGroups = [
  {
    category: "Stone",
    label: "01 — STONE",
    intro:
      "Chosen from the finest quarries across Italy, Spain, Portugal and India. Every slab is hand-selected.",
    items: [
      {
        name: "Calacatta Oro",
        finish: "Polished",
        origin: "Apuan Alps, Italy",
        care: "Seal annually. Clean with pH-neutral solution.",
        desc: "Ivory white with bold amber and grey veining. A statement material of enduring rarity.",
        img: unsplash("1551554781-c46200ea959d", 500, 600),
        alt: "Calacatta marble texture",
      },
      {
        name: "Nero Marquina",
        finish: "Polished / Honed",
        origin: "Basque Country, Spain",
        care: "Seal annually. Avoid acidic cleaners.",
        desc: "Deep black with brilliant white veining. A bold counterpoint to warm interiors.",
        img: unsplash("1566305977571-5666677c6e98", 500, 600),
        alt: "Black marble texture",
      },
      {
        name: "Roman Travertine",
        finish: "Brushed / Filled",
        origin: "Tivoli, Italy",
        care: "Seal every 18 months. Wipe spills promptly.",
        desc: "Warm beige with a distinctive pitted surface. Ages beautifully over decades.",
        img: unsplash("1603369425250-b276f2006ec0", 500, 600),
        alt: "Travertine stone texture",
      },
      {
        name: "Bianco Carrara",
        finish: "Polished / Satin",
        origin: "Carrara, Italy",
        care: "Seal biannually. Mild soap and water.",
        desc: "The original luxury marble. Cool white with fine grey veining — timeless precision.",
        img: unsplash("1558346648-9757f2fa4474", 500, 600),
        alt: "White Carrara marble texture",
      },
    ],
  },
  {
    category: "Wood",
    label: "02 — WOOD",
    intro:
      "European and American hardwoods, responsibly sourced. Each veneer is sequenced for visual continuity.",
    items: [
      {
        name: "Smoked Walnut",
        finish: "Natural Oil",
        origin: "North America",
        care: "Oil annually with food-safe oil. Wipe dry.",
        desc: "Fumed American walnut with deep chocolate tones. The warmth that defines a room.",
        img: unsplash("1736506159776-22ca388780fa", 500, 600),
        alt: "Dark walnut wood grain",
      },
      {
        name: "Brushed European Oak",
        finish: "Lye + Oil",
        origin: "France / Germany",
        care: "Oil every 2 years. Avoid standing water.",
        desc: "Wire-brushed to accentuate the open grain. A bone-white surface tone of quiet elegance.",
        img: unsplash("1736506159893-22cca29b8018", 500, 600),
        alt: "Oak wood grain texture",
      },
      {
        name: "Ebonised Ash",
        finish: "Ebonising Treatment",
        origin: "Eastern Europe",
        care: "Wipe clean with damp cloth. Avoid abrasives.",
        desc: "Chemically darkened ash — a dramatic matte black that preserves the natural grain.",
        img: unsplash("1621295693450-080546d2ec8e", 500, 600),
        alt: "Dark wood grain texture",
      },
    ],
  },
  {
    category: "Metal",
    label: "03 — METAL",
    intro:
      "Sourced from specialist metalwork studios. Every hardware piece is finished to our specification.",
    items: [
      {
        name: "Unlacquered Brass",
        finish: "Living Patina",
        origin: "Custom-cast",
        care: "Allow to patina naturally. Clean with dry cloth.",
        desc: "A hardware material that transforms over time — the mark of a kitchen that has been lived in.",
        img: unsplash("1619976553860-b7ffbe9a093b", 500, 600),
        alt: "Brass metal texture",
      },
      {
        name: "Brushed Steel",
        finish: "Linear Brush",
        origin: "Custom-fabricated",
        care: "Wipe in direction of grain. Mild detergent.",
        desc: "Industrial precision with a refined finish. A material that performs as beautifully as it looks.",
        img: unsplash("1603323978104-4c1c0d1bfc72", 500, 600),
        alt: "Brushed metal surface",
      },
    ],
  },
];

export default function MaterialsPage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="relative h-[65vh] overflow-hidden">
        <Image
          src={unsplash("1683629357963-adf2b1fa9ad9", 1600, 900)}
          alt="Marble counter with kitchen materials"
          fill
          priority
          className="hero-img-ken object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 to-dark/60" />
        <div className="absolute bottom-16 left-8 text-bg-warm md:left-16">
          <p className="mb-4 text-label text-accent">MATERIALS</p>
          <h1 className="text-display text-[clamp(2.8rem,5.5vw,6.5rem)] leading-[1.02]">
            Material Is
            <br />
            <em>the Design.</em>
          </h1>
        </div>
        <style>{`
          @keyframes ken-burns { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
          .hero-img-ken { animation: ken-burns 12s ease-in-out infinite alternate; }
        `}</style>
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-screen-xl px-8 py-20 md:px-16">
        <InViewReveal>
          <p className="max-w-[680px] text-body text-[18px] leading-[1.8] text-ink-muted">
            We believe material selection is not a final step — it is the
            foundation of the design. Every surface, every edge, every
            hardware piece is chosen for how it feels, how it performs, and
            how it ages.
          </p>
        </InViewReveal>
      </div>

      {/* Material groups */}
      {materialGroups.map((group, gi) => (
        <section
          key={group.category}
          className={`${gi % 2 === 0 ? "bg-bg" : "bg-bg-warm"} py-20`}
        >
          <div className="mx-auto max-w-screen-xl px-8 md:px-16">
            <InViewReveal>
              <div className="mb-16 flex items-end justify-between border-b border-border pb-8">
                <div>
                  <p className="mb-3 text-label text-accent">{group.label}</p>
                  <h2 className="text-display text-[clamp(1.8rem,3vw,3rem)] text-ink">
                    {group.category}
                  </h2>
                </div>
                <p className="hidden max-w-[360px] text-body text-sm text-ink-muted md:block">
                  {group.intro}
                </p>
              </div>
            </InViewReveal>

            <div className="h-scroll-container gap-6 pb-6">
              {group.items.map((mat, i) => (
                <div
                  key={mat.name}
                  className="h-scroll-item group w-[min(340px,78vw)] cursor-none"
                  data-cursor="view"
                >
                  <InViewReveal delay={i * 80}>
                    <div className="img-zoom relative mb-6 aspect-[5/6] overflow-hidden">
                      <Image
                        src={mat.img}
                        alt={mat.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 340px, 78vw"
                      />
                    </div>
                    <p className="mb-2 text-label text-accent">
                      {mat.finish} · {mat.origin}
                    </p>
                    <h3 className="mb-3 text-display text-[22px] text-ink">
                      {mat.name}
                    </h3>
                    <p className="mb-3 text-body text-sm text-ink-muted">
                      {mat.desc}
                    </p>
                    <p className="text-label text-[9px] text-ink-muted opacity-60">
                      CARE: {mat.care}
                    </p>
                  </InViewReveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom statement */}
      <section className="section-dark py-40 text-center">
        <div className="mx-auto max-w-screen-xl px-8 md:px-16">
          <InViewReveal>
            <p className="mb-8 text-label text-accent">THE MATERIAL LIBRARY</p>
          </InViewReveal>
          <InViewReveal delay={100}>
            <h2 className="mb-8 text-display text-[clamp(2rem,4.5vw,5rem)] leading-[1.05] text-bg-warm">
              Visit our studio to experience
              <br />
              <em>the full material library.</em>
            </h2>
          </InViewReveal>
          <InViewReveal delay={200}>
            <Link
              href="/contact"
              className="magnetic-btn inline-block border border-bg-warm/40 px-10 py-4 text-label tracking-widest text-bg-warm transition-all duration-500 hover:border-accent hover:bg-accent"
              data-cursor="open"
            >
              BOOK A STUDIO VISIT
            </Link>
          </InViewReveal>
        </div>
      </section>
    </div>
  );
}
