"use client";

import { useState, useEffect, useEffectEvent } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import AnimatedButton from "@/components/ui/animated-button";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PropertyImageGalleryProps {
  images: string[];
  propertyName: string;
}

export default function PropertyImageGallery({
  images,
  propertyName,
}: PropertyImageGalleryProps) {
  const isMobile = useIsMobile();

  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Whether the carousel can scroll to previous slide
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  // Whether the carousel can scroll to next slide
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Updates the state of navigation buttons
  // Determines if prev/next buttons should be enabled or disabled
  const updateScrollButtons = useEffectEvent(() => {
    if (!mainApi) return;

    setCanScrollPrev(mainApi.canScrollPrev());
    setCanScrollNext(mainApi.canScrollNext());
  });

  useEffect(() => {
    if (!mainApi) return;

    // Store current position before reinit to preserve user's place
    const currentPosition = mainApi.selectedScrollSnap();

    // Force carousel to recalculate its slides based on new viewport
    mainApi.reInit();

    // Calculate the target position based on viewport
    let targetPosition = currentPosition;

    // Adjust position when switching between mobile and desktop at the last images
    if (isMobile && currentPosition === images.length - 2) {
      // Mobile shows 1 image at a time, so move from second-to-last to last
      targetPosition = images.length - 1;
    } else if (!isMobile && currentPosition === images.length - 1) {
      // Desktop shows 2 images at once, so move from last image to second-to-last
      targetPosition = images.length - 2;
    }

    // Restore position after reinit (true = skip animation for instant positioning)
    mainApi.scrollTo(targetPosition, true);

    // Update button states after reinitialization
    // Ensures carousel has finished reinitializing
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCurrent(mainApi.selectedScrollSnap());
        setCanScrollPrev(mainApi.canScrollPrev());
        setCanScrollNext(mainApi.canScrollNext());

        thumbApi?.scrollTo(mainApi.selectedScrollSnap());
      });
    });
  }, [isMobile, mainApi, thumbApi, images.length]);

  // Listen to carousel API changes with useEffectEvent
  const onCarouselSelect = useEffectEvent(() => {
    if (!mainApi) return;

    const selected = mainApi.selectedScrollSnap();
    setCurrent(selected);

    // Sync thumbnail carousel
    thumbApi?.scrollTo(selected);
    updateScrollButtons();
  });

  useEffect(() => {
    if (!mainApi) return;

    onCarouselSelect();

    mainApi.on("select", onCarouselSelect);

    // Also listen to reInit events to update button states
    mainApi.on("reInit", updateScrollButtons);

    return () => {
      mainApi.off("select", onCarouselSelect);
      mainApi.off("reInit", updateScrollButtons);
    };
  }, [mainApi, thumbApi]);

  // When thumbnail is clicked, update main carousel
  const onThumbClick = (index: number) => {
    mainApi?.scrollTo(index);
  };

  // Check if thumbnail is active
  const isActiveThumbnail = (index: number) => {
    if (isMobile) {
      // Mobile: only current image is active
      return index === current;
    } else {
      // Desktop: current and next image are active
      return index === current || index === current + 1;
    }
  };

  // Scrolls carousel to previous slide
  const scrollPrev = () => {
    mainApi?.scrollPrev();
  };

  // Scrolls carousel to next slide
  const scrollNext = () => {
    mainApi?.scrollNext();
  };

  return (
    <div className="bg-sub-background ring-border flex flex-col space-y-6 rounded-lg p-5 ring">
      {/* Main Carousel */}
      <Carousel
        setApi={setMainApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="order-1 w-full lg:order-2"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="lg:basis-1/2">
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${propertyName} - Image ${index + 1}`}
                  height={1300}
                  width={1625}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="bg-background ring-border order-2 space-y-4 rounded-lg p-4 ring lg:order-1">
          <Carousel
            setApi={setThumbApi}
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-2">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 pl-2 md:basis-1/4 lg:basis-1/5"
                >
                  <button
                    onClick={() => onThumbClick(index)}
                    className={`flex aspect-video items-center justify-center overflow-hidden rounded-lg transition-all ${
                      isActiveThumbnail(index)
                        ? "opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${propertyName} thumbnail ${index + 1}`}
                      height={1300}
                      width={1625}
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
      <div className="order-3 flex items-center justify-center">
        {/* Custom Previous/Next Buttons Below Thumbnails */}
        <div className="bg-background flex w-fit items-center justify-center gap-4 rounded-full p-4">
          <AnimatedButton
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="ring-border hover:ring-purple-60 bg-sub-background disabled:hover:ring-border rounded-full p-2.5 ring disabled:cursor-default disabled:opacity-50"
            aria-label={isMobile ? "Previous image" : "Previous images"}
          >
            <ArrowLeftIcon aria-hidden className="size-6" />
          </AnimatedButton>

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2">
              {images.map((_, index) => {
                // Hide last dot on desktop (since we show 2 images at a time)
                const shouldHide = !isMobile && index === images.length - 1;

                return (
                  <div
                    key={index}
                    className={`ring-purple-60 size-2 rounded-full transition-all ${
                      shouldHide ? "hidden" : "block"
                    } ${
                      index === current
                        ? "bg-purple-60 w-8"
                        : "bg-sub-foreground"
                    }`}
                  />
                );
              })}
            </div>
          )}

          <AnimatedButton
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="ring-border hover:ring-purple-60 bg-sub-background disabled:hover:ring-border rounded-full p-2.5 ring disabled:cursor-default disabled:opacity-50"
            aria-label={isMobile ? "Next image" : "Next images"}
          >
            <ArrowRightIcon aria-hidden className="size-6" />
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
