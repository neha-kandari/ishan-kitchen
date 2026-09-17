const TEXT = "PRECISION · MATERIAL · LONGEVITY · CRAFT · DETAIL · ARCHITECTURE · ";

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-stone bg-stone py-5">
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
      <div className="flex whitespace-nowrap">
        {[0, 1].map((k) => (
          <div
            key={k}
            className="flex shrink-0"
            style={{ animation: "marquee 22s linear infinite" }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="pr-12 text-[11px] font-medium tracking-[0.22em] text-ink/45"
              >
                {TEXT}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
