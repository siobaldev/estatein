import { Metadata } from "next";
import AnimatedSection from "@/components/animated-section";
import ContactHero from "./_components/hero-section";
import ContactForm from "./_components/contact-form/contact-form";
import OurOffices from "./_components/office";

export const metadata: Metadata = {
  title: "Estatein - Contact",
  description:
    "Get in touch with Estatein for all your real estate needs. Contact our team for property inquiries, management services, investment opportunities, or general questions.",
};

export default function Contact() {
  const sections = [ContactHero, ContactForm, OurOffices];

  return (
    <main className="space-y-20 md:space-y-25 lg:space-y-30 xl:space-y-37.5">
      {sections.map((Component, index) => (
        <AnimatedSection key={index}>
          <Component />
        </AnimatedSection>
      ))}
    </main>
  );
}
