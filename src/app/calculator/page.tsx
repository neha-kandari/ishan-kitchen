import type { Metadata } from "next";
import CalculatorPageClient from "./CalculatorPageClient";

export const metadata: Metadata = {
  title: "Price Calculator | Arka Kitchen Studio",
  description:
    "A guided 4-step estimate for your Arka modular kitchen or wardrobe — layout, measurements, collection and a personalised price range.",
};

export default function CalculatorPage() {
  return <CalculatorPageClient />;
}
