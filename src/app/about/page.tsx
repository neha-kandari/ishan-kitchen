import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About | Arka Kitchen Studio",
  description:
    "Arka is a design studio that happens to build kitchens — founded in 2014 on the belief that a kitchen deserves the same design intelligence as every other part of the home.",
};

export default function AboutPage() {
  return <AboutContent />;
}
