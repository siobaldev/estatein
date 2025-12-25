import TripleStar from "../ui/triple-star";
import AccordionList from "./accordion-list";

export default function FAQs() {
  return (
    <section id="faqs" className="wrapper">
      <TripleStar />
      <div className="flex flex-col gap-y-7.5">
        <div className="flex items-end justify-between gap-x-20">
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-sub-title font-semibold">
              Frequently Asked Questions
            </h1>
            <p className="text-body text-sub-foreground font-medium">
              Read the success stories and heartfelt testimonials from our
              valued clients. Discover why they chose Estatein for their real
              estate needs.
            </p>
          </div>
        </div>
        <AccordionList />
      </div>
    </section>
  );
}
