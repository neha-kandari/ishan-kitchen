"use client";

import type { ReactNode, RefObject } from "react";
import { useInView } from "@/hooks/useInView";

type Direction = "up" | "left" | "right" | "scale";

const CLASS_BY_DIRECTION: Record<Direction, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

interface InViewRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: Direction;
}

/**
 * Scroll-reveal wrapper shared by every ported src2 page/section — pairs
 * with the .reveal/.reveal-left/.reveal-right/.reveal-scale classes in
 * globals.css and the useInView hook.
 */
export default function InViewReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: InViewRevealProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`${CLASS_BY_DIRECTION[direction]} ${inView ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
