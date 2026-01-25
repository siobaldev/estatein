import AnimatedButton from "@/components/ui/animated-button";
import { Property } from "@/lib/types";

interface PricingDetailsProps {
  propertyDetails: Property["pricingDetails"];
}

export default function PricingDetails({
  propertyDetails,
}: PricingDetailsProps) {
  return (
    <div className="flex flex-col gap-y-5 xl:flex-row xl:gap-x-10">
      {/* Listing Price */}
      <div>
        <h1 className="text-sub-foreground text-body">Listing Price</h1>
        <p className="text-stats font-semibold">
          {
            propertyDetails.totalInitialCosts.find(
              (item) => item.label === "Listing Price",
            )?.amount
          }
        </p>
      </div>

      <div className="flex flex-col gap-y-5 lg:gap-y-10 xl:gap-y-12.5">
        {/* Additional Fees section */}
        <div className="ring-border grid rounded-lg p-5 ring lg:p-10 xl:p-12.5">
          <div className="border-border flex items-center justify-between border-b pb-5">
            <h2 className="text-lg lg:text-xl xl:text-2xl">Additional Fees</h2>
            <AnimatedButton className="bg-sub-background ring-border shadow-border hover:ring-purple-60 text-body px-4 py-3 font-medium shadow ring lg:px-5">
              Learn more
              <span className="sr-only"> about additional fees</span>
            </AnimatedButton>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {propertyDetails.additionalFees.map((fee) => (
              <div
                key={fee.id}
                // Mortgage Fees spans full width on medium+ screens
                className={`ring-border rounded-lg p-5 ring ${
                  fee.label === "Mortgage Fees" ? "md:col-span-2" : ""
                }`}
              >
                <h3 className="text-sub-foreground text-body">{fee.label}</h3>
                <div className="mt-2.5 flex items-center gap-x-3 lg:mt-3 xl:mt-4 xl:gap-x-4">
                  <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
                    {fee.amount}
                  </span>
                  <p className="text-sub-foreground bg-sub-background ring-border text-body rounded-lg px-3.5 py-2 text-sm ring">
                    {fee.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Costs section */}
        <div className="ring-border grid rounded-lg p-5 ring lg:p-10 xl:p-12.5">
          <div className="border-border flex items-center justify-between border-b pb-5">
            <h2 className="text-lg lg:text-xl xl:text-2xl">Monthly Costs</h2>
            <AnimatedButton className="bg-sub-background ring-border shadow-border hover:ring-purple-60 text-body px-4 py-3 font-medium shadow ring lg:px-5">
              Learn more
              <span className="sr-only"> about monthly costs</span>
            </AnimatedButton>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {propertyDetails.monthlyCosts.map((cost) => (
              <div key={cost.id} className="ring-border rounded-lg p-5 ring">
                <h3 className="text-sub-foreground text-body">{cost.label}</h3>
                <div className="mt-2.5 flex items-center gap-x-3 lg:mt-3 xl:mt-4 xl:gap-x-4">
                  <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
                    {cost.amount}
                  </span>
                  <p className="text-sub-foreground bg-sub-background ring-border text-body rounded-lg px-3.5 py-2 text-sm ring">
                    {cost.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Initial Costs section */}
        <div className="ring-border grid rounded-lg p-5 ring lg:p-10 xl:p-12.5">
          <div className="border-border flex items-center justify-between border-b pb-5">
            <h2 className="text-lg lg:text-xl xl:text-2xl">
              Total Initial Costs
            </h2>
            <AnimatedButton className="bg-sub-background ring-border shadow-border hover:ring-purple-60 text-body px-4 py-3 font-medium shadow ring lg:px-5">
              Learn more
              <span className="sr-only"> about total initial costs</span>
            </AnimatedButton>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {propertyDetails.totalInitialCosts.map((cost) => (
              <div key={cost.id} className="ring-border rounded-lg p-5 ring">
                <h3 className="text-sub-foreground text-body">{cost.label}</h3>
                <div className="mt-2.5 flex items-center gap-x-3 lg:mt-3 xl:mt-4 xl:gap-x-4">
                  <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
                    {cost.amount}
                  </span>

                  {/* Only show description if it exists */}
                  {cost.description && (
                    <p className="text-sub-foreground bg-sub-background ring-border text-body rounded-lg px-3.5 py-2 text-sm ring">
                      {cost.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Expenses section */}
        <div className="ring-border grid rounded-lg p-5 ring lg:p-10 xl:p-12.5">
          <div className="border-border flex items-center justify-between border-b pb-5">
            <h2 className="text-lg lg:text-xl xl:text-2xl">Monthly Expenses</h2>
            <AnimatedButton className="bg-sub-background ring-border shadow-border hover:ring-purple-60 text-body px-4 py-3 font-medium shadow ring lg:px-5">
              Learn more
              <span className="sr-only"> about monthly expenses</span>
            </AnimatedButton>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {propertyDetails.monthlyExpenses.map((expense) => (
              <div key={expense.id} className="ring-border rounded-lg p-5 ring">
                <h3 className="text-sub-foreground text-body">
                  {expense.label}
                </h3>
                <div className="mt-2.5 flex items-center gap-x-3 lg:mt-3 xl:mt-4 xl:gap-x-4">
                  <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
                    {expense.amount}
                  </span>

                  {/* Only show description if it exists */}
                  {expense.description && (
                    <p className="text-sub-foreground bg-sub-background ring-border text-body rounded-lg px-3.5 py-2 text-sm ring">
                      {expense.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
