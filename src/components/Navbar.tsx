"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";

/** On the home page the hero is a tall (400vh) scroll-driven sequence —
 * the nav should stay transparent for its whole length, not just the
 * first 40px of scroll. */
function getSolidThreshold() {
  const hero = document.getElementById("hero-sequence");
  if (!hero) return 40;
  return Math.max(40, hero.offsetHeight - window.innerHeight - 40);
}

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/calculator", label: "Price Calculator" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > getSolidThreshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // The underline indicator tracks whichever link is hovered, snapping back
  // to the active route the moment the pointer leaves the nav — a single
  // sliding mark reads as more considered than a static underline per link.
  const measure = (el: HTMLAnchorElement | null) => {
    const nav = navRef.current;
    if (!el || !nav) {
      setIndicator((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ left: rect.left - navRect.left, width: rect.width, opacity: 1 });
  };

  useLayoutEffect(() => {
    const activeIdx = links.findIndex((l) => l.href === pathname);
    measure(activeIdx >= 0 ? linkRefs.current[activeIdx] : null);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      const idx = hoveredIdx ?? links.findIndex((l) => l.href === pathname);
      if (idx >= 0) measure(linkRefs.current[idx]);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, hoveredIdx]);

  return (
    <Fragment>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          transparent
            ? "bg-transparent"
            : "border-b border-ink/10 bg-cream/90 shadow-[0_1px_24px_rgba(30,14,6,0.06)] backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 transition-colors duration-500 md:px-16 lg:px-24 ${
            transparent ? "text-white" : "text-ink"
          }`}
        >
          <Link
            href="/"
            data-cursor="open"
            className="group flex flex-col items-start gap-1.5"
          >
            <span className="font-serif text-xl italic tracking-[0.04em] transition-opacity duration-300 group-hover:opacity-70">
              Arka
            </span>
            <span
              className={`relative flex items-center gap-[5px] text-[7px] font-medium tracking-[0.28em] ${
                transparent ? "text-white/60" : "text-stone-text"
              }`}
            >
              <span
                className={`h-[3px] w-[3px] rounded-full transition-colors duration-300 ${
                  transparent ? "bg-white/60" : "bg-accent/70"
                }`}
              />
              KITCHEN STUDIO
            </span>
          </Link>

          <nav
            ref={navRef}
            onMouseLeave={() => {
              setHoveredIdx(null);
              const activeIdx = links.findIndex((l) => l.href === pathname);
              measure(activeIdx >= 0 ? linkRefs.current[activeIdx] : null);
            }}
            className="relative hidden items-center gap-10 text-[13px] md:flex"
          >
            <span
              className={`pointer-events-none absolute -bottom-1 h-px transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                transparent ? "bg-white" : "bg-ink"
              }`}
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.left}px)`,
                opacity: indicator.opacity,
              }}
            />
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                onMouseEnter={() => {
                  setHoveredIdx(i);
                  measure(linkRefs.current[i]);
                }}
                data-cursor="open"
                className={`relative pb-1 transition-opacity ${
                  pathname === l.href
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/calculator"
            data-cursor="open"
            className={`group hidden items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors md:inline-flex ${
              transparent
                ? "border-white/70 text-white hover:bg-white hover:text-ink"
                : "border-ink text-ink hover:bg-ink hover:text-cream"
            }`}
          >
            Book Consultation
            <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ml-0.5 group-hover:max-w-[14px] group-hover:opacity-100">
              →
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            data-cursor="open"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-px w-5 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu — rendered outside <header> because backdrop-blur on
         the header creates a new containing block for fixed descendants,
         which would otherwise clip this overlay to the header's own height. */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{ pointerEvents: open ? "all" : "none" }}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink/40 transition-opacity duration-500"
          style={{ opacity: open ? 1 : 0 }}
        />

        {/* Right-side drawer */}
        <div
          className="absolute inset-y-0 right-0 flex w-[80%] max-w-[360px] flex-col justify-center gap-12 overflow-y-auto bg-cream px-9 py-24 shadow-2xl"
          style={{
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex flex-col gap-4">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-left font-serif text-3xl font-light text-ink transition-opacity duration-300"
                style={{
                  opacity: open ? 1 : 0,
                  transitionDelay: open ? `${150 + i * 60}ms` : "0ms",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/calculator"
            onClick={() => setOpen(false)}
            className="w-fit bg-ink px-8 py-4 text-[11px] font-medium uppercase tracking-widest text-cream transition-opacity duration-300"
            style={{
              opacity: open ? 1 : 0,
              transitionDelay: open ? "390ms" : "0ms",
            }}
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
