import AbstractSquares from "@assets/Abstract-Squares.svg";
import AnimatedLink from "../ui/animated-link";

export default function CallToAction() {
  return (
    <div>
      {/* Main Content Container */}
      <div className="wrapper flex flex-col items-center gap-y-7.5 md:flex-row md:justify-between md:gap-x-20">
        {/* Text Container - Heading and description */}
        <div>
          {/* Heading */}
          <h1 className="text-sub-title mb-1.5 font-semibold md:mb-2 lg:mb-2.5 xl:mb-3">
            Start Your Real Estate Journey Today
          </h1>
          {/* Description */}
          <p className="text-body text-sub-foreground font-medium">
            Your dream property is just a click away. Whether you&apos;re
            looking for a new home, a strategic investment, or expert real
            estate advice, Estatein is here to assist you every step of the way.
            Take the first step towards your real estate goals and explore our
            available properties or get in touch with our team for personalized
            assistance.
          </p>
        </div>

        {/* Link to properties page */}
        <AnimatedLink
          href="/properties"
          className="bg-purple-60 text-white-99 text-body w-full px-5 py-3.5 text-center font-medium text-nowrap md:size-fit"
        >
          Explore Property
        </AnimatedLink>
      </div>

      {/* Decorative Background Patterns */}
      {/* Left/Top Pattern */}
      <AbstractSquares
        aria-hidden="true"
        className="fill-sub-background absolute top-0 -left-[30%] -z-10 max-h-80 rotate-90 md:-left-80 md:max-h-120 lg:-bottom-[10%] lg:left-0 lg:rotate-0"
      />
      {/* Right/Bottom Pattern */}
      <AbstractSquares
        aria-hidden="true"
        className="fill-sub-background absolute -right-[10%] -bottom-[20%] -z-10 max-h-80 scale-x-[-1] md:-bottom-[40%] md:max-h-110 lg:bottom-0"
      />
    </div>
  );
}
