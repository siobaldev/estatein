import TripleStar from "@/components/ui/triple-star";
import { OurValuesCard } from "@/lib/data";

export default function OurValues() {
  return (
    <section
      id="our-values"
      className="wrapper mt-10 flex flex-col gap-10 xl:flex-row"
    >
      {/* Main content container - Headlines and stats */}
      <div className="flex items-center">
        <div className="relative">
          {/* Decorative triple star */}
          <TripleStar />

          {/* Main Headline and Description */}
          <div className="space-y-4">
            <h1 className="text-title font-semibold">Our Values</h1>
            <p className="text-sub-foreground text-body font-medium">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary.
            </p>
          </div>
        </div>
      </div>

      <div className="shadow-4 lg:shadow-6 xl:shadow-10 rounded-lg p-2.5">
        {/* Grid layout for the values cards */}
        <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {OurValuesCard.map((card) => (
            <li
              key={card.id}
              className="bg-sub-background ring-border rounded-lg p-4 ring lg:flex-1 lg:px-5"
            >
              <div className="space-y-4 md:space-y-6">
                {/* Icon and title row */}
                <div className="inline-flex items-center gap-x-2 lg:gap-x-4">
                  <div className="ring-purple-60 w-fit rounded-full p-2 ring lg:p-5">
                    {/* Dynamic icon from the data */}
                    <card.icon
                      weight="fill"
                      className="fill-purple-75 size-5 lg:size-7"
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
              {/* Statistic value */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
