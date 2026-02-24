import { notFound } from "next/navigation";
import { Metadata } from "next";
import { slugify } from "@/lib/utils";
import AnimatedSection from "@/components/animated-section";
import PropertyInfo from "../_components/property-info";
import PropertyInquiry from "../_components/property-inquiry";
import PropertyPricing from "../_components/property-pricing";
import FAQs from "@/components/faqs/faqs";
import { supabase } from "@/lib/supabase/client";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetails({ params }: Props) {
  const { slug } = await params;

  const id = slug.split("-")[0];

  const { data: property } = await supabase
    .from("Property")
    .select(
      `*,
      images:PropertyImage(*),
      keyFeatures:KeyFeatures(*),
      additionalFees:AdditionalFees(*),
      monthlyCosts:MonthlyCosts(*),
      totalInitialCosts:TotalInitialCosts(*),
      monthlyExpenses:MonthlyExpenses(*)`,
    )
    .eq("id", id)
    .single();

  // If property not found, show 404
  if (!property) {
    notFound();
  }

  // Section list
  const sections = [PropertyInfo, PropertyInquiry, PropertyPricing, FAQs];

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
  const { data: properties } = await supabase
    .from("Property")
    .select("id, name");

  if (!properties) return [];

  return properties.map((property) => ({
    slug: `${property.id}-${slugify(property.name)}`,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = slug.split("-")[0];

  const { data: property } = await supabase
    .from("Property")
    .select("name, description")
    .eq("id", id)
    .single();

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
