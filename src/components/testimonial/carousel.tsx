"use client";

import { useState, useEffect, useEffectEvent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Testimonials } from "@/lib/data";
import { StarIcon, ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";

export default function CarouselTestimonial() {
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
          {/* Map through testimonials array to create individual carousel items */}
          {Testimonials.map((item) => (
            <CarouselItem
              key={item.id}
              className="flex max-w-md rounded-lg pl-4 md:basis-1/2 md:pl-6 xl:basis-1/3"
            >
              {/* Testimonial Card Container */}
              <div className="border-border flex flex-col justify-between gap-y-6 rounded-xl border p-6 lg:gap-y-7.5 xl:gap-y-10">
                <div className="flex flex-col gap-y-6 lg:gap-y-7.5 xl:gap-y-10">
                  {/* Star Rating Section */}
                  <ul
                    className="flex gap-x-2"
                    aria-label={`Rating: ${item.rating} out of 5 stars`}
                  >
                    {/* Generate 5 stars dynamically based on rating value */}
                    {Array.from({ length: 5 }, (_, index) => (
                      <li
                        key={index}
                        className="border-border bg-sub-background rounded-full border p-1.5"
                      >
                        <StarIcon
                          weight="fill"
                          aria-hidden="true"
                          className={`size-4.5 ${
                            // Conditional styling: filled if index is less than rating
                            index < item.rating
                              ? "fill-[#FFE500] text-[#FFE500]" // Filled yellow star (active)
                              : "text-border" // Empty gray star (inactive)
                          }`}
                        />
                      </li>
                    ))}
                  </ul>

                  {/* Testimonial Content */}
                  <div className="flex flex-col gap-y-1.5 md:gap-y-2 lg:gap-y-2.5 xl:gap-y-3.5">
                    {/* Testimonial Title */}
                    <h1 className="text-lg font-semibold lg:text-xl xl:text-2xl">
                      {item.title}
                    </h1>

                    {/* Testimonial Message */}
                    <p className="text-body text-sub-foreground font-medium">
                      {item.message}
                    </p>
                  </div>
                </div>

                {/* Author Information*/}
                <div className="inline-flex items-center gap-x-2">
                  {/* Author Avatar */}
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="size-15 rounded-full"
                  />

                  {/* Author Details */}
                  <div>
                    {/* Author Name */}
                    <p className="text-base font-medium lg:text-lg xl:text-xl">
                      {item.name}
                    </p>
                    {/* Author Location*/}
                    <p className="text-body text-sub-foreground font-medium">
                      {item.location}
                    </p>
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
          {/* TODO: add link to properties page */}
          <button className="ring-border block w-fit px-5 py-3.5 font-medium ring max-[380px]:w-full lg:hidden">
            View All Testimonials
          </button>

          {/* Navigation Controls Container */}
          <div className="flex items-center gap-x-2.5 max-[380px]:w-full max-[380px]:justify-between lg:relative lg:flex-1 lg:justify-end">
            {/* Previous button */}
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous Testimonial"
              className="ring-border rounded-full p-2.5 ring disabled:cursor-default disabled:opacity-50"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Current position indicator (mobile/tablet only) */}
            <p className="text-body font-medium lg:absolute lg:left-0">
              {formatNumber(current)}
              <span className="text-sub-foreground">
                {" "}
                of {formatNumber(count)}
              </span>
            </p>

            {/* Next button */}
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next Testimonial"
              className="ring-border rounded-full p-2.5 ring disabled:cursor-default disabled:opacity-50"
            >
              <ArrowRightIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
