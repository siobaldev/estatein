import { notFound } from "next/navigation";
import { Metadata } from "next";
import { slugify } from "@/lib/utils";
import AnimatedSection from "@/components/animated-section";
import PropertyInfo from "../_components/property-info";
import PropertyInquiry from "../_components/property-inquiry";
import PropertyPricing from "../_components/property-pricing";
import FAQs from "@/components/faqs/faqs";
import { createClient } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function PropertyDetails({ params }: Props) {
  const supabase = await createSupabaseServerClient();

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const propertyUrl = `${baseUrl}/properties/${slug}`;

  // JSON-LD structured data for Google's RealEstateListing schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.description,
    url: propertyUrl,

    // Primary listing image
    image: property.image
      ? [`${baseUrl}${property.image}`]
      : (property.images?.map(
          (image: { url: string }) => `${baseUrl}${image.url}`,
        ) ?? []),

    // Price
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: propertyUrl,
    },

    // The actual property being listed
    about: {
      "@type": "Accommodation",
      name: property.name,
      description: property.description,
      numberOfRooms: property.bedrooms,
      numberOfBathroomsTotal: property.bathrooms,
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.propertySize,
        unitCode: "MTK", // square meters
      },
      accommodationCategory: property.propertyType,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.location,
      },
      photo:
        property.images?.map((img: { url: string }) => ({
          "@type": "ImageObject",
          url: `${baseUrl}${img.url}`,
        })) ?? [],
    },

    // Breadcrumb so Google understands site hierarchy
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Properties",
          item: `${baseUrl}/properties`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: property.name,
          item: propertyUrl,
        },
      ],
    },
  };

  // Section list
  const sections = [PropertyInfo, PropertyInquiry, PropertyPricing, FAQs];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="wrapper text-body mt-10 space-y-20 font-medium md:space-y-25 lg:space-y-30 xl:space-y-37.5">
        {sections.map((Component, index) => (
          <AnimatedSection key={index}>
            <Component property={property} user={user} />
          </AnimatedSection>
        ))}
      </section>
    </>
  );
}

// Generate static params for all properties (for static generation)
export async function generateStaticParams() {
  const supabase = createClient();
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
  const supabase = createClient();

  const { slug } = await params;
  const id = slug.split("-")[0];

  const { data: property } = await supabase
    .from("Property")
    .select(
      "name, description, location, price, propertyType, image, bedrooms, bathrooms, propertySize",
    )
    .eq("id", id)
    .single();

  if (!property) {
    return {
      title: "Property Not Found - Estatein",
    };
  }

  const description =
    `For sale at ${formatCurrency(property.price)} – This ${property.propertyType.toLowerCase()} in ${property.location} features ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms, and ${property.propertySize} sqm of living space. View photos, amenities, and full details on Estatein.`
      .replace(/\s+/g, " ")
      .trim();

  const ogTitle = `Discover this ${property.propertyType.toLowerCase()} in ${property.location} - Estatein`;
  const ogDescription = `Step into this beautifully designed ${property.propertyType} offering ${property.bedrooms} spacious bedrooms, modern finishes, and exceptional comfort. Don’t miss this opportunity.`;

  const url = `${baseUrl}/properties/${slug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: `${property.name} - Estatein`,
    description: description,

    alternates: {
      canonical: `/properties/${slug}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: "Estatein",
      type: "website",
      images: [
        {
          url: `/api/og/${slug}`,
          width: 1200,
          height: 630,
          alt: `${property?.name} property preview`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`/api/og/${slug}`],
    },
  };
}
