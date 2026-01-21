import {
  BedIcon,
  BathtubIcon,
  BoundingBoxIcon,
  SparkleIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import PropertyImageGallery from "./property-images";

interface PropertyProps {
  property: {
    id: number;
    name: string;
    description: string;
    image: string;
    images: string[];
    bedrooms: number;
    bathrooms: number;
    propertyType: string;
    price: string;
    priceValue: number;
    location: string;
    propertySize: string;
    buildYear: number;
    keyFeatures: string[];
  };
}

export default function PropertyInfo({ property }: PropertyProps) {
  return (
    <>
      {/* Property header with name, location, and price */}
      <div className="flex items-center justify-between">
        <div className="space-y-2.5">
          <h1 className="text-xl font-semibold md:text-2xl xl:text-3xl">
            {property.name}
          </h1>
          <p className="flex items-center gap-x-2">
            <span>
              <MapPinIcon weight="fill" />
            </span>
            {property.location}
          </p>
        </div>
        <div>
          <p className="text-sub-foreground">Price</p>
          <p className="text-xl font-semibold md:text-2xl xl:text-3xl">
            {property.price}
          </p>
        </div>
      </div>

      {/* Property image gallery carousel */}
      <PropertyImageGallery
        images={property.images}
        propertyName={property.name}
      />

      {/* Main content: Description and Key Features */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Description and property stats */}
        <div className="ring-border @container flex h-fit flex-1 flex-col gap-y-5 rounded-lg p-5 ring lg:gap-y-10 lg:p-10 xl:gap-y-12.5 xl:p-12.5">
          {/* Property description */}
          <div className="space-y-1.5 md:space-y-2 lg:space-y-2.5 xl:space-y-3.5">
            <h1 className="text-lg font-semibold lg:text-xl xl:text-2xl">
              Description
            </h1>
            <p className="text-sub-foreground">{property.description}</p>
          </div>

          {/* Property statistics grid: bedrooms, bathrooms, area */}
          <div className="border-border divide-border grid w-full grid-cols-1 border-t @xs:grid-cols-2 @xs:gap-5 @lg:grid-cols-3 @lg:gap-2.5">
            {/* Bedrooms badge */}
            <div className="mt-5 flex flex-col gap-y-1.5 pb-5 lg:gap-y-2 xl:gap-y-2.5 @xs:border-r @xs:pb-0">
              <p className="text-sub-foreground flex items-center gap-x-1">
                <BedIcon
                  weight="fill"
                  aria-hidden="true"
                  className="size-5 xl:size-6"
                />
                <span>Bedrooms</span>
              </p>
              <p className="text-lg font-semibold lg:text-xl xl:text-2xl">
                {property.bedrooms.toString().padStart(2, "0")}
              </p>
            </div>

            {/* Bathrooms badge */}
            <div className="border-border flex flex-1 flex-col gap-y-1.5 border-t py-5 lg:gap-y-2 xl:gap-y-2.5 @xs:border-0 @xs:pb-0 @lg:mt-5 @lg:border-r @lg:pt-0">
              <p className="text-sub-foreground flex items-center gap-x-1">
                <BathtubIcon
                  weight="fill"
                  aria-hidden="true"
                  className="size-5 xl:size-6"
                />
                <span>Bathrooms</span>
              </p>
              <p className="text-lg font-semibold lg:text-xl xl:text-2xl">
                {property.bathrooms.toString().padStart(2, "0")}
              </p>
            </div>

            {/* Area badge */}
            <div className="border-border flex flex-col gap-y-1.5 border-t pt-5 lg:gap-y-2 xl:gap-y-2.5 @xs:col-span-2 @lg:col-span-1 @lg:border-0">
              <p className="text-sub-foreground flex items-center gap-x-1">
                <BoundingBoxIcon
                  weight="fill"
                  aria-hidden="true"
                  className="size-5 xl:size-6"
                />
                <span>Area</span>
              </p>
              <p className="text-lg font-semibold lg:text-xl xl:text-2xl">
                {property.propertySize} Square Meters
              </p>
            </div>
          </div>
        </div>

        {/* Key Features and Amenities */}
        <div className="ring-border flex-1 space-y-5 rounded-lg p-5 ring lg:space-y-10 lg:p-10 xl:space-y-12.5 xl:p-12.5">
          <h2 className="text-lg font-semibold lg:text-xl xl:text-2xl">
            Key Features and Amenities
          </h2>
          <div className="space-y-4.5 md:space-y-5 lg:space-y-6 xl:space-y-7.5">
            {/* Map through each key feature and display with icon */}
            {property.keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="border-purple-60 from-border/40 flex items-center gap-x-4 border-l bg-linear-to-r to-80% py-2.5 pr-2.5 pl-4 lg:py-3.5 xl:py-4"
              >
                <SparkleIcon
                  weight="fill"
                  aria-hidden="true"
                  className="size-6"
                />
                <p className="text-sub-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
