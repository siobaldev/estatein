import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (text: string | null | undefined): string => {
  if (!text) return "";

  return String(text) // ← Convert to string first
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

// format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// format price for inputs
export function formatPrice(value: string | number) {
  const num =
    typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  if (isNaN(num)) return "";
  return num.toLocaleString();
}
