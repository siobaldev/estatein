"use client";

import AnimatedButton from "@/components/ui/animated-button";
import { ContactFormFields } from "@/lib/data";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { clientSchema, type ClientFormData } from "@/schemas/contactSchema";
import { showCustomToast } from "@/components/customToast";

export default function Form() {
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    mode: "onSubmit", // Validate only when form is submitted
    defaultValues: {
      inquiryType: "",
      howDidYouHear: "",
      terms: false,
    },
  });

  const onSubmit = async (data: ClientFormData) => {
    // Store the loading toast ID so we can update it later
    const loadingId = showCustomToast.loading("Sending your message...");

    try {
      // Log form data for debugging (remove in production)
      console.log("Form data:", data);

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
        inquiryType: "",
        message: "",
        howDidYouHear: "",
        terms: false,
      });
    } catch (error) {
      // Log error for debugging
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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ring-border text-body lg:space-7.5 space-y-6 rounded-lg p-5 font-medium ring md:p-10 lg:p-20 xl:p-25"
      >
        {/* Form fields grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7.5 xl:gap-12.5">
          {ContactFormFields.map((field) => (
            <div
              key={field.id}
              className={
                // Textarea spans full width
                field.type === "textarea" ? "md:col-span-2 lg:col-span-3" : ""
              }
            >
              <label className="mb-2 block">
                {field.label}
                {field.required && (
                  <>
                    <span className="text-red-400"> *</span>
                    <span className="sr-only">(required)</span>
                  </>
                )}
              </label>

              {/* Render Select dropdown with Controller */}
              {field.type === "select" ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select
                      onValueChange={controllerField.onChange}
                      value={controllerField.value}
                    >
                      <SelectTrigger
                        aria-label={field.placeholder}
                        className={`border-border text-body data-placeholder:text-sub-foreground bg-sub-background focus-visible:ring-purple-60 w-full rounded px-4 py-6 focus-visible:shadow-none focus-visible:ring-1 ${errors[field.name] ? "border-red-400" : ""}`}
                      >
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent
                        position={"popper"}
                        className="bg-sub-background border-border"
                      >
                        {field.options?.map((option) => (
                          <SelectItem
                            className="text-body cursor-pointer font-medium"
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
                // Render textarea
                <textarea
                  {...register(field.name)}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  className={`bg-sub-background caret-purple-60 focus:ring-purple-60 placeholder:text-sub-foreground ring-border w-full rounded px-4 py-3 ring outline-none ${errors[field.name] ? "ring-red-400" : ""}`}
                />
              ) : (
                // Render regular input
                <input
                  type={field.type}
                  {...register(field.name)}
                  placeholder={field.placeholder}
                  className={`ring-border caret-purple-60 focus:ring-purple-60 placeholder:text-sub-foreground bg-sub-background w-full rounded px-4 py-3 ring outline-none ${errors[field.name] ? "ring-red-400" : ""}`}
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
    </div>
  );
}
