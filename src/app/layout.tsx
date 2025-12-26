import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import * as motion from "motion/react-client";

const urbanist = Urbanist({
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Estatein",
  description:
    "Find your perfect property with Estatein, a leading real estate agency offering expert support in home buying, selling, and investment. Explore top listings, personalized service, and market-driven insights.",
};

const sectionVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
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
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Header />
          </motion.div>
          {children}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-20 md:mt-25 lg:mt-30 xl:mt-37.5"
          >
            <Footer />
          </motion.div>
        </ThemeProvider>
      </body>
    </html>
  );
}
