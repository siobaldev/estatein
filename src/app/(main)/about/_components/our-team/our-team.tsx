import TripleStar from "@/components/ui/triple-star";
import Image from "next/image";
import { OurTeamCard } from "@/lib/data";
import SendMessage from "./send-message";
import { TwitterLogoIcon } from "@phosphor-icons/react/dist/ssr";
import AnimatedLink from "@/components/ui/animated-link";

export default function OurTeam() {
  return (
    <section id="our-team" className="wrapper mt-10 space-y-10">
      {/* Main content container - Headlines and description */}
      <div className="flex items-center">
        <div className="relative">
          {/* Decorative triple star */}
          <TripleStar />
          {/* Main Headline and Description */}
          <div className="space-y-4">
            <h1 className="text-title font-semibold">Meet the Estatein Team</h1>
            <p className="text-sub-foreground text-body font-medium">
              At Estatein, our success is driven by the dedication and expertise
              of our team. Get to know the people behind our mission to make
              your real estate dreams a reality.
            </p>
          </div>
        </div>
      </div>

      <div className="@container rounded-lg">
        {/* Grid layout for the values cards */}
        <ul className="grid grid-cols-1 gap-y-5 @xl:grid-cols-2 @xl:gap-6 @4xl:grid-cols-3 @7xl:grid-cols-4">
          {OurTeamCard.map((card, index) => (
            <li
              key={card.id}
              className={`ring-border rounded-lg p-4 ring lg:px-5 ${
                OurTeamCard.length === 4 && index === 3
                  ? "@4xl:col-start-2 @7xl:col-start-auto"
                  : ""
              }`}
            >
              <div className="relative space-y-10 lg:space-y-12.5">
                {/* Our Team images */}
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  width={200}
                  height={200}
                  className="size-full"
                  unoptimized={true}
                />
                <div className="relative flex flex-col items-center space-y-4 text-center md:space-y-5 @xl:space-y-6">
                  <AnimatedLink
                    href={"/about"}
                    className="ring-border group bg-sub-background absolute -top-15 w-fit rounded-full px-5 py-2.5 ring @lg:-top-17.5"
                  >
                    <TwitterLogoIcon
                      weight="fill"
                      aria-hidden={true}
                      className="group-hover:fill-purple-60 size-5 @lg:size-6"
                    />
                  </AnimatedLink>

                  <div className="w-full">
                    {/* Card person name */}
                    <h2 className="text-lg font-semibold @lg:text-2xl @7xl:text-xl">
                      {card.name}
                    </h2>
                    {/* Card person title */}
                    <p className="text-sub-foreground text-body font-medium">
                      {card.title}
                    </p>
                  </div>

                  {/* Animated form component */}
                  <SendMessage />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
