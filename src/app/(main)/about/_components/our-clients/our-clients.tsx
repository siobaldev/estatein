import TripleStar from "@/components/ui/triple-star";

import CarouselOurClients from "./carousel";

export default function OurClients() {
  return (
    <section id="testimonials" className="wrapper relative">
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container with vertical spacing */}
      <div className="flex flex-col gap-y-7.5">
        {/* Header: Title, description, and CTA button */}
        <div className="flex flex-col gap-y-1.5">
          <h1 className="text-sub-title font-semibold">Our Valued Clients</h1>
          <p className="text-body text-sub-foreground font-medium">
            At Estatein, we have had the privilege of working with a diverse
            range of clients across various industries. Here are some of the
            clients we&apos;ve had the pleasure of serving
          </p>
        </div>

        {/* Testimonial carousel component */}
        <CarouselOurClients />
      </div>
    </section>
  );
}
