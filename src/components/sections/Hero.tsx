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

    // The whole sequence is divided into this many chunks, so a single
    // scroll gesture (one mouse-wheel notch, one touch flick) always plays
    // exactly one quarter of the total footage — the sequence completes in
    // ~4 scrolls regardless of how long the combined clips run.
    const SCROLL_STEPS = 4;

    // Real playback, just faster — muted video has no audio pitch to worry
    // about, so this cuts wall-clock wait per chunk without any scrubbing.
    const PLAYBACK_RATE = 1.6;

    gsap.set(endEl, { autoAlpha: 0 });
    gsap.set(clips.slice(1), { autoAlpha: 0 });
    clips.forEach((clip) => {
      clip.pause();
      clip.playbackRate = PLAYBACK_RATE;
    });

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    let started = false;
    let finished = false;
    let activeIndex = 0;
    let chunkActive = false;
    let chunkTarget = 0;
    let totalDuration = 0;
    let offsets = clips.map(() => 0);
    let ready = false;

    // Cumulative-seconds offset of each clip within the combined sequence,
    // known only once every clip has reported its real duration.
    const computeOffsets = () => {
      if (ready || !clips.every((c) => isFinite(c.duration) && c.duration > 0)) return;
      let sum = 0;
      offsets = clips.map((c) => {
        const offset = sum;
        sum += c.duration;
        return offset;
      });
      totalDuration = sum;
      ready = true;
    };
    clips.forEach((clip) => {
      if (clip.readyState >= 1) computeOffsets();
      else clip.addEventListener("loadedmetadata", computeOffsets, { once: true });
    });

    const elapsed = () => offsets[activeIndex] + clips[activeIndex].currentTime;

    const finishSequence = () => {
      if (finished) return;
      finished = true;
      gsap.to(endEl, { autoAlpha: 1, duration: 0.6, ease: "power2.out" });
      html.style.overflow = previousOverflow;
      observer.kill();
    };

    // Advancing to the next clip only auto-plays it if the current chunk
    // hasn't reached its target yet — otherwise it sits paused on its
    // first frame until the next scroll gesture starts a new chunk.
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
      if (chunkActive) clips[next].play().catch(() => {});
    };

    const endedHandlers = clips.map((_, i) => advance(i));
    clips.forEach((clip, i) => clip.addEventListener("ended", endedHandlers[i]));

    // Stops exactly once the active chunk's target is reached, wherever
    // that lands — mid-clip or at a clip boundary.
    const onTimeUpdate = (i: number) => () => {
      if (finished || !chunkActive || !ready || i !== activeIndex) return;
      if (elapsed() >= chunkTarget - 0.01) {
        clips[activeIndex].pause();
        chunkActive = false;
        if (elapsed() >= totalDuration - 0.05) finishSequence();
      }
    };
    const timeUpdateHandlers = clips.map((_, i) => onTimeUpdate(i));
    clips.forEach((clip, i) => clip.addEventListener("timeupdate", timeUpdateHandlers[i]));

    // Each scroll gesture (wheel notch, touch flick) starts one chunk of
    // real playback — never scrubbed via currentTime assignment on scroll
    // position, which is what caused the earlier jank — and ignores
    // further gestures until that chunk finishes.
    const startChunk = () => {
      if (finished || chunkActive) return;
      if (!started) {
        started = true;
        gsap.to(introEl, { autoAlpha: 0, duration: 0.35 });
      }
      if (!ready) {
        // Metadata not loaded yet (rare) — just play; the next timeupdate
        // tick will pick up the real duration once it arrives.
        clips[activeIndex].play().catch(() => {});
        return;
      }
      chunkTarget = Math.min(totalDuration, elapsed() + totalDuration / SCROLL_STEPS);
      chunkActive = true;
      clips[activeIndex].play().catch(() => {});
    };

    // Observer reads scroll *intent* (wheel/touch/pointer gestures), not
    // scroll position, and preventDefault keeps the page from moving
    // until the whole sequence has finished playing.
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      preventDefault: true,
      tolerance: 8,
      onUp: startChunk,
      onDown: startChunk,
    });

    return () => {
      observer.kill();
      html.style.overflow = previousOverflow;
      clips.forEach((clip, i) => {
        clip.removeEventListener("ended", endedHandlers[i]);
        clip.removeEventListener("timeupdate", timeUpdateHandlers[i]);
        clip.removeEventListener("loadedmetadata", computeOffsets);
      });
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
          href="/#gallery"
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
