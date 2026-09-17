import Link from "next/link";

const links: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Price Calculator", href: "/calculator" },
];

const socials = ["Instagram", "Pinterest", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-20 md:px-16 md:pt-20 lg:px-24">
        <div className="mb-12 grid gap-16 border-b border-cream/10 pb-16 md:grid-cols-2">
          <div>
            <Link
              href="/"
              data-cursor="open"
              className="mb-8 flex flex-col gap-1.5"
            >
              <span className="font-serif text-3xl italic tracking-[0.04em] text-cream">
                Arka
              </span>
              <span className="text-[7.5px] font-medium tracking-[0.28em] text-cream/35">
                KITCHEN STUDIO
              </span>
            </Link>
            <p className="max-w-[300px] text-[15px] leading-relaxed text-cream/45">
              Designing kitchens around
              <br />
              the way you live.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                data-cursor="open"
                className="w-fit text-left text-sm text-cream/50 transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                data-cursor="open"
                className="text-[11px] tracking-[0.12em] text-cream/35 transition-colors hover:text-cream/60"
              >
                {s.toUpperCase()}
              </a>
            ))}
          </div>
          <span className="text-[10px] tracking-[0.06em] text-cream/25">
            © {new Date().getFullYear()} ARKA KITCHEN STUDIO
          </span>
        </div>
      </div>
    </footer>
  );
}
