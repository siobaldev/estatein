import z from "zod";

const propertyImageSchema = z.object({
  url: z.url("Image must be a valid URL"),
  order: z.coerce.number<number>().int().min(0),
});

const keyFeaturesSchema = z.object({
  feature: z.string().min(1, "Must have at least one feature"),
});

const additionalFeesSchema = z.object({
  propertyTransferTax: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Property transfer tax is required"),
  legalFees: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Legal fees is required"),
  homeInspection: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Home inspection fee is required"),
  propertyInsurance: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Property insurance is required"),
  mortgageFees: z.string().min(1, "Mortgage fees is required"),
});

const monthlyCostsSchema = z.object({
  propertyTaxes: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Property taxes is required"),
  hoaFee: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "HOA fee is required"),
});

const totalInitialCostsSchema = z.object({
  listingPrice: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Listing price is required"),
  additionalFeesTotal: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Additional fees total is required"),
  downPayment: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Down payment is required"),
  mortgageAmount: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Mortgage amount is required"),
});

const monthlyExpensesSchema = z.object({
  propertyTaxes: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Property taxes is required"),
  hoaFee: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "HOA fee is required"),
  mortgagePayment: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Mortgage payment is required"),
  propertyInsurance: z.coerce
    .number<number>("Please enter a valid number")
    .min(1, "Property insurance is required"),
});

export const propertySchema = z.object({
  name: z.string().min(4, "Property name must be at least 4 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  bedrooms: z.coerce
    .number<number>()
    .min(1, "At least 1 bedroom is required")
    .max(30, "Bedrooms cannot exceed 30"),
  bathrooms: z.coerce
    .number<number>()
    .min(1, "At least 1 bathroom is required")
    .max(20, "Bathrooms cannot exceed 20"),
  propertyType: z.string().min(1, "Please select a property type"),
  price: z.coerce
    .number<number>("Price must be a valid number")
    .min(1, "Price is required")
    .max(1_000_000_000, "Price is too large"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  propertySize: z.coerce
    .number<number>()
    .min(10, "Property size is required")
    .max(100_000, "Property Size cannot exceed 100,000"),
  buildYear: z.coerce
    .number<number>()
    .min(1_800, "Build year must be 1800 or later")
    .max(new Date().getFullYear(), "Build year cannot be in the future"),
  isFeatured: z.boolean(),

  keyFeatures: z
    .array(keyFeaturesSchema)
    .min(1, "At least one key feature is required"),
  additionalFees: additionalFeesSchema,
  monthlyCosts: monthlyCostsSchema,
  totalInitialCosts: totalInitialCostsSchema,
  monthlyExpenses: monthlyExpensesSchema,
});

export const createPropertySchema = propertySchema.extend({
  image: z.url("Main image must be a valid URL"),
  images: z.array(propertyImageSchema).min(4, "At least 4 images are required"),
});

export const updatePropertySchema = createPropertySchema.extend({
  id: z.coerce.string(),
  deletedImageUrls: z.array(z.string()).optional(),
});

// base property schema for client form
export type PropertySchema = z.infer<typeof propertySchema>;

// for creating property server side
export type CreatePropertySchema = z.infer<typeof createPropertySchema>;

// for updating the property server side
export type UpdatePropertySchema = z.infer<typeof updatePropertySchema>;
