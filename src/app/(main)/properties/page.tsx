import { Metadata } from "next";
import AnimatedSection from "@/components/animated-section";
import PropertiesHero from "./_components/hero-section";

export const metadata: Metadata = {
  title: "Estatein - Properties",
  description:
    "Browse Estatein’s curated collection of residential and commercial properties. Find detailed listings, pricing, and insights to help you choose your ideal property.",
};

export default function Services() {
  const sections = [PropertiesHero];

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
