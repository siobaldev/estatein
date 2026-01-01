import { Metadata } from "next";
import AnimatedSection from "@/components/animated-section";
import OurStory from "./_components/our-story";
import OurValues from "./_components/our-values";
import OurAchievements from "./_components/our-achievements";
import HowItWorks from "./_components/how-it-works";
import OurTeam from "./_components/our-team/our-team";

export const metadata: Metadata = {
  title: "Estatein - About Us",
  description:
    "Learn more about Estatein, a modern real estate platform focused on clarity, trust, and user-friendly property experiences.",
};

export default function About() {
  const sections = [OurStory, OurValues, OurAchievements, HowItWorks, OurTeam];

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
