import TripleStar from "@/components/ui/triple-star";
import Form from "./form";

export default function ContactForm() {
  return (
    <section id="contact-form" className="wrapper relative scroll-mt-32.5">
      {/* Decorative triple star */}
      <TripleStar />

      {/* Main content container with vertical spacing */}
      <div className="flex flex-col gap-y-10 lg:gap-y-15 xl:gap-y-20">
        {/* Header: Title and description */}
        <div className="flex flex-col gap-y-1.5">
          <h1 className="text-sub-title font-semibold">Let&apos;s Connect</h1>
          <p className="text-body text-sub-foreground max-w-6xl font-medium">
            We&apos;re excited to connect with you and learn more about your
            real estate goals. Use the form below to get in touch with Estatein.
            Whether you&apos;re a prospective client, partner, or simply curious
            about our services, we&apos;re here to answer your questions and
            provide the assistance you need.
          </p>
        </div>

        <Form />
      </div>
    </section>
  );
}
