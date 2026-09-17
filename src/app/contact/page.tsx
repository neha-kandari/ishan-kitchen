import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | Arka Kitchen Studio",
  description:
    "Book a complimentary consultation with Arka Kitchen Studio. Tell us about your space and one of our designers will be in touch within 48 hours.",
};

export default function ContactPage() {
  return <ContactContent />;
}
