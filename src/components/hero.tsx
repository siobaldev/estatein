import AbstractLines from "@assets/Abstract-Lines.svg";
import CircularTextCTA from "@assets/Circular-Text-CTA.svg";
import { HeroStats } from "@/lib/data";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import AnimatedLink from "./ui/animated-link";
import Services from "./ui/services";

export default function Hero() {
  return (
    <section
      id="hero"
      className="wrapper mt-10 grid scroll-mt-25 grid-cols-1 lg:relative lg:mx-0 lg:mt-0 lg:grid-cols-2 lg:items-start lg:gap-7.5 lg:py-10 xl:mx-auto"
    >
      {/* Main Content: Headlines, CTAs, and stats */}
      <div className="z-20 order-2 flex h-full flex-col justify-center gap-y-10 lg:order-1">
        {/* Headline Section with CTA Badge */}
        <div className="relative -mt-15 flex flex-col space-y-4 lg:mt-0 lg:flex-row-reverse lg:items-center lg:justify-center">
          {/* Animated Circular Call-to-Action Badge */}
          <AnimatedLink
            aria-label="Link to Properties"
            href={"/properties"}
            className="ring-border group bg-background relative flex size-30 items-center justify-center rounded-full ring lg:absolute lg:-right-22"
          >
            {/* Spinning circular text animation */}
            <CircularTextCTA
              aria-hidden="true"
              className="animation-duration-[10s] fill-foreground absolute size-26 animate-spin"
            />

            {/* Icon Container*/}
            <div className="ring-border bg-sub-background relative z-10 items-center justify-center rounded-full ring">
              {/* Arrow Icon */}
              <ArrowUpRightIcon
                aria-hidden="true"
                className="group-hover:text-purple-60 m-4 size-6"
              />
            </div>
          </AnimatedLink>

          {/* Main Headline and Description */}
          <div className="space-y-4">
            <h1 className="text-title font-semibold">
              Discover Your Dream Property with Estatein
            </h1>
            <p className="text-sub-foreground text-body font-medium">
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </p>
          </div>
        </div>

        {/* Primary Call-to-Action Buttons */}
        <div className="text-body flex flex-col items-center gap-4 text-center font-medium sm:flex-row">
          {/* Secondary action button with outline style */}
          <AnimatedLink
            href={"/about"}
            className="ring-border hover:ring-purple-60 w-full px-5 py-3.5 ring"
          >
            Learn more
            <span className="sr-only"> about Estatein</span>
          </AnimatedLink>

          {/* Primary action button with filled style */}
          <AnimatedLink
            href={"/properties"}
            className="bg-purple-60 text-white-99 w-full px-5 py-3.5"
          >
            Browse Property
          </AnimatedLink>
        </div>

        {/* Statistics Display */}
        <div>
          <ul className="grid grid-cols-1 gap-4 text-center min-[385px]:grid-cols-2 lg:flex lg:flex-row lg:text-start">
            {HeroStats.map((stat, index) => (
              <li
                key={stat.id}
                className={`bg-sub-background ring-border rounded-lg p-4 ring lg:flex-1 lg:px-5 ${
                  // Last stat card spans two columns on small screens
                  index === HeroStats.length - 1 ? "min-[385px]:col-span-2" : ""
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

      {/* Hero Image: Building image with decorative background */}
      <div className="order-1 flex size-full items-center lg:order-2">
        <div className="bg-sub-background ring-border relative flex size-full items-center justify-center overflow-hidden rounded-xl ring">
          {/* Building image */}
          <div className="relative z-10 h-full w-80 max-[1024px]:aspect-690/622 min-[408px]:w-105 lg:w-full">
            <Image
              src={"/assets/Building.webp"}
              alt="building-image"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 360px"
            />
          </div>

          {/* Decorative abstract line pattern background */}
          <AbstractLines className="stroke-border absolute h-160 stroke-1 xl:h-full" />
          {/* Gradient overlay for visual depth */}
          <span className="from-purple-75/20 absolute size-full bg-linear-to-bl to-50% dark:from-[#2A213F]" />
        </div>
      </div>

      {/* Feature Cards Showcase */}
      <Services />
    </section>
  );
}
