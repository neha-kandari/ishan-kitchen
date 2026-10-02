"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, Observer } from "@/lib/gsap";

// Four clips, chained end-to-end. Each clip's own end-frame was generated
// to exactly match the next clip's start-frame, so the hard swap between
// them at each "ended" event is invisible — it reads as one continuous
// film, not four stitched files. Desktop-only: phones use a single
// pre-edited clip instead (see MOBILE_CLIP_SOURCES). It's a landscape
// ~1276×720 clip, so on a tall phone screen there is no crop-free way to
// have it fill the full viewport height — forcing that would mean either
// heavy left/right cropping (object-cover) or thick black bars top and
// bottom (object-contain). Instead its box is sized to the clip's own
// aspect ratio at full width, so the whole frame shows uncropped with no
// letterboxing, and the headline/CTA sit below it rather than overlaid.
// It autoplays the moment it loads and loops continuously — no scroll
// gesture, and it never stops.
const DESKTOP_CLIP_SOURCES = [
  "/kitchen-transformation/seg1.mp4",
  "/kitchen-transformation/seg2.mp4",
  "/kitchen-transformation/seg3.mp4",
  "/kitchen-transformation/seg4.mp4",
];
const MOBILE_CLIP_SOURCES = ["/transformation.mp4"];
const POSTER_SRC = "/kitchen-transformation/frame-1.png";

// Mirrors the Tailwind `md` breakpoint used below to swap the two clip
// groups, so the scroll-scrub logic wires itself to whichever group is
// actually on screen.
const DESKTOP_QUERY = "(min-width: 768px)";

