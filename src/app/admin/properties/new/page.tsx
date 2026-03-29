import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Form from "../_components/form";
import AnimatedLink from "@/components/ui/animated-link";

export default function NewPropertyPage() {
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
        <h1 className="text-foreground text-2xl font-semibold md:text-3xl">
          Create Property
        </h1>
        <p className="text-sub-foreground mt-1">
          Fill in the details to list a new property.
        </p>
      </div>

      <Form />
    </section>
  );
}
