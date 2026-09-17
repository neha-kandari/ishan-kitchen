"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InViewReveal from "@/components/InViewReveal";
import HoverImage from "@/components/HoverImage";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { unsplash } from "@/lib/images";

function matSwatch(name: string) {
  const m = name.toLowerCase();
  if (m.includes("calacatta oro")) return "#C8A430";
  if (m.includes("calacatta")) return "#DDD5C4";
  if (m.includes("nero") || m.includes("carbon") || m.includes("matte black"))
    return "#1A1917";
  if (m.includes("brass")) return "#B8963A";
  if (m.includes("steel")) return "#9EA4A8";
  if (m.includes("walnut")) return "#4E2E1A";
  if (m.includes("oak") || m.includes("teak")) return "#8C6235";
  if (m.includes("ivory") || m.includes("bone")) return "#EBE0C5";
  if (m.includes("travertine")) return "#C8B898";
  if (m.includes("glass")) return "#A8C8C0";
  if (m.includes("white")) return "#EDEBE4";
  return "#B8AF9F";
}

interface Highlight {
  title: string;
  desc: string;
}

interface Project {
  id: string;
  name: string;
  location: string;
  year: string;
  style: string;
  sqm: string;
  leadTime: string;
  materials: string[];
  brief: string;
  quote: string;
  client: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  highlights: Highlight[];
  challenge: string;
  solution: string;
}

