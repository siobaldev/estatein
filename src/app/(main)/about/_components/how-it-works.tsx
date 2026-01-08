import TripleStar from "@/components/ui/triple-star";
import { HowItWorksCard } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="wrapper scroll-mt-32.5 space-y-10">
      {/* Main content container - Headlines and description */}
      <div className="flex items-center">
        <div className="relative">
          {/* Decorative triple star */}
          <TripleStar />
          {/* Main Headline and Description */}
          <div className="space-y-4">
            <h1 className="text-title font-semibold">
              Navigating the Estatein Experience
            </h1>
            <p className="text-sub-foreground text-body font-medium">
              At Estatein, we&apos;ve designed a straightforward process to help
              you find and purchase your dream property with ease. Here&apos;s a
              step-by-step guide to how it all works.
            </p>
          </div>
        </div>
      </div>

      {/* Grid layout for the values cards */}
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7.5">
        {HowItWorksCard.map((card) => (
          <li key={card.id} className="flex h-full transform-gpu flex-col">
            <h2 className="border-purple-60 border-l px-5 py-4 text-base font-medium lg:text-lg xl:text-xl">
              Step {card.id.toString().padStart(2, "0")}
            </h2>

            {/* Main content */}
            <div className="border-border relative h-full items-center justify-center rounded-r-lg rounded-b-lg border">
              {/* Stroke gradient style decoration */}
              <div className="from-purple-60 absolute -inset-px bg-linear-to-br to-20%" />

              {/* Main content container */}
              <div className="bg-background relative z-10 h-full w-full space-y-4 rounded-r-lg rounded-b-lg p-7.5 md:space-y-6 md:p-10 lg:px-5 xl:p-12.5">
                {/* background gradient style decoration */}
                <div className="from-purple-60/20 absolute inset-0 bg-linear-to-br to-20%" />

                {/* Card title */}
                <h3 className="text-lg font-semibold md:text-xl lg:text-2xl">
                  {card.title}
                </h3>
                {/* Card description */}
                <p className="text-sub-foreground text-body font-medium">
                  {card.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
