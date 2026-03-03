import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const imageUrl = request.nextUrl.searchParams.get("imageUrl");

  if (imageUrl) {
    // Convert AVIF to PNG for Satori
    const buffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
    const png = await sharp(Buffer.from(buffer)).png().toBuffer();

    return new NextResponse(png.buffer as ArrayBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  }

  // Compress Satori PNG to JPEG for social platforms
  const png = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/properties/${slug}/opengraph-image`,
  ).then((res) => res.arrayBuffer());

  const jpeg = await sharp(Buffer.from(png))
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();

  return new NextResponse(jpeg.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
