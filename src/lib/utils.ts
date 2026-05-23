import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { errorMessages } from "./data";

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

// Generate smart pagination with ellipsis (...)
// This function determines which page numbers to show
export const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  // Simple case: Show all pages if there are 5 or fewer
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Complex case: Use ellipsis for many pages

  // Always show first page
  pages.push(1);

  // Calculate range of pages to show around current page
  const rangeStart = Math.max(2, currentPage - 1); // Don't go below page 2
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1); // Don't exceed second-to-last page

  // Add ellipsis after first page if there's a gap
  // Example: If current page is 10, show [1] ... [9] [10] [11]
  if (rangeStart > 2) {
    pages.push("ellipsis-start");
  }

  // Add the range of pages around current page
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  // Add ellipsis before last page if there's a gap
  // Example: If current page is 5, show [1] ... [4] [5] [6] ... [20]
  if (rangeEnd < totalPages - 1) {
    pages.push("ellipsis-end");
  }

  // Always show last page
  pages.push(totalPages);

  return pages;
};

export function getErrorMessage(key: string): string {
  return errorMessages[key] ?? errorMessages["unknown_error"];
}

// Converts a date into a human-readable "time ago" format (minutes, hours, days)
export function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}
