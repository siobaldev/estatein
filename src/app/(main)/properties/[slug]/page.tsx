import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Properties } from "@/lib/data";
import { slugify } from "@/lib/utils";
import PropertyInfo from "../_components/property-info";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetails({ params }: Props) {
  const { slug } = await params;

  // Find the property by matching the slug
  const property = Properties.find((p) => slugify(p.name) === slug);

  // If property not found, show 404
  if (!property) {
    notFound();
  }

  return (
    <section className="wrapper text-body mt-10 space-y-7.5 font-medium">
      <PropertyInfo property={property} />
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
