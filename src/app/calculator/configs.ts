import { unsplash } from "@/lib/images";

export interface LayoutOption {
  id: string;
  label: string;
  bestFor: string;
  desc: string;
  walls: string[];
  defaults: { A: number; B: number };
}

export interface PackageOption {
  id: string;
  label: string;
  tier: string;
  sub: string;
  tagline: string;
  rate: number;
  features: string[];
  img: string;
  recommended: boolean;
}

export interface CalculatorConfig {
  kind: "kitchen" | "wardrobe";
  eyebrow: string;
  layoutWord: string;
  layouts: LayoutOption[];
  packages: PackageOption[];
}

export const kitchenConfig: CalculatorConfig = {
  kind: "kitchen",
  eyebrow: "KITCHEN PRICE CALCULATOR",
  layoutWord: "Kitchen",
  layouts: [
    {
      id: "l-shaped",
      label: "L-Shaped",
      bestFor: "Corner spaces",
      desc: "Two adjacent walls working together.",
      walls: ["A", "B"],
      defaults: { A: 8, B: 6 },
    },
    {
      id: "straight",
      label: "Straight",
      bestFor: "Narrow kitchens",
      desc: "One long wall — minimal, clean, open.",
      walls: ["A"],
      defaults: { A: 10, B: 0 },
    },
    {
      id: "u-shaped",
      label: "U-Shaped",
      bestFor: "Maximum storage",
      desc: "Three walls of counter, storage, and workflow.",
      walls: ["A", "B"],
      defaults: { A: 8, B: 6 },
    },
    {
      id: "parallel",
      label: "Parallel",
      bestFor: "Galley kitchens",
      desc: "Two facing walls — efficient and elegant.",
      walls: ["A", "B"],
      defaults: { A: 10, B: 10 },
    },
  ],
  packages: [
    {
      id: "stone",
      label: "Stone Series",
      tier: "₹₹",
      sub: "Essential luxury",
      tagline:
        "Handcrafted stone surfaces with refined finishes — the ideal first step into premium.",
      rate: 45000,
      features: [
        "Natural stone countertops",
        "Soft-close cabinetry",
        "Standard hardware",
        "Integrated lighting",
      ],
      img: unsplash("1558346648-9757f2fa4474", 800, 560),
      recommended: false,
    },
    {
      id: "signature",
      label: "Signature",
      tier: "₹₹₹",
      sub: "Most popular",
      tagline:
        "Our best-selling collection — premium stone, bespoke bronze hardware, full-height joinery.",
      rate: 75000,
      features: [
        "Premium stone selection",
        "Custom bronze hardware",
        "Full-height cabinetry",
        "Island option",
        "Recessed lighting",
      ],
      img: unsplash("1769737122085-97b1ee5ab104", 800, 560),
      recommended: true,
    },
    {
      id: "bespoke",
      label: "Bespoke",
      tier: "₹₹₹₹",
      sub: "Collector grade",
      tagline:
        "Museum-grade specification — rare stone, fully custom joinery, gallery lighting, white-glove delivery.",
      rate: 125000,
      features: [
        "Rare stone curation",
        "Bespoke joinery",
        "Gallery-grade lighting",
        "Full-scope design",
        "White-glove install",
      ],
      img: unsplash("1663811397261-916af74a9363", 800, 560),
      recommended: false,
    },
  ],
};

export const wardrobeConfig: CalculatorConfig = {
  kind: "wardrobe",
  eyebrow: "WARDROBE PRICE CALCULATOR",
  layoutWord: "Wardrobe",
  layouts: [
    {
      id: "straight",
      label: "Sliding Wardrobe",
      bestFor: "Space-saving",
      desc: "A single sliding-shutter wall — smooth glide, no swing clearance needed.",
      walls: ["A"],
      defaults: { A: 10, B: 0 },
    },
    {
      id: "l-shaped",
      label: "Corner Wardrobe",
      bestFor: "Corner spaces",
      desc: "Two adjoining walls wrap the corner into one continuous run.",
      walls: ["A", "B"],
      defaults: { A: 8, B: 6 },
    },
    {
      id: "parallel",
      label: "His & Hers",
      bestFor: "Shared dressing rooms",
      desc: "Facing wardrobe walls for a couple — his side, her side.",
      walls: ["A", "B"],
      defaults: { A: 8, B: 8 },
    },
    {
      id: "u-shaped",
      label: "Walk-In Closet",
      bestFor: "Maximum storage",
      desc: "Three walls of storage around a central dressing island.",
      walls: ["A", "B"],
      defaults: { A: 7, B: 6 },
    },
  ],
  packages: [
    {
      id: "laminate",
      label: "Laminate Edition",
      tier: "₹₹",
      sub: "Everyday luxury",
      tagline:
        "Durable laminate finishes with soft-close hardware — a refined, low-maintenance wardrobe.",
      rate: 16000,
      features: [
        "Matte laminate shutters",
        "Soft-close channels",
        "Standard hardware",
        "Internal shelving",
      ],
      img: unsplash("1784653549472-d04445c406c3", 800, 560),
      recommended: false,
    },
    {
      id: "veneer",
      label: "Veneer Select",
      tier: "₹₹₹",
      sub: "Most popular",
      tagline:
        "Natural wood veneer shutters with bronze hardware and fully-fitted interior organisers.",
      rate: 24000,
      features: [
        "Natural wood veneer",
        "Bronze pull hardware",
        "Modular interior fittings",
        "Mirror shutter option",
        "LED strip lighting",
      ],
      img: unsplash("1752407828514-660d6945d392", 800, 560),
      recommended: true,
    },
    {
      id: "lacquer",
      label: "Lacquer Signature",
      tier: "₹₹₹₹",
      sub: "Collector grade",
      tagline:
        "High-gloss lacquer shutters, bespoke walk-in fittings, and a fully custom dressing layout.",
      rate: 34000,
      features: [
        "High-gloss lacquer finish",
        "Bespoke walk-in fittings",
        "Jewellery + accessory drawers",
        "Full-scope design",
        "White-glove install",
      ],
      img: unsplash("1751806524616-47dd4fabd68d", 800, 560),
      recommended: false,
    },
  ],
};
