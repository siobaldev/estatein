export type PriceDetail = {
  id: number;
  label: string;
  amount: string;
  description: string;
};

export type PricingDetails = {
  additionalFees: PriceDetail[];
  monthlyCosts: PriceDetail[];
  totalInitialCosts: PriceDetail[];
  monthlyExpenses: PriceDetail[];
};

export interface Property {
  id: number;
  name: string;
  description: string;
  image: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  price: string;
  priceValue: number;
  location: string;
  propertySize: string;
  buildYear: number;
  keyFeatures: string[];
  pricingDetails: PricingDetails;
}
