import {
  BuildingsIcon,
  MapPinIcon,
  MoneyIcon,
  CubeIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react/dist/ssr";
import { slugify } from "./utils";
import { supabase } from "./supabase/client";
import { Icon } from "@phosphor-icons/react";

export type FilterOption = {
  label: string;
  value: string;
};

type BaseFilter = {
  id: number;
  icon: Icon;
  name: string;
  queryKey: string;
  placeholder: string;
};

type DynamicFilter = BaseFilter & {
  isDynamic: true;
  options?: never;
};

type StaticFilter = BaseFilter & {
  isDynamic?: false;
  options: FilterOption[];
};

export type FilterConfig = DynamicFilter | StaticFilter;

// Extracts unique values from property data
export async function getLocationOptions(): Promise<FilterOption[]> {
  const { data, error } = await supabase.from("Property").select("location");

  if (error || !data) return [];

  const unique = [...new Set(data.map((item) => item.location))];

  return unique.map((value) => ({
    label: value,
    value: slugify(value),
  }));
}

export async function getPropertyTypeOptions(): Promise<FilterOption[]> {
  const { data, error } = await supabase
    .from("Property")
    .select("propertyType");

  if (error || !data) return [];

  const unique = [...new Set(data.map((item) => item.propertyType))];

  return unique.map((value) => ({
    label: value,
    value: slugify(value),
  }));
}

export type FilterOptionsMap = {
  location: FilterOption[];
  type: FilterOption[];
};

export async function getFilterOptions(): Promise<FilterOptionsMap> {
  return {
    location: await getLocationOptions(),
    type: await getPropertyTypeOptions(),
  };
}

// Price ranges used for filtering
export const getPriceRanges = (): FilterOption[] => [
  { label: "Under $500,000", value: "under-500" },
  { label: "$500,000 - $1,000,000", value: "500-1m" },
  { label: "$1,000,000 - $2,000,000", value: "1m-2m" },
  { label: "$2,000,000 - $3,000,000", value: "2m-3m" },
  { label: "Over $3,000,000", value: "over-3m" },
];

// Property size ranges
export const getPropertySizeRanges = (): FilterOption[] => [
  { label: "Under 100 sqm", value: "under-100" },
  { label: "100 - 200 sqm", value: "100-200" },
  { label: "200 - 300 sqm", value: "200-300" },
  { label: "300 - 400 sqm", value: "300-400" },
  { label: "Over 400 sqm", value: "over-400" },
];

// Build year ranges
export const getBuildYearRanges = (): FilterOption[] => [
  { label: "Before 2010", value: "before-2010" },
  { label: "2010 - 2015", value: "2010-2015" },
  { label: "2015 - 2020", value: "2015-2020" },
  { label: "2020 - 2025", value: "2020-2025" },
  { label: "After 2025", value: "after-2025" },
];

// Property filters data
export const getPropertyFilters: FilterConfig[] = [
  {
    id: 1,
    icon: MapPinIcon,
    name: "Location",
    queryKey: "location",
    placeholder: "Select Location",
    isDynamic: true,
  },
  {
    id: 2,
    icon: BuildingsIcon,
    name: "Property Type",
    queryKey: "type",
    placeholder: "Select Property Type",
    isDynamic: true,
  },
  {
    id: 3,
    icon: MoneyIcon,
    name: "Price Range",
    queryKey: "price",
    placeholder: "Select Price Range",
    options: getPriceRanges(),
  },
  {
    id: 4,
    icon: CubeIcon,
    name: "Property Size",
    queryKey: "size",
    placeholder: "Select Property Size",
    options: getPropertySizeRanges(),
  },
  {
    id: 5,
    icon: CalendarBlankIcon,
    name: "Build Year",
    queryKey: "year",
    placeholder: "Select Build Year",
    options: getBuildYearRanges(),
  },
];
