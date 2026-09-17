"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  dataCursor?: string;
  maxTilt?: number;
}

/** A container that tilts in 3D toward the cursor, like a held photograph. */
export default function TiltCard({
  children,
  className = "",
  dataCursor,
  maxTilt = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) scale(1.02)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor={dataCursor}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
