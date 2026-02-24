import AnimatedLink from "@/components/ui/animated-link";
import Image from "next/image";
import {
  BedIcon,
  BathtubIcon,
  BuildingIcon,
  MapPinIcon,
  BoundingBoxIcon,
} from "@phosphor-icons/react/ssr";
import { slugify } from "@/lib/utils";
import { Property } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type PropertyCardProps = {
  property: Pick<
    Property,
    | "id"
    | "name"
    | "description"
    | "image"
    | "location"
    | "bedrooms"
    | "bathrooms"
    | "propertyType"
    | "propertySize"
    | "price"
  >;
};

export function PropertyCard({ property }: PropertyCardProps) {
  // Generate URL-friendly slug from property name
  const propertySlug = slugify(property.name);

  return (
    <div className="border-border hover:border-purple-60 my-px rounded-xl border p-6 select-none">
      {/* Property Image */}
      <div className="relative mb-4 aspect-video items-center justify-center overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
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
        <div className="flex flex-col gap-y-2.5">
          <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
            {property.name}
          </h1>
          <p className="text-body text-sub-foreground flex items-center gap-x-1">
            <MapPinIcon weight="fill" aria-hidden className="size-5" />
            <span>{property.location}</span>
          </p>
          <p className="text-sub-foreground text-body line-clamp-2 font-medium">
            {property.description}
          </p>
        </div>

        {/* Property Features */}
        <div className="flex flex-wrap gap-2 text-sm font-medium">
          {/* Property Type badge */}
          <div className="ring-border bg-sub-background flex w-fit gap-x-2 rounded-full px-3 py-1.5 ring">
            <BuildingIcon
              weight="fill"
              aria-hidden
              className="text-sub-foreground size-5"
            />
            <p>{property.propertyType}</p>
          </div>

          {/* Bedrooms badge */}
          <div className="ring-border bg-sub-background flex w-fit gap-x-2 rounded-full px-3 py-1.5 ring">
            <BedIcon
              weight="fill"
              aria-hidden
              className="text-sub-foreground size-5"
            />
            <p>
              {property.bedrooms} Bed{property.bedrooms > 1 && "s"}
            </p>
          </div>

          {/* Bathrooms badge */}
          <div className="ring-border bg-sub-background flex w-fit gap-x-2 rounded-full px-3 py-1.5 ring">
            <BathtubIcon
              weight="fill"
              aria-hidden
              className="text-sub-foreground size-5"
            />
            <p>
              {property.bathrooms} Bath{property.bathrooms > 1 && "s"}
            </p>
          </div>

          {/* Property Size badge */}
          <div className="ring-border bg-sub-background flex w-fit gap-x-2 rounded-full px-3 py-1.5 ring">
            <BoundingBoxIcon
              weight="fill"
              aria-hidden
              className="text-sub-foreground size-5"
            />
            <p>{property.propertySize} sqm</p>
          </div>
        </div>

        {/* Price and CTA Button */}
        <div className="flex justify-between max-[366px]:flex-col max-[366px]:gap-y-5">
          {/* Property price */}
          <div>
            <p className="text-sub-foreground text-body">Price</p>
            <p className="text-lg font-semibold md:text-xl lg:text-2xl">
              {formatCurrency(property.price)}
            </p>
          </div>

          {/* Link to individual property */}
          <AnimatedLink
            href={`/properties/${property.id}-${propertySlug}`}
            className="bg-purple-60 text-white-99 text-body size-fit px-5 py-3.5 font-medium text-nowrap max-[366px]:w-full lg:block"
          >
            View Details
          </AnimatedLink>
        </div>
      </div>
    </div>
  );
}
