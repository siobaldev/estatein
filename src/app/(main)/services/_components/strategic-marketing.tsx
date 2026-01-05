import TripleStar from "@/components/ui/triple-star";
import { StrategicMarketingCards } from "@/lib/data";
import IconContainer from "@assets/Icon-Container.svg";
import AnimatedLink from "@/components/ui/animated-link";
import AbstractLines from "@assets/Abstract-Lines.svg";

export default function StrategicMarketing() {
  return (
    <section id="strategic-marketing" className="wrapper relative">
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container */}
      <div className="flex flex-col gap-y-7.5 md:gap-y-10 xl:gap-y-20">
        {/* Header: Title and description */}
        <div className="flex flex-col gap-y-1.5">
          {/* Main content title */}
          <h1 className="text-sub-title font-semibold">
            Effortless Property Management
          </h1>

          {/* Main content description */}
          <p className="text-body text-sub-foreground font-medium">
            Owning a property should be a pleasure, not a hassle.
            Estatein&apos;s Property Management Service takes the stress out of
            property ownership, offering comprehensive solutions tailored to
            your needs. Explore the categories below to see how we can make
            property management effortless for you
          </p>
        </div>

        {/* Used div instead of ul to have a div element inside grid (can't have div inside ul) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-7.5">
          {StrategicMarketingCards.map((card) => (
            <div key={card.id} className="ring-border rounded-lg p-6 ring">
              {/* Icon, title and description */}
              <div className="inline-flex items-center gap-x-2.5 lg:gap-x-4">
                <div className="relative flex items-center justify-center">
                  {/* Decorative svg for icon */}
                  <IconContainer
                    aria-hidden="true"
                    className="size-12 stroke-2 lg:size-15 xl:size-20.5"
                  />

                  {/* Icon from the data */}
                  <card.icon
                    weight="fill"
                    aria-hidden="true"
                    className="text-purple-75 absolute size-5 xl:size-8.5"
                  />
                </div>

                {/* Card title */}
                <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
                  {card.title}
                </h2>
              </div>

              {/* Card description */}
              <p className="text-sub-foreground text-body font-medium">
                {card.description}
              </p>
            </div>
          ))}
          <div className="ring-border bg-sub-background via-sub-background relative z-10 space-y-5 overflow-hidden rounded-lg bg-linear-to-r from-0% via-50% p-6 ring md:col-span-2 md:p-10">
            {/* Title and Animated Link container */}
            <div className="flex flex-col gap-y-5 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold md:text-xl lg:text-2xl">
                Experience Effortless Property Management
              </h3>

              {/* Animated link to properties */}
              <AnimatedLink
                href={"/properties"}
                className="ring-border bg-background hover:ring-purple-60 block w-full px-5 py-3.5 text-center font-medium ring md:w-fit"
              >
                Learn more
                {/* Descriptive text for SEO */}
                <span className="sr-only"> about our property listings</span>
              </AnimatedLink>
            </div>

            {/* Description */}
            <p className="text-body text-sub-foreground font-medium">
              Ready to experience hassle-free property management? Explore our
              Property Management Service categories and let us handle the
              complexities while you enjoy the benefits of property ownership.
            </p>

            {/* Decorative background lines */}
            <AbstractLines
              aria-hidden={true}
              className="stroke-border absolute top-0 left-0 -z-10 h-200 stroke-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
