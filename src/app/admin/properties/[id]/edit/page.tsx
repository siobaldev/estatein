import { createSupabaseServerClient } from "@/lib/supabase/server";
import Form from "../../_components/form";
import { notFound } from "next/navigation";
import AnimatedLink from "@/components/ui/animated-link";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: property, error } = await supabase
    .from("Property")
    .select(
      `*,
      images:PropertyImage(*),
      keyFeatures:KeyFeatures(*),
      additionalFees:AdditionalFees(*),
      monthlyCosts:MonthlyCosts(*),
      totalInitialCosts:TotalInitialCosts(*),
      monthlyExpenses:MonthlyExpenses(*)`,
    )
    .eq("id", id)
    .single();

  if (error || !property) notFound();

  return (
    <section className="wrapper mt-10 space-y-8">
      <div className="text-body">
        <AnimatedLink
          href="/admin/properties"
          className="text-sub-foreground hover:text-foreground mb-8 inline-flex items-center gap-x-1"
        >
          <CaretLeftIcon
            aria-hidden
            weight="bold"
            className="size-4 sm:size-5"
          />
          Back to Properties
        </AnimatedLink>
        <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
          Update Property
        </h1>
        <p className="text-sub-foreground mt-1">
          Edit the property details below to update your listing.
        </p>
      </div>

      <Form property={property} />
    </section>
  );
}