const projects: Project[] = [
  {
    id: "res-08",
    name: "Residence No. 08",
    location: "New Delhi",
    year: "2025",
    style: "Contemporary Minimal",
    sqm: "18 sqm",
    leadTime: "22 weeks",
    materials: ["Calacatta Marble", "Brushed Steel", "Lacquer White"],
    brief:
      "A full-height marble kitchen designed around a chef's daily ritual. Integrated appliances, a 3.2m island, and skylights that shift the space from morning to evening.",
    quote: "Every detail was designed to disappear into the architecture.",
    client: "Priya & Arjun Sharma",
    img1: unsplash("1758565811352-a439bd6f956e", 1400, 900),
    img2: unsplash("1639405069836-f82aa6dcb900", 900, 700),
    img3: unsplash("1683629357963-adf2b1fa9ad9", 900, 700),
    img4: unsplash("1758565811430-3423f31396f9", 1400, 800),
    highlights: [
      {
        title: "3.2m Waterfall Island",
        desc: "A single slab of Calacatta marble wraps the island top and both sides, eliminating every visible seam.",
      },
      {
        title: "Zenithal Skylights",
        desc: "Three roof lights track the sun across the marble surface, transforming the kitchen's mood from cool morning to amber dusk.",
      },
      {
        title: "Fully Concealed Appliances",
        desc: "All appliances sit behind push-to-open lacquer panels, preserving the monolithic wall elevation at every angle.",
      },
    ],
    challenge:
      "Unite a professional-grade cooking environment with the visual silence of a gallery space in a single 18 sqm volume.",
    solution:
      "A continuous Calacatta marble plane from floor to ceiling dissolves the boundary between worksurface and architecture, letting the kitchen read as pure form.",
  },
  {
    id: "res-12",
    name: "Residence No. 12",
    location: "Mumbai",
    year: "2025",
    style: "Warm Minimal",
    sqm: "14 sqm",
    leadTime: "18 weeks",
    materials: ["Smoked Walnut", "Bone Lacquer", "Unlacquered Brass"],
    brief:
      "Smoked walnut and bone-white lacquer against a sweeping sea view. The kitchen becomes an extension of the horizon.",
    quote: "The kitchen disappeared. Only the view remained.",
    client: "Kavita Menon",
    img1: unsplash("1769737122085-97b1ee5ab104", 1400, 900),
    img2: unsplash("1760072513457-651955c7074d", 900, 700),
    img3: unsplash("1758565811438-23e44c7c65fa", 900, 700),
    img4: unsplash("1722605090433-41d1183a792d", 1400, 800),
    highlights: [
      {
        title: "View-Aligned Layout",
        desc: "Every primary workstation faces the sea, so the horizon becomes the focal point of daily kitchen life.",
      },
      {
        title: "Unlacquered Brass Hardware",
        desc: "Raw brass fittings are left to patina naturally, accruing a warmth that echoes the sunset palette outside.",
      },
      {
        title: "Floor-to-Ceiling Smoked Walnut",
        desc: "Vertical grain walnut panels extend from plinth to cornice, anchoring the space without competing with the view.",
      },
    ],
    challenge:
      "Design a 14 sqm kitchen that competes with — and ultimately defers to — one of Mumbai's most dramatic sea views.",
    solution:
      "A deliberate palette of warm neutrals and natural materials recedes visually, framing the panorama as the room's defining architectural element.",
  },
  {
    id: "res-04",
    name: "Residence No. 04",
    location: "Gurugram",
    year: "2024",
    style: "Monolith",
    sqm: "22 sqm",
    leadTime: "26 weeks",
    materials: ["Nero Marquina", "Carbon Lacquer", "Brushed Steel"],
    brief:
      "Carbon black cabinetry, Nero Marquina marble, and brushed steel — an uncompromising statement that transforms a penthouse kitchen into sculpture.",
    quote: "Architecture that happens to be a kitchen.",
    client: "Rohan Kapoor",
    img1: unsplash("1663811397261-916af74a9363", 1400, 900),
    img2: unsplash("1663811396777-05505d999151", 900, 700),
    img3: unsplash("1566305977571-5666677c6e98", 900, 700),
    img4: unsplash("1758565811145-619f5e20f196", 1400, 800),
    highlights: [
      {
        title: "Monolithic Carbon Block",
        desc: "Upper and lower cabinetry are finished in identical carbon lacquer, erasing the visual break between zones.",
      },
      {
        title: "Nero Marquina Feature Wall",
        desc: "A 4m continuous slab of black-and-white marble becomes the room's single dominant gesture.",
      },
      {
        title: "Recessed Brushed Steel",
        desc: "All handles are replaced by a continuous brushed steel channel running the full cabinet length — tactile precision at scale.",
      },
    ],
    challenge:
      "Deliver a kitchen for a collector of minimal art that functions as a statement sculpture without sacrificing a single square centimetre of usability.",
    solution:
      "Radical material restraint — three tones, three materials, zero ornamentation — channels every visual tension into the Nero Marquina slab behind the hob.",
  },
  {
    id: "res-16",
    name: "Residence No. 16",
    location: "Bangalore",
    year: "2026",
    style: "Signature",
    sqm: "30 sqm",
    leadTime: "24 weeks",
    materials: ["Calacatta Oro", "Custom Oak", "Unlacquered Brass"],
    brief:
      "A Signature commission built around the owners' art collection. Custom oak joinery, unlacquered brass, and a bespoke Calacatta Oro island.",
    quote: "The most personal kitchen we have ever designed.",
    client: "Deepa & Sriram Iyer",
    img1: unsplash("1758448755927-e5c5ae14790c", 1400, 900),
    img2: unsplash("1671197244266-73129c97c096", 900, 700),
    img3: unsplash("1559554704-0f74b35a8718", 900, 700),
    img4: unsplash("1643949915134-73a4c880f7c7", 1400, 800),
    highlights: [
      {
        title: "Bespoke Calacatta Oro Island",
        desc: "A book-matched 3.6m island slab is bookmarked by the clients' own bronze sculptures, treating the worksurface as a plinth.",
      },
      {
        title: "Artisan Oak Joinery",
        desc: "Each cabinet door is individually coopered by hand, giving the oak wall a subtle relief that reads differently under every light.",
      },
      {
        title: "Gallery-Grade Lighting",
        desc: "A museum lighting consultant specified each circuit, ensuring artwork and marble receive the same rigour of illumination.",
      },
    ],
    challenge:
      "Integrate a world-class private art collection into a working family kitchen without reducing either the art or the architecture.",
    solution:
      "Treating every surface as a potential plinth — island, shelving, and niches — gave the art genuine architectural context while the kitchen receded into warm, handcrafted calm.",
  },
  {
    id: "res-21",
    name: "Residence No. 21",
    location: "Chennai",
    year: "2024",
    style: "Classic",
    sqm: "16 sqm",
    leadTime: "20 weeks",
    materials: ["Ivory Lacquer", "Fluted Glass", "Reclaimed Oak"],
    brief:
      "A timeless kitchen for a heritage apartment. Ivory lacquer, fluted glass, and unlacquered brass hardware with bespoke reclaimed oak floors.",
    quote: "A kitchen that feels like it has always been there.",
    client: "Pooja Nair",
    img1: unsplash("1613545564267-b80e188a1541", 1400, 900),
    img2: unsplash("1502005097973-6a7082348e28", 900, 700),
    img3: unsplash("1551554781-c46200ea959d", 900, 700),
    img4: unsplash("1558346648-9757f2fa4474", 1400, 800),
    highlights: [
      {
        title: "Heritage Fluted Glass Cabinets",
        desc: "Upper cabinets use period-correct fluted glass with brass astragal bars, referencing the Art Deco language of the original building.",
      },
      {
        title: "Reclaimed Teak Floor",
        desc: "Boards salvaged from a demolished 1940s Chettinad home were re-laid at the original 45-degree angle, carrying genuine history underfoot.",
      },
      {
        title: "Hand-Cast Brass Hardware",
        desc: "Every pull and hinge was individually cast in Jaipur to a 1930s pattern, then aged to match the apartment's original fittings.",
      },
    ],
    challenge:
      "Bring a fully modern kitchen into a heritage-listed Art Deco apartment without disturbing its 1930s soul or its structural integrity.",
    solution:
      "Period materials and construction techniques — fluted glass, reclaimed timber, hand-cast brass — were paired with modern appliances concealed behind historically faithful cabinetry.",
  },
  {
    id: "res-09",
    name: "Residence No. 09",
    location: "Pune",
    year: "2025",
    style: "Contemporary",
    sqm: "20 sqm",
    leadTime: "19 weeks",
    materials: ["Roman Travertine", "White Oak", "Matte Black"],
    brief:
      "A family kitchen designed for joy. A 4m breakfast bar, integrated charging, and custom drawer organizers — luxury that performs.",
    quote: "Functional perfection is its own kind of luxury.",
    client: "Meera & Rahul Joshi",
    img1: unsplash("1758565811430-3423f31396f9", 1400, 900),
    img2: unsplash("1683629357935-f3f4777ddf41", 900, 700),
    img3: unsplash("1603369425250-b276f2006ec0", 900, 700),
    img4: unsplash("1682662044733-9120471befc7", 1400, 800),
    highlights: [
      {
        title: "4m Social Breakfast Bar",
        desc: "The oversized white oak bar seats six and integrates flush wireless charging pads, making it the household's natural gathering hub.",
      },
      {
        title: "Roman Travertine Feature",
        desc: "A cross-cut travertine backsplash brings organic texture to the matte black zone, preventing austerity from tipping into coldness.",
      },
      {
        title: "Precision Drawer Architecture",
        desc: "Every deep drawer ships with a bespoke oak insert system — cutlery, spice, knife, and pantry zones each engineered to their exact contents.",
      },
    ],
    challenge:
      "Design a high-performance family kitchen that feels genuinely luxurious in daily use without requiring a curator to maintain its appearance.",
    solution:
      "Durable natural materials — travertine, solid oak, matte black steel — were selected for their ability to look better with use, while obsessive internal organisation makes effortless tidiness the default.",
  },
];

