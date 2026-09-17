import type { Metadata } from "next";
import Image from "next/image";
import { unsplash } from "@/lib/images";
import KitchensGrid from "./KitchensGrid";

export const metadata: Metadata = {
  title: "Our Kitchens | Arka Kitchen Studio",
  description:
    "Browse Arka's portfolio of contemporary, minimal, classic, luxury and compact kitchen designs.",
};

export default function KitchensPage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden bg-dark">
        <Image
          src={unsplash("1758565811404-0ff79b13ad48", 1920, 900)}
          alt="Luxury kitchen with island and contemporary design"
          fill
          priority
          className="hero-img-ken object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark/50" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-20 md:px-16">
          <p className="mb-4 text-label text-accent">OUR KITCHENS</p>
          <h1 className="text-display text-[clamp(2.8rem,5.5vw,6.5rem)] leading-[1.02] text-bg-warm">
            Kitchens Designed
            <br />
            <em>Without Compromise.</em>
          </h1>
        </div>
        <style>{`
          @keyframes ken-burns { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
          .hero-img-ken { animation: ken-burns 12s ease-in-out infinite alternate; }
        `}</style>
      </div>

      <KitchensGrid />
    </div>
  );
}
