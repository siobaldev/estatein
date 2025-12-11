"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import AbstractLines from "../../../public/assets/Abstract-Lines.svg?url";

export default function Banner() {
  // Controls the visibility state of the banner
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Handles the close button click event
  // Hides the banner by setting isVisible to false
  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`border-border relative flex h-[50px] w-full items-center overflow-hidden border-b md:justify-center ${isVisible ? "" : "hidden"}`}
    >
      {/* Decorative Background Pattern */}
      <AbstractLines className="stroke-border absolute z-10 size-auto stroke-1" />

      {/* Content Container */}
      <div className="md:text-body z-20 flex flex-wrap items-center gap-x-1 pr-8 pl-2 text-xs md:pl-8 md:text-sm xl:text-lg">
        {/* Banner Message */}
        <p>✨ Discover your dream property with Estatein!</p>

        {/* Call-to-Action Link */}
        <Link
          href={"/"}
          className="ml-5 cursor-pointer p-0.5 underline min-[370px]:ml-0 md:p-1"
        >
          Learn More
        </Link>

        {/* Close/Dismiss Button */}
        <button
          onClick={handleClick}
          aria-label="Close banner"
          className="bg-foreground/10 absolute right-2 rounded-full p-1 md:right-8"
        >
          <X className="size-4 lg:size-5 xl:size-6" />
        </button>
      </div>
    </div>
  );
}