const categories = [
  {
    label: "Contemporary",
    desc: "Clean lines, integrated technology, and precision materiality.",
    img: projects[0].img1,
    count: "2 projects",
  },
  {
    label: "Monolith",
    desc: "Single-material statements of radical restraint.",
    img: projects[2].img1,
    count: "1 project",
  },
  {
    label: "Warm Minimal",
    desc: "Natural materials and earned warmth without ornamentation.",
    img: projects[1].img1,
    count: "1 project",
  },
  {
    label: "Classic",
    desc: "Heritage craft and period references for lasting rooms.",
    img: projects[4].img1,
    count: "1 project",
  },
];

const studioNumbers: {
  value: number;
  format: (n: number) => string;
  label: string;
}[] = [
  { value: 18, format: (n) => `${Math.round(n)}+`, label: "Years of\ncraft" },
  { value: 6, format: (n) => `${Math.round(n)}`, label: "Completed\nkitchens" },
  { value: 5, format: (n) => `${Math.round(n)}`, label: "Cities\nacross India" },
  { value: 100, format: (n) => `${Math.round(n)}%`, label: "Stone\nmaterials" },
  { value: 22, format: (n) => `${Math.round(n)} wks`, label: "Average\nlead time" },
];

const heroStats: {
  value: number;
  format: (n: number) => string;
  label: string;
}[] = [
  {
    value: 6,
    format: (n) => String(Math.round(n)).padStart(2, "0"),
    label: "COMPLETED\nPROJECTS",
  },
  {
    value: 5,
    format: (n) => String(Math.round(n)).padStart(2, "0"),
    label: "CITIES\nACROSS INDIA",
  },
  { value: 22, format: (n) => `${Math.round(n)}+`, label: "WEEKS AVG\nLEAD TIME" },
];

/** Floating image that trails the cursor over the desktop project list,
 * swapping to whichever row is currently hovered. */
