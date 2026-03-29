"use client";

import { UseFormReturn } from "react-hook-form";
import { PropertySchema } from "@/schemas/propertySchema";
import { ImageItem } from "@/lib/types";
import AnimatedButton from "@/components/ui/animated-button";
import { ArrowLeftIcon, StarIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

type Props = {
  form: UseFormReturn<PropertySchema>;
  images: ImageItem[];
  deletedImages: string[];
  isPending: boolean;
  onBackAction: () => void;
  isEdit?: boolean;
};

function ReviewField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sub-foreground divide-border divide-x-2 divide-y-2 text-sm lg:text-base">
        {label}
      </p>
      <p className="text-foreground text-body">{value ?? "—"}</p>
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border bg-sub-background rounded-xl border p-5 md:p-8">
      <h4 className="mb-8 text-base font-semibold lg:text-lg">{title}</h4>
      {children}
    </div>
  );
}

export default function Review({
  form,
  images,
  deletedImages,
  isPending,
  onBackAction,
  isEdit,
}: Props) {
  const data = form.getValues();

  const displayImages = images.filter(
    (img) => !deletedImages.includes(img.existingUrl ?? ""),
  );

  return (
    <div className="space-y-6">
      <div className="border-border bg-sub-background rounded-xl border p-5 md:p-10">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-2 text-lg lg:text-xl xl:text-2xl">
            Review Property Details
          </h3>
          <p className="text-sub-foreground text-body mb-8">
            Check the information below to make sure everything is correct
            before creating the property.
          </p>

          <div className="space-y-4">
            {/* Basic Info */}
            <ReviewSection title="Basic Information">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <ReviewField label="Property Name" value={data.name} />
                <div className="sm:col-span-2">
                  <ReviewField label="Description" value={data.description} />
                </div>
                <ReviewField label="Property Type" value={data.propertyType} />
                <ReviewField label="Location" value={data.location} />
                <ReviewField label="Bedrooms" value={data.bedrooms} />
                <ReviewField label="Bathrooms" value={data.bathrooms} />
                <ReviewField
                  label="Size"
                  value={`${data.propertySize?.toLocaleString()} sqm`}
                />
                <ReviewField label="Build Year" value={data.buildYear} />
                <ReviewField label="Price" value={formatCurrency(data.price)} />
                <ReviewField
                  label="Featured"
                  value={data.isFeatured ? "Yes" : "No"}
                />
              </div>
            </ReviewSection>

            {/* Images */}
            <ReviewSection title={`Images (${images.length})`}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {displayImages.map((image, index) => (
                  <div
                    key={image.preview}
                    className="border-border relative aspect-video overflow-hidden rounded-lg border"
                  >
                    <Image
                      src={image.preview}
                      alt={`Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                    {index === 0 && (
                      <span className="bg-purple-60 absolute top-1.5 left-1.5 flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        <StarIcon
                          aria-hidden
                          weight="fill"
                          className="size-2.5"
                        />{" "}
                        Main
                        <span className="sr-only">property image preview</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </ReviewSection>

            {/* Key Features */}
            <ReviewSection title="Key Features">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                {data.keyFeatures?.map((feature, index) => (
                  <ReviewField
                    key={index}
                    label={`Feature ${index + 1}`}
                    value={feature.feature}
                  />
                ))}
              </div>
            </ReviewSection>

            {/* Additional Fees */}
            <ReviewSection title="Additional Fees">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <ReviewField
                  label="Property Transfer Tax"
                  value={formatCurrency(
                    data.additionalFees?.propertyTransferTax,
                  )}
                />
                <ReviewField
                  label="Legal Fees"
                  value={formatCurrency(data.additionalFees?.legalFees)}
                />
                <ReviewField
                  label="Home Inspection"
                  value={formatCurrency(data.additionalFees?.homeInspection)}
                />
                <ReviewField
                  label="Property Insurance"
                  value={formatCurrency(data.additionalFees?.propertyInsurance)}
                />
                <ReviewField
                  label="Mortgage Fees"
                  value={data.additionalFees?.mortgageFees}
                />
              </div>
            </ReviewSection>

            {/* Monthly Costs */}
            <ReviewSection title="Monthly Costs">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <ReviewField
                  label="Property Taxes"
                  value={formatCurrency(data.monthlyCosts?.propertyTaxes)}
                />
                <ReviewField
                  label="HOA Fee"
                  value={formatCurrency(data.monthlyCosts?.hoaFee)}
                />
              </div>
            </ReviewSection>

            {/* Total Initial Costs */}
            <ReviewSection title="Total Initial Costs">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <ReviewField
                  label="Listing Price"
                  value={formatCurrency(data.totalInitialCosts?.listingPrice)}
                />
                <ReviewField
                  label="Additional Fees Total"
                  value={formatCurrency(
                    data.totalInitialCosts?.additionalFeesTotal,
                  )}
                />
                <ReviewField
                  label="Down Payment"
                  value={formatCurrency(data.totalInitialCosts?.downPayment)}
                />
                <ReviewField
                  label="Mortgage Amount"
                  value={formatCurrency(data.totalInitialCosts?.mortgageAmount)}
                />
              </div>
            </ReviewSection>

            {/* Monthly Expenses */}
            <ReviewSection title="Monthly Expenses">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <ReviewField
                  label="Property Taxes"
                  value={formatCurrency(data.monthlyExpenses?.propertyTaxes)}
                />
                <ReviewField
                  label="HOA Fee"
                  value={formatCurrency(data.monthlyExpenses?.hoaFee)}
                />
                <ReviewField
                  label="Mortgage Payment"
                  value={formatCurrency(data.monthlyExpenses?.mortgagePayment)}
                />
                <ReviewField
                  label="Property Insurance"
                  value={formatCurrency(
                    data.monthlyExpenses?.propertyInsurance,
                  )}
                />
              </div>
            </ReviewSection>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-border mt-4 flex items-center justify-end gap-x-5 md:mt-6">
        <AnimatedButton
          type="button"
          onClick={onBackAction}
          className="border-border text-sub-foreground hover:text-foreground text-body flex items-center gap-x-2 rounded-lg border px-5 py-3"
        >
          <ArrowLeftIcon
            aria-hidden
            weight="bold"
            className="size-4 md:size-5"
          />
          Back
        </AnimatedButton>
        <AnimatedButton
          type="submit"
          disabled={isPending}
          className="bg-purple-60 text-white-99 text-body flex items-center gap-x-2 rounded-lg px-5 py-3 disabled:opacity-60"
        >
          {isPending
            ? `${isEdit ? "Updating" : "Creating"} Property...`
            : `${isEdit ? "Update" : "Create"} Property`}
        </AnimatedButton>
      </div>
    </div>
  );
}
