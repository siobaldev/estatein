import AbstractLines from "../../public/assets/Abstract-Lines.svg";
import CircularTextCTA from "../../public/assets/Circular-Text-CTA.svg";
import IconContainer from "../../public/assets/Icon-Container.svg";
import { HeroStats } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { FeatureCards } from "@/lib/data";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-6 mt-10 mb-52 grid grid-cols-1 md:mx-11 lg:relative lg:mx-0 lg:mt-0 lg:grid-cols-2 lg:items-start xl:mx-auto">
      <div className="z-20 order-2 flex h-full flex-col justify-center gap-y-10 lg:order-1 lg:ml-14 lg:py-10 lg:pr-7.5">
        {/* Headline, description, and CTA*/}
        <div className="relative -mt-15 flex flex-col space-y-4 lg:mt-0 lg:flex-row-reverse lg:items-center lg:justify-center">
          {/* CALL TO ACTION */}
          <div className="ring-border bg-background lg: flex size-30 items-center justify-center rounded-full ring lg:absolute lg:-right-22">
            <div className="ring-border bg-sub-background relative flex size-15 items-center justify-center rounded-full ring">
              <CircularTextCTA className="animation-duration-[10s] fill-foreground absolute size-26 animate-spin" />

              {/* TODO: Add link to Properties */}
              <ArrowUpRight />
            </div>
          </div>

          {/* HEADLINE */}
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

        {/* CALL TO ACTION */}
        <div className="text-body flex flex-col gap-4 font-medium sm:flex-row">
          <button className="ring-border w-full px-5 py-3.5 ring-1">
            Learn More
          </button>
          <button className="bg-purple-60 text-white-99 w-full px-5 py-3.5">
            Browse Property
          </button>
        </div>

        {/* STATS */}
        <div>
          <ul className="grid grid-cols-1 gap-4 text-center min-[385px]:grid-cols-2 lg:flex lg:flex-row lg:text-start">
            {HeroStats.map((stat, index) => (
              <li
                key={stat.id}
                className={`bg-sub-background ring-border rounded-lg p-4 ring lg:flex-1 lg:px-5 ${index === HeroStats.length - 1 ? "min-[385px]:col-span-2" : ""} `}
              >
                <h2 className="text-stats font-bold">{stat.value}</h2>
                <p className="text-grey-60 text-sm font-medium">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* IMAGE */}
      <div className="order-1 flex size-full items-center lg:order-2">
        <div className="bg-sub-background ring-border relative flex size-full items-center justify-center overflow-hidden rounded-xl ring lg:rounded-none lg:ring-0">
          <Image
            src={"/assets/Building.webp"}
            alt="building-image"
            className="z-10 size-full min-[408px]:h-75 min-[408px]:w-90 lg:size-full"
            width={100}
            height={100}
            unoptimized={true}
          />
          <AbstractLines className="stroke-border absolute h-160 stroke-1" />
          <span className="from-purple-75/20 absolute size-full bg-linear-to-bl to-50% dark:from-[#2A213F]" />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="ring-border shadow-4 lg:shadow-6 xl:shadow-10 z-20 order-3 mt-10 w-full rounded-lg p-2.5 ring lg:col-span-2 lg:mt-0">
        <ul className="grid grid-cols-1 gap-2.5 min-[416px]:grid-cols-2 lg:grid-cols-4">
          {FeatureCards.map((card) => (
            <li
              key={card.id}
              className="bg-sub-background ring-border flex flex-col items-center justify-center gap-y-4 rounded-lg px-3.5 py-5 ring"
            >
              {/* TODO: Add link to services */}
              <div className="relative flex items-center justify-center">
                <IconContainer className="size-12 lg:size-15 xl:size-20.5" />
                <card.icon className="text-purple-75 absolute size-5 xl:size-8.5" />
              </div>
              <p className="text-body text-center">{card.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
