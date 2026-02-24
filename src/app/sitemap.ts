import type { MetadataRoute } from "next";
import { slugify } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";

const baseUrl = "https://estatein-hub.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: properties } = await supabase
    .from("Property")
    .select("id, name, createdAt");

  const propertyUrls = properties!.map((property) => ({
    url: `${baseUrl}/properties/${property.id}-${slugify(property.name)}`,
    lastModified: new Date(property.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    ...propertyUrls,
  ];
}
