import TripleStar from "@/components/ui/triple-star";
import InqueryForm from "./inquiry-form";
import { Property } from "@/lib/types";
import { User } from "@supabase/supabase-js";

interface Props {
  property: Pick<Property, "id" | "name" | "location">;
  user: User | null;
}

export default function PropertyInquiry({ property, user }: Props) {
  return (
    <section className="relative scroll-mt-32.5">
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container */}
      <div className="flex flex-col gap-y-7.5 lg:gap-x-20 lg:gap-y-12.5 xl:flex-row">
        {/* Header: Title and description */}
        <div className="flex flex-col gap-y-1.5 xl:w-2/5">
          <h1 className="text-sub-title font-semibold">
            Inquire About <span>{property.name}</span>
          </h1>
          <p className="text-body text-sub-foreground font-medium">
            Interested in this property? Fill out the form below, and our real
            estate experts will get back to you with more details, including
            scheduling a viewing and answering any questions you may have.
          </p>
        </div>

        {/* Form */}
        <InqueryForm property={property} user={user} />
      </div>
    </section>
  );
}
