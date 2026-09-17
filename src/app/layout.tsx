import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arka Kitchen Studio | Thoughtfully Made",
  description:
    "Premium modular kitchens crafted around the way you live. Architectural design, natural materials and timeless craftsmanship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink antialiased">
        <Cursor />
        <PageTransition />
        <ScrollTriggerRefresh />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
