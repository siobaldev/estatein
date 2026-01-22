import AnimatedLink from "@/components/ui/animated-link";
import Image from "next/image";
import { BedIcon, BathtubIcon } from "@phosphor-icons/react/ssr";
import { slugify } from "@/lib/utils";
import { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Pick<
    Property,
    | "name"
    | "description"
    | "image"
    | "bedrooms"
    | "bathrooms"
    | "propertyType"
    | "price"
  >;
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Generate URL-friendly slug from property name
  const propertySlug = slugify(property.name);

  return (
    <div className="ring-border hover:ring-purple-60 my-px rounded-xl p-6 ring select-none">
      {/* Property Image with Type Badge */}
      <div className="relative mb-4 flex items-center justify-center">
        {/* Property type badge overlay */}
        <span className="bg-sub-background ring-border text-body shadow-border absolute top-2 left-2 flex w-fit rounded-full px-3 py-1.5 font-semibold shadow ring">
          {property.propertyType}
        </span>

        {/* Property image */}
        <Image
          src={property.image}
          alt={property.name}
          width={400}
          height={300}
          unoptimized
          className="size-full rounded-lg"
        />
      </div>

      {/* Property Details */}
      <div className="flex flex-col gap-y-5">
        {/* Property Name and Description */}
        <div>
          <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
            {property.name}
          </h1>
          <p className="text-sub-foreground text-body line-clamp-2 font-medium">
            {property.description}
          </p>
        </div>

        {/* Property Features (Bedrooms and Bathrooms) */}
        <div className="flex flex-wrap gap-2 text-sm font-medium">
          {/* Bedrooms badge */}
          <div className="ring-border bg-sub-background flex w-fit gap-x-2 rounded-full px-3 py-1.5 ring">
            <BedIcon aria-hidden="true" className="size-5" />
            <p>
              {property.bedrooms}
              <span className="max-[366px]:hidden"> - Bedrooms</span>
            </p>
          </div>

          {/* Bathrooms badge */}
          <div className="ring-border bg-sub-background flex w-fit gap-x-2 rounded-full px-3 py-1.5 ring">
            <BathtubIcon aria-hidden="true" className="size-5" />
            <p>
              {property.bathrooms}
              <span className="max-[366px]:hidden"> - Bathrooms</span>
            </p>
          </div>
        </div>

        {/* Price and CTA Button */}
        <div className="flex justify-between max-[366px]:flex-col max-[366px]:gap-y-5">
          {/* Property price */}
          <div>
            <p className="text-sub-foreground text-body">Price</p>
            <p className="text-lg font-semibold md:text-xl lg:text-2xl">
              {property.price}
            </p>
          </div>

          {/* Link to individual property */}
          <AnimatedLink
            href={`/properties/${propertySlug}`}
            className="bg-purple-60 text-white-99 text-body size-fit px-5 py-3.5 font-medium text-nowrap max-[366px]:w-full lg:block"
          >
            View Details
          </AnimatedLink>
        </div>
      </div>
    </div>
  );
}
