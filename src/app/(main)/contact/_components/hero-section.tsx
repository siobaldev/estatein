import IconContainer from "@assets/Icon-Container.svg";
import { ContactInfoCards } from "@/lib/data";

export default function ContactHero() {
  return (
    // Main hero container with gradient background styling
    <section className="from-border/70 scroll-mt-32.5 bg-linear-to-br to-30%">
      {/* Main content container */}
      <div className="wrapper">
        {/* Header: Title and description */}
        <div className="space-y-2.5 py-12.5 lg:py-25 xl:space-y-3.5 xl:pt-37.5 xl:pb-25">
          <h1 className="text-sub-title font-semibold">
            Get in Touch with Estatein
          </h1>
          <p className="text-body text-sub-foreground max-w-6xl font-medium">
            Welcome to Estatein&apos;s Contact Us page. We&apos;re here to
            assist you with any inquiries, requests, or feedback you may have.
            Whether you&apos;re looking to buy or sell a property, explore
            investment opportunities, or simply want to connect, we&apos;re just
            a message away. Reach out to us, and let&apos;s start a
            conversation.
          </p>
        </div>

        {/* Contact information overview cards */}
        <div className="ring-border shadow-4 lg:shadow-6 xl:shadow-10 z-20 order-3 w-full rounded-lg p-2.5 ring lg:col-span-2">
          <ul className="grid grid-cols-1 gap-2.5 min-[416px]:grid-cols-2 lg:grid-cols-4">
            {ContactInfoCards.map((card) => (
              <li
                key={card.id}
                className="group bg-sub-background ring-border hover:ring-purple-60 relative flex h-full flex-col items-center justify-center gap-y-4 rounded-lg px-3.5 py-5 ring"
              >
                {/* Icon with decorative container */}
                <div className="relative flex items-center justify-center">
                  {/* Icon container background */}
                  <IconContainer
                    aria-hidden="true"
                    className="size-12 stroke-2 lg:size-15 xl:size-20.5"
                  />

                  {/* Icon centered in container */}
                  <card.icon
                    aria-hidden="true"
                    className="text-purple-75 absolute size-5 xl:size-8.5"
                  />
                </div>

                {/* Label container */}
                <div className="text-body text-center font-medium">
                  {/* Check if it's an array and map through it */}
                  {typeof card.label === "string" ? (
                    <span>{card.label}</span>
                  ) : (
                    <ul className="flex gap-4">
                      {card.label.map((item, index) => (
                        <li key={index}>{item.social}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
