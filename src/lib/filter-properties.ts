import { supabase } from "./supabase/client";
import type { Property } from "./types";
import { type FilterOptionsMap } from "./property-filters";

export async function filterProperties(
  searchParams: {
    search?: string;
    location?: string;
    type?: string;
    price?: string;
    size?: string;
    year?: string;
    page?: string;
  } = {},
  itemsPerPage: number,
  filterOptions?: FilterOptionsMap,
): Promise<{ properties: Property[]; totalCount: number }> {
  let query = supabase
    .from("Property")
    .select(`*, images:PropertyImage(*)`, { count: "exact" });

  // Search
  if (searchParams.search) {
    const searchTerm = `%${searchParams.search}%`;
    query = query.or(
      `name.ilike.${searchTerm},description.ilike.${searchTerm}`,
    );
  }

  // Location
  if (searchParams.location && filterOptions) {
    const originalLocation = filterOptions.location.find(
      (opt) => opt.value === searchParams.location,
    )?.label;

    query = query.ilike("location", originalLocation as string);
  }

  // Property Type
  if (searchParams.type) {
    query = query.ilike("propertyType", searchParams.type);
  }

  // Price
  if (searchParams.price) {
    switch (searchParams.price) {
      case "under-500":
        query = query.lt("price", 500000);
        break;
      case "500-1m":
        query = query.gte("price", 500000).lte("price", 1000000);
        break;
      case "1m-2m":
        query = query.gte("price", 1000000).lte("price", 2000000);
        break;
      case "2m-3m":
        query = query.gte("price", 2000000).lte("price", 3000000);
        break;
      case "over-3m":
        query = query.gt("price", 3000000);
        break;
    }
  }

  if (searchParams.size) {
    switch (searchParams.size) {
      case "under-100":
        query = query.lt("propertySize", 100);
        break;
      case "100-200":
        query = query.gte("propertySize", 100).lte("propertySize", 200);
        break;
      case "200-300":
        query = query.gte("propertySize", 200).lte("propertySize", 300);
        break;
      case "300-400":
        query = query.gte("propertySize", 300).lte("propertySize", 400);
        break;
      case "over-400":
        query = query.gt("propertySize", 400);
        break;
    }
  }

  if (searchParams.year) {
    switch (searchParams.year) {
      case "before-2010":
        query = query.lt("buildYear", 2010);
        break;
      case "2010-2015":
        query = query.gte("buildYear", 2010).lte("buildYear", 2015);
        break;
      case "2015-2020":
        query = query.gte("buildYear", 2015).lte("buildYear", 2020);
        break;
      case "2020-2025":
        query = query.gte("buildYear", 2020).lte("buildYear", 2025);
        break;
      case "after-2025":
        query = query.gt("buildYear", 2025);
        break;
    }
  }

  console.log("Items per page: ", itemsPerPage);
  const page = Number(searchParams.page ?? 1);
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return { properties: [], totalCount: 0 };
  }
  return {
    properties: data as Property[],
    totalCount: count || 0,
  };
}
