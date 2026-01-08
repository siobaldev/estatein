import TripleStar from "@/components/ui/triple-star";
import { NegotiationWizardryCards } from "@/lib/data";
import IconContainer from "@assets/Icon-Container.svg";
import AnimatedLink from "@/components/ui/animated-link";
import AbstractLines from "@assets/Abstract-Lines.svg";

export default function NegotiationWizardry() {
  return (
    <section
      id="negotiation-wizardry"
      className="wrapper relative scroll-mt-32.5"
    >
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container */}
      <div className="flex flex-col gap-y-7.5 md:gap-y-10 xl:gap-y-20">
        {/* Header: Title and description */}
        <div className="flex flex-col gap-y-1.5">
          {/* Main content title */}
          <h1 className="text-sub-title font-semibold">
            Smart Investments, Informed Decisions
          </h1>

          {/* Main content description */}
          <p className="text-body text-sub-foreground font-medium">
            Building a real estate portfolio requires a strategic approach.
            Estatein&apos;s Investment Advisory Service empowers you to make
            smart investments and informed decisions.
          </p>
        </div>

        {/* Used div instead of ul to have a div element inside grid (can't have div inside ul) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-7.5">
          {NegotiationWizardryCards.map((card) => (
            <div
              key={card.id}
              className="ring-border space-y-4 rounded-lg p-6 ring md:space-y-5 lg:p-10 xl:p-12.5"
            >
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
          <div className="ring-border bg-sub-background relative z-10 space-y-5 overflow-hidden rounded-lg p-6 ring md:col-span-2 lg:p-10 xl:p-12.5">
            {/* Title and Animated Link container */}
            <div className="flex flex-col gap-y-5 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold md:text-xl lg:text-2xl">
                Unlock Your Investment Potential
              </h3>

              {/* Animated link to properties */}
              <AnimatedLink
                href={"/properties"}
                className="ring-border bg-background hover:ring-purple-60 block w-full px-5 py-3.5 text-center font-medium ring md:w-fit"
              >
                Learn more
                {/* Descriptive text for SEO */}
                <span className="sr-only">
                  {" "}
                  about property investment opportunities
                </span>
              </AnimatedLink>
            </div>

            {/* Description */}
            <p className="text-body text-sub-foreground font-medium">
              Explore our Property Management Service categories and let us
              handle the complexities while you enjoy the benefits of property
              ownership.
            </p>

            {/* Decorative background lines */}
            <AbstractLines
              aria-hidden={true}
              className="stroke-border/60 absolute top-0 left-0 -z-10 h-200 stroke-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
