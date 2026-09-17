"use client";

import { useLayoutEffect, useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { gsap } from "@/lib/gsap";

type ZoomImageProps = Omit<ImageProps, "fill" | "className"> & {
  imageClassName?: string;
};

/**
 * Fills its (relative, overflow-hidden) parent and slowly zooms out of a
 * 1.2x crop as the parent crosses the viewport — the "slow image zoom" from
 * the design brief, contained entirely so it never reveals empty edges.
 */
export default function ZoomImage({
  imageClassName,
  alt,
  ...props
}: ZoomImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const img = imgRef.current;
    const container = img?.parentElement;
    if (!img || !container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.22 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Image
      ref={imgRef}
      alt={alt}
      fill
      {...props}
      className={`h-full w-full object-cover will-change-transform ${imageClassName ?? ""}`}
    />
  );
}
