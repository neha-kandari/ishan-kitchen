"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CalculatorConfig, LayoutOption, PackageOption } from "./configs";

const CITIES = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Gurugram",
  "Pune",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Other",
];

type Dims = { A: number; B: number };

function calcRft(id: string, d: Dims) {
  if (id === "straight") return d.A;
  if (id === "u-shaped") return 2 * d.A + d.B;
  return d.A + d.B;
}

// ── SVG diagrams ───────────────────────────────────────────
/** Door-seam + handle marks overlaid on a wall-run rect, so the wardrobe
 * calculator's diagrams read as shutter fronts rather than bare kitchen
 * counters. Kitchen mode never calls this — rects stay blank counter bars. */
function wardrobeDoors(
  rect: { x: number; y: number; w: number; h: number; dir: "h" | "v" },
  stroke: string,
  panels = 3
) {
  const { x, y, w, h, dir } = rect;
  const lines = [];
  if (dir === "h") {
    for (let i = 1; i < panels; i++) {
      const lx = x + (w / panels) * i;
      lines.push(
        <line key={`seam-${i}`} x1={lx} y1={y + 3} x2={lx} y2={y + h - 3} stroke={stroke} strokeWidth="1" opacity={0.5} />
      );
    }
    for (let i = 0; i < panels; i++) {
      const cx = x + (w / panels) * (i + 1) - 6;
      const cy = y + h / 2;
      lines.push(
        <line key={`handle-${i}`} x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke={stroke} strokeWidth="1.4" opacity={0.85} strokeLinecap="round" />
      );
    }
  } else {
    for (let i = 1; i < panels; i++) {
      const ly = y + (h / panels) * i;
      lines.push(
        <line key={`seam-${i}`} x1={x + 3} y1={ly} x2={x + w - 3} y2={ly} stroke={stroke} strokeWidth="1" opacity={0.5} />
      );
    }
    for (let i = 0; i < panels; i++) {
      const cy = y + (h / panels) * (i + 1) - 6;
      const cx = x + w / 2;
      lines.push(
        <line key={`handle-${i}`} x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke={stroke} strokeWidth="1.4" opacity={0.85} strokeLinecap="round" />
      );
    }
  }
  return lines;
}

function LayoutDiagram({
  id,
  dims,
  dark,
  kind,
}: {
  id: string;
  dims?: Dims;
  dark?: boolean;
  kind: "kitchen" | "wardrobe";
}) {
  const stroke = dark ? "#C4AA8A" : "#372314";
  const fill = dark ? "rgba(196,170,138,0.12)" : "rgba(55,35,20,0.09)";
  const tc = dark ? "#C4AA8A" : "#372314";
  const dim = (v: number) => (dims ? `${v} ft` : "");
  const doors = kind === "wardrobe";

  if (id === "l-shaped")
    return (
      <svg viewBox="0 0 140 120" fill="none" className="h-full w-full">
        <rect x="12" y="12" width="116" height="34" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
        <rect x="12" y="12" width="36" height="96" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
        {doors && wardrobeDoors({ x: 12, y: 12, w: 116, h: 34, dir: "h" }, stroke)}
        {doors && wardrobeDoors({ x: 12, y: 46, w: 36, h: 62, dir: "v" }, stroke)}
        {dims && (
          <>
            <line x1="48" y1="4" x2="128" y2="4" stroke={tc} strokeWidth="0.8" strokeDasharray="3,3" />
            <text x="88" y="10" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">
              {dim(dims.B)}
            </text>
            <line x1="4" y1="46" x2="4" y2="108" stroke={tc} strokeWidth="0.8" strokeDasharray="3,3" />
            <text x="0" y="81" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600" transform="rotate(-90, 0, 81)">
              {dim(dims.A)}
            </text>
          </>
        )}
      </svg>
    );
  if (id === "straight")
    return (
      <svg viewBox="0 0 140 120" fill="none" className="h-full w-full">
        <rect x="12" y="44" width="116" height="32" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
        {doors && wardrobeDoors({ x: 12, y: 44, w: 116, h: 32, dir: "h" }, stroke, 4)}
        {dims && (
          <>
            <line x1="12" y1="34" x2="128" y2="34" stroke={tc} strokeWidth="0.8" strokeDasharray="3,3" />
            <text x="70" y="30" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">
              {dim(dims.A)}
            </text>
          </>
        )}
      </svg>
    );
  if (id === "u-shaped")
    return (
      <svg viewBox="0 0 140 120" fill="none" className="h-full w-full">
        <rect x="12" y="12" width="116" height="28" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
        <rect x="12" y="12" width="28" height="96" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
        <rect x="100" y="12" width="28" height="96" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
        {doors && wardrobeDoors({ x: 12, y: 12, w: 116, h: 28, dir: "h" }, stroke, 4)}
        {doors && wardrobeDoors({ x: 12, y: 40, w: 28, h: 68, dir: "v" }, stroke, 2)}
        {doors && wardrobeDoors({ x: 100, y: 40, w: 28, h: 68, dir: "v" }, stroke, 2)}
        {dims && (
          <>
            <text x="70" y="30" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">
              {dim(dims.B)}
            </text>
            <text x="26" y="75" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600" transform="rotate(-90, 26, 75)">
              {dim(dims.A)}
            </text>
          </>
        )}
      </svg>
    );
  return (
    <svg viewBox="0 0 140 120" fill="none" className="h-full w-full">
      <rect x="12" y="22" width="116" height="28" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      <rect x="12" y="70" width="116" height="28" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      {doors && wardrobeDoors({ x: 12, y: 22, w: 116, h: 28, dir: "h" }, stroke, 4)}
      {doors && wardrobeDoors({ x: 12, y: 70, w: 116, h: 28, dir: "h" }, stroke, 4)}
      {dims && (
        <>
          <text x="70" y="39" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">
            {dim(dims.A)}
          </text>
          <text x="70" y="87" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">
            {dim(dims.B)}
          </text>
        </>
      )}
    </svg>
  );
}

