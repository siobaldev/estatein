"use client";

import { Controller, UseFormReturn, get } from "react-hook-form";
import { PropertySchema } from "@/schemas/propertySchema";
import { PropertyFormFields } from "@/lib/data";
import AnimatedButton from "@/components/ui/animated-button";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { formatPrice } from "@/lib/utils";

type Props = {
  form: UseFormReturn<PropertySchema>;
  onNextAction: () => void;
  onBackAction: () => void;
};

const PRICING_SECTIONS = [
  {
    key: "additionalFees",
    title: "Additional Fees",
    description:
      "One-time fees such as application, cleaning, or administrative charges.",
  },
  {
    key: "monthlyCosts",
    title: "Monthly Costs",
    description: "Recurring monthly charges related to the property.",
  },
  {
    key: "totalInitialCosts",
    title: "Total Initial Costs",
    description: "The total amount required before moving in.",
  },
  {
    key: "monthlyExpenses",
    title: "Monthly Expenses",
    description:
      "The estimated total of all monthly payments for the property.",
  },
] as const;

export default function Pricing({ form, onNextAction, onBackAction }: Props) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      {PRICING_SECTIONS.map((section) => {
        const fields = PropertyFormFields.filter(
          (f) => f.section === section.key,
        );

        return (
          <div
            key={section.key}
            className="border-border bg-sub-background rounded-xl border p-5 md:p-10"
          >
            <div className="mx-auto max-w-5xl space-y-2">
              <h3 className="text-lg lg:text-xl xl:text-2xl">
                {section.title}
              </h3>
              <p className="text-sub-foreground text-body mb-8">
                {section.description}
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7.5 xl:gap-12.5">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className={field.colSpan === "full" ? "sm:col-span-2" : ""}
                  >
                    <label htmlFor={field.name} className="mb-1 block">
                      {field.label}
                      {field.required && (
                        <>
                          <span className="text-red-400"> *</span>
                          <span className="sr-only">(required)</span>
                        </>
                      )}
                    </label>

                    <Controller
                      name={field.name}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <input
                          type="text"
                          value={
                            field.type === "number"
                              ? formatPrice(value as number)
                              : (value as string)
                          }
                          onChange={(e) => {
                            if (field.type === "number") {
                              const stripped = e.target.value.replace(
                                /[^0-9]/g,
                                "",
                              );
                              onChange(
                                stripped === "" ? undefined : Number(stripped),
                              );
                            } else {
                              onChange(e.target.value);
                            }
                          }}
                          placeholder={field.placeholder}
                          className={`border-border caret-purple-60 focus:border-purple-60 placeholder:text-sub-foreground/50 bg-background w-full rounded border px-4 py-3 outline-none ${
                            get(errors, field.name) ? "border-red-400" : ""
                          }`}
                        />
                      )}
                    />

                    {get(errors, field.name) && (
                      <p className="mt-1 text-xs font-medium text-red-400">
                        {get(errors, field.name)?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

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
          type="button"
          onClick={onNextAction}
          className="bg-purple-60 text-white-99 text-body flex items-center gap-x-2 rounded-lg px-5 py-3"
        >
          Next
          <ArrowRightIcon
            aria-hidden
            weight="bold"
            className="size-4 md:size-5"
          />
        </AnimatedButton>
      </div>
    </div>
  );
}
