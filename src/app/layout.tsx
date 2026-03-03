import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "sonner";

const urbanist = localFont({
  src: [
    {
      path: "../../public/fonts/Urbanist-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estatein-hub.vercel.app"),
  title: "Estatein",
  description:
    "Find your perfect property with Estatein, a leading real estate agency offering expert support in home buying, selling, and investment. Explore top listings, personalized service, and market-driven insights.",
  openGraph: {
    title: "Estatein - Modern Real Estate Platform",
    description:
      "Discover homes, apartments, and investment properties. Buy, sell, and explore real estate with modern tools designed for smarter decisions.",
    siteName: "Estatein",
    type: "website",
    images: [
      {
        url: "/assets/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Estatein – Modern Real Estate Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estatein – Modern Real Estate Platform",
    description:
      "Discover homes, apartments, and investment properties. Buy, sell, and explore real estate with modern tools designed for smarter decisions.",
    images: ["/assets/opengraph-image.png"],
  },
  verification: {
    google: "Zfuql6i4ntFcw5ESM4-gucPqhmam6CqDLr62PBe_TL4",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="motion-safe:scroll-smooth"
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Estatein" />
      </head>
      <body
        className={`${urbanist.variable} text-foreground dark:selection:bg-purple-60 bg-background font-urbanist selection:text-foreground selection:bg-purple-90 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
