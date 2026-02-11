import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

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
        </ThemeProvider>
      </body>
    </html>
  );
}
