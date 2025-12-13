import TripleStar from "../ui/triple-star";
import CarouselProperties from "./carousel";

export default function FeaturedProperties() {
  return (
    <section className="mx-6 md:mx-11">
      <TripleStar />
      <div className="flex flex-col gap-y-7.5">
        <div className="flex items-end justify-between gap-x-20">
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-sub-title font-semibold">
              Featured Properties
            </h1>
            <p className="text-body text-grey-60 font-medium">
              Explore our handpicked selection of featured properties. Each
              listing offers a glimpse into exceptional homes and investments
              available through Estatein. Click &quot;View Details&quot; for
              more information.
            </p>
          </div>

          <button className="ring-border hidden size-fit px-5 py-3.5 text-nowrap ring lg:block">
            View All Properties
          </button>
        </div>
        <CarouselProperties />
      </div>
    </section>
  );
}
