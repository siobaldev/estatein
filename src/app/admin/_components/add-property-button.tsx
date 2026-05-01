import AnimatedLink from "@/components/ui/animated-link";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

export default function AddPropertyButton() {
  return (
    <AnimatedLink
      href="/admin/properties/new"
      className="bg-purple-60 text-foreground hover text-body inline-flex items-center gap-2 rounded-lg px-4 py-3"
    >
      <PlusIcon aria-hidden weight="bold" className="size-4 sm:size-5" />
      Add Property
    </AnimatedLink>
  );
}
