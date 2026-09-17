"use client";

import { useState } from "react";
import CalculatorWizard from "./CalculatorWizard";
import { kitchenConfig, wardrobeConfig } from "./configs";

const MODES = [
  { id: "kitchen", label: "Kitchen", config: kitchenConfig },
  { id: "wardrobe", label: "Wardrobe", config: wardrobeConfig },
] as const;

export default function CalculatorPageClient() {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("kitchen");
  const active = MODES.find((m) => m.id === mode)!;

  return (
    <CalculatorWizard
      key={mode}
      config={active.config}
      topSlot={
        <div className="mx-auto flex max-w-[980px] justify-center gap-2 px-5 pt-6 md:justify-start md:px-10">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`border px-6 py-2.5 font-sans text-[10px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                mode === m.id
                  ? "border-[#1E0E06] bg-[#1E0E06] text-bg-warm"
                  : "border-[#C8AD96] bg-transparent text-accent hover:border-accent"
              }`}
            >
              {m.label.toUpperCase()} CALCULATOR
            </button>
          ))}
        </div>
      }
    />
  );
}
