"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { InquiryFormFields } from "@/lib/data";
import { showCustomToast } from "@/components/customToast";
import { inquirySchema, type InquiryFormData } from "@/schemas/inquirySchema";
import AnimatedButton from "@/components/ui/animated-button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPinIcon } from "@phosphor-icons/react";

interface InquiryFormProps {
  property: {
    name: string;
    location: string;
  };
}

export default function InquiryForm({ property }: InquiryFormProps) {
  // Combine property name and location for the selected property field
  const selectedProperty = `${property.name}, ${property.location}`;

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: "onSubmit", // Validate only when form is submitted
    defaultValues: {
      selectedProperty: selectedProperty, // Pre-fill with current property
      terms: false,
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    // Log form data
    console.log("Form data:", data);

    // Store the loading toast ID so we can update it later
    const loadingId = showCustomToast.loading("Sending your message...");

    try {
      // Simulate API call (replace with actual API request)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update the same toast to show success (using the stored ID)
      showCustomToast.success(
        "Message sent successfully!",
        "We'll get back to you soon.",
        {
          id: loadingId,
          duration: 5000,
        },
      );

      // Clear form fields after successful submission
      // Must explicitly pass all values to properly reset Controller components
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        selectedProperty: selectedProperty,
        message: "",
        terms: false,
      });
    } catch (error) {
      // Log error
      console.log(error);

      // Update the same toast to show error (using the stored ID)
      showCustomToast.error(
        "Error",
        "Something went wrong. Please try again.",
        {
          duration: 5000,
          id: loadingId,
        },
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:space-7.5 ring-border space-y-6 rounded-lg p-5 ring md:p-10 lg:p-20 xl:w-3/5 xl:p-5 2xl:p-10"
    >
      {/* Form fields grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-7.5 xl:gap-12.5">
        {InquiryFormFields.map((field) => (
          <div
            key={field.id}
            // Selected Property and Textarea fields span full width across both columns
            className={`relative ${field.name === "selectedProperty" || field.type === "textarea" ? "col-span-1 md:col-span-2" : ""}`}
          >
            {/* Field label with required indicator */}
            <label className="mb-2 block">
              {field.label}
              {field.required && (
                <>
                  <span className="text-red-400"> *</span>
                  <span className="sr-only">(required)</span>
                </>
              )}
            </label>

            {/* Render textarea for message field */}
            {field.type === "textarea" ? (
              <textarea
                {...register(field.name)}
                placeholder={field.placeholder}
                rows={field.rows}
                className={`bg-sub-background caret-purple-60 focus:ring-purple-60 placeholder:text-sub-foreground ring-border w-full rounded px-4 py-3 ring outline-none ${errors[field.name] ? "ring-red-400" : ""}`}
              />
            ) : (
              // Render input for all other fields
              <input
                {...register(field.name)}
                type={field.type}
                // Pre-fill selected property field with combined property name and location
                defaultValue={
                  field.name === "selectedProperty" ? selectedProperty : ""
                }
                // Make selected property field read-only
                readOnly={
                  field.name === "selectedProperty" ? field.readOnly : false
                }
                placeholder={field.placeholder}
                className={`ring-border caret-purple-60 focus:ring-purple-60 placeholder:text-sub-foreground bg-sub-background w-full rounded px-4 py-3 ring outline-none ${errors[field.name] ? "ring-red-400" : ""}`}
              />
            )}

            {/* Map pin icon overlay for selected property field */}
            {field.name === "selectedProperty" && (
              <MapPinIcon
                weight="fill"
                aria-label="Location"
                className="md: absolute top-12 right-5 md:top-12.5 lg:top-13"
              />
            )}

            {/* Display validation error if exists */}
            {errors[field.name] && (
              <p className="mt-1 text-sm font-medium text-red-400">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Terms checkbox and submit button */}
      <div className="flex flex-col gap-y-6 md:flex-row md:justify-between">
        <div>
          {/* Checkbox with Controller for proper form state management */}
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className={`data-[state=checked]:bg-purple-60 text-white-99 bg-sub-background border-border size-6 rounded ${errors.terms ? "border-red-400" : ""}`}
                />
                <label htmlFor="terms">
                  I agree with Terms of Use and Privacy Policy
                  <span className="text-red-400"> *</span>
                  <span className="sr-only">(required)</span>
                </label>
              </div>
            )}
          />

          {/* Display terms validation error if exists */}
          {errors.terms && (
            <p className="mt-1 text-sm font-medium text-red-400">
              {errors.terms.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <AnimatedButton
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-60 text-white-99 rounded px-6 py-3"
        >
          {isSubmitting ? "Sending..." : "Send Your Message"}
        </AnimatedButton>
      </div>
    </form>
  );
}
