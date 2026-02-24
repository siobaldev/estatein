export type PropertyImage = {
  id: number;
  url: string;
  order: number;
  propertyId: number;
};

export type KeyFeatures = {
  id: number;
  feature: string;
  propertyId: number;
};

export type AdditionalFees = {
  id: number;
  propertyId: number;
  propertyTransferTax: number;
  legalFees: number;
  homeInspection: number;
  propertyInsurance: number;
  mortgageFees: string;
};

export type MonthlyCosts = {
  id: number;
  propertyId: number;
  propertyTaxes: number;
  hoaFee: number;
};

export type TotalInitialCosts = {
  id: number;
  propertyId: number;
  listingPrice: number;
  additionalFeesTotal: number;
  downPayment: number;
  mortgageAmount: number;
};

export type MonthlyExpenses = {
  id: number;
  propertyId: number;
  propertyTaxes: number;
  hoaFee: number;
  mortgagePayment: number;
  propertyInsurance: number;
};

export type Property = {
  id: number;
  name: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  price: number;
  location: string;
  propertySize: string;
  buildYear: number;
  isFeatured?: boolean;
  createAt: string;

  images: PropertyImage[];
  keyFeatures: KeyFeatures[];
  additionalFees?: AdditionalFees;
  monthlyCosts?: MonthlyCosts;
  totalInitialCosts?: TotalInitialCosts;
  monthlyExpenses?: MonthlyExpenses;
};
