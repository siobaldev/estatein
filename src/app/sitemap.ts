import type { MetadataRoute } from "next";
import { Properties } from "@/lib/data";
import { slugify } from "@/lib/utils";

const baseUrl = "https://estatein-hub.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const propertyUrls = Properties.map((property) => ({
    url: `${baseUrl}/properties/${slugify(property.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...propertyUrls,
  ];
}
