import Header from "@/components/header/header";
import Hero from "@/components/hero";
import FeaturedProperties from "@/components/featured-properties/featured-properties";
import Testimonial from "@/components/testimonial/testimonial";
import FAQs from "@/components/faqs/faqs";
import Footer from "@/components/footer/footer";
import * as motion from "motion/react-client";

const sectionVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Home() {
  const sections = [
    { Component: Hero, delay: 0.1 },
    { Component: FeaturedProperties, delay: 0.1 },
    { Component: Testimonial, delay: 0.1 },
    { Component: FAQs, delay: 0.1 },
    { Component: Footer, delay: 0.1 },
  ];

  return (
    <main>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <Header />
      </motion.div>

      <div className="space-y-20 md:space-y-25 lg:space-y-30 xl:space-y-37.5">
        {sections.map(({ Component, delay }, index) => (
          <motion.div
            key={index}
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay }}
          >
            <Component />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
