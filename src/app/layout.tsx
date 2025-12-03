import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Estatein",
  description:
    "Find your perfect property with Estatein, a leading real estate agency offering expert support in home buying, selling, and investment. Explore top listings, personalized service, and market-driven insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Estatein" />
      </head>
      <body className={`${urbanist.variable} antialiased font-urbanist`}>
        {children}
      </body>
    </html>
  );
}