function CursorImagePreview({
  containerRef,
  activeImg,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeImg: string | null;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    container.addEventListener("mousemove", onMove);

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${current.current.x + 26}px, ${current.current.y - 100}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [containerRef]);

  return (
    <div
      ref={previewRef}
      className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-[190px] w-[260px] overflow-hidden shadow-[0_30px_60px_rgba(30,14,6,0.25)] md:block"
      style={{
        opacity: activeImg ? 1 : 0,
        transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {activeImg && (
        <Image
          key={activeImg}
          src={activeImg}
          alt=""
          fill
          sizes="260px"
          className="object-cover"
          style={{ animation: "previewIn 0.5s cubic-bezier(0.16,1,0.3,1)" }}
        />
      )}
    </div>
  );
}

export default function ProjectsContent() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function handleSelect(p: Project) {
    setSelected(p);
    window.scrollTo({ top: 0 });
  }

  if (selected) {
    const idx = projects.findIndex((p) => p.id === selected.id);
    const next = projects[(idx + 1) % projects.length];
    return (
      <ProjectDetail
        project={selected}
        next={next}
        onBack={() => setSelected(null)}
        onSelect={handleSelect}
      />
    );
  }

  const spotlight = projects[2];

  return (
    <div className="min-h-screen bg-bg-warm">
      {/* Page header */}
      <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-[100px] md:px-14 md:pb-20 md:pt-[140px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-0">
          <div>
            <InViewReveal>
              <p className="mb-[18px] text-[9.5px] font-medium tracking-[0.28em] text-accent">
                PORTFOLIO · SELECTED WORK
              </p>
            </InViewReveal>
            <InViewReveal delay={55}>
              <h1 className="font-serif font-medium leading-[0.92] tracking-[-0.03em] text-ink text-[clamp(3.2rem,7.5vw,9rem)]">
                Selected
                <br />
                <em>Spaces.</em>
              </h1>
            </InViewReveal>
          </div>
          <InViewReveal delay={120} direction="right">
            <div className="flex gap-7 pb-0 md:gap-12 md:pb-2.5">
              {heroStats.map((s) => (
                <div key={s.label} className="text-left md:text-right">
                  <p className="font-serif italic leading-none text-ink text-[28px] md:text-[38px]">
                    <CountUp value={s.value} format={s.format} />
                  </p>
                  <p className="mt-1.5 whitespace-pre-line text-left text-[7.5px] tracking-[0.2em] text-accent md:text-right">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </InViewReveal>
        </div>
      </div>

      {/* Index table */}
      <div
        ref={listRef}
        onMouseLeave={() => setHoveredImg(null)}
        className="relative mx-auto max-w-[1280px] px-5 md:px-14"
      >
        <div className="hidden grid-cols-[48px_1fr_180px_140px_64px_72px_120px_32px] border-y border-border py-2.5 lg:grid">
          {["#", "PROJECT", "STYLE", "LOCATION", "YEAR", "AREA", "", ""].map(
            (h, i) => (
              <p
                key={i}
                className="text-[8px] font-medium tracking-[0.22em] text-accent/55"
              >
                {h}
              </p>
            )
          )}
        </div>
        <div className="border-t border-border lg:hidden" />

        {projects.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            onSelect={() => handleSelect(p)}
            onHover={() => setHoveredImg(p.img1)}
          />
        ))}

        <div className="border-t border-border" />
        <CursorImagePreview containerRef={listRef} activeImg={hoveredImg} />
      </div>

      {/* Featured spotlight */}
      <div className="mt-16 bg-ink md:mt-[120px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-stretch md:min-h-[560px] md:grid-cols-2">
          <div className="relative h-[300px] overflow-hidden md:h-auto">
            <Image
              src={spotlight.img1}
              alt={spotlight.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ animation: "kenBrowse 20s ease-out infinite alternate" }}
            />
            <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,transparent_60%,#1E0E06_100%)] md:block" />
          </div>

          <div className="flex flex-col justify-center px-5 py-10 md:py-18 md:pl-16 md:pr-0">
            <InViewReveal>
              <p className="mb-7 text-[9px] tracking-[0.26em] text-accent">
                SPOTLIGHT · {spotlight.style.toUpperCase()}
              </p>
            </InViewReveal>
            <InViewReveal delay={60}>
              <h2 className="mb-7 font-serif italic leading-[1.1] tracking-[-0.015em] text-bg-warm text-[clamp(2rem,3.5vw,4rem)]">
                {spotlight.quote}
              </h2>
            </InViewReveal>
            <InViewReveal delay={120}>
              <p className="mb-11 max-w-[380px] text-[13px] leading-[1.8] text-cream/50">
                {spotlight.brief}
              </p>
            </InViewReveal>
            <InViewReveal delay={160}>
              <div className="mb-11 flex flex-wrap items-center gap-5 md:gap-7">
                {(
                  [
                    ["LOCATION", spotlight.location],
                    ["AREA", spotlight.sqm],
                    ["COMPLETED", spotlight.year],
                  ] as [string, string][]
                ).map(([l, v]) => (
                  <div key={l}>
                    <p className="mb-1 text-[7.5px] tracking-[0.2em] text-accent">
                      {l}
                    </p>
                    <p className="text-[13px] text-cream/75">{v}</p>
                  </div>
                ))}
              </div>
            </InViewReveal>
            <InViewReveal delay={200}>
              <MagneticButton>
                <button
                  type="button"
                  onClick={() => handleSelect(spotlight)}
                  data-cursor="open"
                  className="inline-flex items-center gap-3.5 self-start border border-cream/25 px-8 py-4 text-[9.5px] font-semibold tracking-[0.22em] text-bg-warm transition-colors duration-350 hover:border-accent/60 hover:bg-accent/30"
                >
                  VIEW THIS PROJECT
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path
                      d="M0 5h14M10 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </MagneticButton>
            </InViewReveal>
          </div>
        </div>
      </div>

      {/* Style categories */}
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-14 md:py-[104px]">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-14 md:flex-row md:items-end md:gap-0">
          <InViewReveal>
            <div>
              <p className="mb-3 text-[9.5px] tracking-[0.26em] text-accent">
                DESIGN LANGUAGE
              </p>
              <h2 className="font-serif font-medium leading-[1.05] tracking-[-0.02em] text-ink text-[clamp(1.8rem,3.2vw,3.4rem)]">
                Every kitchen speaks
                <br />
                <em>its own language.</em>
              </h2>
            </div>
          </InViewReveal>
          <InViewReveal direction="right">
            <p className="max-w-[280px] text-left text-[12px] leading-[1.7] text-accent md:text-right">
              From monolithic stone to warm heritage craft — each commission
              is shaped by the client&rsquo;s identity.
            </p>
          </InViewReveal>
        </div>

        <div className="grid grid-cols-2 gap-[3px] md:grid-cols-4">
          {categories.map((cat, i) => (
            <InViewReveal key={cat.label} delay={i * 70} direction="scale">
              <TiltCard
                dataCursor="view"
                className="group relative aspect-[3/4] overflow-hidden bg-black"
              >
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover brightness-[0.55] transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:brightness-[0.7]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,13,11,0.9)_0%,transparent_55%)]" />
                <div className="absolute bottom-4 left-3.5 right-3.5 md:bottom-7 md:left-6 md:right-6">
                  <p className="mb-2 text-[8px] tracking-[0.18em] text-cream/40">
                    {cat.count.toUpperCase()}
                  </p>
                  <h3 className="mb-0 font-serif italic leading-[1.1] text-bg-warm text-base md:mb-2 md:text-[22px]">
                    {cat.label}
                  </h3>
                  <p className="hidden text-[11px] leading-[1.6] text-cream/50 md:block">
                    {cat.desc}
                  </p>
                </div>
              </TiltCard>
            </InViewReveal>
          ))}
        </div>
      </div>

      {/* Studio numbers */}
      <div className="border-y border-border bg-bg-secondary">
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 gap-y-8 px-5 py-12 md:grid-cols-5 md:gap-y-0 md:px-14 md:py-18">
          {studioNumbers.map((s, i) => (
            <InViewReveal key={s.label} delay={i * 55}>
              <div
                className={`border-border pl-4 md:pl-8 ${
                  i % 3 === 0 ? "border-l-0" : "border-l"
                } ${i === 0 ? "md:border-l-0" : "md:border-l"}`}
              >
                <p className="mb-2.5 font-serif italic leading-none text-ink text-[clamp(1.6rem,5vw,2.8rem)] md:text-[clamp(2rem,4vw,4.5rem)]">
                  <CountUp value={s.value} format={s.format} />
                </p>
                <p className="whitespace-pre-line text-[9.5px] leading-[1.6] tracking-[0.14em] text-accent">
                  {s.label}
                </p>
              </div>
            </InViewReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-5 py-16 md:grid-cols-[1fr_auto] md:gap-14 md:px-14 md:py-24">
        <InViewReveal>
          <p className="mb-3.5 text-[9px] tracking-[0.24em] text-accent">
            READY TO BEGIN?
          </p>
          <p className="font-serif italic leading-[1.1] tracking-[-0.015em] text-ink text-[clamp(1.8rem,3.2vw,3.8rem)]">
            Your kitchen is waiting
            <br />
            to be built.
          </p>
        </InViewReveal>
        <InViewReveal direction="right">
          <MagneticButton className="block w-full md:inline-block md:w-auto">
            <Link
              href="/contact"
              data-cursor="open"
              className="block w-full bg-ink px-10 py-[18px] text-center text-[9.5px] font-semibold tracking-[0.22em] text-bg-warm transition-colors duration-350 hover:bg-accent md:inline-block md:w-auto"
            >
              BOOK A CONSULTATION
            </Link>
          </MagneticButton>
        </InViewReveal>
      </div>

      <style>{`
        @keyframes kenBrowse {
          from { transform: scale(1.05) translateX(0); }
          to   { transform: scale(1)    translateX(-2%); }
        }
        @keyframes previewIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function ProjectRow({
  project: p,
  index: i,
  onSelect,
  onHover,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
  onHover?: () => void;
}) {
  return (
    <>
      {/* Mobile row */}
      <button
        type="button"
        onClick={onSelect}
        className="group flex w-full items-center gap-4 border-b border-border py-4 text-left transition-colors duration-300 hover:bg-bg-secondary lg:hidden"
      >
        <div className="relative h-14 w-20 shrink-0 overflow-hidden border border-border">
          <HoverImage src={p.img1} alt={p.name} sizes="80px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 truncate font-serif text-base font-medium leading-[1.2] text-ink">
            {p.name}
          </p>
          <p className="text-[10px] tracking-[0.08em] text-accent">
            {p.style} · {p.location} · {p.year}
          </p>
        </div>
        <div className="shrink-0 opacity-35 transition-opacity duration-300 group-hover:opacity-100">
          <svg width="16" height="10" viewBox="0 0 18 11" fill="none">
            <path
              d="M0 5.5h16M11 1l5 4.5L11 10"
              stroke="#372314"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Desktop row */}
      <button
        type="button"
        onClick={onSelect}
        onMouseEnter={onHover}
        data-cursor="view"
        className="group hidden min-h-[92px] w-full grid-cols-[48px_1fr_180px_140px_64px_72px_120px_32px] items-center border-b border-border text-left transition-colors duration-300 hover:bg-bg-secondary lg:grid"
      >
        <p className="text-[9.5px] font-semibold tracking-[0.14em] text-accent/45 transition-colors duration-300 group-hover:text-accent">
          {String(i + 1).padStart(2, "0")}
        </p>

        <div className="pr-6">
          <p className="font-serif text-[20px] font-medium leading-[1.15] text-ink transition-[font-size] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[22px]">
            {p.name}
          </p>
          <div className="max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-h-10 group-hover:opacity-100">
            <p className="mt-1 text-[11px] leading-[1.5] text-accent">
              {p.materials.join(" · ")}
            </p>
          </div>
        </div>

        <p className="text-[11px] tracking-[0.02em] text-stone-text">
          {p.style}
        </p>
        <p className="text-[11px] text-stone-text">{p.location}</p>
        <p className="text-[11px] text-accent">{p.year}</p>
        <p className="text-[11px] text-accent">{p.sqm}</p>

        <div className="h-[68px] w-[100px] shrink-0 overflow-hidden border border-transparent transition-colors duration-300 group-hover:border-accent/50">
          <div className="relative h-full w-full">
            <HoverImage src={p.img1} alt={p.name} sizes="100px" />
          </div>
        </div>

        <div className="flex -translate-x-1.5 justify-end opacity-0 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100">
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
            <path
              d="M0 5.5h16M11 1l5 4.5L11 10"
              stroke="#372314"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </>
  );
}

function ProjectDetail({
  project: p,
  next,
  onBack,
  onSelect,
}: {
  project: Project;
  next: Project;
  onBack: () => void;
  onSelect: (p: Project) => void;
}) {
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [specsReady, setSpecsReady] = useState(false);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? window.scrollY / total : 0);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const el = specsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSpecsReady(true);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const idx = projects.findIndex((proj) => proj.id === p.id);
  const scrolled = scrollY > 90;

  return (
    <div className="min-h-screen bg-bg-warm">
      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[200] h-0.5 bg-accent/10">
        <div
          className="h-full bg-accent transition-[width] duration-75 ease-linear"
          style={{ width: `${scrollPct * 100}%` }}
        />
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        data-cursor="open"
        className={`fixed left-4 top-24 z-[100] inline-flex items-center gap-2.5 text-[9px] tracking-[0.22em] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:left-12 md:top-28 ${
          scrolled
            ? "border border-border bg-bg-warm px-4 py-2.5 text-ink"
            : "border-0 bg-transparent px-0 py-0 text-cream/80"
        }`}
      >
        <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
          <path
            d="M15 5H1M6 1L1 5l5 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        BACK
      </button>

      {/* 1. Hero */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-x-0 -inset-y-[18%] will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <Image
            src={p.img1}
            alt={p.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(12,11,10,0.1)_0%,transparent_40%,rgba(12,11,10,0.75)_100%)]" />

        <div className="absolute right-4 top-5 md:right-14 md:top-11">
          <p className="text-[9px] tracking-[0.22em] text-cream/35">
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-18 md:pb-18">
          <p className="mb-3.5 text-[9px] tracking-[0.28em] text-cream/40">
            {p.style.toUpperCase()} · {p.location.toUpperCase()} · {p.year}
          </p>
          <h1 className="font-serif italic leading-[0.9] tracking-[-0.03em] text-bg-warm text-[clamp(3.5rem,7.5vw,9rem)]">
            {p.name}
          </h1>
        </div>

        <div
          className={`absolute bottom-[30px] right-5 hidden flex-col items-center gap-2 transition-opacity duration-400 md:right-14 md:flex md:bottom-11 ${
            scrollY < 50 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-12 w-px animate-[lineGrow_1.8s_ease-in-out_infinite] bg-cream/30" />
          <p className="text-[7.5px] tracking-[0.24em] text-cream/30">
            SCROLL
          </p>
        </div>
      </div>

      {/* 2. Specs bar */}
      <div ref={specsRef} className="bg-ink py-8 md:py-10">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-start gap-x-8 gap-y-5 px-5 md:flex-nowrap md:justify-between md:gap-0 md:px-14">
          {(
            [
              ["STYLE", p.style],
              ["LOCATION", p.location],
              ["AREA", p.sqm],
              ["LEAD TIME", p.leadTime],
              ["YEAR", p.year],
              ["CLIENT", p.client],
            ] as [string, string][]
          ).map(([l, v], i) => (
            <div
              key={l}
              className="min-w-[calc(50%-16px)] md:min-w-0"
              style={{
                opacity: specsReady ? 1 : 0,
                transform: specsReady ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.5s ${i * 70}ms, transform 0.5s ${
                  i * 70
                }ms cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              <p className="mb-2 text-[7.5px] tracking-[0.24em] text-accent">
                {l}
              </p>
              <p className="text-[13px] text-cream/[0.82]">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Brief + challenge/solution */}
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-14 md:py-24">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[3fr_2fr] md:gap-20">
          <InViewReveal>
            <p className="mb-7 text-[9.5px] tracking-[0.26em] text-accent">
              THE BRIEF
            </p>
            <p className="font-normal leading-[1.6] tracking-[-0.01em] text-ink text-[clamp(1.3rem,2.2vw,2.2rem)]">
              {p.brief}
            </p>
            <div className="mt-11 flex flex-wrap gap-2.5">
              {p.materials.map((m) => (
                <div
                  key={m}
                  className="flex items-center gap-2 border border-border bg-bg-warm px-3.5 py-1.5"
                >
                  <div
                    className="h-2.5 w-2.5 shrink-0"
                    style={{ background: matSwatch(m) }}
                  />
                  <span className="text-[9.5px] tracking-[0.12em] text-stone-text">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </InViewReveal>
          <InViewReveal
            delay={isMobile ? 0 : 100}
            direction={isMobile ? "up" : "right"}
          >
            <div className="pt-0 md:pt-12">
              <div className="mb-10">
                <div className="mb-4.5 flex items-center gap-4">
                  <div className="h-px w-6 bg-accent" />
                  <p className="text-[8.5px] tracking-[0.26em] text-accent">
                    THE CHALLENGE
                  </p>
                </div>
                <p className="text-[13.5px] leading-[1.82] text-ink">
                  {p.challenge}
                </p>
              </div>
              <div className="border-t border-border pt-10">
                <div className="mb-4.5 flex items-center gap-4">
                  <div className="h-px w-6 bg-accent" />
                  <p className="text-[8.5px] tracking-[0.26em] text-accent">
                    THE SOLUTION
                  </p>
                </div>
                <p className="text-[13.5px] leading-[1.82] text-ink">
                  {p.solution}
                </p>
              </div>
            </div>
          </InViewReveal>
        </div>
      </div>

      {/* 4. Asymmetric image block */}
      <div className="mx-auto max-w-full px-0 md:max-w-[1280px] md:px-14">
        <InViewReveal direction="scale">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-[3fr_2fr]">
            <div
              className="group relative aspect-[4/3] overflow-hidden md:row-span-2"
              data-cursor="view"
            >
              <Image
                src={p.img4}
                alt={p.name + " primary"}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-2 gap-1 md:grid-cols-1 md:grid-rows-2">
              {[p.img2, p.img3].map((src, si) => (
                <div
                  key={si}
                  className="group relative aspect-[3/2] overflow-hidden md:aspect-auto"
                  data-cursor="view"
                >
                  <Image
                    src={src}
                    alt={p.name + " detail " + (si + 1)}
                    fill
                    sizes="(min-width: 768px) 40vw, 50vw"
                    className="object-cover brightness-90 transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:brightness-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </InViewReveal>
      </div>

      {/* 5. Design highlights */}
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-14 md:py-24">
        <div className="mb-8 flex items-end justify-between md:mb-16">
          <InViewReveal>
            <div>
              <p className="mb-3 text-[9.5px] tracking-[0.26em] text-accent">
                DESIGN HIGHLIGHTS
              </p>
              <p className="font-serif italic leading-[1.1] text-ink text-[clamp(1.4rem,2.4vw,2.6rem)]">
                Three decisions that
                <br />
                define the space.
              </p>
            </div>
          </InViewReveal>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {p.highlights.map((h, hi) => (
            <InViewReveal key={h.title} delay={hi * 90}>
              <div
                className={`relative overflow-hidden px-0 py-7 transition-colors duration-400 hover:bg-bg-secondary md:px-10 md:py-11 ${
                  hi > 0
                    ? "border-t border-border md:border-l md:border-t-0"
                    : ""
                }`}
              >
                <p className="pointer-events-none absolute -top-2.5 right-4 select-none font-serif italic leading-none text-accent/[0.07] text-[120px]">
                  {String(hi + 1)}
                </p>
                <p className="relative mb-5 text-[8.5px] tracking-[0.22em] text-accent">
                  {String(hi + 1).padStart(2, "0")}
                </p>
                <h4 className="relative mb-5 font-serif text-[22px] leading-[1.2] text-ink">
                  {h.title}
                </h4>
                <div className="mb-5 h-px w-8 bg-accent" />
                <p className="relative text-[13px] leading-[1.82] text-ink">
                  {h.desc}
                </p>
              </div>
            </InViewReveal>
          ))}
        </div>
      </div>

      {/* 6. Full-bleed panoramic */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/8]"
        data-cursor="view"
      >
        <Image
          src={p.img1}
          alt={p.name + " panoramic"}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ animation: "kenDetail 16s ease-out forwards" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,13,11,0.55)_0%,transparent_50%)]" />
        <div className="absolute bottom-5 left-5 md:bottom-11 md:left-18">
          <p className="mb-2.5 text-[8.5px] tracking-[0.22em] text-cream/35">
            {p.style.toUpperCase()} · {p.location.toUpperCase()}
          </p>
          <p className="font-serif italic leading-[1.1] text-cream/80 text-[clamp(1.4rem,2.5vw,3rem)]">
            {p.name}
          </p>
        </div>
      </div>

      {/* 7. Materials */}
      <div className="border-t border-border bg-bg-warm">
        <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-14 md:py-20">
          <InViewReveal>
            <p className="mb-13 text-[9.5px] tracking-[0.26em] text-accent">
              MATERIALS SPECIFIED
            </p>
          </InViewReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-flow-col md:auto-cols-fr md:gap-0">
            {p.materials.map((m, mi) => (
              <InViewReveal key={m} delay={mi * 75} direction="left">
                <div
                  className={
                    mi < p.materials.length - 1
                      ? "md:mr-11 md:border-r md:border-border md:pr-11"
                      : ""
                  }
                >
                  <div
                    className="mb-6 h-[72px] w-full transition-[height] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] hover:h-[90px]"
                    style={{ background: matSwatch(m) }}
                  />
                  <p className="mb-2.5 text-[8px] tracking-[0.2em] text-accent">
                    {String(mi + 1).padStart(2, "0")}
                  </p>
                  <p className="font-serif text-xl leading-[1.2] text-ink">
                    {m}
                  </p>
                </div>
              </InViewReveal>
            ))}
          </div>
        </div>
      </div>

      {/* 8. Project data */}
      <div className="border-t border-border bg-bg-secondary">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-12 md:grid-cols-2 md:gap-20 md:px-14 md:py-20">
          <div>
            <InViewReveal>
              <p className="mb-11 text-[9.5px] tracking-[0.26em] text-accent">
                PROJECT DATA
              </p>
            </InViewReveal>
            {(
              [
                ["Project", p.name],
                ["Style", p.style],
                ["Location", p.location],
                ["Area", p.sqm],
                ["Lead Time", p.leadTime],
                ["Completed", p.year],
              ] as [string, string][]
            ).map(([label, val], di) => (
              <InViewReveal key={label} delay={di * 40}>
                <div className="flex items-baseline justify-between border-b border-border py-4">
                  <p className="text-[8.5px] font-medium tracking-[0.24em] text-accent">
                    {label.toUpperCase()}
                  </p>
                  <p className="text-[13px] text-ink">{val}</p>
                </div>
              </InViewReveal>
            ))}
          </div>

          <InViewReveal
            delay={100}
            direction={isMobile ? "up" : "right"}
          >
            <div className="flex flex-col justify-center pt-0 md:pt-20">
              <p className="mb-7 font-serif italic leading-[1.35] text-ink text-[clamp(1.5rem,2.5vw,2.8rem)]">
                &ldquo;{p.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3.5">
                <div className="h-px w-9 bg-accent" />
                <p className="text-[9px] tracking-[0.22em] text-accent">
                  {p.client.toUpperCase()}
                </p>
              </div>
            </div>
          </InViewReveal>
        </div>
      </div>

      {/* 9. Next project */}
      <button
        type="button"
        onClick={() => onSelect(next)}
        data-cursor="view"
        className="group relative block h-[320px] w-full overflow-hidden md:h-[500px]"
      >
        <Image
          src={next.img1}
          alt={next.name}
          fill
          sizes="100vw"
          className="object-cover brightness-[0.35] transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-50"
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="mb-5.5 text-[8.5px] tracking-[0.36em] text-cream/30">
            NEXT PROJECT
          </p>
          <h3 className="mb-5 font-serif italic leading-[0.92] tracking-[-0.025em] text-bg-warm text-[clamp(2.5rem,5.5vw,6.5rem)]">
            {next.name}
          </h3>
          <p className="mb-6 text-[9.5px] tracking-[0.18em] text-cream/35 md:mb-10">
            {next.style} · {next.location}
          </p>
          <MagneticButton strength={0.25}>
            <div className="inline-flex items-center gap-3.5 border border-cream/20 px-8 py-3.25 text-cream/65">
              <span className="text-[9.5px] tracking-[0.22em]">
                VIEW PROJECT
              </span>
              <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                <path
                  d="M0 5h15M10 1l5 4-5 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </MagneticButton>
        </div>
      </button>

      <style>{`
        @keyframes kenDetail {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }
        @keyframes lineGrow {
          0%, 100% { opacity: 0.2; transform: scaleY(0.5) translateY(-10px); }
          50%       { opacity: 0.7; transform: scaleY(1)   translateY(0); }
        }
      `}</style>
    </div>
  );
}
