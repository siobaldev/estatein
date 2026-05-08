import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";
import {
  PlusIcon,
  ArrowsLeftRightIcon,
  PencilSimpleIcon,
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import DeletePropertyButton from "./_components/delete-property-button";
import { formatCurrency } from "@/lib/utils";
import AnimatedLink from "@/components/ui/animated-link";
import { Property } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { pageBuilder } from "@/lib/page-builder";
import { generatePageNumbers } from "@/lib/utils";
import AddPropertyButton from "../_components/add-property-button";

type PropertyTypes = Pick<
  Property,
  "id" | "name" | "image" | "location" | "propertyType" | "price" | "isFeatured"
>;

const pageSize = 2;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page ?? 1));
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createSupabaseServerClient();

  const {
    data: properties,
    count,
    error,
  } = await supabase
    .from("Property")
    .select("id, name, image, location, propertyType, price, isFeatured", {
      count: "exact",
    })
    .order("createdAt", { ascending: false })
    .range(from, to);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-sub-foreground text-sm">
          Failed to load properties.
        </p>
      </div>
    );
  }

  return (
    <section className="wrapper my-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
            Properties
          </h1>
          <p className="text-sub-foreground text-body mt-1">
            {properties?.length ?? 0} total properties
          </p>
        </div>
        <AddPropertyButton />
      </div>

      {!properties || properties.length === 0 ? (
        <div className="border-border bg-sub-background flex flex-col items-center justify-center rounded-xl border py-20 text-center">
          <div className="bg-purpe-text-purple-60/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
            <ArrowsLeftRightIcon
              aria-hidden
              size={22}
              className="text-purple-60"
            />
          </div>
          <p className="text-foreground text-sm">No properties yet</p>
          <p className="text-sub-foreground mt-1 text-xs">
            Add your first property to get started.
          </p>
          <AnimatedLink
            href="/admin/properties/new"
            className="bg-purple-60 mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
          >
            <PlusIcon aria-hidden weight="bold" className="size-4" />
            Add Property
          </AnimatedLink>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="border-border bg-sub-background hidden overflow-hidden rounded-xl border lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border border-b">
                  {[
                    "Property",
                    "Location",
                    "Type",
                    "Price",
                    "Featured",
                    "",
                  ].map((headerName) => (
                    <th
                      key={headerName}
                      className="text-sub-foreground px-5 py-3 text-left text-base font-semibold"
                    >
                      {headerName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map((property: PropertyTypes) => (
                  <tr
                    key={property.id}
                    className="border-border hover:bg-background border-b transition-colors last:border-0"
                  >
                    {/* Property */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-auto w-20">
                          <Image
                            src={property.image}
                            alt={`${property.name} image`}
                            height={768}
                            width={1366}
                            sizes="(max-width: 768px) 100vw, 375px"
                            className="size aspect-video rounded-sm"
                            loading="lazy"
                          />
                        </div>

                        <p className="text-foreground leading-tight">
                          {property.name}
                        </p>
                      </div>
                    </td>

                    <td className="text-sub-foreground px-5 py-4">
                      {property.location}
                    </td>

                    <td className="px-5 py-4">
                      <span className="border-border bg-background text-sub-foreground rounded-md border px-2 py-1 text-xs">
                        {property.propertyType}
                      </span>
                    </td>

                    <td className="text-foreground px-5 py-4 font-semibold">
                      {formatCurrency(property.price)}
                    </td>

                    <td className="px-5 py-4">
                      <StarIcon
                        weight={property.isFeatured ? "fill" : "regular"}
                        aria-label={`${property.name} is ${property.isFeatured && "not "}featured`}
                        className={`size-5 ${property.isFeatured ? "text-purple-60" : "text-sub-foreground/50"}`}
                      />
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <AnimatedLink
                          href={`/admin/properties/${property.id}/edit`}
                          aria-label="Edit property"
                          className="bg-sub-background border-border hover:border-purple-60 text-foreground rounded-lg border p-3"
                        >
                          <PencilSimpleIcon aria-hidden className="size-5" />
                        </AnimatedLink>
                        <DeletePropertyButton
                          id={property.id}
                          name={property.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid */}

          <div className="flex flex-wrap items-center justify-center gap-4 lg:hidden">
            {properties.map((property: PropertyTypes) => (
              <div
                key={property.id}
                className="border-border max-w-xs rounded-xl border p-6 select-none"
              >
                {/* Property Image */}
                <div className="relative mb-4 aspect-video items-center justify-center">
                  <Image
                    src={property.image}
                    alt={`${property.name} image`}
                    height={768}
                    width={1366}
                    sizes="(max-width: 768px) 100vw, 375px"
                    className="rounded-lg"
                    loading="lazy"
                  />
                </div>

                {/* Property Details */}
                <div className="flex flex-col gap-y-5">
                  {/* Property Name and Description */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
                        {property.name}
                      </h1>

                      <StarIcon
                        weight={property.isFeatured ? "fill" : "regular"}
                        aria-label={`${property.name} is ${property.isFeatured && "not "}featured`}
                        className={`size-5 ${property.isFeatured ? "text-purple-60" : "text-sub-foreground/50"}`}
                      />
                    </div>

                    <p className="text-sub-foreground text-body flex flex-col">
                      <span>{property.location}</span>
                      <span>{property.propertyType}</span>
                    </p>
                  </div>

                  {/* Price and Edit and Delete Button */}
                  <div className="flex justify-between max-[366px]:gap-y-5">
                    {/* Property price */}
                    <div>
                      <p className="text-sub-foreground text-body">Price</p>
                      <p className="text-lg font-semibold md:text-xl lg:text-2xl">
                        {formatCurrency(property.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <AnimatedLink
                        aria-label="Edit property"
                        href={`/admin/properties/${property.id}/edit`}
                        className="bg-sub-background border-border hover:border-purple-60 text-foreground rounded-lg border p-3"
                      >
                        <PencilSimpleIcon aria-hidden className="size-5" />
                      </AnimatedLink>
                      <DeletePropertyButton
                        id={property.id}
                        name={property.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 0 && (
            <div className="mt-4 flex flex-col items-center justify-between gap-y-4 pt-4 md:flex-row">
              {/* Results counter */}
              <div className="text-sub-foreground text-body text-center font-medium text-nowrap lg:text-start">
                Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of{" "}
                {totalCount} properties
              </div>

              {/* Pagination controls */}
              <Pagination>
                <PaginationContent className="text-body flex w-full grid-cols-2 grid-rows-2 justify-center gap-x-2 gap-y-2 font-medium max-[450px]:grid md:justify-end">
                  {/* Previous button */}
                  <PaginationItem className="w-fit justify-self-end max-[450px]:order-2">
                    <AnimatedLink
                      href={pageBuilder(params, currentPage - 1)}
                      tabIndex={currentPage === 1 ? -1 : 0}
                      aria-label="Go to previous page"
                      className={`ring-border hover:ring-purple-60 flex items-center gap-x-2 rounded-full p-2.5 ring lg:rounded-lg ${
                        currentPage === 1
                          ? "pointer-events-none cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <ArrowLeftIcon aria-hidden="true" className="size-6" />
                      <span className="hidden lg:block">Previous</span>
                    </AnimatedLink>
                  </PaginationItem>

                  {/* Page numbers */}
                  <PaginationItem className="col-span-2 flex items-center justify-center gap-x-1 max-[450px]:order-1">
                    {pageNumbers.map((page, index) => {
                      if (typeof page === "string") {
                        return (
                          <div key={`${page}-${index}`}>
                            <PaginationEllipsis />
                          </div>
                        );
                      }
                      return (
                        <div key={page}>
                          <AnimatedLink
                            href={pageBuilder(params, page)}
                            tabIndex={currentPage === page ? -1 : 0}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
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

                  {/* Next button */}
                  <PaginationItem className="order-3 w-fit">
                    <AnimatedLink
                      href={pageBuilder(params, currentPage + 1)}
                      tabIndex={currentPage === totalPages ? -1 : 0}
                      aria-label="Go to next page"
                      className={`ring-border hover:ring-purple-60 flex items-center gap-x-2 rounded-full p-2.5 ring lg:rounded-lg ${
                        currentPage === totalPages
                          ? "pointer-events-none cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <span className="hidden lg:block">Next</span>
                      <ArrowRightIcon aria-hidden="true" className="size-6" />
                    </AnimatedLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
        // Pagination here
        //
      )}
    </section>
  );
}
