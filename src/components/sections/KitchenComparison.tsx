"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const kitchenVideo = "/arka/kitchen-comparison.mp4";

// ── Icons ──────────────────────────────────────────────────
const TermiteIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3c-2.5 0-5 2-5 5 0 1.8.9 3.2 2.2 4.2L7.5 17h9l-1.7-4.8C16.1 11.2 17 9.8 17 8c0-3-2.5-5-5-5z" />
    <path d="M10 17l-1.5 3.5M14 17l1.5 3.5M5.5 6.5L3 5M18.5 6.5L21 5M5 10H2M22 10h-3" />
    <circle cx="10" cy="8" r=".8" fill="currentColor" stroke="none" />
    <circle cx="14" cy="8" r=".8" fill="currentColor" stroke="none" />
  </svg>
);
const FungusIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="10" r="5" />
    <path d="M12 15v5M9 20h6" />
    <circle cx="10" cy="9" r=".8" fill="currentColor" stroke="none" />
    <circle cx="14" cy="10" r=".8" fill="currentColor" stroke="none" />
    <path d="M9 7.5c.5-1 1.5-1.5 3-1.5" />
  </svg>
);
const FlaskIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 3h6M8.5 3L5 13c-1 2.5.5 5 3 6h8c2.5-1 4-3.5 3-6L15.5 3" />
    <path d="M7.5 13h9" />
    <circle cx="10" cy="17" r=".8" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="15.5" r=".6" fill="currentColor" stroke="none" />
  </svg>
);

// ── Layout constants ───────────────────────────────────────
const LABEL_W = 44;
const DOT_GAP = 8;
const DOT_D = 10;
const LINE_X = LABEL_W + DOT_GAP + DOT_D / 2;
const COL_W = LINE_X + DOT_D / 2 + 14;

const FILLED_CLR = "#1E0E06";
const EMPTY_CLR = "rgba(122,88,64,0.22)";

const YEARS = [0, 5, 10, 15, 20, 25];

const ITEMS = [
  {
    num: "01",
    Icon: TermiteIcon,
    title: "Termite Safe",
    desc: "Wooden kitchens attract termites and slowly get eaten from the inside over time. Our stone kitchens don't offer termites any food, so your kitchen stays safe and termite free for years.",
  },
  {
    num: "02",
    Icon: FungusIcon,
    title: "Fungus Safe",
    desc: "Wood is highly susceptible to fungal and microbial growth in the humid kitchen environment. Stone surfaces are naturally non-porous and resist fungus, keeping your kitchen hygienic for decades.",
  },
  {
    num: "03",
    Icon: FlaskIcon,
    title: "Formaldehyde Safe",
    desc: "MDF and plywood used in conventional wooden kitchens slowly off-gas formaldehyde for years. Our stone kitchens use zero composite boards — completely formaldehyde free from day one.",
  },
];

