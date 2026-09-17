"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Wraps interactive content and pulls it gently toward the cursor. */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
