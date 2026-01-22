"use client";

import { useState, useEffect, useEffectEvent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Properties } from "@/lib/data";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import AnimatedLink from "../ui/animated-link";
import AnimatedButton from "../ui/animated-button";
import { PropertyCard } from "../property-card";

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
              <PropertyCard property={prop} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Controls Section */}
      <div className="space-y-4">
        {/* Divider line */}
        <hr className="border-border h-1" />

        <div className="flex justify-between max-[400px]:flex-col-reverse max-[400px]:gap-y-5">
          {/* View All button (visible on mobile/tablet < lg) */}
          <AnimatedLink
            href={"/properties"}
            className="ring-border block w-fit px-5 py-3.5 text-center font-medium ring max-[400px]:w-full lg:hidden"
          >
            View All Properties
          </AnimatedLink>

          {/* Navigation Controls Container */}
          <div className="flex items-center gap-x-2.5 max-[400px]:w-full max-[400px]:justify-between lg:relative lg:flex-1 lg:justify-end">
            {/* Previous button */}
            <AnimatedButton
              onClick={scrollPrev}
              aria-label="Previous Testimonial"
              disabled={!canScrollPrev}
              className="ring-border hover:ring-purple-60 disabled:hover:ring-border rounded-full p-2.5 ring disabled:cursor-default disabled:opacity-50"
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
              className="ring-border hover:ring-purple-60 disabled:hover:ring-border rounded-full p-2.5 ring disabled:cursor-default disabled:opacity-50"
            >
              <ArrowRightIcon aria-hidden="true" className="size-6" />
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
