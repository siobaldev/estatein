import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";
import {
  PlusIcon,
  ArrowsLeftRightIcon,
  PencilSimpleIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import DeletePropertyButton from "./_components/delete-property-button";
import { formatCurrency } from "@/lib/utils";
import AnimatedLink from "@/components/ui/animated-link";
import { Property } from "@/lib/types";

type PropertyTypes = Pick<
  Property,
  "id" | "name" | "image" | "location" | "propertyType" | "price" | "isFeatured"
>;

export default async function PropertiesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: properties, error } = await supabase
    .from("Property")
    .select("id, name, image, location, propertyType, price, isFeatured")
    .order("createdAt", { ascending: false });

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
        <AnimatedLink
          href="/admin/properties/new"
          className="bg-purple-60 text-foreground hover text-body inline-flex items-center gap-2 rounded-lg px-4 py-3"
        >
          <PlusIcon aria-hidden weight="bold" className="size-4 sm:size-5" />
          Add Property
        </AnimatedLink>
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
            className="bg-purpe-text-purple-60 mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
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
                        <div className="border-border bg-background h-10 w-14 shrink-0 overflow-hidden rounded-lg border">
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
        </>
      )}
    </section>
  );
}
