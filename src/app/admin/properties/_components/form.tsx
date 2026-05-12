"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createPropertySchema,
  updatePropertySchema,
  propertySchema,
  type PropertySchema,
  type UpdatePropertySchema,
} from "@/schemas/propertySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BasicInfo from "./basic-info";
import Images from "./image";
import KeyFeature from "./key-feature";
import Pricing from "./pricing";
import Review from "./review";
import { showCustomToast } from "@/components/customToast";
import {
  createProperty,
  updateProperty,
  uploadImages,
  checkDuplicateProperty,
} from "@/actions/properties";
import { ImageItem } from "@/lib/types";
import { formSteps, errorMessages } from "@/lib/data";

type Props = {
  property?: UpdatePropertySchema;
};

export default function Form({ property }: Props) {
  const isEdit = !!property;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<ImageItem[]>(
    property?.images?.map((img: { url: string; order: number }) => ({
      preview: img.url,
      order: img.order,
      existingUrl: img.url,
    })) ?? [],
  );
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const form = useForm<PropertySchema>({
    resolver: zodResolver(propertySchema),
    mode: "onSubmit",
    defaultValues: isEdit
      ? {
          name: property.name,
          description: property.description,
          propertyType: property.propertyType,
          location: property.location,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          propertySize: property.propertySize,
          buildYear: property.buildYear,
          price: property.price,
          isFeatured: property.isFeatured,
          keyFeatures: property.keyFeatures.map((kf) => ({
            feature: kf.feature,
          })),
          additionalFees: {
            propertyTransferTax: property.additionalFees.propertyTransferTax,
            legalFees: property.additionalFees.legalFees,
            homeInspection: property.additionalFees.homeInspection,
            propertyInsurance: property.additionalFees.propertyInsurance,
            mortgageFees: property.additionalFees.mortgageFees,
          },
          monthlyCosts: {
            propertyTaxes: property.monthlyCosts.propertyTaxes,
            hoaFee: property.monthlyCosts.hoaFee,
          },
          totalInitialCosts: {
            listingPrice: property.totalInitialCosts.listingPrice,
            additionalFeesTotal: property.totalInitialCosts.additionalFeesTotal,
            downPayment: property.totalInitialCosts.downPayment,
            mortgageAmount: property.totalInitialCosts.mortgageAmount,
          },
          monthlyExpenses: {
            propertyTaxes: property.monthlyExpenses.propertyTaxes,
            hoaFee: property.monthlyExpenses.hoaFee,
            mortgagePayment: property.monthlyExpenses.mortgagePayment,
            propertyInsurance: property.monthlyExpenses.propertyInsurance,
          },
        }
      : {
          propertyType: "",
          isFeatured: false,
          keyFeatures: [{ feature: "" }],
          additionalFees: {
            mortgageFees: "Varies",
          },
        },
  });

  function goToStep(step: number) {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function parsedValidation(loadingId: string | number) {
    showCustomToast.error(errorMessages["validation_error"], "", {
      id: loadingId,
      duration: 5000,
    });
  }

  const onSubmit = async (formData: PropertySchema) => {
    const loadingId = showCustomToast.loading(
      `${isEdit ? "Updating" : "Creating"} Property...`,
    );

    try {
      startTransition(async () => {
        // Check for duplicate first
        const { data: existing } = await checkDuplicateProperty(
          formData.name,
          formData.location,
        );

        if (existing) {
          showCustomToast.error(errorMessages["duplicate_property"], "", {
            id: loadingId,
            duration: 5000,
          });
          return;
        }

        let uploadedImages: ImageItem[] = [];

        // INFO: upload images
        if (isEdit) {
          // upload only new images
          const newImages = images.filter((img) => img.file);
          const { data: newUploaded, error: uploadError } =
            newImages.length > 0
              ? await uploadImages(newImages, formData.name, true)
              : { data: [], error: null };

          if (uploadError) {
            showCustomToast.error(errorMessages["image_upload_failed"], "", {
              id: loadingId,
              duration: 5000,
            });
            return;
          }

          // merge kept + new images
          const keptImages = images
            .filter(
              (img) =>
                img.existingUrl && !deletedImages.includes(img.existingUrl),
            )
            .map((img) => ({ preview: img.existingUrl!, order: img.order }));

          uploadedImages = [...keptImages, ...(newUploaded ?? [])].map(
            (img, i) => ({ ...img, order: i }),
          );
        } else {
          // upload all images for create
          const { data, error: uploadError } = await uploadImages(
            images,
            formData.name,
            false,
          );

          if (uploadError || !data) {
            showCustomToast.error(errorMessages["image_upload_failed"], "", {
              id: loadingId,
              duration: 5000,
            });
            return;
          }
          uploadedImages = data;
        }

        // Set image for property preview image
        const mainImage = uploadedImages.find(
          (img) => img.order === 0,
        )!.preview;

        let result;
        // INFO: create or delete property
        if (isEdit) {
          const parsedData = updatePropertySchema.safeParse({
            ...formData,
            id: property!.id,
            image: mainImage,
            images: uploadedImages.map((img) => ({
              url: img.preview,
              order: img.order,
            })),
            deletedImageUrls: deletedImages,
          });

          if (!parsedData.success) {
            parsedValidation(loadingId);
            return;
          }

          result = await updateProperty(parsedData.data);
        } else {
          const parsed = createPropertySchema.safeParse({
            ...formData,
            image: mainImage,
            images: uploadedImages.map((img) => ({
              url: img.preview,
              order: img.order,
            })),
          });

          if (!parsed.success) {
            parsedValidation(loadingId);
            return;
          }

          result = await createProperty(parsed.data);
        }

        if (result) {
          showCustomToast.error(errorMessages[result.error], "", {
            id: loadingId,
            duration: 5000,
          });
          return;
        }

        showCustomToast.success(
          `Property ${isEdit ? "updated" : "created"} successfully!`,
          "",
          { id: loadingId, duration: 5000 },
        );

        router.push("/admin/properties");
      });
    } catch (error) {
      console.log(error);
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
    <div className="mb-20 flex flex-col items-center space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center gap-x-2">
        {formSteps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step.step} className={`flex items-center gap-x-2`}>
              <div
                className={`rounded-md border p-1.5 md:p-2 ${
                  isCompleted
                    ? "bg-purple-60/10 border-0"
                    : isActive
                      ? "border-purple-60 bg-transparent"
                      : "border-border text-sub-foreground bg-transparent"
                }`}
              >
                <step.icon
                  weight="fill"
                  className={`size-4 sm:size-5 md:size-6 ${isCompleted ? "text-purple-60" : ""}`}
                />
              </div>
              {isActive && (
                <div className="hidden flex-col text-sm sm:flex">
                  <span className="text-sub-foreground">Step {step.step}</span>
                  <span
                    className={`${
                      isActive
                        ? "text-foreground"
                        : isCompleted
                          ? "text-purple-60"
                          : "text-sub-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              )}

              {index < formSteps.length - 1 && (
                <hr
                  className={`mx-1 w-4 transition-transform duration-300 sm:w-10 ${
                    isCompleted ? "border-purple-60" : "border-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {currentStep === 0 && (
          <BasicInfo
            form={form}
            onNextAction={async () => {
              const valid = await form.trigger([
                "name",
                "description",
                "propertyType",
                "location",
                "bedrooms",
                "bathrooms",
                "propertySize",
                "buildYear",
                "price",
              ]);
              if (valid) goToStep(1);
            }}
          />
        )}

        {currentStep === 1 && (
          <Images
            images={images}
            onImagesChangeAction={setImages}
            onNextAction={() => goToStep(2)}
            onBackAction={() => goToStep(0)}
            onDeletedImagesChangeAction={setDeletedImages}
          />
        )}

        {currentStep === 2 && (
          <KeyFeature
            form={form}
            onNextAction={async () => {
              const valid = await form.trigger(["keyFeatures"]);
              if (valid) goToStep(3);
            }}
            onBackAction={() => goToStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Pricing
            form={form}
            onNextAction={async () => {
              const valid = await form.trigger([
                "additionalFees",
                "monthlyCosts",
                "totalInitialCosts",
                "monthlyExpenses",
              ]);
              if (valid) goToStep(4);
            }}
            onBackAction={() => goToStep(2)}
          />
        )}

        {currentStep === 4 && (
          <>
            <Review
              form={form}
              images={images}
              deletedImages={deletedImages}
              isPending={isPending}
              onBackAction={() => goToStep(3)}
              isEdit={isEdit}
            />
          </>
        )}
      </form>
    </div>
  );
}
