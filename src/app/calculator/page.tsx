import type { Metadata } from "next";
import PriceCalculatorWizard from "./PriceCalculatorWizard";

export const metadata: Metadata = {
  title: "Kitchen Price Calculator | Arka Kitchen Studio",
  description:
    "A guided 4-step estimate for your Arka modular kitchen — layout, measurements, collection and a personalised price range.",
};

export default function CalculatorPage() {
  return <PriceCalculatorWizard />;
}
