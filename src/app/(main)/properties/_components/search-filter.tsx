"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import AnimatedButton from "@/components/ui/animated-button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  getPropertyFilters,
  type FilterOptionsMap,
} from "@/lib/property-filters";

type SearchFilterProps = {
  filterOptions: FilterOptionsMap;
};

export default function SearchFilter({ filterOptions }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search") ?? "",
  );

  const filters = getPropertyFilters.map((filter) => ({
    ...filter,
    options: filter.isDynamic
      ? filter.queryKey === "location"
        ? filterOptions.location
        : filterOptions.type
      : filter.options || [],
  }));

  // Updates a single query parameter in the URL
  // This function modifies the URL search parameters to reflect filter changes
  // When filters change, we always reset to page 1 to show relevant results
  const updateParam = (key: string, value: string) => {
    // Create a new URLSearchParams object from current params
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      // Empty value removes this filter
      params.delete(key);
    } else {
      // Set the new filter value
      params.set(key, value);
    }

    // Always reset to page 1 when filters change
    // This prevents showing empty pages when results are reduced
    params.delete("page");

    // Navigate to the new URL with updated query string
    router.push(`?${params.toString()}`);
  };

  // Handle search form submission
  // Extracts the search query from the form and updates the URL
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search")?.toString() ?? "";
    updateParam("search", search);
  };

  // Clear the search input
  // Resets both the local state and URL parameter
  const handleClearSearch = () => {
    setSearchValue(""); // Clear local state
    updateParam("search", ""); // Clear URL parameter
  };

  const handleSearchBlur = () => {
    if (searchValue.trim() === "") {
      updateParam("search", ""); // Clear URL parameter
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="wrapper absolute -top-28 right-0 left-0 font-medium md:-top-35 lg:-top-40 xl:-top-46"
    >
      {/* Search inbut bar */}
      <div className="border-border bg-background shadow-4 focus-within:border-purple-60 focus-within:shadow-purple-60/20 relative z-10 flex rounded-lg rounded-b-none border p-2.5 lg:mx-22.5">
        <input
          name="search"
          type="text"
          // Preserve search value from URL when component re-renders
          value={searchValue}
          onBlur={handleSearchBlur}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for a property"
          className="caret-purple-60 text-body placeholder:text-sub-foreground w-full rounded-lg py-3 pr-14 pl-4 outline-none md:pr-16"
        />
        {/* Clear button (X) - Only shown when search is not empty */}
        {searchValue && (
          <AnimatedButton
            type="button"
            onClick={handleClearSearch}
            className="absolute top-3.5 right-20 p-2 md:px-4 md:py-3"
          >
            <XIcon weight="bold" className="size-5" />
          </AnimatedButton>
        )}

        {/* Animated search submit button with icon */}
        <AnimatedButton
          type="submit"
          aria-label="Search"
          className="bg-purple-60 px-5 py-3.5"
        >
          <span className="sr-only">Search</span>
          <MagnifyingGlassIcon
            aria-hidden={true}
            weight="bold"
            className="text-white-99 size-5"
          />
        </AnimatedButton>
      </div>

      {/* Filter dropdowns */}
      <div className="bg-sub-background grid grid-cols-1 gap-5 rounded-lg rounded-t-none p-5 lg:grid-cols-6 lg:rounded-t-lg">
        {/* Map through all available filters from configuration */}
        {filters.map((filter) => (
          <div key={filter.id} className="lg:col-span-2 lg:nth-4:col-start-2">
            <Select
              // Read current filter value from URL (or empty string if not set)
              value={searchParams.get(filter.queryKey) ?? ""}
              // Update URL when user selects a new value
              onValueChange={(value) => updateParam(filter.queryKey, value)}
            >
              <div className="relative flex items-center">
                {/* Dropdown trigger button */}
                <SelectTrigger
                  aria-label={filter.placeholder}
                  className="border-border text-body data-placeholder:text-sub-foreground bg-background focus-visible:ring-purple-60 w-full rounded-lg px-4 py-7 shadow-none focus-visible:ring-1"
                >
                  <div className="flex items-center gap-x-2">
                    {/* Filter icon */}
                    <filter.icon
                      weight="fill"
                      aria-hidden={true}
                      className="size-5"
                    />
                    {/* Current value or placeholder text */}
                    <SelectValue placeholder={filter.placeholder} />
                  </div>
                </SelectTrigger>

                {/* Clear button (X) - Only shown when filter is active */}
                {searchParams.get(filter.queryKey) ? (
                  <AnimatedButton
                    key={filter.queryKey}
                    type="button"
                    onClick={() => updateParam(filter.queryKey, "")}
                    className="absolute right-10 p-2.5"
                  >
                    <XIcon weight="bold" className="size-5" />
                  </AnimatedButton>
                ) : null}
              </div>

              {/* Dropdown menu content */}
              <SelectContent
                position={"popper"}
                className="bg-sub-background border-border"
              >
                {/* Render all options for this filter */}
                {filter.options.map((option, index) => (
                  <SelectItem
                    key={index}
                    value={option.value}
                    className="text-body cursor-pointer font-medium"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </form>
  );
}
