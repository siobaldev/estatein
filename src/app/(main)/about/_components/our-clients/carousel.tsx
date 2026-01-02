"use client";

import { useState, useEffect, useEffectEvent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BuildingsIcon,
  TagIcon,
} from "@phosphor-icons/react";
import { OurClientsCard } from "@/lib/data";
import AnimatedButton from "@/components/ui/animated-button";

export default function CarouselOurClients() {
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
        <CarouselContent>
          {/* Map through testimonials array to create individual carousel items */}
          {OurClientsCard.map((card) => (
            <CarouselItem
              key={card.id}
              className="ml-1 flex max-w-xl rounded-lg p-5 select-none md:basis-1/2 lg:basis-9/12"
            >
              {/* Client testimonial card container */}
              <div className="border-border shadow-6 lg:shadow-10 space-y-7.5 rounded-xl border p-6 xl:p-10">
                {/* Year and Brand Name */}
                <div className="flex w-full flex-col gap-y-5 lg:flex-row lg:justify-between">
                  <div className="space-y-0.5">
                    <span className="text-sub-foreground text-body font-medium">
                      {card.year}
                    </span>
                    <h2 className="text-xl font-semibold lg:text-2xl">
                      {card.brandName}
                    </h2>
                  </div>

                  {/* Visit website button */}
                  <AnimatedButton className="ring-border bg-sub-background hover:ring-purple-60 w-full px-5 py-3.5 font-medium text-nowrap ring lg:ml-5 lg:size-fit">
                    Visit Website
                  </AnimatedButton>
                </div>

                {/* Domain and Category */}
                <div className="divide-border flex gap-y-1.5 divide-x font-medium">
                  <div className="flex-1 pr-4">
                    <div className="text-sub-foreground flex items-center gap-x-1">
                      <BuildingsIcon className="size-5" />
                      <h3 className="text-sm xl:text-base">Domain</h3>
                    </div>
                    <p className="text-body">{card.domain}</p>
                  </div>
                  <div className="flex-1 pl-4">
                    <div className="text-sub-foreground flex items-center gap-x-1">
                      <TagIcon className="size-5" />
                      <h4 className="text-sm xl:text-base">Category</h4>
                    </div>
                    <p className="text-body">{card.category}</p>
                  </div>
                </div>

                {/* Client testimonial */}
                <div className="ring-border space-y-2 rounded-lg p-5 ring">
                  <h5 className="text-sub-foreground">What they said 🤗</h5>
                  <p>{card.testimonial}</p>
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

        {/* Navigation Controls Container */}
        <div className="flex w-full items-center justify-between gap-x-2.5 md:relative md:flex-1 md:justify-end">
          {/* Previous button */}
          <AnimatedButton
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous Testimonial"
            className="ring-border hover:ring-purple-60 disabled:hover:ring-border rounded-full p-2.5 ring disabled:cursor-default disabled:opacity-50"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-6" />
          </AnimatedButton>

          {/* Current position indicator (mobile/tablet only) */}
          <p className="text-body font-medium md:absolute md:left-0">
            {formatNumber(current)}
            <span className="text-sub-foreground">
              {" "}
              of {formatNumber(count)}
            </span>
          </p>

          {/* Next button */}
          <AnimatedButton
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next Testimonial"
            className="ring-border hover:ring-purple-60 disabled:hover:ring-border rounded-full p-2.5 ring disabled:cursor-default disabled:opacity-50"
          >
            <ArrowRightIcon aria-hidden="true" className="size-6" />
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
