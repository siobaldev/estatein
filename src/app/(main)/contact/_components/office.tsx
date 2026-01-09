import TripleStar from "@/components/ui/triple-star";
import { OurOfficesCards } from "@/lib/data";
import AnimatedButton from "@/components/ui/animated-button";
import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
} from "@phosphor-icons/react/ssr";

export default function OurOffices() {
  return (
    <section id="offices" className="wrapper relative scroll-mt-32.5">
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container with vertical spacing */}
      <div className="flex flex-col gap-y-10 lg:gap-y-15 xl:gap-y-20">
        {/* Header: Title and description */}
        <div className="flex flex-col gap-y-1.5">
          <h1 className="text-sub-title font-semibold">
            Discover Our Office Locations
          </h1>
          <p className="text-body text-sub-foreground max-w-6xl font-medium">
            Estatein is here to serve you across multiple locations. Whether
            you&aposre looking to meet our team, discuss real estate
            opportunities, or simply drop by for a chat, we have offices
            conveniently located to serve your needs. Explore the categories
            below to find the Estatein office nearest to you
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          {OurOfficesCards.map((card) => (
            <div
              key={card.id}
              className="text-body ring-border flex flex-1 flex-col justify-between gap-y-6 rounded-lg p-6 font-medium ring md:p-8 lg:gap-y-7.5 lg:p-10 xl:gap-y-10 xl:p-12.5"
            >
              <div className="space-y-2 md:space-y-2.5 lg:space-y-3 xl:space-y-3.5">
                <div className="space-y-1 md:space-y-1.5 lg:space-y-2 xl:space-y-2.5">
                  <h2>{card.officeName}</h2>
                  <h3 className="text-xl font-semibold lg:text-2xl xl:text-3xl">
                    {card.address}
                  </h3>
                </div>
                <p className="text-sub-foreground">{card.description}</p>
              </div>
              <div className="flex w-fit flex-wrap gap-2">
                <div className="ring-border bg-sub-background flex items-center gap-x-1 rounded-full px-4 py-2.5 ring">
                  <EnvelopeSimpleIcon weight="fill" />
                  <span>{card.email}</span>
                </div>
                <div className="ring-border bg-sub-background flex items-center gap-x-1 rounded-full px-4 py-2.5 ring">
                  <PhoneIcon weight="fill" />
                  <span>{card.phone}</span>
                </div>
                <div className="ring-border bg-sub-background flex items-center gap-x-1 rounded-full px-4 py-2.5 ring">
                  <MapPinIcon weight="fill" />
                  <span>{card.location}</span>
                </div>
              </div>
              <AnimatedButton
                type="submit"
                className="bg-purple-60 text-white-99 w-full rounded px-6 py-3"
              >
                Get Direction
              </AnimatedButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
