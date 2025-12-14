import Header from "@/components/header/header";
import Hero from "@/components/hero";
import FeaturedProperties from "@/components/featured-properties/featured-properties";
import Testimonial from "@/components/testimonial/testimonial";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="space-y-20 md:space-y-25 lg:space-y-30 xl:space-y-37.5">
        <Hero />
        <FeaturedProperties />
        <Testimonial />
      </div>
    </main>
  );
}
