"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import ZoomImage from "@/components/ZoomImage";
import { unsplash } from "@/lib/images";

const WORDS = ["Precision.", "Material.", "Wellness.", "You."];

const FACTS = [
  { n: "12+", label: "Years of Craft" },
  { n: "480+", label: "Kitchens Delivered" },
  { n: "10-Yr", label: "Structural Warranty" },
];

const PILLARS = [
  { icon: "◎", text: "Designed around your life — not a catalogue." },
  { icon: "◈", text: "Stone and solid joinery. Built to outlast trends." },
  { icon: "◐", text: "One team, from first sketch to final installation." },
];

export default function BrandStatement() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 320);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-b border-ink/10 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <div>
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-text">
                02 — Our Philosophy
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-serif font-light leading-[1.08] text-ink text-[clamp(2.1rem,4.5vw,3.6rem)]">
                Every kitchen starts with{" "}
                <span
                  className="inline-block min-w-[3ch] italic text-ink transition-all duration-300"
                  style={{
                    opacity: wordVisible ? 1 : 0,
                    transform: wordVisible ? "translateY(0)" : "translateY(10px)",
                  }}
                >
                  {WORDS[wordIdx]}
                </span>
              </h2>
            </Reveal>

            <div className="mt-10 flex flex-col gap-4">
              {PILLARS.map((p, i) => (
                <Reveal key={p.text} delay={0.12 + i * 0.06}>
                  <div className="flex items-center gap-4">
                    <span className="shrink-0 text-sm leading-none text-ink">
                      {p.icon}
                    </span>
                    <p className="text-sm leading-relaxed text-stone-text">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Reveal className="relative aspect-[4/3] w-full overflow-hidden">
              <ZoomImage
                src={unsplash("1758565811438-23e44c7c65fa", 900, 680)}
                alt="Arka kitchen island detail"
                sizes="(min-width: 768px) 38vw, 100vw"
              />
            </Reveal>

            <div className="grid grid-cols-3 bg-beige">
              {FACTS.map((f, i) => (
                <Reveal key={f.n} delay={i * 0.06}>
                  <div
                    className={`px-4 py-5 ${i < 2 ? "border-r border-ink/15" : ""}`}
                  >
                    <p className="font-serif text-xl leading-none text-ink md:text-2xl">
                      {f.n}
                    </p>
                    <p className="mt-2 text-[9px] font-medium uppercase leading-tight tracking-[0.15em] text-stone-text">
                      {f.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
