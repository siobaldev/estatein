"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

import {
  createPropertySchema,
  updatePropertySchema,
  UpdatePropertySchema,
  type CreatePropertySchema,
} from "@/schemas/propertySchema";
import { ImageItem } from "@/lib/types";

export async function checkDuplicateProperty(
  name: string,
  location: string,
  excludeId?: number,
) {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("Property")
    .select("id")
    .eq("name", name)
    .eq("location", location);

  // Exclude current property when updating
  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data } = await query.maybeSingle();

  return { data };
}

export async function uploadImages(
  images: ImageItem[],
  propertyName: string,
  isUpdate: boolean,
): Promise<{ data: ImageItem[] | null; error: string | null }> {
  try {
    const supabase = await createSupabaseServerClient();

    const folderName = propertyName.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const uploads = await Promise.allSettled(
      images.map(async (image) => {
        const ext = image.file!.name.split(".").pop();
        const imageName = image
          .file!.name.replace(/\.[^/.]+$/, "") // remove extension
          .replace(/[^a-zA-Z0-9]/g, "-") // replace special chars with dash
          .replace(/-+/g, "-") // remove consecutive dashes
          .replace(/^-|-$/g, ""); // trim leading/trailing dashes

        const fileName = `${folderName}/${imageName}-${image.order}.${ext}`;

        const { error } = await supabase.storage
          .from("properties-images")
          .upload(fileName, image.file!, {
            cacheControl: "3600",
            upsert: isUpdate, // true for update, false for create
          });

        if (error) return { error: "property_create_failed" };

        const { data: urlData } = supabase.storage
          .from("properties-images")
          .getPublicUrl(fileName);

        return {
          preview: urlData.publicUrl,
          order: image.order,
        };
      }),
    );

    const failed = uploads.filter((result) => result.status === "rejected");

    if (failed.length > 0) {
      return { data: null, error: "image_upload_failed" };
    }

    // extract the values from fulfilled promises
    const data = uploads
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<ImageItem>).value);

    return { data, error: null };
  } catch (err) {
    console.error("[uploadImages] Failed to upload images", {
      imagesCount: images.length,
      propertyName,
      error: err,
    });
    return { data: null, error: "unknown_error" };
  }
}

export async function createProperty(formData: CreatePropertySchema) {
  try {
    const supabase = await createSupabaseServerClient();
    const parsedData = createPropertySchema.safeParse(formData);

    if (!parsedData.success) return { error: "validation_error" };

    const property = parsedData.data;

    // All inserts are handled inside the supabase RPC function
    // if any step fails, Postgres rolls back the entire transaction automatically
    const { error } = await supabase.rpc("create_property", {
      p_name: property.name,
      p_description: property.description,
      p_image: property.image,
      p_bedrooms: property.bedrooms,
      p_bathrooms: property.bathrooms,
      p_property_type: property.propertyType,
      p_price: property.price,
      p_location: property.location,
      p_property_size: property.propertySize,
      p_build_year: property.buildYear,
      p_is_featured: property.isFeatured,
      p_key_features: property.keyFeatures,
      p_images: property.images,
      p_property_transfer_tax: property.additionalFees.propertyTransferTax,
      p_legal_fees: property.additionalFees.legalFees,
      p_home_inspection: property.additionalFees.homeInspection,
      p_property_insurance_fees: property.additionalFees.propertyInsurance,
      p_mortgage_fees: property.additionalFees.mortgageFees,
      p_monthly_property_taxes: property.monthlyCosts.propertyTaxes,
      p_hoa_fee: property.monthlyCosts.hoaFee,
      p_listing_price: property.totalInitialCosts.listingPrice,
      p_additional_fees_total: property.totalInitialCosts.additionalFeesTotal,
      p_down_payment: property.totalInitialCosts.downPayment,
      p_mortgage_amount: property.totalInitialCosts.mortgageAmount,
      p_expense_property_taxes: property.monthlyExpenses.propertyTaxes,
      p_expense_hoa_fee: property.monthlyExpenses.hoaFee,
      p_mortgage_payment: property.monthlyExpenses.mortgagePayment,
      p_expense_property_insurance: property.monthlyExpenses.propertyInsurance,
    });

    if (error) return { error: "property_create_failed" };

    revalidatePath("/admin/properties");
  } catch (err) {
    console.error("[createProperty] Failed to create property", {
      propertyName: formData.name,
      error: err,
    });
    return { error: "unknown_error" };
  }
}

