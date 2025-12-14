import TripleStar from "../ui/triple-star";
import CarouselTestimonial from "./carousel";

export default function Testimonial() {
  return (
    <section className="mx-6 md:mx-11">
      <TripleStar />
      <div className="flex flex-col gap-y-7.5">
        <div className="flex items-end justify-between gap-x-20">
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-sub-title font-semibold">
              What Our Clients Say
            </h1>
            <p className="text-body text-grey-60 font-medium">
              Read the success stories and heartfelt testimonials from our
              valued clients. Discover why they chose Estatein for their real
              estate needs.
            </p>
          </div>

          <button className="ring-border hidden size-fit px-5 py-3.5 text-nowrap ring lg:block">
            View All Testimonials
          </button>
        </div>
        <CarouselTestimonial />
      </div>
    </section>
  );
}
