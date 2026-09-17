"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { unsplash } from "@/lib/images";

const DURATION = 5000;

const PROJECTS = [
  {
    id: 1,
    name: "Residence No. 08",
    type: "Contemporary Kitchen",
    location: "New Delhi",
    year: "2025",
    src: unsplash("1758565811352-a439bd6f956e", 1400, 900),
    thumb: unsplash("1758565811352-a439bd6f956e", 160, 110),
  },
  {
    id: 2,
    name: "Residence No. 12",
    type: "Warm Minimal",
    location: "Mumbai",
    year: "2025",
    src: unsplash("1722605090433-41d1183a792d", 1400, 900),
    thumb: unsplash("1722605090433-41d1183a792d", 160, 110),
  },
  {
    id: 3,
    name: "Residence No. 04",
    type: "Monolith Stone",
    location: "Bangalore",
    year: "2024",
    src: unsplash("1663811396777-05505d999151", 1400, 900),
    thumb: unsplash("1663811396777-05505d999151", 160, 110),
  },
  {
    id: 4,
    name: "Residence No. 17",
    type: "Modern Classic",
    location: "Pune",
    year: "2024",
    src: unsplash("1682662044733-9120471befc7", 1400, 900),
    thumb: unsplash("1682662044733-9120471befc7", 160, 110),
  },
  {
    id: 5,
    name: "Residence No. 22",
    type: "Stone Series",
    location: "Chennai",
    year: "2024",
    src: unsplash("1643949915134-73a4c880f7c7", 1400, 900),
    thumb: unsplash("1643949915134-73a4c880f7c7", 160, 110),
  },
  {
    id: 6,
    name: "Residence No. 31",
    type: "Island Kitchen",
    location: "Hyderabad",
    year: "2024",
    src: unsplash("1683629357935-f3f4777ddf41", 1400, 900),
    thumb: unsplash("1683629357935-f3f4777ddf41", 160, 110),
  },
];

type Project = (typeof PROJECTS)[number];