export async function updateProperty(formData: UpdatePropertySchema) {
  try {
    const supabase = await createSupabaseServerClient();
    const parsedData = updatePropertySchema.safeParse(formData);

    if (!parsedData.success) {
      return { error: "validation_error" };
    }

    const property = parsedData.data;

    // All upserts are handled inside the supabase RPC function
    // if any step fails, Postgres rolls back the entire transaction automatically
    const { error } = await supabase.rpc("update_property", {
      p_id: Number(property.id),
      p_name: property.name,
      p_description: property.description,
      p_image: property.image,
      p_bedrooms: property.bedrooms,
      p_bathrooms: property.bathrooms,
      p_property_type: property.propertyType,
      p_price: property.price,
      p_location: property.location,
      p_property_size: property.propertySize,
      p_build_year: property.buildYear,
      p_is_featured: property.isFeatured,
      p_key_features: property.keyFeatures,
      p_images: property.images,
      p_deleted_image_urls: property.deletedImageUrls ?? [],
      p_property_transfer_tax: property.additionalFees.propertyTransferTax,
      p_legal_fees: property.additionalFees.legalFees,
      p_home_inspection: property.additionalFees.homeInspection,
      p_property_insurance_fees: property.additionalFees.propertyInsurance,
      p_mortgage_fees: property.additionalFees.mortgageFees,
      p_monthly_property_taxes: property.monthlyCosts.propertyTaxes,
      p_hoa_fee: property.monthlyCosts.hoaFee,
      p_listing_price: property.totalInitialCosts.listingPrice,
      p_additional_fees_total: property.totalInitialCosts.additionalFeesTotal,
      p_down_payment: property.totalInitialCosts.downPayment,
      p_mortgage_amount: property.totalInitialCosts.mortgageAmount,
      p_expense_property_taxes: property.monthlyExpenses.propertyTaxes,
      p_expense_hoa_fee: property.monthlyExpenses.hoaFee,
      p_mortgage_payment: property.monthlyExpenses.mortgagePayment,
      p_expense_property_insurance: property.monthlyExpenses.propertyInsurance,
    });

    if (error) return { error: "property_update_failed" };

    // Run storage deletion after rpc succeeds
    // deleted URLs are already removed from the DB so even if this fails the database stays consistent
    // TODO: Add an edge function for automatic database bucket storage clean up
    if (property.deletedImageUrls?.length) {
      const paths = property.deletedImageUrls.map(
        (url) => url.split("/properties-images/")[1],
      );
      await supabase.storage.from("properties-images").remove(paths);
    }

    revalidatePath("/admin/properties");
  } catch (err) {
    console.error("[updateProperty] Failed to update property", {
      propertyName: formData.name,
      error: err,
    });
    return { error: "unknown_error" };
  }
}

export async function deleteProperty(id: number, name: string) {
  try {
    const supabase = await createSupabaseServerClient();

    // Delete property row first and cascades to all related rows via Foreign Key
    const { error: propertyError } = await supabase
      .from("Property")
      .delete()
      .eq("id", id);

    if (propertyError) return { error: propertyError.message };

    const folderName = slugify(name);

    const { data: propertyImages } = await supabase.storage
      .from("properties-images")
      .list(folderName);

    const imagePaths = propertyImages!.map(
      (image) => `${folderName}/${image.name}`,
    );

    const { error: imagePropertyError } = await supabase.storage
      .from("properties-images")
      .remove(imagePaths);

    // Doesn't return an error
    // Database is already clean, just log for manual cleanup
    // TODO: Add an edge function for automatic database bucket storage clean up
    if (imagePropertyError) {
      console.error("[deleteProperty] Storage cleanup failed", {
        propertyName: name,
        imagePaths,
        error: imagePropertyError,
      });
    }

    revalidatePath("/admin/properties");
  } catch (err) {
    console.error("[deleteProperty] Failed to delete property", {
      propertyName: name,
      error: err,
    });
    return { error: "unknown_error" };
  }
}
