export const additionalFeesConfig = [
  {
    key: "propertyTransferTax" as const,
    label: "Property Transfer Tax",
    description: "Based on the sale price and local regulations",
    gridClass: "",
  },
  {
    key: "legalFees" as const,
    label: "Legal Fees",
    description:
      "Approximate cost for legal services, including title transfer",
    gridClass: "",
  },
  {
    key: "homeInspection" as const,
    label: "Home Inspection",
    description: "Recommended for due diligence",
    gridClass: "",
  },
  {
    key: "propertyInsurance" as const,
    label: "Property Insurance",
    description: "Annual cost for comprehensive property insurance",
    gridClass: "",
  },
  {
    key: "mortgageFees" as const,
    label: "Mortgage Fees",
    description: "If applicable, consult with your lender for specific details",
    gridClass: "md:col-span-2",
  },
];

export const monthlyCostsConfig = [
  {
    key: "propertyTaxes" as const,
    label: "Property Taxes",
    description:
      "Approximate monthly property tax based on the sale price and local rates",
  },
  {
    key: "hoaFee" as const,
    label: "Homeowners' Association Fee",
    description: "Monthly fee for common area maintenance and security",
  },
];

export const totalInitialCostsConfig = [
  {
    key: "listingPrice" as const,
    label: "Listing Price",
    description: "",
  },
  {
    key: "additionalFeesTotal" as const,
    label: "Additional Fees Total",
    description: "Property transfer tax, legal fees, inspection, insurance",
  },
  {
    key: "downPayment" as const,
    label: "Down Payment",
    description: "20%",
  },
  {
    key: "mortgageAmount" as const,
    label: "Mortgage Amount",
    description: "If applicable",
  },
];

export const monthlyExpensesConfig = [
  {
    key: "propertyTaxes" as const,
    label: "Property Taxes",
    description: "",
  },
  {
    key: "hoaFee" as const,
    label: "HOA Fee",
    description: "",
  },
  {
    key: "mortgagePayment" as const,
    label: "Mortgage Payment",
    description: "Principal & Interest",
  },
  {
    key: "propertyInsurance" as const,
    label: "Property Insurance",
    description: "Approximate monthly cost",
  },
];
