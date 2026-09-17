import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InViewReveal from "@/components/InViewReveal";
import { unsplash } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Process | Arka Kitchen Studio",
  description:
    "From first consultation to final reveal — the seven-stage Arka process, 16 to 26 weeks from brief to bespoke kitchen.",
};

const steps = [
  {
    num: "01",
    title: "Consultation",
    duration: "1–2 weeks",
    desc: "We begin with a conversation — about your space, your life, how you cook, how you gather, what you've always wanted a kitchen to feel like. We visit your space, document every constraint, and understand every aspiration.",
    output: "Space documentation + brief document",
    img: unsplash("1656402887556-e727ffe1f6d7", 800, 600),
    alt: "Design consultation with kitchen layout",
  },
  {
    num: "02",
    title: "Concept",
    duration: "2–3 weeks",
    desc: "The first design direction takes shape. We present floor plans, elevations, and a material story — showing you not just how it will look, but how it will live. Two or three directions, developed to help you see what's possible.",
    output: "Concept drawings + initial material palette",
    img: unsplash("1683629357963-adf2b1fa9ad9", 800, 600),
    alt: "Kitchen design concept with marble counter",
  },
  {
    num: "03",
    title: "Materials",
    duration: "1–2 weeks",
    desc: "You visit our material library. You hold the stone samples, feel the wood finishes, test the hardware. We refine the selection together — this is where the kitchen begins to have a character that is entirely your own.",
    output: "Finalised material specification",
    img: unsplash("1551554781-c46200ea959d", 800, 600),
    alt: "Material samples selection",
  },
  {
    num: "04",
    title: "Design Development",
    duration: "3–4 weeks",
    desc: "Every dimension is resolved. Storage, lighting, appliance integration, electrical positions, plumbing — all drawn to the millimetre. We present detailed 3D renders so you can inhabit the design before it exists.",
    output: "Full technical drawings + 3D visualisation",
    img: unsplash("1758448755927-e5c5ae14790c", 800, 600),
    alt: "Kitchen island design development",
  },
  {
    num: "05",
    title: "Manufacturing",
    duration: "6–10 weeks",
    desc: "Your kitchen is built in our workshop by our craftspeople. Every cabinet, every panel, every detail is made to our drawings. Stone is cut, wood is treated, hardware is sourced. Quality is verified at every stage.",
    output: "Completed kitchen components ready for installation",
    img: unsplash("1760072513457-651955c7074d", 800, 600),
    alt: "Kitchen manufacturing and craftsmanship",
  },
  {
    num: "06",
    title: "Installation",
    duration: "2–4 weeks",
    desc: "Our installation team arrives on site. We protect your space, sequence the work carefully, and attend to every joint, every edge, every alignment. We do not leave until the kitchen is exactly as designed.",
    output: "Installed kitchen with snagging complete",
    img: unsplash("1758565811430-3423f31396f9", 800, 600),
    alt: "Kitchen installation process",
  },
  {
    num: "07",
    title: "Reveal",
    duration: "Day one",
    desc: "We step back. You step in. Your kitchen — designed entirely around your life, built to last for decades. We return after two weeks to attend to any adjustments, and remain available for the lifetime of the kitchen.",
    output: "Your completed kitchen + lifetime support",
    img: unsplash("1769737122085-97b1ee5ab104", 800, 600),
    alt: "Completed luxury kitchen reveal",
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="mx-auto max-w-screen-xl px-8 pb-20 pt-40 md:px-16">
        <InViewReveal>
          <p className="mb-6 text-label text-accent">OUR PROCESS</p>
        </InViewReveal>
        <InViewReveal delay={100}>
          <h1 className="text-display text-[clamp(2.8rem,5.5vw,6.5rem)] leading-[1.02] text-ink">
            Designed With You.
            <br />
            <em>Built Around You.</em>
          </h1>
        </InViewReveal>
        <InViewReveal delay={200}>
          <p className="mt-8 max-w-[560px] text-body text-[17px] text-ink-muted">
            From first conversation to final reveal — a process designed to
            be as refined as the kitchen it produces.
          </p>
        </InViewReveal>
        <InViewReveal delay={280}>
          <p className="mt-6 text-label text-ink-muted">
            TOTAL LEAD TIME: 16–26 WEEKS
          </p>
        </InViewReveal>
      </div>

      {/* Timeline */}
      {steps.map((step, i) => (
        <section key={step.num} className={i % 2 === 0 ? "bg-bg-warm" : "bg-bg"}>
          <div className="mx-auto max-w-screen-xl px-8 py-20 md:px-16">
            <div
              className={`grid items-center gap-12 md:grid-cols-2 md:gap-20 ${
                i % 2 !== 0 ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Image */}
              <InViewReveal>
                <div
                  className={`${
                    i % 2 !== 0 ? "md:[direction:ltr]" : ""
                  } img-zoom relative aspect-[4/3] cursor-none overflow-hidden`}
                  data-cursor="view"
                >
                  <Image
                    src={step.img}
                    alt={step.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </InViewReveal>

              {/* Content */}
              <div className={i % 2 !== 0 ? "md:[direction:ltr] md:pl-8" : "md:pr-8"}>
                <InViewReveal delay={100}>
                  <div className="mb-6 flex items-baseline gap-4">
                    <span className="text-display text-[clamp(3rem,6vw,6rem)] leading-none text-accent opacity-15">
                      {step.num}
                    </span>
                    <div>
                      <p className="mb-1 text-label text-accent">
                        {step.duration}
                      </p>
                      <h2 className="text-display text-[clamp(1.8rem,3vw,3rem)] text-ink">
                        {step.title}
                      </h2>
                    </div>
                  </div>
                </InViewReveal>
                <InViewReveal delay={180}>
                  <p className="mb-8 text-body text-[16px] leading-[1.8] text-ink-muted">
                    {step.desc}
                  </p>
                </InViewReveal>
                <InViewReveal delay={240}>
                  <div className="border-l-2 border-accent pl-4">
                    <p className="mb-1 text-label text-[9px] text-ink-muted">
                      DELIVERABLE
                    </p>
                    <p className="text-body text-sm text-ink">{step.output}</p>
                  </div>
                </InViewReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-dark py-40 text-center">
        <div className="mx-auto max-w-screen-xl px-8 md:px-16">
          <InViewReveal>
            <p className="mb-8 text-label text-accent">BEGIN YOUR PROCESS</p>
          </InViewReveal>
          <InViewReveal delay={100}>
            <h2 className="mb-8 text-display text-[clamp(2rem,4.5vw,5rem)] leading-[1.05] text-bg-warm">
              Ready to begin?
              <br />
              <em>We are.</em>
            </h2>
          </InViewReveal>
          <InViewReveal delay={200}>
            <p className="mx-auto mb-12 max-w-[440px] text-body text-bg-warm/55">
              The first consultation is complimentary. We&rsquo;d love to
              hear about your space.
            </p>
          </InViewReveal>
          <InViewReveal delay={280}>
            <Link
              href="/contact"
              className="magnetic-btn inline-block bg-accent px-12 py-5 text-label tracking-widest text-bg-warm transition-colors duration-500 hover:bg-highlight"
              data-cursor="open"
            >
              BOOK A CONSULTATION
            </Link>
          </InViewReveal>
        </div>
      </section>
    </div>
  );
}
