import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { unsplash } from "@/lib/images";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-40">
      <div className="absolute inset-0 opacity-[0.12]">
        <Image
          src={unsplash("1502005097973-6a7082348e28", 1800, 900)}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute top-0 right-[20%] h-full w-px origin-top bg-accent/15"
        style={{ transform: "rotate(8deg)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 text-center md:px-14">
        <Reveal>
          <p className="mb-8 text-label text-accent">BEGIN YOUR JOURNEY</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mb-7 font-serif font-light leading-[1] tracking-tight text-ink text-[clamp(3rem,6.5vw,7.5rem)]">
            Let&rsquo;s Design
            <br />
            <em>Your Kitchen.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mb-13 max-w-[480px] text-body text-[17px] text-ink-muted">
            Tell us about your space. We&rsquo;ll turn it into something
            extraordinary.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/contact"
              className="magnetic-btn text-label border border-ink bg-ink px-11 py-[18px] tracking-widest text-bg-warm transition-colors duration-400 hover:bg-highlight hover:border-highlight"
            >
              BOOK A CONSULTATION
            </Link>
            <Link
              href="/projects"
              className="arrow-link text-label border-b border-border pb-1 text-ink"
            >
              EXPLORE PROJECTS
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  d="M0 6h14M9 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
