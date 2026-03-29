"use client";

import { UseFormReturn } from "react-hook-form";
import { type PropertySchema } from "@/schemas/propertySchema";

type Props = {
  form: UseFormReturn<PropertySchema>;
};

export default function IsFeature({ form }: Props) {
  const isFeatured = form.watch("isFeatured");

  return (
    <div className="border-border bg-sub-background rounded-xl border px-5 py-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-x-4">
        <div className="space-y-2">
          <p className="text-lg lg:text-xl xl:text-2xl">Featured Property</p>
          <p className="text-sub-foreground text-body">
            Featured properties appear highlighted on the platform.
          </p>
        </div>
        <button
          type="button"
          aria-label="is property will be featured?"
          onClick={() => form.setValue("isFeatured", !isFeatured)}
          className={`flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
            isFeatured ? "bg-purple-60" : "bg-border"
          }`}
        >
          <span
            className={`bg-white-99 size-6 transform rounded-full transition-transform duration-200 ${
              isFeatured ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
