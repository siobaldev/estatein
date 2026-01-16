export const pageBuilder = (
  searchParams: Record<string, string | undefined>,
  page: number,
) => {
  // Create a new URLSearchParams object to build the query string
  const params = new URLSearchParams();

  // Loop through all existing search parameters
  Object.entries(searchParams).forEach(([key, value]) => {
    // Only add parameters that:
    // 1. Have a value (not undefined or empty)
    // 2. Are not the "page" parameter (we'll add it separately with the new value)
    if (value && key !== "page") {
      params.set(key, value);
    }
  });

  // Add the new page number to the query string
  params.set("page", String(page));

  // Return the complete query string with "?" prefix
  // Example: "?location=miami&price=1m-2m&page=2"
  return `?${params.toString()}`;
};
