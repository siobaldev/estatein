import Services from "@/components/ui/services";

export default function ServicesHero() {
  return (
    // Main hero container with gradient background styling
    <section className="from-border/70 bg-linear-to-br to-30%">
      {/* Main content container */}
      <div className="wrapper">
        {/* Header: Title and description */}
        <div className="space-y-2.5 py-12.5 lg:py-25 xl:space-y-3.5 xl:pt-37.5 xl:pb-25">
          <h1 className="text-sub-title font-semibold">
            Elevate Your Real Estate Experience
          </h1>
          <p className="text-body text-sub-foreground max-w-6xl font-medium">
            Welcome to Estatein, where your real estate aspirations meet expert
            guidance. Explore our comprehensive range of services, each designed
            to cater to your unique needs and dreams.
          </p>
        </div>

        {/* Services overview cards */}
        <Services />
      </div>
    </section>
  );
}
