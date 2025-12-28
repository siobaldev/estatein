import Hero from "@/components/hero";
import FeaturedProperties from "@/components/featured-properties/featured-properties";
import Testimonial from "@/components/testimonial/testimonial";
import FAQs from "@/components/faqs/faqs";
import AnimatedSection from "@/components/animated-section";

export default function Home() {
  const sections = [Hero, FeaturedProperties, Testimonial, FAQs];

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
