import AnimatedButton from "../ui/animated-button";
import TripleStar from "../ui/triple-star";
import CarouselTestimonial from "./carousel";

export default function Testimonial() {
  return (
    <section id="testimonials" className="wrapper relative">
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container with vertical spacing */}
      <div className="flex flex-col gap-y-7.5">
        {/* Header: Title, description, and CTA button */}
        <div className="flex items-end justify-between gap-x-20">
          {/* Text content container */}
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-sub-title font-semibold">
              What Our Clients Say
            </h1>
            <p className="text-body text-sub-foreground font-medium">
              Read the success stories and heartfelt testimonials from our
              valued clients. Discover why they chose Estatein for their real
              estate needs.
            </p>
          </div>

          {/* CTA button - hidden on mobile, visible on desktop (lg+) */}
          <AnimatedButton className="ring-border hover:ring-purple-60 hidden size-fit px-5 py-3.5 font-medium text-nowrap ring lg:block">
            View All Testimonials
          </AnimatedButton>
        </div>

        {/* Testimonial carousel component */}
        <CarouselTestimonial />
      </div>
    </section>
  );
}
