import TripleStar from "@/components/ui/triple-star";
import { HeroStats } from "@/lib/data";
import Image from "next/image";
import AbstractLines from "@assets/Abstract-Lines.svg";

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="wrapper mt-10 flex flex-col-reverse gap-10 lg:flex-row"
    >
      {/* Main content container - Headlines and stats */}
      <div className="flex flex-1 items-center">
        <div className="relative">
          {/* Decorative triple star */}
          <TripleStar />
          <div className="space-y-10">
            {/* Main Headline and Description */}
            <div className="space-y-4">
              <h1 className="text-title font-semibold">Our Story</h1>
              <p className="text-sub-foreground text-body font-medium">
                Our story is one of continuous growth and evolution. We started
                as a small team with big dreams, determined to create a real
                estate platform that transcended the ordinary. Over the years,
                we&apos;ve expanded our reach, forged valuable partnerships, and
                gained the trust of countless clients.
              </p>
            </div>

            {/* Statistics Display */}
            <div>
              <ul className="grid grid-cols-1 gap-4 text-center min-[385px]:grid-cols-2 lg:flex lg:flex-row lg:text-start">
                {HeroStats.map((stat, index) => (
                  <li
                    key={stat.id}
                    className={`bg-sub-background ring-border rounded-lg p-4 ring lg:flex-1 lg:px-5 ${
                      // Last stat card spans two columns on small screens
                      index === HeroStats.length - 1
                        ? "min-[385px]:col-span-2"
                        : ""
                    } `}
                  >
                    {/* Statistic value */}
                    <h2 className="text-stats font-bold">{stat.value}</h2>

                    {/* Statistic label */}
                    <p className="text-sub-foreground text-body font-medium">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* House model image with decorative background */}
      <div className="flex flex-1 items-center">
        <div className="bg-sub-background ring-border relative flex size-full items-center justify-center overflow-hidden rounded-xl ring">
          {/* House model image */}
          <Image
            src={"/assets/House-Model.webp"}
            alt="house-model-image"
            loading="eager"
            className="z-10 size-full min-[408px]:w-90 lg:size-full"
            width={100}
            height={100}
            unoptimized={true}
          />
          {/* Decorative abstract line pattern background */}
          <AbstractLines className="stroke-border absolute h-160 stroke-1 xl:h-full" />
        </div>
      </div>
    </section>
  );
}
