"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { unsplash } from "@/lib/images";

type Tag = "STONE" | "WOOD";

const MATERIALS: {
  name: string;
  finish: string;
  origin: string;
  desc: string;
  tag: Tag;
  src: string;
  alt: string;
}[] = [
  {
    name: "Calacatta Marble",
    finish: "Honed",
    origin: "Apuan Alps, Italy",
    desc: "Ivory white with bold amber veining — a statement surface of enduring rarity.",
    tag: "STONE",
    src: unsplash("1551554781-c46200ea959d", 800, 1000),
    alt: "Calacatta marble texture",
  },
  {
    name: "Smoked Walnut",
    finish: "Natural Oil",
    origin: "North America",
    desc: "Fumed American walnut with deep chocolate tones — the warmth that defines a room.",
    tag: "WOOD",
    src: unsplash("1736506159776-22ca388780fa", 800, 1000),
    alt: "Smoked walnut grain",
  },
  {
    name: "Roman Travertine",
    finish: "Brushed",
    origin: "Tivoli, Italy",
    desc: "Warm beige with a distinctive pitted surface. Ages beautifully over decades.",
    tag: "STONE",
    src: unsplash("1603369425250-b276f2006ec0", 800, 1000),
    alt: "Travertine stone",
  },
  {
    name: "Nero Marquina",
    finish: "Polished",
    origin: "Basque Country, Spain",
    desc: "Deep charcoal with brilliant white veining — a bold counterpoint to warm interiors.",
    tag: "STONE",
    src: unsplash("1566305977571-5666677c6e98", 800, 1000),
    alt: "Dark marble",
  },
  {
    name: "Brushed European Oak",
    finish: "Lye + Oil",
    origin: "France / Germany",
    desc: "Wire-brushed to accentuate open grain — a bone-white surface of quiet elegance.",
    tag: "WOOD",
    src: unsplash("1736506159893-22cca29b8018", 800, 1000),
    alt: "European oak grain",
  },
  {
    name: "Bianco Carrara",
    finish: "Polished",
    origin: "Carrara, Italy",
    desc: "Cool white with fine grey veining — the original luxury marble. Timeless precision.",
    tag: "STONE",
    src: unsplash("1558346648-9757f2fa4474", 800, 1000),
    alt: "Bianco Carrara marble",
  },
];

const FILTERS = ["ALL", "STONE", "WOOD"] as const;

export default function MaterialReel() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const visible =
    filter === "ALL" ? MATERIALS : MATERIALS.filter((m) => m.tag === filter);

  function selectFilter(f: (typeof FILTERS)[number]) {
    setFilter(f);
    setActive(0);
  }

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % visible.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, visible.length]);

  return (
    <section id="materials" className="bg-beige/40 py-20 md:py-24">
      <style>{`
        @keyframes matProgress { from { width: 0; } to { width: 100%; } }
      `}</style>

      <div className="mx-auto max-w-[1600px] px-6 pb-9 md:px-16 lg:px-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-text">
              03 — Material Library
            </p>
            <h2 className="font-serif font-light leading-[1.05] text-ink text-[clamp(1.9rem,4vw,3.4rem)]">
              Touch is the first <em>test of quality.</em>
            </h2>
          </div>
          <div className="flex gap-0.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => selectFilter(f)}
                className={`px-5 py-2.5 text-[9.5px] font-medium tracking-[0.18em] transition-colors ${
                  filter === f
                    ? "bg-ink text-cream"
                    : "border border-ink/20 text-ink/50 hover:border-ink/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="flex flex-col gap-[3px] md:hidden">
        {visible.map((m, i) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setActive(i)}
            className="relative overflow-hidden text-left"
          >
            <div className="relative h-[220px] w-full">
              <Image
                src={m.src}
                alt={m.alt}
                fill
                sizes="100vw"
                className={`object-cover transition-[filter] duration-500 ${
                  i === active ? "brightness-[0.65]" : "brightness-[0.5] saturate-[0.7]"
                }`}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="mb-2.5 inline-block border border-ink/40 px-2 py-1 text-[8px] tracking-[0.2em] text-ink">
                {m.tag} · {m.finish.toUpperCase()}
              </span>
              <h3 className="font-serif text-xl italic leading-tight text-cream">
                {m.name}
              </h3>
              <p className="mt-1 text-[11.5px] leading-relaxed text-cream/50">
                {m.origin}
              </p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2 py-5 md:hidden">
        {visible.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-5 bg-ink" : "w-1.5 bg-ink/30"
            }`}
          />
        ))}
      </div>

      {/* Desktop: horizontal accordion */}
      <div
        className="hidden h-[560px] overflow-hidden md:flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {visible.map((m, i) => {
          const isActive = i === active;
          return (
            <div
              key={m.name}
              onClick={() => setActive(i)}
              className="relative cursor-pointer overflow-hidden border-r border-cream/10 transition-[flex] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] last:border-r-0"
              style={{ flex: isActive ? 4 : 1 }}
            >
              <Image
                src={m.src}
                alt={m.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{
                  transform: isActive ? "scale(1)" : "scale(1.06)",
                  filter: isActive ? "none" : "brightness(0.45) saturate(0.6)",
                }}
              />
              <div
                className="absolute inset-0 transition-[background] duration-700"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(15,13,11,0.9) 0%, rgba(15,13,11,0.25) 55%, transparent 100%)"
                    : "rgba(15,13,11,0.2)",
                }}
              />

              {!isActive && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <p className="whitespace-nowrap font-serif text-sm italic text-cream/70 [writing-mode:vertical-rl]">
                    {m.name}
                  </p>
                </div>
              )}

              <div
                className={`absolute inset-x-0 bottom-0 p-10 transition-all duration-500 ${
                  isActive
                    ? "translate-y-0 opacity-100 delay-200"
                    : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <span className="mb-4 inline-block border border-ink/40 px-3 py-1 text-[8.5px] tracking-[0.22em] text-cream">
                  {m.tag} · {m.finish.toUpperCase()}
                </span>
                <h3 className="mb-3.5 font-serif italic leading-[1.08] text-cream text-[clamp(1.6rem,2.4vw,2.6rem)]">
                  {m.name}
                </h3>
                <p className="mb-6 max-w-[340px] text-[12.5px] leading-relaxed text-cream/50">
                  {m.desc}
                </p>
                <div className="flex gap-0">
                  {[
                    { label: "FINISH", val: m.finish },
                    { label: "ORIGIN", val: m.origin },
                  ].map((d, di) => (
                    <div
                      key={d.label}
                      className={`pr-6 ${di === 0 ? "mr-6 border-r border-cream/15" : ""}`}
                    >
                      <p className="mb-1.5 text-[8px] tracking-[0.16em] text-cream/30">
                        {d.label}
                      </p>
                      <p className="text-xs text-cream/70">{d.val}</p>
                    </div>
                  ))}
                </div>
                {!paused && isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-cream/10">
                    <div
                      key={`${filter}-${i}-${active}`}
                      className="h-full bg-ink"
                      style={{ animation: "matProgress 4s linear forwards" }}
                    />
                  </div>
                )}
              </div>

              <div
                className="absolute right-7 top-6 text-[10px] tracking-[0.1em] text-cream/30 transition-opacity duration-500"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                {String(i + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden justify-center gap-2 py-9 md:flex">
        {visible.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-ink" : "w-1.5 bg-ink/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
