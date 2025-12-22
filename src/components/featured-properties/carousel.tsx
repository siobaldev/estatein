"use client";

import { useState, useEffect, useEffectEvent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Properties } from "@/lib/data";
import {
  BedIcon,
  BathtubIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import AnimatedLink from "../ui/animated-link";
import AnimatedButton from "../ui/animated-button";

export default function CarouselProperties() {
  // Carousel API instance for controlling carousel behavior
  const [api, setApi] = useState<CarouselApi>();

  // Current active slide index (1-based)
  const [current, setCurrent] = useState(0);

  // Total number of slides in the carousel
  const [count, setCount] = useState(0);

  // Whether the carousel can scroll to previous slide
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  // Whether the carousel can scroll to next slide
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Handles carousel selection events
  // Updates the current slide index and total count
  const handleSelect = useEffectEvent((api: CarouselApi) => {
    setCount(api!.scrollSnapList().length);
    setCurrent(api!.selectedScrollSnap() + 1);
  });

  // Updates the state of navigation buttons
  // Determines if prev/next buttons should be enabled or disabled
  const updateScrollButtons = useEffectEvent((api: CarouselApi) => {
    setCanScrollPrev(api!.canScrollPrev());
    setCanScrollNext(api!.canScrollNext());
  });

  // Effect hook to initialize carousel and listen for selection changes
  // Sets up event listeners when carousel API is available
  useEffect(() => {
    if (!api) return;

    handleSelect(api);
    updateScrollButtons(api);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      updateScrollButtons(api);
    });
  }, [api]);

  // Scrolls carousel to previous slide
  const scrollPrev = () => {
    api?.scrollPrev();
  };

  // Scrolls carousel to next slide
  const scrollNext = () => {
    api?.scrollNext();
  };

  // Formats a number with leading zero for display
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex flex-col gap-y-7.5 md:gap-y-10 lg:gap-y-12.5">
      {/* Carousel Container */}
      <Carousel setApi={setApi}>
        <CarouselContent className="rounded-lg">
          {Properties.map((prop) => (
            <CarouselItem
              key={prop.id}
              className="flex max-w-md rounded-lg pl-4 md:basis-1/2 md:pl-6 xl:basis-1/3"
            >
              <div className="border-border hover:border-purple-60 hover:inset-shadow-purple-60 rounded-xl border p-6 transition-all duration-300 select-none hover:inset-shadow-sm">
                {/* Property Image with Type Badge */}
                <div className="relative mb-4 flex items-center justify-center">
                  {/* Property type badge overlay */}
                  <span className="bg-sub-background ring-border text-body shadow-sub-background/40 absolute top-2 left-2 flex w-fit rounded-full px-3 py-1.5 font-semibold shadow ring">
                    {prop.propertyType}
                  </span>

                  {/* Property image */}
                  <Image
                    src={prop.image}
                    alt={prop.name}
                    width={100}
                    height={100}
                    unoptimized
                    className="size-full rounded-lg"
                  />
                </div>

                {/* Property Details */}
                <div className="flex flex-col gap-y-5">
                  {/* Property Name and Description */}
                  <div>
                    <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
                      {prop.name}
                    </h1>
                    <p className="text-sub-foreground text-body line-clamp-2 font-medium">
                      {prop.description}
                    </p>
                  </div>

                  {/* Property Features (Bedrooms and Bathrooms) */}
                  <div className="flex flex-wrap gap-2 text-sm font-medium">
                    {/* Bedrooms badge */}
                    <div className="ring-border bg-sub-background flex w-fit gap-x-2 rounded-full px-3 py-1.5 ring">
                      <BedIcon aria-hidden="true" className="size-5" />
                      <p>
                        {prop.bedrooms}
                        <span className="max-[366px]:hidden"> - Bedrooms</span>
                      </p>
                    </div>

                    {/* Bathrooms badge */}
                    <div className="ring-border bg-sub-background flex w-fit gap-x-2 rounded-full px-3 py-1.5 ring">
                      <BathtubIcon aria-hidden="true" className="size-5" />
                      <p>
                        {prop.bathrooms}
                        <span className="max-[366px]:hidden"> - Bathrooms</span>
                      </p>
                    </div>
                  </div>

                  {/* Price and CTA Button */}
                  <div className="flex justify-between max-[366px]:flex-col max-[366px]:gap-y-5">
                    {/* Property price */}
                    <div>
                      <p className="text-sub-foreground text-body">Price</p>
                      <p className="text-lg font-semibold md:text-xl lg:text-2xl">
                        {prop.price}
                      </p>
                    </div>

                    {/* View property button (hidden on mobile < lg) */}
                    <AnimatedLink
                      href={"/properties"}
                      className="bg-purple-60 text-white-99 text-body size-fit px-5 py-3.5 font-medium text-nowrap max-[366px]:w-full lg:block"
                    >
                      View Property Details
                    </AnimatedLink>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Controls Section */}
      <div className="space-y-4">
        {/* Divider line */}
        <hr className="border-border h-1" />

        <div className="flex justify-between max-[380px]:flex-col-reverse max-[380px]:gap-y-5">
          {/* View All button (visible on mobile/tablet < lg) */}
          <AnimatedLink
            href={"/properties"}
            className="ring-border block w-fit px-5 py-3.5 font-medium ring max-[380px]:w-full lg:hidden"
          >
            View All Properties
          </AnimatedLink>

          {/* Navigation Controls Container */}
          <div className="flex items-center gap-x-2.5 max-[380px]:w-full max-[380px]:justify-between lg:relative lg:flex-1 lg:justify-end">
            {/* Previous button */}
            <AnimatedButton
              onClick={scrollPrev}
              aria-label="Previous Testimonial"
              disabled={!canScrollPrev}
              className="ring-border hover:ring-purple-60 disabled:hover:ring-border rounded-full p-2.5 ring transition-all duration-300 disabled:cursor-default disabled:opacity-50"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-6" />
            </AnimatedButton>

            {/* Current position indicator (mobile/tablet only) */}
            <p className="text-body font-medium lg:absolute lg:left-0">
              {formatNumber(current)}
              <span className="text-sub-foreground">
                {" "}
                of {formatNumber(count)}
              </span>
            </p>

            {/* Next button */}
            <AnimatedButton
              onClick={scrollNext}
              aria-label="Next Testimonial"
              disabled={!canScrollNext}
              className="ring-border hover:ring-purple-60 disabled:hover:ring-border rounded-full p-2.5 ring transition-all duration-300 disabled:cursor-default disabled:opacity-50"
            >
              <ArrowRightIcon
                aria-hidden="true"
                className="group-hover:text-purple-60 group-hover:duration 300 size-6 group-hover:transition-all"
              />
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
