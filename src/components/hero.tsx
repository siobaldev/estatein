import AbstractLines from "../../public/assets/Abstract-Lines.svg";
import CircularTextCTA from "../../public/assets/Circular-Text-CTA.svg";
import IconContainer from "../../public/assets/Icon-Container.svg";
import { HeroStats } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { FeatureCards } from "@/lib/data";
import Image from "next/image";

export default function Hero() {
  return (
    // TODO: Add wrapper and adjust padding
    <section className="wrapper mt-10 grid grid-cols-1 lg:relative lg:mx-0 lg:mt-0 lg:grid-cols-2 lg:items-start lg:gap-7.5 lg:py-10 xl:mx-auto">
      {/* Main Content: Headlines, CTAs, and stats */}
      <div className="z-20 order-2 flex h-full flex-col justify-center gap-y-10 lg:order-1">
        {/* Headline Section with CTA Badge */}
        <div className="relative -mt-15 flex flex-col space-y-4 lg:mt-0 lg:flex-row-reverse lg:items-center lg:justify-center">
          {/* Animated Circular Call-to-Action Badge */}
          <div className="ring-border bg-background flex size-30 items-center justify-center rounded-full ring lg:absolute lg:-right-22">
            <div className="ring-border bg-sub-background relative flex size-15 items-center justify-center rounded-full ring">
              {/* Spinning circular text animation */}
              <CircularTextCTA className="animation-duration-[10s] fill-foreground absolute size-26 animate-spin" />

              {/* Arrow icon in center of spinning text */}
              {/* TODO: Add link to Properties */}
              <ArrowUpRight />
            </div>
          </div>

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
        <div className="text-body flex flex-col gap-4 font-medium sm:flex-row">
          {/* Secondary action button with outline style */}
          {/* TODO: Add link to About page */}
          <button className="ring-border hover:ring-purple-60 w-full px-5 py-3.5 ring">
            Learn More
          </button>

          {/* Primary action button with filled style */}
          {/* TODO: Add link to Properties page */}
          <button className="bg-purple-60 text-white-99 w-full px-5 py-3.5">
            Browse Property
          </button>
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
          <Image
            src={"/assets/Building.webp"}
            alt="building-image"
            className="z-10 size-full min-[408px]:h-75 min-[408px]:w-90 lg:size-full"
            width={100}
            height={100}
            unoptimized={true}
          />
          {/* Decorative abstract line pattern background */}
          <AbstractLines className="stroke-border absolute h-160 stroke-1 xl:h-full" />
          {/* Gradient overlay for visual depth */}
          <span className="from-purple-75/20 absolute size-full bg-linear-to-bl to-50% dark:from-[#2A213F]" />
        </div>
      </div>

      {/* Feature Cards Showcase */}
      <div className="ring-border shadow-4 lg:shadow-6 xl:shadow-10 z-20 order-3 mt-10 w-full rounded-lg p-2.5 ring lg:col-span-2 lg:mt-0">
        <ul className="grid grid-cols-1 gap-2.5 min-[416px]:grid-cols-2 lg:grid-cols-4">
          {FeatureCards.map((card) => (
            <li
              key={card.id}
              className="bg-sub-background ring-border flex flex-col items-center justify-center gap-y-4 rounded-lg px-3.5 py-5 ring"
            >
              {/* Feature icon with decorative container */}
              {/* TODO: Add link to services */}
              <div className="relative flex items-center justify-center">
                {/* Icon container background */}
                <IconContainer className="size-12 stroke-2 lg:size-15 xl:size-20.5" />
                {/* Feature icon centered in container */}
                <card.icon className="text-purple-75 absolute size-5 xl:size-8.5" />
              </div>
              {/* Feature label text */}
              <p className="text-body text-center font-medium">{card.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
