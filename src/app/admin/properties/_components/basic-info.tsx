import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, UseFormReturn, get } from "react-hook-form";
import { PropertyFormFields } from "@/lib/data";
import { type PropertySchema } from "@/schemas/propertySchema";
import AnimatedButton from "@/components/ui/animated-button";
import { ArrowRightIcon } from "@phosphor-icons/react";
import IsFeature from "./is-feature";
import { formatPrice } from "@/lib/utils";

type Props = {
  form: UseFormReturn<PropertySchema>;
  onNextAction: () => void;
};

const basicInfoFields = PropertyFormFields.filter(
  (f) => f.section === "basicInfo",
);

export default function BasicInfo({ form, onNextAction }: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className="border-border bg-sub-background space-y-4 rounded-xl border p-5 md:p-10">
        <div className="mx-auto max-w-5xl space-y-2">
          <h3 className="text-lg lg:text-xl xl:text-2xl">
            Property Specifications
          </h3>
          <p className="text-sub-foreground text-body mb-8">
            Provide the key specifications and essential details of the
            property.
          </p>

          <div className="text-body grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7.5 xl:gap-12.5">
            {basicInfoFields.map((field) => (
              <div
                key={field.id}
                className={field.colSpan ? "sm:col-span-2 lg:col-span-3" : ""}
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

                {field.type === "select" ? (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: controllerField }) => (
                      <Select
                        onValueChange={controllerField.onChange}
                        value={controllerField.value as string}
                      >
                        <SelectTrigger
                          aria-label={field.placeholder}
                          className={`border-border text-body data-placeholder:text-sub-foreground/50 bg-background focus-visible:border-purple-60 w-full rounded border px-4 py-6 focus-visible:border focus-visible:shadow-none focus-visible:ring-0 ${get(errors, field.name) ? "border-red-400" : ""}`}
                        >
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="bg-background border-border border"
                        >
                          {field.options?.map((option) => (
                            <SelectItem
                              className="text-body cursor-pointer"
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    {...register(field.name)}
                    placeholder={field.placeholder}
                    rows={field.rows}
                    className={`bg-background caret-purple-60 focus:border-purple-60 placeholder:text-sub-foreground/50 border-border w-full rounded border px-4 py-3 outline-none ${get(errors, field.name) ? "border-red-400" : ""}`}
                  />
                ) : field.name === "price" ? (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        value={value ? formatPrice(value) : ""}
                        onChange={(e) =>
                          onChange(e.target.value.replace(/,/g, ""))
                        }
                        placeholder={field.placeholder}
                        className={`border-border caret-purple-60 focus:border-purple-60 placeholder:text-sub-foreground/50 bg-background w-full rounded border px-4 py-3 outline-none ${
                          get(errors, field.name) ? "border-red-400" : ""
                        }`}
                      />
                    )}
                  />
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                    className={`border-border caret-purple-60 focus:border-purple-60 placeholder:text-sub-foreground/50 bg-background w-full rounded border px-4 py-3 outline-none ${get(errors, field.name) ? "border-red-400" : ""}`}
                  />
                )}

                {get(errors, field.name) && (
                  <p className="mt-1 text-sm text-red-400">
                    {get(errors, field.name).message as string}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <IsFeature form={form} />

      <AnimatedButton
        type="button"
        onClick={onNextAction}
        className="bg-purple-60 text-white-99 text-body ml-auto flex items-center gap-x-2 rounded-lg px-5 py-3"
      >
        Next
        <ArrowRightIcon
          aria-hidden
          weight="bold"
          className="size-4 md:size-5"
        />
      </AnimatedButton>
    </div>
  );
}
