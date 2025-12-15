import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQs } from "@/lib/data";

export default function AccordionList() {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="border-border bg-sub-background mx-auto rounded-lg border px-4 py-2 md:px-10 md:py-5 xl:px-16"
      >
        {FAQs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id.toString()}
            className="border-border"
          >
            <AccordionTrigger className="data-[state=open]:text-foreground hover:text-foreground text-sub-foreground text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-body! text-sub-foreground font-medium">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
