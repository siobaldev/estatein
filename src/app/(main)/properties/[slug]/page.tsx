import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Properties } from "@/lib/data";
import { slugify } from "@/lib/utils";
import AnimatedSection from "@/components/animated-section";
import PropertyInfo from "../_components/property-info";
import PropertyInquiry from "../_components/property-inquiry";
import PropertyPricing from "../_components/property-pricing";
import FAQs from "@/components/faqs/faqs";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetails({ params }: Props) {
  const { slug } = await params;

  // Section list
  const sections = [PropertyInfo, PropertyInquiry, PropertyPricing, FAQs];

  // Find the property by matching the slug
  const property = Properties.find((p) => slugify(p.name) === slug);

  // If property not found, show 404
  if (!property) {
    notFound();
  }

  return (
    <section className="wrapper text-body mt-10 space-y-20 font-medium md:space-y-25 lg:space-y-30 xl:space-y-37.5">
      {sections.map((Component, index) => (
        <AnimatedSection key={index}>
          <Component property={property} />
        </AnimatedSection>
      ))}
    </section>
  );
}

// Generate static params for all properties (for static generation)
export async function generateStaticParams() {
  return Properties.map((property) => ({
    slug: slugify(property.name),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = Properties.find((p) => slugify(p.name) === slug);

  if (!property) {
    return {
      title: "Estatein - Property Not Found",
    };
  }

  return {
    title: `Estatein - ${property.name}`,
    description: property.description,
  };
}
