"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import HoverImage from "@/components/HoverImage";
import { unsplash } from "@/lib/images";

const GALLERY = [
  {
    caption: "Waterfall Marble Island",
    tag: "Contemporary Kitchen",
    span: "md:col-span-2 md:row-span-2",
    wide: false,
    src: unsplash("1758565811352-a439bd6f956e", 1400, 1400),
  },
  {
    caption: "Smoked Walnut Joinery",
    tag: "Warm Minimal",
    span: "",
    wide: false,
    src: unsplash("1722605090433-41d1183a792d", 800, 1000),
  },
  {
    caption: "Nero Marquina Detail",
    tag: "Monolith Stone",
    span: "",
    wide: false,
    src: unsplash("1663811396777-05505d999151", 800, 1000),
  },
  {
    caption: "Brushed Brass Hardware",
    tag: "Signature Finish",
    span: "",
    wide: false,
    src: unsplash("1671197244266-73129c97c096", 800, 1000),
  },
  {
    caption: "Roman Travertine Backsplash",
    tag: "Contemporary Kitchen",
    span: "",
    wide: false,
    src: unsplash("1603369425250-b276f2006ec0", 800, 1000),
  },
  {
    caption: "Ivory Heritage Cabinetry",
    tag: "Classic Kitchen",
    span: "md:col-span-2",
    wide: true,
    src: unsplash("1613545564267-b80e188a1541", 1200, 700),
  },
  {
    caption: "Calacatta Oro Countertop",
    tag: "Island Kitchen",
    span: "col-span-2",
    wide: true,
    src: unsplash("1643949915134-73a4c880f7c7", 1200, 700),
  },
];

export default function GallerySection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const close = useCallback(() => setActiveIdx(null), []);
  const showPrev = useCallback(
    () => setActiveIdx((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    []
  );
  const showNext = useCallback(
    () => setActiveIdx((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (activeIdx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIdx, close, showPrev, showNext]);

  const active = activeIdx !== null ? GALLERY[activeIdx] : null;

  return (
    <section
      id="gallery"
      className="border-b border-ink/10 bg-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-16 lg:px-24">
        <div className="mb-8 md:mb-13">
          <Reveal>
            <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-text">
              06 — Gallery
            </p>
            <h2 className="font-serif font-light leading-[1.05] text-ink text-[clamp(1.9rem,4vw,3.4rem)]">
              Moments, captured <em>in stone and wood.</em>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-[3px] md:grid-cols-4 md:auto-rows-[260px]">
          {GALLERY.map((g, i) => (
            <Reveal key={g.caption} delay={i * 0.06} className={g.span}>
              <button
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-label={`View ${g.caption}`}
                data-cursor="view"
                className={`group relative block w-full overflow-hidden bg-charcoal text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:aspect-auto md:h-full ${
                  g.wide ? "aspect-[16/9]" : "aspect-square"
                }`}
              >
                <HoverImage
                  src={g.src}
                  alt={g.caption}
                  sizes="(min-width: 768px) 40vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="pointer-events-none absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/20 opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:opacity-100 [&>svg]:translate-x-0">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9"
                      stroke="#fff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-5">
                  <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/55">
                    {g.tag}
                  </p>
                  <p className="font-serif text-[15px] leading-tight text-white">
                    {g.caption}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={active === null}
        className="fixed inset-0 z-[300] flex items-center justify-center bg-charcoal/97 backdrop-blur-md transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          pointerEvents: active ? "auto" : "none",
        }}
        onClick={close}
      >
        {active && (
          <>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              data-cursor="open"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white md:right-9 md:top-9"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1 1l14 14M15 1L1 15"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              data-cursor="open"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white md:left-9"
            >
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M16 5H2M6 1L2 5l4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              data-cursor="open"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white md:right-9"
            >
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

            <div
              key={active.caption}
              onClick={(e) => e.stopPropagation()}
              className="mx-6 flex w-full max-w-[1000px] flex-col items-center"
              style={{ animation: "lightboxIn 0.4s cubic-bezier(0.16,1,0.3,1)" }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10]">
                <Image
                  src={active.src}
                  alt={active.caption}
                  fill
                  sizes="90vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-5 flex w-full items-center justify-between gap-4">
                <div>
                  <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/45">
                    {active.tag}
                  </p>
                  <p className="font-serif text-lg text-white">{active.caption}</p>
                </div>
                <p className="shrink-0 text-[10px] tracking-[0.14em] text-white/40">
                  {String((activeIdx ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(GALLERY.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
