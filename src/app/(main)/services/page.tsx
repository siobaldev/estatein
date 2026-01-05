import { Metadata } from "next";
import AnimatedSection from "@/components/animated-section";
import ServicesHero from "./_components/hero-section";
import ValuationMastery from "./_components/valuation-mastery";
import StrategicMarketing from "./_components/strategic-marketing";
import NegotiationWizardry from "./_components/negotiation-wizardry";

export const metadata: Metadata = {
  title: "Estatein - Services",
  description:
    "Explore Estatein’s real estate services designed to support buyers, sellers, and investors through every stage of the property journey, from discovery to decision-making.",
};

export default function Services() {
  const sections = [
    ServicesHero,
    ValuationMastery,
    StrategicMarketing,
    NegotiationWizardry,
  ];

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