// One shared layout, rearranged purely with CSS grid-template-areas at the
// md breakpoint — no JS device branching, so there's nothing for server
// and client to disagree about, and only ever one <video> instance.
export default function KitchenComparison() {
  const [progress, setProgress] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [muted, setMuted] = useState(true);

  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [colH, setColH] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const listenerCleanupRef = useRef<(() => void) | null>(null);
  const isManual = useRef(false);
  const manualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = videoWrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      setColH(el.getBoundingClientRect().height);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const setVideoRef = (node: HTMLVideoElement | null) => {
    if (listenerCleanupRef.current) {
      listenerCleanupRef.current();
      listenerCleanupRef.current = null;
    }
    videoRef.current = node;
    if (!node) return;
    const onTime = () => {
      if (!node.duration) return;
      const p = node.currentTime / node.duration;
      setProgress(p);
      if (!isManual.current) setActiveItem(Math.min(2, Math.floor(p * 3)));
    };
    node.addEventListener("timeupdate", onTime);
    listenerCleanupRef.current = () =>
      node.removeEventListener("timeupdate", onTime);
  };

  const handleItemClick = (i: number) => {
    setActiveItem(i);
    isManual.current = true;
    if (manualTimer.current) clearTimeout(manualTimer.current);
    manualTimer.current = setTimeout(() => {
      isManual.current = false;
    }, 6000);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const dotFilled = (i: number) =>
    progress >= (i === 0 ? 0 : i / (YEARS.length - 1) - 0.01);

  const trackLen = colH ? colH - DOT_D : 0;
  const cursorTop = DOT_D / 2 + trackLen * progress;

  return (
    <section className="bg-bg-warm px-5 py-14 md:px-14 md:py-18">
      <div className="mx-auto max-w-[1280px]">
        <div className="kc-grid">
          {/* Timeline — desktop only */}
          <div
            className="kc-timeline relative"
            style={{ height: colH ?? "auto", minHeight: 300 }}
          >
            <div
              style={{
                position: "absolute",
                left: LINE_X - 0.5,
                top: DOT_D / 2,
                bottom: DOT_D / 2,
                width: 1,
                background: "rgba(100,92,82,0.18)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: LINE_X - 0.5,
                top: DOT_D / 2,
                width: 1,
                height: trackLen ? trackLen * progress : 0,
                background: FILLED_CLR,
                transition: "height 0.25s linear",
                pointerEvents: "none",
              }}
            />
            {colH && (
              <div
                style={{
                  position: "absolute",
                  left: LINE_X - DOT_D / 2,
                  top: cursorTop - DOT_D / 2,
                  width: DOT_D,
                  height: DOT_D,
                  transition: "top 0.25s linear",
                  zIndex: 4,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: -5,
                    borderRadius: "50%",
                    border: `1.5px solid ${FILLED_CLR}`,
                    opacity: 0.2,
                  }}
                />
                <div
                  style={{
                    width: DOT_D,
                    height: DOT_D,
                    borderRadius: "50%",
                    background: FILLED_CLR,
                  }}
                />
              </div>
            )}
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {YEARS.map((yr, i) => {
                const filled = dotFilled(i);
                const isLast = i === YEARS.length - 1;
                const dSize = isLast ? 8 : DOT_D;
                return (
                  <div
                    key={yr}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: LABEL_W,
                        textAlign: "left",
                        flexShrink: 0,
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 11,
                        fontWeight: filled && !isLast ? 500 : 400,
                        lineHeight: 1,
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        color:
                          filled && !isLast
                            ? "#1E0E06"
                            : "rgba(122,88,64,0.45)",
                        transition: "color 0.5s",
                      }}
                    >
                      {yr} yr
                    </span>
                    <div style={{ width: DOT_GAP, flexShrink: 0 }} />
                    <div
                      style={{
                        flexShrink: 0,
                        width: dSize,
                        height: dSize,
                        borderRadius: "50%",
                        background: filled
                          ? FILLED_CLR
                          : isLast
                            ? "rgba(122,88,64,0.25)"
                            : EMPTY_CLR,
                        zIndex: 3,
                        position: "relative",
                        transition: "background 0.5s cubic-bezier(0.16,1,0.3,1)",
                        alignSelf: "center",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heading + intro */}
          <div className="kc-heading">
            <h2
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "clamp(1.9rem,5vw,2.6rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "#1E0E06",
                marginBottom: 10,
              }}
            >
              Wood V/s Stone
            </h2>
            <p
              className="md:max-w-[340px]"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: "#7A5840",
                lineHeight: 1.6,
              }}
            >
              This is how a conventional wooden kitchen and a stone kitchen
              behave after some time.
            </p>
          </div>

          {/* Video */}
          <div className="kc-video">
            <div
              ref={videoWrapRef}
              style={{
                position: "relative",
                aspectRatio: "16 / 11",
                borderRadius: 8,
                overflow: "hidden",
                background: "#111",
              }}
            >
              <video
                ref={setVideoRef}
                src={kitchenVideo}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                data-cursor="open"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(245,237,227,0.88)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {muted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1E0E06"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1E0E06"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>
            </div>
            <div style={{ display: "flex", marginTop: 10 }}>
              {["Wood kitchen", "Stone kitchen"].map((l) => (
                <span
                  key={l}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "#7A5840",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div
            className="kc-accordion flex flex-col gap-2.5"
            style={
              {
                "--kc-h": colH ? `${colH}px` : undefined,
              } as CSSProperties
            }
          >
            {ITEMS.map((item, i) => {
              const isOpen = i === activeItem;
              return (
                <button
                  key={item.num}
                  onClick={() => handleItemClick(i)}
                  data-cursor="open"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: isOpen ? FILLED_CLR : "#FAF5F0",
                    border: `1px solid ${isOpen ? FILLED_CLR : "rgba(200,173,150,0.8)"}`,
                    borderRadius: 10,
                    padding: "14px 16px",
                    transition:
                      "background 0.55s cubic-bezier(0.16,1,0.3,1), border-color 0.55s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        flexShrink: 0,
                        lineHeight: 0,
                        color: isOpen ? "rgba(245,237,227,0.8)" : "#372314",
                        transition: "color 0.4s",
                      }}
                    >
                      <item.Icon />
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                        fontSize: 15.5,
                        fontWeight: isOpen ? 600 : 500,
                        color: isOpen ? "#FAF5F0" : "#1E0E06",
                        transition: "color 0.4s",
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 12,
                        fontWeight: 400,
                        color: isOpen
                          ? "rgba(245,237,227,0.4)"
                          : "rgba(122,88,64,0.4)",
                        letterSpacing: "0.04em",
                        transition: "color 0.4s",
                      }}
                    >
                      {item.num}
                    </span>
                  </div>
                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: isOpen ? 120 : 0,
                      opacity: isOpen ? 1 : 0,
                      transition:
                        "max-height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <p
                      style={{
                        marginTop: 10,
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 12.5,
                        fontWeight: 400,
                        color: "rgba(245,237,227,0.65)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .kc-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
          grid-template-areas: "heading" "video" "accordion";
        }
        .kc-timeline { display: none; }
        .kc-video { grid-area: video; }
        .kc-heading { grid-area: heading; }
        .kc-accordion { grid-area: accordion; }
        @media (min-width: 768px) {
          .kc-grid {
            gap: 28px;
            align-items: start;
            grid-template-columns: ${COL_W}px 1fr 390px;
            grid-template-areas:
              "timeline video heading"
              "timeline video accordion";
          }
          .kc-timeline { display: block; }
          /* Span the full video height (both rows) and center within it,
             so the description box aligns with the video's vertical
             midpoint regardless of the heading's height above it. */
          .kc-accordion {
            grid-column: 3 / 4;
            grid-row: 1 / 3;
            align-self: start;
            height: var(--kc-h, auto);
            justify-content: center;
            pointer-events: none;
          }
          .kc-accordion > button { pointer-events: auto; }
        }
      `}</style>
    </section>
  );
}
