import Reveal from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    duration: "1–2 wks",
    desc: "We visit your space and understand every constraint — structural, habitual and personal.",
  },
  {
    n: "02",
    title: "Concept",
    duration: "2–3 wks",
    desc: "First design directions shaped around your brief. Layouts, materials, proportions.",
  },
  {
    n: "03",
    title: "Materials",
    duration: "1 wk",
    desc: "Visit our library — hold stone, touch wood, test every hardware pull by hand.",
  },
  {
    n: "04",
    title: "Design",
    duration: "2–4 wks",
    desc: "Millimetre-precise drawings and photorealistic 3D. Every detail resolved before build.",
  },
  {
    n: "05",
    title: "Manufacture",
    duration: "10–14 wks",
    desc: "Hand-built in our workshop. Stone finished on-site. Every unit inspected before delivery.",
  },
  {
    n: "06",
    title: "Reveal",
    duration: "1–2 wks",
    desc: "Supervised installation. Keys handed over when the kitchen is exactly as designed.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-16 lg:px-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-3 md:mb-16">
          <Reveal>
            <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-text">
              07 — The Process
            </p>
            <h2 className="font-serif font-light leading-[1.04] tracking-tight text-ink text-[clamp(2rem,4vw,4.4rem)]">
              From first sketch <em>to final detail.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="pb-2 text-[9px] tracking-[0.18em] text-ink/70">
              16–26 WEEKS END-TO-END
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 border-t border-l border-stone md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.05}
              className="group relative overflow-hidden border-b border-r border-stone px-9 py-10 transition-colors duration-500 hover:bg-beige/40"
            >
              <span className="pointer-events-none absolute right-7 top-6 select-none font-serif text-6xl italic leading-none text-ink/[0.05]">
                {s.n}
              </span>

              <span className="mb-6 inline-block border border-ink/30 px-2.5 py-1 text-[9px] tracking-[0.16em] text-ink">
                {s.duration}
              </span>

              <h3 className="mb-3.5 font-serif text-2xl leading-tight tracking-tight text-ink">
                {s.title}
              </h3>

              <div className="mb-3.5 h-px w-8 bg-ink/50" />

              <p className="text-[13px] leading-relaxed text-stone-text">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
