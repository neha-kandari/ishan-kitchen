"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (labelRef.current) {
        labelRef.current.style.left = `${e.clientX}px`;
        labelRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleHover = (e: MouseEvent) => {
      const label = (e.target as Element)
        .closest("[data-cursor]")
        ?.getAttribute("data-cursor");
      document.body.classList.toggle(
        "cursor-expanded",
        label === "view" || label === "open"
      );
      if (labelRef.current) {
        labelRef.current.textContent =
          label === "view" ? "VIEW" : label === "open" ? "OPEN" : "";
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleHover, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHover);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
