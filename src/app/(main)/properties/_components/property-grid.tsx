import { PropertyCard } from "@/components/property-card";
import { ArrowRightIcon, ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import AnimatedLink from "@/components/ui/animated-link";
import { pageBuilder } from "@/lib/page-builder";
import { Property } from "@/lib/types";

// Type definition for the page props
type PropertyGridProps = {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  searchParams: {
    search?: string;
    location?: string;
    type?: string;
    price?: string;
    size?: string;
    year?: string;
    page?: string;
  };
};

export default function PropertyGrid({
  properties,
  totalCount,
  currentPage,
  itemsPerPage,
  searchParams,
}: PropertyGridProps) {
  // Check if page is valid
  // if currentPage is not a number and greater than 0
  const isValidPage = !isNaN(currentPage) && currentPage > 0;

  // Calculate array slice indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Calculate total number of pages needed
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Generate smart pagination with ellipsis (...)
  // This function determines which page numbers to show
  const generatePageNumbers = () => {
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

  // Generate the page numbers array to render
  const pageNumbers = generatePageNumbers();

  // Show empty state if no properties match filters
  if (properties.length === 0 || !isValidPage || currentPage > totalPages) {
    return (
      <div className="flex min-h-50 justify-center pt-100 lg:min-h-100 lg:pt-30">
        <div className="text-center">
          <p className="text-stats font-semibold">No properties found</p>
          <p className="text-sub-foreground text-body mt-2 font-medium">
            Try adjusting your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper flex flex-col gap-y-7.5 pt-100 md:gap-y-10 md:pt-94 lg:gap-y-12.5 lg:pt-30">
      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Render only the properties for the current page */}
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Bottom section with results info and pagination */}
      <div className="border-border flex flex-col items-center justify-between gap-y-4 border-t pt-4 md:flex-row">
        {/* Results Counter - Shows which items are currently visible */}
        {/* Example: "Showing 7-12 of 20 properties" */}
        <div className="text-sub-foreground text-body text-center font-medium text-nowrap lg:text-start">
          Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of{" "}
          {totalCount} properties
        </div>

        {/* Pagination Controls */}
        <Pagination>
          {/* Container for all pagination items */}
          <PaginationContent className="text-body flex w-full grid-cols-2 grid-rows-2 justify-center gap-x-2 gap-y-2 font-medium max-[450px]:grid md:justify-end">
            {/* Previous Button */}
            <PaginationItem className="w-fit justify-self-end max-[450px]:order-2">
              <AnimatedLink
                // Build URL with all filters + previous page number
                href={pageBuilder(searchParams, currentPage - 1)}
                // Disable tab navigation if on first page
                tabIndex={currentPage === 1 ? -1 : 0}
                // Accessibility label for screen readers
                aria-label="Go to previous page"
                // Disable pointer events and style if on first page
                className={`ring-border hover:ring-purple-60 flex items-center gap-x-2 rounded-full p-2.5 ring lg:rounded-lg ${
                  currentPage === 1
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                <ArrowLeftIcon aria-hidden="true" className="size-6" />
                {/* Show "Previous" text only on desktop */}
                <span className="hidden lg:block">Previous</span>
              </AnimatedLink>
            </PaginationItem>

            {/* Page Numbers and Ellipsis */}
            <PaginationItem className="col-span-2 flex items-center justify-center gap-x-1 max-[450px]:order-1">
              {pageNumbers.map((page, index) => {
                // If it's a string (ellipsis marker), render ellipsis dots
                if (typeof page === "string") {
                  return (
                    <div key={`${page}-${index}`}>
                      {/* Renders "..." */}
                      <PaginationEllipsis />
                    </div>
                  );
                }

                // If it's a number, render a clickable page button
                return (
                  <div key={page}>
                    <AnimatedLink
                      // Build URL with all filters + this page number
                      href={pageBuilder(searchParams, page)}
                      // Disable tab navigation for current active page
                      tabIndex={currentPage === page ? -1 : 0}
                      // Mark as active if this is the current page
                      aria-current={currentPage === page ? "page" : undefined}
                      // Style active page differently (purple bg vs purple border)
                      className={`rounded-full px-4 py-2 lg:rounded-lg ${
                        currentPage === page
                          ? "bg-purple-60 ring-none text-white-99"
                          : "ring-purple-60 hover:ring"
                      }`}
                    >
                      {page}
                    </AnimatedLink>
                  </div>
                );
              })}
            </PaginationItem>

            {/* Next Button */}
            <PaginationItem className="order-3 w-fit">
              <AnimatedLink
                // Build URL with all filters + next page number
                href={pageBuilder(searchParams, currentPage + 1)}
                // Disable tab navigation if on last page
                tabIndex={currentPage === totalPages ? -1 : 0}
                // Accessibility label for screen readers
                aria-label="Go to next page"
                // Disable pointer events and style if on last page
                className={`ring-border hover:ring-purple-60 flex items-center gap-x-2 rounded-full p-2.5 ring lg:rounded-lg ${
                  currentPage === totalPages
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                {/* Show "Next" text only on desktop */}
                <span className="hidden lg:block">Next</span>
                <ArrowRightIcon aria-hidden="true" className="size-6" />
              </AnimatedLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
