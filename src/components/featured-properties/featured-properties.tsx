import AnimatedLink from "../ui/animated-link";
import TripleStar from "../ui/triple-star";
import CarouselProperties from "./carousel";

export default function FeaturedProperties() {
  return (
    <section id="features" className="wrapper relative scroll-mt-32.5">
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container with vertical spacing */}
      <div className="flex flex-col gap-y-7.5">
        {/* Header: Title, description, and CTA button */}
        <div className="flex items-end justify-between gap-x-20">
          {/* Text content container */}
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-sub-title font-semibold">
              Featured Properties
            </h1>
            <p className="text-body text-sub-foreground font-medium">
              Explore our handpicked selection of featured properties. Each
              listing offers a glimpse into exceptional homes and investments
              available through Estatein. Click &quot;View Details&quot; for
              more information.
            </p>
          </div>

          {/* CTA button - hidden on mobile, visible on desktop (lg+) */}
          <AnimatedLink
            href={"/properties"}
            className="ring-border hover:ring-purple-60 hidden size-fit px-5 py-3.5 font-medium text-nowrap ring lg:block"
          >
            View All Properties
          </AnimatedLink>
        </div>

        {/* Properties carousel component */}
        <CarouselProperties />
      </div>
    </section>
  );
}
