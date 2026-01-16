import { Properties } from "@/lib/data";
import { slugify } from "./utils";

export const filterProperties = (
  searchParams: {
    search?: string;
    location?: string;
    type?: string;
    price?: string;
    size?: string;
    year?: string;
  } = {},
) => {
  let results = [...Properties];

  // Search
  if (searchParams.search) {
    const q = searchParams.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q),
    );
  }

  // Location
  if (searchParams.location) {
    results = results.filter(
      (p) => slugify(p.location) === searchParams.location,
    );
  }

  // Property Type
  if (searchParams.type) {
    results = results.filter(
      (p) => slugify(p.propertyType) === searchParams.type,
    );
  }

  // Price
  if (searchParams.price) {
    results = results.filter((p) => {
      const price = p.priceValue;

      switch (searchParams.price) {
        case "under-500":
          return price < 500_000;
        case "500-1m":
          return price >= 500_000 && price <= 1_000_000;
        case "1m-2m":
          return price >= 1_000_000 && price <= 2_000_000;
        case "2m-3m":
          return price >= 2_000_000 && price <= 3_000_000;
        case "over-3m":
          return price > 3_000_000;
        default:
          return false;
      }
    });
  }

  // Property Size
  if (searchParams.size) {
    results = results.filter((p) => {
      const size = Number(p.propertySize);

      switch (searchParams.size) {
        case "under-100":
          return size < 100;
        case "100-200":
          return size >= 100 && size <= 200;
        case "200-300":
          return size >= 200 && size <= 300;
        case "300-400":
          return size >= 300 && size <= 400;
        case "over-400":
          return size > 400;
        default:
          return false;
      }
    });
  }

  // Build Year
  if (searchParams.year) {
    results = results.filter((p) => {
      const year = p.buildYear;

      switch (searchParams.year) {
        case "before-2010":
          return year < 2010;
        case "2010-2015":
          return year >= 2010 && year <= 2015;
        case "2015-2020":
          return year >= 2015 && year <= 2020;
        case "2020-2025":
          return year >= 2020 && year <= 2025;
        case "after-2025":
          return year > 2025;
        default:
          return false;
      }
    });
  }

  return results;
};
