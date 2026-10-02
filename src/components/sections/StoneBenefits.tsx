"use client";

import { useState } from "react";
import Image from "next/image";
import { unsplash } from "@/lib/images";

const BENEFITS = [
  {
    num: "01",
    title: "Stain Safe",
    body: "Stone surfaces are virtually impervious to spills, oils, turmeric, and acids that permanently discolour wood or laminate. A simple wipe is all it takes — even years later.",
    detail: "Hardness: 6–7 Mohs · Non-porous surface · No sealing required",
    src: unsplash("1558346648-9757f2fa4474", 1200, 900),
    alt: "White marble countertop — stain resistant",
  },
  {
    num: "02",
    title: "Scratch Safe",
    body: "Knives, utensils and abrasive cleaning pads leave no mark on a stone surface. The crystalline structure is far harder than steel — built for the way kitchens actually get used.",
    detail: "Compressive strength: 100–250 MPa · No surface coating that wears off",
    src: unsplash("1603369425250-b276f2006ec0", 1200, 900),
    alt: "Stone surface close-up — scratch proof",
  },
  {
    num: "03",
    title: "High Load Bearing",
    body: "Our stone panels support continuous loads that would cause wooden shelving to bow or fail. Heavy appliances, stacked crockery, and corner storage loads are handled without compromise.",
    detail: "Load capacity: up to 400 kg/m² · No deflection under sustained load",
    src: unsplash("1683629357963-adf2b1fa9ad9", 1200, 900),
    alt: "Kitchen island with heavy stone countertop",
  },
  {
    num: "04",
    title: "Fire Safe",
    body: "Stone is fully non-combustible. It does not ignite, does not emit toxic fumes, and does not propagate flame. The safest surface to cook on — and the easiest to work near open flames.",
    detail: "Ignition temperature: none · Zero VOC emission · Class A fire rating",
    src: unsplash("1551554781-c46200ea959d", 1200, 900),
    alt: "Calacatta marble — fire safe material",
  },
  {
    num: "05",
    title: "Water Safe",
    body: "Zero water absorption means stone cannot swell, delaminate or rot. High humidity, steam and accidental flooding leave no lasting mark — unlike MDF-based cabinetry that swells and warps.",
    detail: "Water absorption: < 0.1% · Ideal for coastal and humid climates",
    src: unsplash("1566305977571-5666677c6e98", 1200, 900),
    alt: "Grey marble — water resistant",
  },
  {
    num: "06",
    title: "Impact Safe",
    body: "The dense crystalline structure of natural stone absorbs and distributes impact energy across its surface. Chips are rare; fractures, rarer. A material that ages with dignity rather than showing damage.",
    detail: "Density: 2,600–2,900 kg/m³ · No hollow-core failure risk",
    src: unsplash("1758565811438-23e44c7c65fa", 1200, 900),
    alt: "Stone kitchen surface — impact resistant",
  },
  {
    num: "07",
    title: "More Storage",
    body: "Our wall units are engineered with extra depth and full-height profiles, delivering up to 62% more usable storage than a standard kitchen. Every centimetre is designed with purpose.",
    detail: "Depth: up to 400mm · Full-height to ceiling available · Custom internal fittings",
    src: unsplash("1643949915134-73a4c880f7c7", 1200, 900),
    alt: "Kitchen storage with stone cabinets",
  },
];

