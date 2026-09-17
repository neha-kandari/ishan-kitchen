import Reveal from "@/components/Reveal";

const stats = [
  { n: "12", unit: "Years", label: "of precision kitchen design" },
  { n: "180+", unit: "Kitchens", label: "delivered across India" },
  { n: "10", unit: "Year", label: "structural warranty on every kitchen" },
  { n: "8", unit: "Cities", label: "with dedicated showrooms" },
];

export default function NumbersSection() {
  return (
    <section className="border-y border-stone bg-cream py-14 md:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.n + s.unit}
              delay={i * 0.08}
              className={`border-stone px-4 py-6 md:px-10 md:py-0 ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < 2 ? "border-b md:border-b-0" : ""} ${
                i % 4 !== 3 ? "md:border-r" : ""
              } ${i === 0 ? "md:pl-0" : ""}`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-serif leading-none text-ink text-[clamp(2.2rem,5vw,3.75rem)]">
                  {s.n}
                </span>
                <span className="font-serif italic leading-none text-stone-text text-[clamp(1rem,1.6vw,1.4rem)]">
                  {s.unit}
                </span>
              </div>
              <p className="mt-2.5 text-[13px] leading-snug text-stone-text">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
