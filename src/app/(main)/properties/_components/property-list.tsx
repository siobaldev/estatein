import { filterProperties } from "@/lib/filter-properties";
import PropertyGrid from "./property-grid";
import SearchFilter from "./search-filter";
import { getFilterOptions } from "@/lib/property-filters";

// Type definition for the page props
// In Next.js 15+, searchParams is a Promise that needs to be awaited
interface Props {
  searchParams: Promise<{
    search?: string;
    location?: string;
    type?: string;
    price?: string;
    size?: string;
    year?: string;
    page?: string;
  }>;
}

export default async function PropertiesList({ searchParams }: Props) {
  // Resolve the Promise to get actual search parameter values
  // In Next.js 15+, searchParams is a Promise that needs to be awaited
  const resolvedSearchParams = await searchParams;
  const itemsPerPage: number = 10;
  const filterOptions = await getFilterOptions();

  // Filter the complete property list based on active search criteria
  // Returns only properties that match all applied filters
  const { properties, totalCount } = await filterProperties(
    resolvedSearchParams,
    itemsPerPage,
    filterOptions,
  );

  // Extract current page number from URL, default to page 1 if not specified
  const currentPage = Number(resolvedSearchParams.page ?? 1);
  return (
    <section id="property-list" className="relative">
      {/* Search and filter controls - allows users to refine property results */}
      <SearchFilter filterOptions={filterOptions} />

      {/* Property display grid with pagination */}
      <PropertyGrid
        properties={properties}
        totalCount={totalCount}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        searchParams={resolvedSearchParams}
      />
    </section>
  );
}
