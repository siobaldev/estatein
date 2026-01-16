import { Properties } from "@/lib/data";
import {
  BuildingsIcon,
  MapPinIcon,
  MoneyIcon,
  CubeIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react/dist/ssr";
import { slugify } from "./utils";

export type FilterOption = {
  label: string;
  value: string;
};

// Extracts unique values from property data
const getUniqueOptions = (key: "location" | "propertyType"): FilterOption[] => {
  const uniqueValues = Array.from(new Set(Properties.map((p) => p[key])));

  return [
    ...uniqueValues.map((value) => ({
      label: value,
      value: slugify(value),
    })),
  ];
};

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
export const PropertyFilters = [
  {
    id: 1,
    icon: MapPinIcon,
    name: "Location",
    queryKey: "location",
    placeholder: "Location",
    options: getUniqueOptions("location"),
  },
  {
    id: 2,
    icon: BuildingsIcon,
    name: "Property Type",
    queryKey: "type",
    placeholder: "Property Type",
    options: getUniqueOptions("propertyType"),
  },
  {
    id: 3,
    icon: MoneyIcon,
    name: "Price Range",
    queryKey: "price",
    placeholder: "Price Range",
    options: getPriceRanges(),
  },
  {
    id: 4,
    icon: CubeIcon,
    name: "Property Size",
    queryKey: "size",
    placeholder: "Property Size",
    options: getPropertySizeRanges(),
  },
  {
    id: 5,
    icon: CalendarBlankIcon,
    name: "Build Year",
    queryKey: "year",
    placeholder: "Build Year",
    options: getBuildYearRanges(),
  },
];
