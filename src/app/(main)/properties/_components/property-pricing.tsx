import TripleStar from "@/components/ui/triple-star";
import PricingDetails from "./pricing-details";
import { Property } from "@/lib/types";

type PropertyProps = {
  property: Pick<
    Property,
    | "id"
    | "name"
    | "additionalFees"
    | "monthlyCosts"
    | "totalInitialCosts"
    | "monthlyExpenses"
  >;
};

export default function PropertyPricing({ property }: PropertyProps) {
  return (
    <section className="relative scroll-mt-32.5">
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container */}
      <div className="flex flex-col gap-y-7.5 lg:gap-x-20 lg:gap-y-12.5">
        {/* Header: Title, description, and note */}
        <div>
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-sub-title font-semibold">
              Comprehensive Pricing Details
            </h1>
            <p className="text-body text-sub-foreground font-medium">
              At Estatein, transparency is key. We want you to have a clear
              understanding of all costs associated with your property
              investment. Below, we break down the pricing for {property.name}{" "}
              to help you make an informed decision.
            </p>
          </div>

          {/* Note */}
          <div className="ring-border bg-sub-background mt-10 space-y-4 rounded-lg p-5 ring lg:mt-15 lg:flex lg:items-center lg:space-y-0 lg:gap-x-5 xl:mt-20 xl:px-12.5 xl:py-7.5">
            <h2 className="text-lg font-semibold lg:text-xl xl:text-2xl">
              Note
            </h2>
            <p className="text-sub-foreground text-body border-border border-t pt-5 font-medium lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
              The figures provided above are estimates and may vary depending on
              the property, location, and individual circumstances.
            </p>
          </div>
        </div>

        {/* Pricing Details */}
        <PricingDetails propertyDetails={property} />
      </div>
    </section>
  );
}
