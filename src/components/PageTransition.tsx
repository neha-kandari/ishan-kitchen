"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="page-transition"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span className="font-serif text-3xl font-light italic text-ink/70">
        Arka
      </span>
    </div>
  );
}