export default function Hero() {
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const skipToEndRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const introEl = introRef.current;
    const endEl = endRef.current;
    const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
    const activeVideos = isDesktop ? desktopVideoRefs.current : mobileVideoRefs.current;
    const inactiveVideos = isDesktop ? mobileVideoRefs.current : desktopVideoRefs.current;
    if (!introEl || !endEl || activeVideos.some((v) => !v)) return;
    const clips = activeVideos as HTMLVideoElement[];

    // Only the group actually on screen needs to download video data —
    // leave the other breakpoint's clips alone at preload="none".
    inactiveVideos.forEach((clip) => clip?.pause());
    clips.forEach((clip) => {
      // React/Next SSR doesn't reliably apply the `muted` IDL property from
      // the JSX attribute alone (a known hydration gap for <video>) — and
      // browsers require the *property*, not just the attribute, to be
      // true before they'll allow unmuted-looking autoplay. Setting it
      // here explicitly is what actually makes autoplay work.
      clip.muted = true;
      clip.playsInline = true;
      clip.preload = "auto";
      clip.load();
    });

    gsap.set(endEl, { autoAlpha: 0 });
    gsap.set(clips.slice(1), { autoAlpha: 0 });
    clips.forEach((clip) => clip.pause());

    // ── Mobile: the single clip autoplays as a continuous, never-stopping
    // banner loop, sized to its own aspect ratio (see the JSX below) with
    // the headline/CTA laid out below it rather than overlaid — so there's
    // no "finished" state to reveal and no scroll gesture involved. Skip
    // has nothing to do here (it isn't rendered on mobile), so it's just
    // a no-op. ──
    if (!isDesktop) {
      const clip = clips[0];
      clip.loop = true;

      // Starting playback the instant any data arrives is what caused the
      // stutter/rebuffer-mid-clip symptom on phone networks — this file is
      // ~14.6MB at a high bitrate for a 720p clip. Waiting for
      // "canplaythrough" (the browser's own estimate that it can play the
      // rest without stalling, given the current download rate) fixes it;
      // the poster frame just shows a beat longer first. A timeout is a
      // safety net in case that event never fires on a given browser.
      let played = false;
      const tryPlay = () => {
        if (played) return;
        played = true;
        clip.play().catch(() => {
          played = false;
        });
      };
      if (clip.readyState >= 4) {
        tryPlay();
      } else {
        clip.addEventListener("canplaythrough", tryPlay, { once: true });
      }
      const fallbackTimer = window.setTimeout(tryPlay, 4000);

      // Some mobile browsers — in particular in-app webviews (Instagram,
      // Facebook, etc.) — block even muted autoplay until the very first
      // touch anywhere on the page. Retry once that happens.
      const onFirstInteraction = () => {
        if (clip.paused) clip.play().catch(() => {});
      };
      document.addEventListener("touchstart", onFirstInteraction, {
        once: true,
        passive: true,
      });
      document.addEventListener("click", onFirstInteraction, { once: true });

      skipToEndRef.current = () => {};

      return () => {
        clip.removeEventListener("canplaythrough", tryPlay);
        window.clearTimeout(fallbackTimer);
        document.removeEventListener("touchstart", onFirstInteraction);
        document.removeEventListener("click", onFirstInteraction);
        skipToEndRef.current = () => {};
      };
    }

    // ── Desktop: scroll-driven scrub across the four stitched clips ──
    // The whole sequence is divided into this many chunks, so a single
    // scroll gesture (one mouse-wheel notch, one touch flick) always plays
    // exactly one quarter of the total footage — the sequence completes in
    // ~4 scrolls regardless of how long the combined clips run.
    const SCROLL_STEPS = 4;

    // Real playback, just faster — muted video has no audio pitch to worry
    // about, so this cuts wall-clock wait per chunk without any scrubbing.
    const PLAYBACK_RATE = 1.6;
    clips.forEach((clip) => {
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

    // Lets an impatient visitor bypass the scroll-driven scrub entirely:
    // jump straight to the last clip's final frame (the fully-built
    // kitchen), reveal the end copy/CTA, and hand scroll back to the
    // page so the rest of the site is reachable immediately.
    let finalFrameHandler: (() => void) | null = null;
    const skipToEnd = () => {
      if (finished) return;
      const lastIndex = clips.length - 1;
      const lastClip = clips[lastIndex];

      clips.forEach((clip, i) => {
        clip.pause();
        gsap.set(clip, { autoAlpha: i === lastIndex ? 1 : 0 });
      });
      activeIndex = lastIndex;
      chunkActive = false;
      started = true;

      const showFinalFrame = () => {
        if (isFinite(lastClip.duration) && lastClip.duration > 0) {
          lastClip.currentTime = Math.max(0, lastClip.duration - 0.05);
        }
      };
      if (lastClip.readyState >= 1) {
        showFinalFrame();
      } else {
        finalFrameHandler = showFinalFrame;
        lastClip.addEventListener("loadedmetadata", showFinalFrame, { once: true });
      }

      gsap.set(introEl, { autoAlpha: 0 });
      if (skipBtnRef.current) {
        gsap.to(skipBtnRef.current, { autoAlpha: 0, duration: 0.3 });
      }
      finishSequence();
    };
    skipToEndRef.current = skipToEnd;

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
      skipToEndRef.current = () => {};
      clips.forEach((clip, i) => {
        clip.removeEventListener("ended", endedHandlers[i]);
        clip.removeEventListener("timeupdate", timeUpdateHandlers[i]);
        clip.removeEventListener("loadedmetadata", computeOffsets);
      });
      if (finalFrameHandler) {
        clips[clips.length - 1].removeEventListener("loadedmetadata", finalFrameHandler);
      }
    };
  }, []);

  return (
    <section
      id="hero-sequence"
      className="relative w-full overflow-hidden bg-charcoal md:h-[100svh]"
    >
      {/* ── Phones: full-width video banner sized to the clip's own aspect
      ratio (no cropping, no letterboxing), headline/CTA overlaid directly
      on it (no dimming layer — a text-shadow keeps it legible instead). ── */}
      <div className="relative md:hidden">
        {MOBILE_CLIP_SOURCES.map((src, i) => (
          <video
            key={src}
            ref={(el) => {
              mobileVideoRefs.current[i] = el;
            }}
            className="block aspect-[1276/720] w-full object-cover"
            src={src}
            poster={i === 0 ? POSTER_SRC : undefined}
            muted
            autoPlay
            loop
            playsInline
            preload="none"
          />
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <h2
            className="max-w-xs font-serif font-light italic leading-[1.05] text-white text-[clamp(1.4rem,5.5vw,1.9rem)]"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}
          >
            Kitchens, thoughtfully made.
          </h2>
          <Link
            href="/#gallery"
            className="group inline-flex items-center gap-2.5 border border-white/30 bg-white/10 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
          >
            Explore Our Kitchens
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* ── Desktop/tablet: full-screen scroll-scrubbed sequence across the
      four stitched segments, cropped to fill. ── */}
      <div className="relative hidden h-full md:block">
        <div className="hidden md:contents">
          {DESKTOP_CLIP_SOURCES.map((src, i) => (
            <video
              key={src}
              ref={(el) => {
                desktopVideoRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              poster={i === 0 ? POSTER_SRC : undefined}
              muted
              playsInline
              preload="none"
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />

        <button
          ref={skipBtnRef}
          type="button"
          onClick={() => skipToEndRef.current()}
          aria-label="Skip intro animation"
          className="group absolute bottom-10 right-10 z-20 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/90 backdrop-blur-md transition-colors hover:border-white/60 hover:bg-white hover:text-ink"
        >
          Skip
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

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
          className="invisible absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center opacity-0"
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
      </div>
    </section>
  );
}
