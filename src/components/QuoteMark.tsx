export default function QuoteMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none block select-none font-serif leading-none text-ink/10 ${className ?? ""}`}
      style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
    >
      &ldquo;
    </span>
  );
}
