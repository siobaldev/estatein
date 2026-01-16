import { Metadata } from "next";
import AnimatedSection from "@/components/animated-section";
import PropertiesHero from "./_components/hero-section";
import PropertiesList from "./_components/property-list";

export const metadata: Metadata = {
  title: "Estatein - Properties",
  description:
    "Browse Estatein’s curated collection of residential and commercial properties. Find detailed listings, pricing, and insights to help you choose your ideal property.",
};

// Type definition for the page props
// In Next.js 15+, searchParams is a Promise that needs to be awaited
interface Props {
  searchParams: Promise<{
    search?: string;
    location?: string;
    type?: string;
    price?: string;
    size?: string;
    year?: string;
    page?: string;
  }>;
}

export default function Properties({ searchParams }: Props) {
  return (
    <main className="space-y-20 md:space-y-25 lg:space-y-30 xl:space-y-37.5">
      <AnimatedSection>
        <PropertiesHero />
      </AnimatedSection>

      <AnimatedSection>
        <PropertiesList searchParams={searchParams} />
      </AnimatedSection>
    </main>
  );
}