export default function StoneBenefits() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);

  const goTo = (idx: number) => {
    setActiveIdx((prev) => {
      if (prev === idx) return prev;
      setPrevIdx(prev);
      return idx;
    });
  };

  const active = BENEFITS[activeIdx];
  const prev = prevIdx !== null ? BENEFITS[prevIdx] : null;

  return (
    <>
      {/* ── Mobile: vertical accordion ── */}
      <section className="bg-cream py-20 md:hidden">
        <div className="px-6">
          <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-text">
            04 — Stone Advantages
          </p>
          <h2 className="mb-9 font-serif font-light leading-[1.1] text-ink text-[clamp(1.8rem,7vw,2.5rem)]">
            Why stone makes <em>all the difference.</em>
          </h2>

          <div className="border-b border-ink/15">
            {BENEFITS.map((b, i) => {
              const isOpen = mobileOpen === i;
              return (
                <div key={b.num} className="border-t border-ink/15">
                  <button
                    type="button"
                    onClick={() => setMobileOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-3 py-5 text-left"
                  >
                    <div className="flex flex-1 items-center gap-3.5">
                      <span className="shrink-0 text-[9px] font-semibold tracking-[0.12em] text-ink">
                        {b.num}
                      </span>
                      <h3 className="font-serif text-xl font-medium leading-tight text-ink">
                        {b.title}
                      </h3>
                    </div>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen ? "border-ink bg-ink" : "border-ink/20"
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
                          stroke={isOpen ? "#F3F0E7" : "#272624"}
                          strokeWidth="1"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-500"
                    style={{ maxHeight: isOpen ? 400 : 0 }}
                  >
                    <p className="pb-3 text-sm leading-relaxed text-stone-text">
                      {b.body}
                    </p>
                    <p className="pb-5 text-[9.5px] tracking-[0.12em] text-ink/70">
                      {b.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Desktop: hover/click panel ── */}
      <section className="relative hidden bg-cream py-20 md:block">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col px-16 lg:px-24">
          <div className="flex shrink-0 items-end justify-between pb-10">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-text">
                04 — Stone Advantages
              </p>
              <h2 className="font-serif font-light leading-[1.05] text-ink text-[clamp(1.8rem,3.2vw,3.2rem)]">
                Why stone makes <em>all the difference.</em>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-px w-16 bg-ink/20">
                <div
                  className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-500"
                  style={{ width: `${((activeIdx + 1) / BENEFITS.length) * 100}%` }}
                />
              </div>
              <p className="text-[10px] tracking-[0.1em] text-ink">
                {String(activeIdx + 1).padStart(2, "0")} /{" "}
                {String(BENEFITS.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="grid h-[70vh] min-h-[540px] max-h-[720px] grid-cols-[380px_1fr] overflow-hidden border border-ink/15">
            <div className="flex flex-col overflow-hidden border-r border-ink/15">
              <div className="flex-1 overflow-y-auto">
                {BENEFITS.map((b, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <button
                      key={b.num}
                      type="button"
                      onClick={() => goTo(i)}
                      onMouseEnter={() => goTo(i)}
                      onFocus={() => goTo(i)}
                      className={`relative flex w-full items-center overflow-hidden border-b border-ink/15 px-8 text-left transition-colors duration-500 ${
                        isActive ? "bg-beige/50" : "h-11 bg-transparent"
                      }`}
                    >
                        <span
                          className="absolute inset-y-0 left-0 w-[3px] bg-ink transition-opacity duration-500"
                          style={{ opacity: isActive ? 1 : 0 }}
                        />
                        <div className={isActive ? "py-5" : ""}>
                          <div className="flex items-center gap-3.5">
                            <span className="shrink-0 text-[9px] font-semibold tracking-[0.12em] text-ink">
                              {b.num}
                            </span>
                            <span
                              className={`font-serif leading-tight transition-all duration-300 ${
                                isActive
                                  ? "text-[19px] font-medium text-ink"
                                  : "text-sm text-ink/45"
                              }`}
                            >
                              {b.title}
                            </span>
                          </div>
                          <div
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: isActive ? 180 : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                          >
                            <p className="mb-2.5 mt-2.5 pl-[23px] text-[12.5px] leading-relaxed text-stone-text">
                              {b.body}
                            </p>
                            <p className="pl-[23px] text-[9px] tracking-[0.12em] text-ink/70">
                              {b.detail}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex shrink-0 items-center gap-2.5 border-t border-ink/15 px-8 py-3.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
                      fill="#272624"
                      fillOpacity="0.65"
                    />
                  </svg>
                  <p className="text-[9px] tracking-[0.14em] text-ink/60">
                    HOVER TO PREVIEW
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden bg-charcoal">
                {prev && (
                  <Image
                    key={`prev-${prevIdx}`}
                    src={prev.src}
                    alt={prev.alt}
                    fill
                    sizes="60vw"
                    className="object-cover"
                    style={{
                      animation: "sbFadeOut 0.65s cubic-bezier(0.16,1,0.3,1) forwards",
                      zIndex: 1,
                    }}
                  />
                )}
                <Image
                  key={`active-${activeIdx}`}
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="60vw"
                  className="object-cover"
                  style={{
                    animation: "sbFadeIn 0.65s cubic-bezier(0.16,1,0.3,1) forwards",
                    zIndex: 2,
                  }}
                />
                <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                <div
                  key={`label-${activeIdx}`}
                  className="absolute inset-x-10 bottom-9 z-[4]"
                  style={{
                    animation: "sbSlideUp 0.5s 0.15s cubic-bezier(0.16,1,0.3,1) both",
                  }}
                >
                  <p className="mb-2 text-[9px] font-medium tracking-[0.22em] text-white/50">
                    {active.num} · STONE ADVANTAGE
                  </p>
                  <h3 className="font-serif text-[clamp(1.4rem,2.2vw,2.4rem)] font-light italic leading-[1.05] text-white">
                    {active.title}
                  </h3>
                </div>
                <div className="absolute right-5 top-1/2 z-[5] flex -translate-y-1/2 flex-col gap-[7px]">
                  {BENEFITS.map((_, i) => (
                    <div
                      key={i}
                      className="w-[3px] rounded-full bg-white/30 transition-all duration-500"
                      style={{
                        height: i === activeIdx ? 18 : 3,
                        background: i === activeIdx ? "#FAF5F0" : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        <style>{`
          @keyframes sbFadeIn {
            from { opacity: 0; transform: scale(1.04); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes sbFadeOut {
            from { opacity: 1; transform: scale(1); }
            to   { opacity: 0; transform: scale(0.97); }
          }
          @keyframes sbSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    </>
  );
}
