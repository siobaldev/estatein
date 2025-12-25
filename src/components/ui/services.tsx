import IconContainer from "../../../public/assets/Icon-Container.svg";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { FeatureCards } from "@/lib/data";
import AnimatedLink from "./animated-link";

export default function Services() {
  return (
    <div className="ring-border shadow-4 lg:shadow-6 xl:shadow-10 z-20 order-3 mt-10 w-full rounded-lg p-2.5 ring lg:col-span-2 lg:mt-0">
      <ul className="grid grid-cols-1 gap-2.5 min-[416px]:grid-cols-2 lg:grid-cols-4">
        {FeatureCards.map((card) => (
          <li key={card.id} className="group">
            <AnimatedLink
              href={card.href}
              aria-label={`Link to ${card.href}`}
              className="bg-sub-background ring-border hover:ring-purple-60 relative flex flex-col items-center justify-center gap-y-4 rounded-lg px-3.5 py-5 ring"
            >
              <div className="absolute top-2.5 right-2.5 transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="text-sub-foreground size-6"
                />
              </div>

              {/* Feature icon with decorative container */}
              <div className="relative flex items-center justify-center">
                {/* Icon container background */}
                <IconContainer
                  aria-hidden="true"
                  className="size-12 stroke-2 lg:size-15 xl:size-20.5"
                />
                {/* Feature icon centered in container */}
                <card.icon
                  aria-hidden="true"
                  className="text-purple-75 absolute size-5 xl:size-8.5"
                />
              </div>
              {/* Feature label text */}
              <p className="text-body text-center font-medium">{card.label}</p>
            </AnimatedLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