function CrossfadeImage({
  active,
  prev,
  activeIdx,
  prevIdx,
  onHoverChange,
  className,
}: {
  active: Project;
  prev: Project | null;
  activeIdx: number;
  prevIdx: number | null;
  onHoverChange: (hovering: boolean) => void;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden bg-charcoal ${className ?? ""}`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {prev && (
        <Image
          key={`prev-${prevIdx}`}
          src={prev.src}
          alt={prev.name}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
          style={{
            animation: "projectFadeOut 0.65s cubic-bezier(0.16,1,0.3,1) forwards",
            zIndex: 1,
          }}
        />
      )}
      <Image
        key={`active-${activeIdx}`}
        src={active.src}
        alt={active.name}
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover"
        style={{
          animation: "projectFadeIn 0.65s cubic-bezier(0.16,1,0.3,1) forwards",
          zIndex: 2,
        }}
      />
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
      <div className="absolute inset-x-6 bottom-0 z-[4] flex items-end justify-between pb-6 md:inset-x-9 md:pb-8">
        <div>
          <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.22em] text-white/55">
            {active.type} · {active.location}
          </p>
          <h3 className="font-serif text-xl font-light text-white md:text-[clamp(1.4rem,2.5vw,2.2rem)]">
            {active.name}
          </h3>
        </div>
        <Link
          href="/#collections"
          className="hidden shrink-0 items-center gap-2.5 border border-white/30 bg-white/10 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-ink md:inline-flex"
        >
          View Project
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        setActiveIdx((prev) => {
          setPrevIdx(prev);
          return (prev + 1) % PROJECTS.length;
        });
        setTick((t) => t + 1);
      }
    }, DURATION);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    if (i === activeIdx) return;
    setPrevIdx(activeIdx);
    setActiveIdx(i);
    setTick((t) => t + 1);
    startCycle();
  };

  const active = PROJECTS[activeIdx];
  const prev = prevIdx !== null ? PROJECTS[prevIdx] : null;

  return (
    <section className="border-b border-ink/10 bg-cream py-16 md:py-24">
      <style>{`
        @keyframes projectFadeIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes projectFadeOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.98); }
        }
        @keyframes projectFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div className="mx-auto max-w-[1600px] px-6 md:px-16 lg:px-24">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-13 md:flex-row md:items-end">
          <div>
            <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-text">
              01 — Our Projects
            </p>
            <h2 className="font-serif font-light leading-[1.05] text-ink text-[clamp(1.9rem,4vw,3.4rem)]">
              Kitchens that speak <em>for themselves.</em>
            </h2>
          </div>
          <Link
            href="/#collections"
            className="hidden shrink-0 items-center gap-2.5 bg-ink px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-charcoal md:inline-flex"
          >
            View All Projects
            <span>→</span>
          </Link>
        </div>

        {/* Mobile: full-width image + horizontal thumb strip */}
        <div className="md:hidden">
          <CrossfadeImage
            active={active}
            prev={prev}
            activeIdx={activeIdx}
            prevIdx={prevIdx}
            onHoverChange={(hovering) => {
              isPaused.current = hovering;
            }}
            className="aspect-[4/3] w-full"
          />
          <div
            className="mt-3 flex gap-3 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {PROJECTS.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className="w-[calc(50%-6px)] shrink-0 text-left"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div
                    className={`relative overflow-hidden border p-2.5 ${
                      isActive ? "border-ink/40 bg-ink/5" : "border-ink/15 bg-beige/40"
                    }`}
                  >
                    {isActive && (
                      <div
                        key={`fill-${tick}`}
                        className="absolute inset-0 z-0 origin-left bg-ink/10"
                        style={{ animation: `projectFill ${DURATION}ms linear forwards` }}
                      />
                    )}
                    <div className="relative z-[1] aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={p.thumb}
                        alt={p.name}
                        fill
                        sizes="45vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="relative z-[1] mt-2 font-serif text-sm leading-tight text-ink">
                      {p.name}
                    </p>
                    <p className="relative z-[1] text-[9px] tracking-[0.1em] text-stone-text">
                      {p.type.toUpperCase()} · {p.year}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop: large image + list */}
        <div className="hidden grid-cols-[1fr_400px] gap-[3px] md:grid">
          <CrossfadeImage
            active={active}
            prev={prev}
            activeIdx={activeIdx}
            prevIdx={prevIdx}
            onHoverChange={(hovering) => {
              isPaused.current = hovering;
            }}
            className="min-h-[540px]"
          />

          <div className="flex flex-col bg-beige/40">
            {PROJECTS.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`group relative flex flex-1 items-center gap-4 border-b border-ink/10 px-5 text-left transition-colors last:border-b-0 ${
                    isActive ? "" : "hover:bg-ink/5"
                  }`}
                >
                  {isActive && (
                    <div
                      key={`fill-${tick}`}
                      className="absolute inset-0 z-0 origin-left bg-ink/10"
                      style={{ animation: `projectFill ${DURATION}ms linear forwards` }}
                    />
                  )}
                  <div
                    className={`relative z-[1] h-11 w-[60px] shrink-0 overflow-hidden border ${
                      isActive ? "border-ink/50" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={p.thumb}
                      alt={p.name}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative z-[1] flex-1">
                    <p
                      className={`font-serif leading-tight text-ink ${
                        isActive ? "text-[15px] font-semibold" : "text-sm"
                      }`}
                    >
                      {p.name}
                    </p>
                    <p
                      className={`mt-0.5 text-[10px] tracking-[0.1em] ${
                        isActive ? "text-ink/70" : "text-stone-text"
                      }`}
                    >
                      {p.type.toUpperCase()} · {p.year}
                    </p>
                  </div>
                  <span
                    className={`relative z-[1] h-[5px] w-[5px] shrink-0 rounded-full ${
                      isActive ? "bg-ink" : "border border-ink/30"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