// ── Price counter animation ────────────────────────────────
function PriceCount({ target }: { target: number }) {
  const [v, setV] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    if (prev.current === target) return;
    const s = prev.current;
    const d = target - s;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 900, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(s + d * e));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{(v / 100000).toFixed(1)}L</>;
}

// ── Step transition ────────────────────────────────────────
function StepPanel({
  children,
  k,
  dir,
}: {
  children: React.ReactNode;
  k: number;
  dir: "f" | "b";
}) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), 40);
    return () => clearTimeout(t);
  }, [k]);
  return (
    <div
      className="transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : `translateX(${dir === "f" ? 32 : -32}px)`,
      }}
    >
      {children}
    </div>
  );
}

// ── Floating label input ───────────────────────────────────
function FloatInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative pt-4">
      <label
        className={`pointer-events-none absolute left-0 font-sans transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          lifted
            ? "top-0 text-[8px] font-semibold tracking-[0.22em] text-accent"
            : "top-7 text-[12.5px] font-normal tracking-[0.04em] text-[#B0A898]"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={focused ? placeholder : ""}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`mt-2 w-full border-0 border-b bg-transparent py-[10px] font-sans text-sm text-[#1E0E06] outline-none transition-colors duration-[250ms] ${
          focused ? "border-[#1E0E06]" : "border-[#C8AD96]"
        }`}
      />
    </div>
  );
}

// ── Summary panel (shared by form + success) ─────────────
function SummaryPanel({
  layout,
  dims,
  rft,
  pkg,
  low,
  high,
  city,
}: {
  layout: LayoutOption;
  dims: Dims;
  rft: number;
  pkg: PackageOption;
  low: number;
  high: number;
  city: string;
}) {
  const rows: [string, string][] = [
    ["LAYOUT", layout.label],
    ["WALL A", dims.A + " ft"],
    ...(layout.walls.includes("B") ? ([["WALL B", dims.B + " ft"]] as [string, string][]) : []),
    ["RUNNING FEET", rft + " rft"],
    ["COLLECTION", pkg.label],
    ...(city ? ([["CITY", city]] as [string, string][]) : []),
  ];
  return (
    <div className="overflow-hidden bg-dark">
      <div className="bg-accent px-6 py-2">
        <p className="font-sans text-[8px] font-semibold tracking-[0.24em] text-bg-warm">
          YOUR SELECTION SUMMARY
        </p>
      </div>
      <div className="p-7">
        {rows.map(([l, v]) => (
          <div
            key={l}
            className="flex justify-between border-b border-cream/[0.06] py-[10px]"
          >
            <span className="font-sans text-[8px] tracking-[0.2em] text-accent">{l}</span>
            <span className="font-sans text-[13px] text-cream/70">{v}</span>
          </div>
        ))}
        <div className="mt-6 border-t border-[rgba(221,211,197,0.15)] pt-[22px]">
          <p className="mb-3 font-sans text-[8px] tracking-[0.2em] text-accent">INDICATIVE RANGE</p>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="font-serif text-2xl italic text-bg-warm">₹{(low / 100000).toFixed(1)}L</span>
            <span className="text-sm text-accent">—</span>
            <span className="font-serif text-2xl italic text-bg-warm">₹{(high / 100000).toFixed(1)}L</span>
          </div>
          <p className="font-sans text-[8.5px] tracking-[0.08em] text-cream/25">
            Final quote subject to site visit
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────
export default function CalculatorWizard({
  config,
  topSlot,
}: {
  config: CalculatorConfig;
  topSlot?: React.ReactNode;
}) {
  const { layouts: LAYOUTS, packages: PACKAGES } = config;
  const STEPS = [`${config.layoutWord} Layout`, "Measurements", "Select Package", "Get Estimate"];

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"f" | "b">("f");
  const [layoutId, setLayoutId] = useState(LAYOUTS[0].id);
  const [dims, setDims] = useState<Dims>({ A: LAYOUTS[0].defaults.A, B: LAYOUTS[0].defaults.B });
  const [pkgId, setPkgId] = useState(
    PACKAGES.find((p) => p.recommended)?.id ?? PACKAGES[0].id
  );
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "" });
  const [submitted, setSubmitted] = useState(false);

  const layout = LAYOUTS.find((l) => l.id === layoutId)!;
  const pkg = PACKAGES.find((p) => p.id === pkgId)!;
  const rft = calcRft(layoutId, dims);
  const low = Math.round((rft * pkg.rate * 0.9) / 100000) * 100000;
  const high = Math.round((rft * pkg.rate * 1.14) / 100000) * 100000;

  const go = (n: number) => {
    setDir(n > step ? "f" : "b");
    setStep(n);
  };

  // Reset wall dimensions to the new layout's defaults during render (the
  // React-recommended way to adjust state when a prop/id changes), instead
  // of a useEffect that would call setState synchronously on every run.
  const [prevLayoutId, setPrevLayoutId] = useState(layoutId);
  if (layoutId !== prevLayoutId) {
    setPrevLayoutId(layoutId);
    setDims({ A: layout.defaults.A, B: layout.defaults.B });
  }

  const canGo =
    step < 3 ||
    Boolean(form.name.trim() && form.email.trim() && form.phone.trim() && form.city);

  return (
    <div className="min-h-screen bg-cream pb-[100px]">
      {/* ── Stepper (inline, clears fixed nav) ── */}
      <div className="border-b border-[#EAE4DA] bg-bg-warm pt-[72px]">
        {topSlot}
        <div className="mx-auto flex max-w-[980px] items-center px-5 py-3 md:px-10 md:pb-[18px] md:pt-5">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div
                key={label}
                className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => (done ? go(i) : undefined)}
                  className={`flex flex-col items-center gap-2 border-0 bg-transparent p-0 ${
                    done ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-[background,transform] duration-300 md:h-[34px] md:w-[34px] ${
                      done ? "bg-accent" : active ? "scale-[1.08] bg-[#1E0E06] shadow-[0_0_0_4px_rgba(30,14,6,0.08)]" : "bg-[#C8AD96]"
                    }`}
                  >
                    {done ? (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5l3.5 3.5L11 1" stroke="#FAF5F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className={`font-sans text-[11px] font-semibold ${active ? "text-bg-warm" : "text-[#B0A898]"}`}>
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className={`hidden whitespace-nowrap font-sans text-[7.5px] tracking-[0.16em] transition-colors duration-300 md:inline ${
                      active ? "font-bold text-[#1E0E06]" : done ? "text-accent" : "text-[#C0B8AD]"
                    }`}
                  >
                    {label.toUpperCase()}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="relative mx-[10px] mb-0 h-px flex-1 overflow-hidden bg-[#C8AD96] md:mb-[26px]">
                    <div
                      className="absolute inset-0 origin-left bg-accent transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ transform: `scaleX(${i < step ? 1 : 0})` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
          <span className="ml-5 hidden flex-shrink-0 pb-5 font-sans text-[9px] tracking-[0.14em] text-accent md:inline">
            {step + 1}/{STEPS.length}
          </span>
        </div>
      </div>

      {/* ── Page heading ── */}
      <div className="mx-auto max-w-[980px] px-5 pt-10 md:px-10 md:pt-[52px]">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-sans text-[9px] font-semibold tracking-[0.28em] text-accent">
              {config.eyebrow}
            </p>
            <h1 className="text-[#1E0E06] font-serif font-normal leading-[0.98] tracking-[-0.03em] text-[clamp(2.6rem,5vw,5.2rem)]">
              {step === 0 && (
                <>
                  Select your
                  <br />
                  <em className="font-medium">{config.layoutWord.toLowerCase()} layout.</em>
                </>
              )}
              {step === 1 && (
                <>
                  Confirm your
                  <br />
                  <em className="font-medium">dimensions.</em>
                </>
              )}
              {step === 2 && (
                <>
                  Choose your
                  <br />
                  <em className="font-medium">collection.</em>
                </>
              )}
              {step === 3 && !submitted && (
                <>
                  One last step —<br />
                  <em className="font-medium">get your estimate.</em>
                </>
              )}
              {step === 3 && submitted && (
                <>
                  Your estimate
                  <br />
                  <em className="font-medium">is ready.</em>
                </>
              )}
            </h1>
          </div>
          {/* Breadcrumb selection recap — hidden on mobile */}
          {step > 0 && (
            <div className="hidden items-center gap-2 pb-2 md:flex">
              {[
                step > 0 ? layout.label : null,
                step > 1 ? `${rft} rft` : null,
                step > 2 ? pkg.label : null,
              ]
                .filter(Boolean)
                .map((v, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[10px] text-[#C8AD96]">›</span>}
                    <span className="border border-[#C8AD96] bg-bg-warm px-[10px] py-1 font-sans text-[10px] tracking-[0.1em] text-accent">
                      {v}
                    </span>
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* ── Step content ── */}
        <StepPanel key={step} k={step} dir={dir}>
          {/* ─── STEP 0: Layout ─── */}
          {step === 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {LAYOUTS.map((l) => {
                const sel = layoutId === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLayoutId(l.id)}
                    className={`relative border-2 px-4 pb-4 pt-5 text-left transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:px-7 md:pb-[26px] md:pt-8 ${
                      sel
                        ? "border-[#1E0E06] bg-[#1E0E06] shadow-[0_8px_40px_rgba(30,14,6,0.22)]"
                        : "border-[#C8AD96] bg-bg-warm shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-accent hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                    }`}
                  >
                    {/* "Best for" badge */}
                    <div
                      className={`absolute right-[18px] top-[18px] font-sans text-[7.5px] tracking-[0.16em] transition-all duration-300 px-[10px] py-1 ${
                        sel ? "bg-cream/[0.15] text-cream/70" : "bg-cream text-accent"
                      }`}
                    >
                      {l.bestFor.toUpperCase()}
                    </div>

                    {/* Diagram */}
                    <div className="mb-[22px] h-[72px] md:h-[110px]">
                      <LayoutDiagram id={l.id} dark={sel} kind={config.kind} />
                    </div>

                    {/* Label */}
                    <div className="mb-[6px] flex items-center gap-[10px]">
                      <p
                        className={`font-serif text-[22px] transition-all duration-300 ${
                          sel ? "italic text-bg-warm" : "text-[#1E0E06]"
                        }`}
                      >
                        {l.label}
                      </p>
                      {sel && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent [animation:popIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
                          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                            <path d="M1 3.5l2.5 2.5L9 1" stroke="#FAF5F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p
                      className={`font-sans text-xs leading-[1.55] transition-colors duration-300 ${
                        sel ? "text-cream/50" : "text-stone-text"
                      }`}
                    >
                      {l.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* ─── STEP 1: Measurements ─── */}
          {step === 1 && (
            <div className="grid grid-cols-1 overflow-hidden border border-[#C8AD96] md:grid-cols-2">
              {/* Dark diagram panel */}
              <div className="flex flex-col bg-[#1E0E06] p-6 md:px-10 md:py-11">
                <p className="mb-2 font-sans text-[8.5px] font-semibold tracking-[0.22em] text-accent">
                  {layout.label.toUpperCase()}
                </p>
                <p className="mb-9 font-serif text-lg italic text-cream/60">{layout.desc}</p>
                <div className="min-h-[160px] flex-1 md:min-h-[200px]">
                  <LayoutDiagram id={layoutId} dark dims={dims} kind={config.kind} />
                </div>
                <div className="mt-8 border-t border-cream/[0.08] pt-6">
                  <p className="mb-[10px] font-sans text-[8px] tracking-[0.2em] text-accent">TOTAL RUNNING FEET</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-[36px] italic leading-none text-bg-warm md:text-[48px]">{rft}</span>
                    <span className="font-sans text-[13px] tracking-[0.1em] text-accent">rft</span>
                  </div>
                </div>
              </div>

              {/* Light sliders panel */}
              <div className="bg-bg-warm px-5 py-6 md:px-10 md:py-11">
                <p className="mb-8 font-sans text-[8.5px] font-semibold tracking-[0.22em] text-accent">
                  DRAG TO ADJUST WALL LENGTHS
                </p>

                {layout.walls.includes("A") && (
                  <div className="mb-11">
                    <div className="mb-[18px] flex justify-between">
                      <span className="font-sans text-[9px] font-semibold tracking-[0.2em] text-accent">WALL A</span>
                      <span className="font-serif text-2xl italic leading-none text-[#1E0E06]">
                        {dims.A} <span className="text-[13px] text-accent">ft</span>
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={4}
                        max={20}
                        step={0.5}
                        value={dims.A}
                        onChange={(e) => setDims((d) => ({ ...d, A: +e.target.value }))}
                        className="calc-slider w-full cursor-pointer"
                        aria-label="Wall A length in feet"
                      />
                      <div className="mt-[6px] flex justify-between">
                        <span className="font-sans text-[9px] text-[#5C3820]">4 ft</span>
                        <span className="font-sans text-[9px] text-[#5C3820]">20 ft</span>
                      </div>
                    </div>
                  </div>
                )}

                {layout.walls.includes("B") && (
                  <div className="mb-11">
                    <div className="mb-[18px] flex justify-between">
                      <span className="font-sans text-[9px] font-semibold tracking-[0.2em] text-accent">WALL B</span>
                      <span className="font-serif text-2xl italic leading-none text-[#1E0E06]">
                        {dims.B} <span className="text-[13px] text-accent">ft</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={20}
                      step={0.5}
                      value={dims.B}
                      onChange={(e) => setDims((d) => ({ ...d, B: +e.target.value }))}
                      className="calc-slider w-full cursor-pointer"
                      aria-label="Wall B length in feet"
                    />
                    <div className="mt-[6px] flex justify-between">
                      <span className="font-sans text-[9px] text-[#5C3820]">4 ft</span>
                      <span className="font-sans text-[9px] text-[#5C3820]">20 ft</span>
                    </div>
                  </div>
                )}

                <div className="mt-2 border-l-2 border-accent bg-cream px-[18px] py-[14px]">
                  <p className="font-sans text-[10.5px] leading-[1.65] text-[#6B6157]">
                    Standard sizes pre-filled. Drag to match your actual space.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Packages ─── */}
          {step === 2 && (
            <div className="flex flex-col gap-[14px]">
              {PACKAGES.map((p) => {
                const sel = pkgId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPkgId(p.id)}
                    className={`grid grid-cols-1 overflow-hidden text-left transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-cols-[300px_1fr] ${
                      sel
                        ? "border-2 border-[#1E0E06] bg-[#1E0E06] shadow-[0_8px_40px_rgba(30,14,6,0.22)]"
                        : "border-2 border-[#C8AD96] bg-bg-warm shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-accent hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)]"
                    }`}
                  >
                    {/* Image with overlay */}
                    <div className="relative h-[200px] w-full overflow-hidden md:h-[196px]">
                      <Image
                        src={p.img}
                        alt={p.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className={`object-cover transition-[filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          sel ? "scale-[1.06] brightness-[0.75] saturate-[0.9]" : "brightness-[0.88] saturate-[0.75]"
                        }`}
                      />
                      {/* Tier overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(30,14,6,0.55)_0%,transparent_65%)]" />
                      <div className="absolute left-5 top-5">
                        <p className="mb-1 font-serif text-[22px] italic leading-none text-bg-warm">{p.label}</p>
                        <p className="font-sans text-[9px] tracking-[0.18em] text-cream/60">{p.tier}</p>
                      </div>
                      {p.recommended && (
                        <div className="absolute bottom-4 left-5 bg-accent px-[10px] py-1 font-sans text-[7.5px] tracking-[0.18em] text-bg-warm">
                          MOST POPULAR
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between p-[18px] md:px-7 md:py-6">
                      <div>
                        <div className="mb-3 flex items-center gap-3">
                          {/* Selection indicator */}
                          <div
                            className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-[280ms] ${
                              sel ? "border-accent bg-accent" : "border-[#5C3820] bg-transparent"
                            }`}
                          >
                            {sel && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4l2.5 2.5L9 1" stroke="#FAF5F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <p
                            className={`font-sans text-[9px] font-medium tracking-[0.16em] transition-colors duration-300 ${
                              sel ? "text-cream/50" : "text-accent"
                            }`}
                          >
                            {p.sub.toUpperCase()}
                          </p>
                        </div>
                        <p
                          className={`ml-[34px] mb-[18px] font-sans text-[12.5px] leading-[1.75] ${
                            sel ? "text-cream/55" : "text-[#7A7168]"
                          }`}
                        >
                          {p.tagline}
                        </p>
                        <div className="ml-[34px] flex flex-wrap gap-x-0 gap-y-[7px]">
                          {p.features.map((f) => (
                            <div key={f} className="flex w-1/2 items-center gap-2">
                              <div className={`h-1 w-1 flex-shrink-0 rounded-full ${sel ? "bg-accent" : "bg-[#C0B8AD]"}`} />
                              <span className={`font-sans text-[11px] ${sel ? "text-cream/45" : "text-[#7A7168]"}`}>
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`mt-5 flex items-center justify-between border-t pt-4 ${
                          sel ? "border-cream/10" : "border-[#EDE8E0]"
                        }`}
                      >
                        <div className="flex items-baseline gap-[6px]">
                          <span className={`font-sans text-[8px] tracking-[0.16em] ${sel ? "text-cream/30" : "text-[#B0A898]"}`}>
                            FROM
                          </span>
                          <span className={`font-serif text-[21px] italic ${sel ? "text-[#C4AA8A]" : "text-[#1E0E06]"}`}>
                            ₹{(p.rate / 1000).toFixed(0)}K
                          </span>
                          <span className={`font-sans text-[8px] tracking-[0.1em] ${sel ? "text-cream/30" : "text-[#B0A898]"}`}>
                            / RUNNING FOOT
                          </span>
                        </div>
                        <div className="flex items-baseline gap-[5px]">
                          <span className={`font-sans text-[8px] tracking-[0.14em] ${sel ? "text-cream/30" : "text-[#B0A898]"}`}>
                            YOUR EST.
                          </span>
                          <span className={`font-serif text-[17px] italic ${sel ? "text-[#C4AA8A]" : "text-accent"}`}>
                            ₹{((rft * p.rate * 0.9) / 100000).toFixed(1)}L+
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ─── STEP 3: Form / Success ─── */}
          {step === 3 &&
            (submitted ? (
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-[52px]">
                <div>
                  <div className="mb-8 flex h-[60px] w-[60px] items-center justify-center rounded-full border-[1.5px] border-accent [animation:popIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path d="M1 8l7 7L21 1" stroke="#372314" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="mb-4 font-sans text-[9px] tracking-[0.28em] text-accent">ESTIMATE SENT</p>
                  <h2 className="mb-6 font-serif text-[clamp(2rem,4vw,4rem)] italic leading-[1.0] text-[#1E0E06]">
                    Thank you,
                    <br />
                    {form.name.split(" ")[0] || "there"}.
                  </h2>
                  <p className="mb-10 font-sans text-[13.5px] leading-[1.85] text-[#7A7168]">
                    Your estimate has been sent to{" "}
                    <strong className="text-[#1E0E06]">{form.email}</strong>. A designer will
                    follow up within 24 hours.
                  </p>
                  <p className="mb-3 font-sans text-[8.5px] tracking-[0.2em] text-accent">ESTIMATE RANGE</p>
                  <div className="mb-2 flex items-baseline gap-[10px]">
                    <span className="font-serif text-[clamp(2.5rem,5vw,5rem)] italic leading-none text-[#1E0E06]">
                      ₹<PriceCount target={low} />
                    </span>
                    <span className="text-lg text-accent">—</span>
                    <span className="font-serif text-[clamp(2.5rem,5vw,5rem)] italic leading-none text-[#1E0E06]">
                      ₹<PriceCount target={high} />
                    </span>
                  </div>
                  <p className="font-sans text-[8.5px] tracking-[0.14em] text-accent">
                    {rft} RFT · {layout.label.toUpperCase()} · {pkg.label.toUpperCase()}
                  </p>
                </div>
                <SummaryPanel layout={layout} dims={dims} rft={rft} pkg={pkg} low={low} high={high} city={form.city} />
              </div>
            ) : (
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-16">
                <div className="flex flex-col gap-7">
                  <div className="grid grid-cols-2 gap-6">
                    <FloatInput
                      label="YOUR NAME"
                      placeholder="Priya Sharma"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    />
                    <FloatInput
                      label="PHONE"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                    />
                  </div>
                  <FloatInput
                    label="EMAIL ADDRESS"
                    type="email"
                    placeholder="priya@example.com"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  />
                  <div className="relative pt-4">
                    <label className="mb-[10px] block font-sans text-[8px] font-semibold tracking-[0.22em] text-accent">
                      CITY
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      className={`w-full cursor-pointer appearance-none border-0 border-b border-[#C8AD96] bg-transparent py-[10px] font-sans text-sm outline-none ${
                        form.city ? "text-[#1E0E06]" : "text-[#B0A898]"
                      }`}
                    >
                      <option value="" disabled>
                        Select your city…
                      </option>
                      {CITIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <p className="font-sans text-[9.5px] leading-[1.8] text-[#B0A898]">
                    First consultation is complimentary. Our designers will be in touch within 24
                    hours.
                  </p>
                </div>
                <SummaryPanel layout={layout} dims={dims} rft={rft} pkg={pkg} low={low} high={high} city={form.city} />
              </div>
            ))}
        </StepPanel>
      </div>

      {/* ── Sticky bottom bar ── */}
      {!(step === 3 && submitted) && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#C8AD96] bg-bg-warm shadow-[0_-4px_28px_rgba(0,0,0,0.08)]">
          <div className="mx-auto flex max-w-[980px] items-center justify-between px-5 py-[14px] md:px-10">
            {/* Left: live recap — hidden on mobile */}
            <div className="hidden items-center gap-4 md:flex">
              {step >= 2 && (
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-[8px] tracking-[0.18em] text-[#B0A898]">ESTIMATE</span>
                  <span className="font-serif text-xl italic text-[#1E0E06]">
                    ₹{(low / 100000).toFixed(1)}L – ₹{(high / 100000).toFixed(1)}L
                  </span>
                </div>
              )}
              {step >= 1 && step < 2 && (
                <span className="font-sans text-[9px] tracking-[0.16em] text-accent">
                  {layout.label.toUpperCase()} · {rft} RFT
                </span>
              )}
            </div>

            {/* Right: navigation — full width on mobile */}
            <div className="flex w-full gap-[10px] md:w-auto">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => go(step - 1)}
                  className="flex items-center gap-[10px] border border-[#C8AD96] bg-transparent px-[22px] py-[13px] font-sans text-[9.5px] tracking-[0.2em] text-accent transition-colors duration-[250ms] hover:border-accent"
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M11 4H1M4 1L1 4l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  BACK
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (!canGo) return;
                  if (step === 3) setSubmitted(true);
                  else go(step + 1);
                }}
                disabled={!canGo}
                className={`flex flex-1 items-center justify-center gap-3 border-0 px-10 py-[14px] font-sans text-[9.5px] font-semibold tracking-[0.22em] text-bg-warm transition-colors duration-300 md:flex-none md:justify-start ${
                  canGo ? "cursor-pointer bg-[#1E0E06] hover:bg-accent" : "cursor-not-allowed bg-[#C8C0B8]"
                }`}
              >
                {step === 3 ? "GET MY ESTIMATE" : "CONTINUE"}
                <svg width="15" height="9" viewBox="0 0 15 9" fill="none">
                  <path d="M0 4.5h13M9 1l4 3.5L9 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
