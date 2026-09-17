"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, Observer } from "@/lib/gsap";

// Four clips, chained end-to-end. Each clip's own end-frame was generated
// to exactly match the next clip's start-frame, so the hard swap between
// them at each "ended" event is invisible — it reads as one continuous
// film, not four stitched files.
const CLIP_SOURCES = [
  "/kitchen-transformation/seg1.mp4",
  "/kitchen-transformation/seg2.mp4",
  "/kitchen-transformation/seg3.mp4",
  "/kitchen-transformation/seg4.mp4",
];
const POSTER_SRC = "/kitchen-transformation/frame-1.png";

export default function Hero() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const introEl = introRef.current;
    const endEl = endRef.current;
    const videos = videoRefs.current;
    if (!introEl || !endEl || videos.some((v) => !v)) return;
    const clips = videos as HTMLVideoElement[];

    gsap.set(endEl, { autoAlpha: 0 });
    gsap.set(clips.slice(1), { autoAlpha: 0 });
    clips.forEach((clip) => clip.pause());

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    let started = false;
    let finished = false;
    let activeIndex = 0;
    let isScrolling = false;

    const finishSequence = () => {
      finished = true;
      gsap.to(endEl, { autoAlpha: 1, duration: 0.6, ease: "power2.out" });
      html.style.overflow = previousOverflow;
      observer.kill();
    };

    // Advancing to the next clip only auto-plays it if the user is still
    // actively scrolling at that exact instant; otherwise it sits paused
    // on its first frame — the last state — until scrolling resumes.
    const advance = (index: number) => () => {
      const next = index + 1;
      if (next >= clips.length) {
        finishSequence();
        return;
      }
      gsap.set(clips[index], { autoAlpha: 0 });
      gsap.set(clips[next], { autoAlpha: 1 });
      activeIndex = next;
      clips[next].currentTime = 0;
      if (isScrolling) clips[next].play().catch(() => {});
    };

    const endedHandlers = clips.map((_, i) => advance(i));
    clips.forEach((clip, i) => clip.addEventListener("ended", endedHandlers[i]));

    // Any scroll gesture resumes playback of whichever clip is current —
    // real playback at natural speed, never scrubbed via currentTime
    // assignment on scroll position, which is what caused the earlier jank.
    const resume = () => {
      if (finished) return;
      isScrolling = true;
      if (!started) {
        started = true;
        gsap.to(introEl, { autoAlpha: 0, duration: 0.35 });
      }
      const active = clips[activeIndex];
      if (active.paused) active.play().catch(() => {});
    };

    // No scroll activity for onStopDelay seconds — freeze exactly here.
    const pause = () => {
      isScrolling = false;
      if (finished) return;
      clips[activeIndex].pause();
    };

    // Observer reads scroll *intent* (wheel/touch/pointer gestures), not
    // scroll position, and preventDefault keeps the page from moving
    // until the whole sequence has finished playing.
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      preventDefault: true,
      tolerance: 8,
      onUp: resume,
      onDown: resume,
      onStop: pause,
      onStopDelay: 0.15,
    });

    return () => {
      observer.kill();
      html.style.overflow = previousOverflow;
      clips.forEach((clip, i) => clip.removeEventListener("ended", endedHandlers[i]));
    };
  }, []);

  return (
    <section
      id="hero-sequence"
      className="relative h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      {CLIP_SOURCES.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={i === 0 ? POSTER_SRC : undefined}
          muted
          playsInline
          preload="auto"
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />

      <div
        ref={introRef}
        className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
      >
        <h1 className="max-w-2xl font-serif font-light italic leading-[1.1] text-white text-[clamp(1.9rem,5.2vw,3.5rem)]">
          Scroll to watch your modular kitchen take shape.
        </h1>
      </div>

      <div
        ref={endRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <h2 className="max-w-2xl font-serif font-light italic leading-[1.05] text-white text-[clamp(2.25rem,6vw,4.5rem)]">
          Kitchens, thoughtfully made.
        </h2>
        <Link
          href="/projects"
          className="group mt-10 inline-flex items-center gap-3 border border-white/25 bg-white/10 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
        >
          Explore Our Kitchens
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
