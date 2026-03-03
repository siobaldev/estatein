// Why opengraph-image is in different location with slug page?
// When using dynamic metadata image routes (such as opengraph-image.js)
// under route group segments, the generated URLs were normalized,
// which could conflict with ones not under group routes.
// For instance, app/(post)/opengraph-image.js could have the same URL
// as app/opengraph-image.js.
//
// To avoid this, when `()` or `@` appears in the route,
// Nextjs generate a unique suffix (-\d{6}) and append it to the URL
// so they are treated as different routes.

import { createClient } from "@/lib/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Property preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function Image({ params }: Props) {
  const { slug } = await params;

  const id = slug.split("-")[0];

  const supabase = createClient();
  const { data: property } = await supabase
    .from("Property")
    .select("name, image, price")
    .eq("id", id)
    .single();

  if (!property) return new Response("Not found", { status: 404 });

  const convertedImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og/${slug}?imageUrl=${encodeURIComponent(property.image)}`;

  const urbanist = await fetch(
    new URL("/fonts/Urbanist-SemiBold.ttf", baseUrl),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        fontFamily: "Urbanist",
      }}
    >
      {/* Background Image */}
      <img
        src={convertedImageUrl}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Bottom to Top Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.0))",
        }}
      />

      {/* Bottom Left Text Container */}
      <div
        style={{
          position: "absolute",
          left: 60,
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {formatCurrency(property?.price)}
        </h1>

        <span
          style={{
            fontSize: 40,
            opacity: 0.9,
            marginTop: 6,
          }}
        >
          {property?.name}
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Urbanist",
          data: urbanist,
          weight: 600,
          style: "normal",
        },
      ],
    },
  );
}
