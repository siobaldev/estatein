import TripleStar from "@/components/ui/triple-star";
import { OurAchievementsCard } from "@/lib/data";

export default function OurAchievements() {
  return (
    <section
      id="our-achievements"
      className="wrapper scroll-mt-32.5 space-y-10"
    >
      {/* Main content container - Headlines and description */}
      <div className="flex items-center">
        <div className="relative">
          {/* Decorative triple star */}
          <TripleStar />
          {/* Main Headline and Description */}
          <div className="space-y-4">
            <h1 className="text-title font-semibold">Our Achievements</h1>
            <p className="text-sub-foreground text-body font-medium">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcended the ordinary.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg">
        {/* Grid layout for the values cards */}
        <ul className="grid grid-cols-1 gap-y-5 lg:grid-cols-3 lg:gap-7.5">
          {OurAchievementsCard.map((card) => (
            <li
              key={card.id}
              className="ring-border shadow-4 lg:shadow-6 rounded-lg p-7.5 ring md:p-10 lg:flex-1 lg:px-5 xl:p-12.5"
            >
              <div className="space-y-4 md:space-y-6">
                {/* Card title */}
                <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
                  {card.title}
                </h2>

                {/* Card description */}
                <p className="text-sub-foreground text-body font-medium">
                  {card.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
