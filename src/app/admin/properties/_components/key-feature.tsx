"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PropertySchema } from "@/schemas/propertySchema";
import {
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import AnimatedButton from "@/components/ui/animated-button";

type Props = {
  form: UseFormReturn<PropertySchema>;
  onNextAction: () => void;
  onBackAction: () => void;
};

export default function KeyFeature({
  form,
  onNextAction,
  onBackAction,
}: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyFeatures",
  });

  return (
    <div className="space-y-6">
      <div className="border-border bg-sub-background space-y-6 rounded-xl border p-5 md:p-10">
        <div className="mx-auto max-w-5xl space-y-2">
          <h3 className="text-lg lg:text-xl xl:text-2xl">Key Features</h3>
          <p className="text-sub-foreground text-body mb-8">
            Add the main amenities and unique highlights of the property.
          </p>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center gap-x-3">
                  <input
                    {...register(`keyFeatures.${index}.feature`)}
                    placeholder="e.g. Rooftop pool, Private elevator..."
                    className={`border-border caret-purple-60 focus:border-purple-60 placeholder:text-sub-foreground bg-background w-full rounded border px-4 py-3 outline-none ${
                      errors.keyFeatures?.[index]?.feature
                        ? "border-red-400"
                        : ""
                    }`}
                  />

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      aria-label="remove feature"
                      className="border-border text-sub-foreground rounded-lg border p-2 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-400"
                    >
                      <TrashIcon aria-hidden className="size-5" />
                    </button>
                  )}
                </div>

                {errors.keyFeatures?.[index]?.feature && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.keyFeatures[index]?.feature?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <AnimatedButton
            type="button"
            onClick={() => append({ feature: "" })}
            className="text-body text-purple-60 border-purple-60 mt-8 flex items-center gap-x-1.5 border px-4 py-3"
          >
            <PlusIcon aria-hidden weight="bold" className="size-5" />
            Add Feature
          </AnimatedButton>
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
