import {
  HouseLineIcon,
  CurrencyDollarIcon,
  BuildingsIcon,
  ChartLineUpIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
  YoutubeLogoIcon,
  StarIcon,
  MedalIcon,
  UsersThreeIcon,
  HandshakeIcon,
  TargetIcon,
  SealCheckIcon,
  WrenchIcon,
  ChartLineIcon,
  ShieldCheckIcon,
  TrendUpIcon,
  ChartPieSliceIcon,
  LightbulbIcon,
  SparkleIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  AtIcon,
} from "@phosphor-icons/react/dist/ssr";
import { type ClientFormData } from "@/schemas/contactSchema";
import { type InquiryFormData } from "@/schemas/inquirySchema";
import { PricingDetails } from "./types";

export const NavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

export const HeroStats = [
  { id: 1, value: "200+", label: "Happy Customers" },
  { id: 2, value: "10k+", label: "Properties for Clients" },
  { id: 3, value: "16+", label: "Years of Experience" },
];

export const FeatureCards = [
  {
    id: 1,
    icon: HouseLineIcon,
    href: "/properties",
    label: "Find Your Dream Home",
  },
  {
    id: 2,
    icon: CurrencyDollarIcon,
    href: "/services#unlock-property-value",
    label: "Unlock Property Value",
  },
  {
    id: 3,
    icon: BuildingsIcon,
    href: "/services#effortless-property-management",
    label: "Effortless Property Management",
  },
  {
    id: 4,
    icon: ChartLineUpIcon,
    href: "/services#smart-investments",
    label: "Smart Investments, Informed Decisions",
  },
];

// Helper function to generate pricing details
export const generatePricingDetails = (fees: {
  additionalFees: {
    propertyTransferTax: string;
    legalFees: string;
    homeInspection: string;
    propertyInsurance: string;
    mortgageFees: string;
  };
  monthlyCosts: {
    propertyTaxes: string;
    hoaFee: string;
  };
  totalInitialCosts: {
    listingPrice: string;
    additionalFeesTotal: string;
    downPayment: string;
    mortgageAmount: string;
  };
  monthlyExpenses: {
    propertyTaxes: string;
    hoaFee: string;
    mortgagePayment: string;
    propertyInsurance: string;
  };
}): PricingDetails => {
  return {
    additionalFees: [
      {
        id: 1,
        label: "Property Transfer Tax",
        amount: fees.additionalFees.propertyTransferTax,
        description: "Based on the sale price and local regulations",
      },
      {
        id: 2,
        label: "Legal Fees",
        amount: fees.additionalFees.legalFees,
        description:
          "Approximate cost for legal services, including title transfer",
      },
      {
        id: 3,
        label: "Home Inspection",
        amount: fees.additionalFees.homeInspection,
        description: "Recommended for due diligence",
      },
      {
        id: 4,
        label: "Property Insurance",
        amount: fees.additionalFees.propertyInsurance,
        description: "Annual cost for comprehensive property insurance",
      },
      {
        id: 5,
        label: "Mortgage Fees",
        amount: fees.additionalFees.mortgageFees,
        description:
          "If applicable, consult with your lender for specific details",
      },
    ],
    monthlyCosts: [
      {
        id: 1,
        label: "Property Taxes",
        amount: fees.monthlyCosts.propertyTaxes,
        description:
          "Approximate monthly property tax based on the sale price and local rates",
      },
      {
        id: 2,
        label: "Homeowners' Association Fee",
        amount: fees.monthlyCosts.hoaFee,
        description: "Monthly fee for common area maintenance and security",
      },
    ],
    totalInitialCosts: [
      {
        id: 1,
        label: "Listing Price",
        amount: fees.totalInitialCosts.listingPrice,
        description: "",
      },
      {
        id: 2,
        label: "Additional Fees",
        amount: fees.totalInitialCosts.additionalFeesTotal,
        description: "Property transfer tax, legal fees, inspection, insurance",
      },
      {
        id: 3,
        label: "Down Payment",
        amount: fees.totalInitialCosts.downPayment,
        description: "20%",
      },
      {
        id: 4,
        label: "Mortgage Amount",
        amount: fees.totalInitialCosts.mortgageAmount,
        description: "If applicable",
      },
    ],
    monthlyExpenses: [
      {
        id: 1,
        label: "Property Taxes",
        amount: fees.monthlyExpenses.propertyTaxes,
        description: "",
      },
      {
        id: 2,
        label: "Homeowners' Association Fee",
        amount: fees.monthlyExpenses.hoaFee,
        description: "",
      },
      {
        id: 3,
        label: "Mortgage Payment",
        amount: fees.monthlyExpenses.mortgagePayment,
        description: "If applicable",
      },
      {
        id: 4,
        label: "Property Insurance",
        amount: fees.monthlyExpenses.propertyInsurance,
        description: "Approximate monthly cost",
      },
    ],
  };
};

export const Properties = [
  {
    id: 1,
    name: "Sunset Villa",
    description:
      "Luxurious modern villa with stunning ocean views, featuring an infinity pool and spacious outdoor entertainment area. Perfect for families seeking coastal living.",
    image: "/assets/sunset-villa/Main.webp",
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Villa",
    price: "$2,850,000",
    priceValue: 2850000,
    location: "Malibu, California",
    propertySize: "325",
    buildYear: 2019,
    images: [
      "/assets/sunset-villa/Main.webp",
      "/assets/sunset-villa/Lounge.webp",
      "/assets/sunset-villa/Exterior.webp",
      "/assets/sunset-villa/Kitchen.webp",
      "/assets/sunset-villa/Bedroom.webp",
      "/assets/sunset-villa/Bathroom.webp",
    ],
    keyFeatures: [
      "Infinity pool with ocean views",
      "Spacious outdoor entertainment area",
      "Floor-to-ceiling windows throughout",
      "Master suite with private balcony",
      "Gourmet kitchen with premium appliances",
      "Three-car garage with storage",
    ],
    pricingDetails: generatePricingDetails({
      additionalFees: {
        propertyTransferTax: "$28,500",
        legalFees: "$3,500",
        homeInspection: "$600",
        propertyInsurance: "$3,200",
        mortgageFees: "Varies",
      },
      monthlyCosts: {
        propertyTaxes: "$2,375",
        hoaFee: "$450",
      },
      totalInitialCosts: {
        listingPrice: "$2,850,000",
        additionalFeesTotal: "$35,800",
        downPayment: "$570,000",
        mortgageAmount: "$2,280,000",
      },
      monthlyExpenses: {
        propertyTaxes: "$2,375",
        hoaFee: "$450",
        mortgagePayment: "$10,260",
        propertyInsurance: "$267",
      },
    }),
  },
  {
    id: 2,
    name: "Downtown Loft",
    description:
      "Contemporary urban loft in the heart of the city with floor-to-ceiling windows, exposed brick walls, and access to premium building amenities.",
    image: "/assets/downtown-loft/Main.webp",
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Condominium",
    price: "$725,000",
    priceValue: 725000,
    location: "New York, New York",
    propertySize: "111",
    buildYear: 2021,
    images: [
      "/assets/downtown-loft/Main.webp",
      "/assets/downtown-loft/Living-Room.webp",
      "/assets/downtown-loft/Open-Living.webp",
      "/assets/downtown-loft/Kitchen.webp",
      "/assets/downtown-loft/Bedroom-1.webp",
      "/assets/downtown-loft/Bedroom-2.webp",
      "/assets/downtown-loft/Bathroom.webp",
    ],
    keyFeatures: [
      "Floor-to-ceiling windows with city views",
      "Exposed brick walls and high ceilings",
      "Modern open-concept living space",
      "Building gym and rooftop terrace access",
      "Concierge service and secure parking",
      "Walking distance to subway and restaurants",
    ],
    pricingDetails: generatePricingDetails({
      additionalFees: {
        propertyTransferTax: "$7,250",
        legalFees: "$2,500",
        homeInspection: "$450",
        propertyInsurance: "$1,800",
        mortgageFees: "Varies",
      },
      monthlyCosts: {
        propertyTaxes: "$604",
        hoaFee: "$650",
      },
      totalInitialCosts: {
        listingPrice: "$725,000",
        additionalFeesTotal: "$12,000",
        downPayment: "$145,000",
        mortgageAmount: "$580,000",
      },
      monthlyExpenses: {
        propertyTaxes: "$604",
        hoaFee: "$650",
        mortgagePayment: "$2,610",
        propertyInsurance: "$150",
      },
    }),
  },
  {
    id: 3,
    name: "Garden Estate",
    description:
      "Elegant single-family home nestled in a quiet neighborhood, boasting a beautiful landscaped garden, chef's kitchen, and home office space.",
    image: "/assets/garden-estate/Main.webp",
    bedrooms: 5,
    bathrooms: 4,
    propertyType: "Family Home",
    price: "$1,450,000",
    priceValue: 1450000,
    location: "Portland, Oregon",
    propertySize: "390",
    buildYear: 2015,
    images: [
      "/assets/garden-estate/Main.webp",
      "/assets/garden-estate/Living-Room.webp",
      "/assets/garden-estate/Kitchen.webp",
      "/assets/garden-estate/Backyard.webp",
      "/assets/garden-estate/Bedroom.webp",
      "/assets/garden-estate/Bathroom.webp",
    ],
    keyFeatures: [
      "Beautifully landscaped garden with mature trees",
      "Chef's kitchen with professional-grade appliances",
      "Dedicated home office with built-in shelving",
      "Master suite with walk-in closet and ensuite",
      "Covered patio for year-round outdoor dining",
      "Two-car garage and ample driveway parking",
    ],
    pricingDetails: generatePricingDetails({
      additionalFees: {
        propertyTransferTax: "$14,500",
        legalFees: "$3,000",
        homeInspection: "$550",
        propertyInsurance: "$2,600",
        mortgageFees: "Varies",
      },
      monthlyCosts: {
        propertyTaxes: "$1,208",
        hoaFee: "$200",
      },
      totalInitialCosts: {
        listingPrice: "$1,450,000",
        additionalFeesTotal: "$20,650",
        downPayment: "$290,000",
        mortgageAmount: "$1,160,000",
      },
      monthlyExpenses: {
        propertyTaxes: "$1,208",
        hoaFee: "$200",
        mortgagePayment: "$5,220",
        propertyInsurance: "$217",
      },
    }),
  },
  {
    id: 4,
    name: "Beachfront Apartment",
    description:
      "Modern beachfront apartment with panoramic sea views, open-plan living, and direct beach access. Ideal for those who love the coastal lifestyle.",
    image: "/assets/beachfront-apartment/Main.webp",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Apartment",
    price: "$890,000",
    priceValue: 890000,
    location: "Miami, Florida",
    propertySize: "167",
    buildYear: 2020,
    images: [
      "/assets/beachfront-apartment/Main.webp",
      "/assets/beachfront-apartment/Living-Room.webp",
      "/assets/beachfront-apartment/Backyard.webp",
      "/assets/beachfront-apartment/Kitchen.webp",
      "/assets/beachfront-apartment/Bedroom.webp",
      "/assets/beachfront-apartment/Bathroom.webp",
    ],
    keyFeatures: [
      "Direct beach access from building",
      "Panoramic ocean views from every room",
      "Open-plan living and dining area",
      "Private balcony for outdoor relaxation",
      "Resort-style pool and fitness center",
      "Secure parking and 24/7 security",
    ],
    pricingDetails: generatePricingDetails({
      additionalFees: {
        propertyTransferTax: "$8,900",
        legalFees: "$2,800",
        homeInspection: "$500",
        propertyInsurance: "$2,100",
        mortgageFees: "Varies",
      },
      monthlyCosts: {
        propertyTaxes: "$742",
        hoaFee: "$550",
      },
      totalInitialCosts: {
        listingPrice: "$890,000",
        additionalFeesTotal: "$14,300",
        downPayment: "$178,000",
        mortgageAmount: "$712,000",
      },
      monthlyExpenses: {
        propertyTaxes: "$742",
        hoaFee: "$550",
        mortgagePayment: "$3,205",
        propertyInsurance: "$175",
      },
    }),
  },
  {
    id: 5,
    name: "Mountain Retreat",
    description:
      "Serene mountain cabin surrounded by nature, featuring rustic charm with modern amenities, fireplace, and expansive deck overlooking the valley.",
    image: "/assets/mountain-retreat/Main.webp",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Cabin",
    price: "$575,000",
    priceValue: 575000,
    location: "Aspen, Colorado",
    propertySize: "195",
    buildYear: 2010,
    images: [
      "/assets/mountain-retreat/Main.webp",
      "/assets/mountain-retreat/Lounge.webp",
      "/assets/mountain-retreat/Deck.webp",
      "/assets/mountain-retreat/Dining.webp",
      "/assets/mountain-retreat/Bedroom.webp",
      "/assets/mountain-retreat/Bathroom.webp",
    ],
    keyFeatures: [
      "Stone fireplace in living room",
      "Expansive deck with valley views",
      "Rustic wood beams and mountain charm",
      "Modern kitchen with stainless steel appliances",
      "Hot tub on private deck",
      "Minutes from ski slopes and hiking trails",
    ],
    pricingDetails: generatePricingDetails({
      additionalFees: {
        propertyTransferTax: "$5,750",
        legalFees: "$2,500",
        homeInspection: "$450",
        propertyInsurance: "$1,600",
        mortgageFees: "Varies",
      },
      monthlyCosts: {
        propertyTaxes: "$479",
        hoaFee: "$150",
      },
      totalInitialCosts: {
        listingPrice: "$575,000",
        additionalFeesTotal: "$10,300",
        downPayment: "$115,000",
        mortgageAmount: "$460,000",
      },
      monthlyExpenses: {
        propertyTaxes: "$479",
        hoaFee: "$150",
        mortgagePayment: "$2,070",
        propertyInsurance: "$133",
      },
    }),
  },
  {
    id: 6,
    name: "Metropolitan Penthouse",
    description:
      "Exclusive top-floor penthouse with 360-degree city views, private rooftop terrace, smart home technology, and designer finishes throughout.",
    image: "/assets/metropolitan-penthouse/Main.webp",
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Penthouse",
    price: "$3,200,000",
    priceValue: 3200000,
    location: "San Francisco, California",
    propertySize: "260",
    buildYear: 2022,
    images: [
      "/assets/metropolitan-penthouse/Main.webp",
      "/assets/metropolitan-penthouse/Living-Room.webp",
      "/assets/metropolitan-penthouse/Rooftop-Terrace.webp",
      "/assets/metropolitan-penthouse/Kitchen.webp",
      "/assets/metropolitan-penthouse/Dining.webp",
      "/assets/metropolitan-penthouse/Bedroom.webp",
      "/assets/metropolitan-penthouse/Bathroom.webp",
    ],
    keyFeatures: [
      "360-degree panoramic city views",
      "Private rooftop terrace with outdoor kitchen",
      "Smart home automation system",
      "Designer finishes and premium materials",
      "Wine cellar and wet bar",
      "Private elevator access and two parking spaces",
    ],
    pricingDetails: generatePricingDetails({
      additionalFees: {
        propertyTransferTax: "$32,000",
        legalFees: "$4,000",
        homeInspection: "$700",
        propertyInsurance: "$3,800",
        mortgageFees: "Varies",
      },
      monthlyCosts: {
        propertyTaxes: "$2,667",
        hoaFee: "$800",
      },
      totalInitialCosts: {
        listingPrice: "$3,200,000",
        additionalFeesTotal: "$40,500",
        downPayment: "$640,000",
        mortgageAmount: "$2,560,000",
      },
      monthlyExpenses: {
        propertyTaxes: "$2,667",
        hoaFee: "$800",
        mortgagePayment: "$11,525",
        propertyInsurance: "$317",
      },
    }),
  },
];

export const Testimonials = [
  {
    id: 1,
    rating: 5,
    title: "Beyond Our Expectations!",
    message:
      "Working with Estatein exceeded all our expectations. From the initial consultation to closing day, every detail was handled with care and precision. They found us the perfect family home within our budget and timeline. Their market knowledge is unmatched!",
    name: "Sarah Mitchell",
    location: "USA, Texas",
    avatar: "/assets/avatars/sarah-mitchell.webp",
  },
  {
    id: 2,
    rating: 4,
    title: "Seamless First-Time Experience",
    message:
      "As first-time homebuyers, we were nervous about the process. Estatein made everything so smooth and stress-free. They patiently answered all our questions and guided us every step of the way. We couldn't have asked for better support during this important milestone!",
    name: "David Chen",
    location: "USA, Washington",
    avatar: "/assets/avatars/david-chen.webp",
  },
  {
    id: 3,
    rating: 5,
    title: "Outstanding Market Insight",
    message:
      "Estatein's deep understanding of the local market helped us find an investment property with excellent potential. Their analytical approach and honest advice gave us confidence in our decision. The property has already appreciated significantly. Thank you for your expertise!",
    name: "Robert Anderson",
    location: "USA, Colorado",
    avatar: "/assets/avatars/robert-anderson.webp",
  },
  {
    id: 4,
    rating: 4,
    title: "Professional and Personable",
    message:
      "The Estatein team struck the perfect balance between professionalism and personal touch. They listened to our needs, showed us only properties that matched our criteria, and negotiated a fantastic deal on our behalf. We're thrilled with our new condo downtown!",
    name: "Jessica Rodriguez",
    location: "USA, Arizona",
    avatar: "/assets/avatars/jessica-rodriguez.webp",
  },
  {
    id: 5,
    rating: 5,
    title: "Sold Above Asking Price!",
    message:
      "We needed to sell our home quickly due to relocation. Estatein's marketing strategy was brilliant - professional photos, virtual tours, and targeted outreach. We received multiple offers within a week and sold above asking price. Absolutely phenomenal service!",
    name: "Patricia O'Brien",
    location: "USA, Oregon",
    avatar: "/assets/avatars/patricia-obrien.webp",
  },
  {
    id: 6,
    rating: 4,
    title: "Dedicated and Trustworthy",
    message:
      "After working with several agencies, Estatein stood out for their dedication and integrity. They never pushed us into anything and always had our best interests at heart. Their patience paid off when we found our dream retirement home. Forever grateful!",
    name: "Thomas Williams",
    location: "USA, North Carolina",
    avatar: "/assets/avatars/thomas-williams.webp",
  },
];

export const FAQs = [
  {
    id: 1,
    question: "How do I search for properties on Estatein?",
    answer:
      "Learn how to use our user-friendly search tools to find properties that match your criteria. Our advanced search allows you to filter by location, price range, property type, number of bedrooms, amenities, and more. You can save your searches and receive alerts when new properties matching your preferences become available.",
  },
  {
    id: 2,
    question: "What documents do I need to sell my property through Estatein?",
    answer:
      "Find out about the necessary documentation for listing your property with us. You'll typically need proof of ownership (deed), recent mortgage statement, property tax records, HOA documents (if applicable), and any warranties or manuals for appliances and systems. We'll provide a complete checklist during our initial consultation.",
  },
  {
    id: 3,
    question: "How can I contact an Estatein agent?",
    answer:
      "Discover the different ways you can get in touch with our experienced agents. You can reach us by phone, email, contact form on our website, or visit our office during business hours. We also offer virtual consultations via video call for your convenience.",
  },
  {
    id: 4,
    question: "What areas does Estatein serve?",
    answer:
      "We serve multiple communities and surrounding areas with comprehensive real estate services. Our team has deep knowledge of local neighborhoods, market trends, school districts, and property values across the region. We can help you find the perfect location that fits your lifestyle and needs.",
  },
  {
    id: 5,
    question: "What is Estatein's commission structure?",
    answer:
      "Our commission structure is competitive and transparent. The exact rate depends on factors like property type, price point, and services required. We discuss all fees upfront during our initial consultation with no hidden costs or surprises, ensuring you understand all costs before moving forward.",
  },
  {
    id: 6,
    question: "Does Estatein offer virtual property tours?",
    answer:
      "Yes! We offer comprehensive virtual tours for most of our listings, including 3D walkthroughs, video tours, and live virtual showings with our agents. This allows you to explore properties from anywhere and narrow down your choices before scheduling in-person visits.",
  },
  {
    id: 7,
    question: "How long has Estatein been in business?",
    answer:
      "Estatein has been serving the community for many years, building a reputation for integrity, expertise, and exceptional customer service. Our experienced team has helped thousands of clients successfully buy, sell, and rent properties throughout our service area.",
  },
  {
    id: 8,
    question: "What makes Estatein different from other real estate agencies?",
    answer:
      "We pride ourselves on personalized service, deep market knowledge, innovative marketing strategies, and a client-first approach. Our team uses cutting-edge technology combined with traditional relationship-building to deliver results. We're available when you need us and committed to making your real estate journey as smooth as possible.",
  },
];

export const FooterItems = [
  {
    id: 1,
    title: "Home",
    links: [
      { id: 1, name: "Hero Section", href: "/#hero" },
      { id: 2, name: "Features", href: "/#features" },
      { id: 3, name: "Testimonials", href: "/#testimonials" },
      { id: 4, name: "FAQ's", href: "/#faqs" },
    ],
  },
  {
    id: 2,
    title: "About Us",
    links: [
      { id: 1, name: "Our Story", href: "/about#our-story" },
      { id: 2, name: "Our Values", href: "/about#our-values" },
      { id: 3, name: "Our Achievements", href: "/about#our-achievements" },
      { id: 4, name: "How It Works", href: "/about#how-it-works" },
      { id: 5, name: "Our Team", href: "/about#our-team" },
      { id: 6, name: "Our Clients", href: "/about#our-clients" },
    ],
  },
  {
    id: 3,
    title: "Properties",
    links: [
      { id: 1, name: "Browse Properties", href: "/properties#property-list" },
    ],
  },
  {
    id: 4,
    title: "Services",
    links: [
      { id: 1, name: "Valuation Mastery", href: "/services#valuation-mastery" },
      {
        id: 2,
        name: "Strategic Marketing",
        href: "/services#strategic-marketing",
      },
      {
        id: 3,
        name: "Negotiation Wizardry",
        href: "/services#negotiation-wizardry",
      },
    ],
  },
  {
    id: 5,
    title: "Contact Us",
    links: [
      { id: 1, name: "Contact Form", href: "/contact#contact-form" },
      { id: 2, name: "Our Offices", href: "/contact#offices" },
    ],
  },
];

export const SocialIcons = [
  {
    id: 1,
    icon: FacebookLogoIcon,
    ariaLabel: "Visit our Facebook page",
  },
  {
    id: 2,
    icon: LinkedinLogoIcon,
    ariaLabel: "Visit our Linkedin profile",
  },
  {
    id: 3,
    icon: TwitterLogoIcon,
    ariaLabel: "Visit our Twitter profile",
  },
  {
    id: 4,
    icon: YoutubeLogoIcon,
    ariaLabel: "Visit our YouTube channel",
  },
];

export const OurValuesCard = [
  {
    id: 1,
    icon: StarIcon,
    title: "Trust",
    description:
      "Trust is the cornerstone of every successful real estate transaction.",
  },
  {
    id: 2,
    icon: MedalIcon,
    title: "Excellence",
    description:
      "We set the bar high for ourselves. From the properties we list to the services we provide.",
  },
  {
    id: 3,
    icon: UsersThreeIcon,
    title: "Client-Centric",
    description:
      "Your dreams and needs are at the center of our universe. We listen, understand.",
  },
  {
    id: 4,
    icon: HandshakeIcon,
    title: "Commitment",
    description:
      "We are dedicated to providing you with the highest level of service, professionalism, and support.",
  },
];

export const OurAchievementsCard = [
  {
    id: 1,
    title: "3+ Years of Excellence",
    description:
      "With over 3 years in the industry, we've amassed a wealth of knowledge and experience.",
  },
  {
    id: 2,
    title: "Happy Clients",
    description:
      "Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.",
  },
  {
    id: 3,
    title: "Industry Recognition",
    description:
      "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
  },
];

export const HowItWorksCard = [
  {
    id: 1,
    title: "Discover a World of Possibilities",
    description:
      "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location, type, size, and budget.",
  },
  {
    id: 2,
    title: "Narrowing Down Your Choices",
    description:
      "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
  },
  {
    id: 3,
    title: "Personalized Guidance",
    description:
      "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away.",
  },
  {
    id: 4,
    title: "See It for Yourself",
    description:
      "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
  },
  {
    id: 5,
    title: "Making Informed Decisions",
    description:
      "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed and confident in your choice.",
  },
  {
    id: 6,
    title: "Getting the Best Deal",
    description:
      "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms.",
  },
];

export const OurTeamCard = [
  {
    id: 1,
    imageUrl: "/assets/avatars/max-mitchell.webp",
    name: "Max Mitchell",
    title: "Founder",
  },
  {
    id: 2,
    imageUrl: "/assets/avatars/sarah-johnson.webp",
    name: "Sarah Johnson",
    title: "Chief Real Estate Officer",
  },
  {
    id: 3,
    imageUrl: "/assets/avatars/david-brown.webp",
    name: "David Brown",
    title: "Head of Property Management",
  },
  {
    id: 4,
    imageUrl: "/assets/avatars/victoria-turner.webp",
    name: "Victoria Turner",
    title: "Legal Counsel",
  },
];

export const OurClientsCard = [
  {
    id: 1,
    year: "Since 2015",
    brandName: "Thompson & Associates",
    domain: "Commercial Real Estate",
    category: "Office Space Leasing",
    testimonial:
      "Estatein transformed our portfolio strategy with market insights that resulted in acquisitions exceeding our expectations.",
  },
  {
    id: 2,
    year: "Since 2020",
    brandName: "Riverside Development Group",
    domain: "Real Estate Development",
    category: "Mixed-Use Development",
    testimonial:
      "Their team navigated complex zoning requirements and identified an exceptional waterfront property for our project.",
  },
  {
    id: 3,
    year: "Since 2021",
    brandName: "Nexus Retail Partners",
    domain: "Commercial Real Estate",
    category: "Shopping Centers",
    testimonial:
      "The strategic locations sourced for our retail expansion have driven significant foot traffic and growth.",
  },
  {
    id: 4,
    year: "Since 2017",
    brandName: "Heritage Property Investors",
    domain: "Real Estate Investment",
    category: "Historic Renovation",
    testimonial:
      "Estatein helped us discover hidden gems in the historic district with valuable preservation incentive knowledge.",
  },
  {
    id: 5,
    year: "Since 2022",
    brandName: "Summit Tech Campus",
    domain: "Industrial Real Estate",
    category: "Technology Parks",
    testimonial:
      "They delivered beyond expectations, securing a location that perfectly aligns with our vision for collaborative workspace.",
  },
  {
    id: 6,
    year: "Since 2019",
    brandName: "Coastal Hospitality Group",
    domain: "Commercial Real Estate",
    category: "Hotel & Resort",
    testimonial:
      "Their hospitality real estate expertise identified prime locations and negotiated favorable terms for our expansion.",
  },
  {
    id: 7,
    year: "Since 2016",
    brandName: "Metro Health Systems",
    domain: "Commercial Real Estate",
    category: "Medical Facilities",
    testimonial:
      "They found strategically located properties that improved patient accessibility while meeting all regulatory standards.",
  },
  {
    id: 8,
    year: "Since 2023",
    brandName: "Urban Living Co.",
    domain: "Residential Real Estate",
    category: "Multi-Family Complexes",
    testimonial:
      "Their market analysis and site selection expertise consistently deliver properties with strong investment potential.",
  },
];

export const ValuationMasteryCards = [
  {
    id: 1,
    icon: ChartLineUpIcon,
    title: "Valuation Mastery",
    description:
      "Discover the true worth of your property with our expert valuation services.",
  },
  {
    id: 2,
    icon: TargetIcon,
    title: "Strategic Marketing",
    description:
      "Selling a property requires more than just a listing; it demands a strategic marketing.",
  },
  {
    id: 3,
    icon: HandshakeIcon,
    title: "Negotiation Wizardry",
    description:
      "Negotiating the best deal is an art, and our negotiation experts are masters of it.",
  },
  {
    id: 4,
    icon: SealCheckIcon,
    title: "Closing Success",
    description:
      "A successful sale is not complete until the closing. We guide you through the intricate closing process.",
  },
];

export const StrategicMarketingCards = [
  {
    id: 1,
    icon: UsersThreeIcon,
    title: "Tenant Harmony",
    description:
      "Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.",
  },
  {
    id: 2,
    icon: WrenchIcon,
    title: "Maintenance Ease",
    description:
      "Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.",
  },
  {
    id: 3,
    icon: ChartLineIcon,
    title: "Financial Peace of Mind",
    description:
      "Managing property finances can be complex. Our financial experts take care of rent collection",
  },
  {
    id: 4,
    icon: ShieldCheckIcon,
    title: "Legal Guardian",
    description:
      "Stay compliant with property laws and regulations effortlessly.",
  },
];

export const NegotiationWizardryCards = [
  {
    id: 1,
    icon: TrendUpIcon,
    title: "Market Insight",
    description:
      "Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions",
  },
  {
    id: 2,
    icon: ChartPieSliceIcon,
    title: "ROI Assessment",
    description:
      "Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments",
  },
  {
    id: 3,
    icon: LightbulbIcon,
    title: "Customized Strategies",
    description:
      "Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs",
  },
  {
    id: 4,
    icon: SparkleIcon,
    title: "Diversification Mastery",
    description:
      "Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations",
  },
];

export const ContactInfoCards = [
  {
    id: 1,
    icon: EnvelopeSimpleIcon,
    label: "info@estatein.com",
  },
  {
    id: 2,
    icon: PhoneIcon,
    label: "+1 (123) 456-7890",
  },
  {
    id: 3,
    icon: MapPinIcon,
    label: "Main Headquarters",
  },
  {
    id: 4,
    icon: AtIcon,
    label: [
      {
        social: "Instagram",
      },
      {
        social: "Linkedin",
      },
      {
        social: "Facebook",
      },
    ],
  },
];

type MappedFieldName = Exclude<keyof ClientFormData, "terms">;

type ContactFormField = {
  id: number;
  name: MappedFieldName;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
};

export const ContactFormFields: ContactFormField[] = [
  {
    id: 1,
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter First Name",
    required: true,
  },
  {
    id: 2,
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter Last Name",
    required: true,
  },
  {
    id: 3,
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your Email",
    required: true,
  },
  {
    id: 4,
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter Phone Number",
    required: true,
  },
  {
    id: 5,
    name: "inquiryType",
    label: "Inquiry Type",
    type: "select",
    placeholder: "Select Inquiry Type",
    required: true,
    options: [
      { value: "general", label: "General Inquiry" },
      { value: "property", label: "Property Inquiry" },
      { value: "investment", label: "Investment Opportunity" },
      { value: "partnership", label: "Partnership" },
    ],
  },
  {
    id: 6,
    name: "howDidYouHear",
    label: "How Did You Hear About Us?",
    type: "select",
    placeholder: "Select an option",
    required: false,
    options: [
      { value: "search", label: "Search Engine" },
      { value: "social", label: "Social Media" },
      { value: "referral", label: "Referral" },
      { value: "advertisement", label: "Advertisement" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: 7,
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter your Message here..",
    required: true,
    rows: 6,
  },
];

export const OurOfficesCards = [
  {
    id: 1,
    officeName: "Main Headquarters",
    address: "123 Estatein Plaza, City Center, Metropolis",
    description:
      "Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.",
    email: "info@estatein.com",
    phone: "+1 (123) 456-7890",
    location: "Metropolis",
  },
  {
    id: 2,
    officeName: "Regional Offices",
    address: "456 Urban Avenue, Downtown District, Metropolis",
    description:
      "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
    email: "info@estatein.com",
    phone: "+1 (123) 456-7890",
    location: "Metropolis",
  },
];
type InquiryMappedFieldName = Exclude<keyof InquiryFormData, "terms">;

type InquiryFormField = {
  id: number;
  name: InquiryMappedFieldName;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  readOnly?: boolean;
  rows?: number;
};

export const InquiryFormFields: InquiryFormField[] = [
  {
    id: 1,
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter First Name",
    required: true,
  },
  {
    id: 2,
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter Last Name",
    required: true,
  },
  {
    id: 3,
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your Email",
    required: true,
  },
  {
    id: 4,
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter Phone Number",
    required: true,
  },
  {
    id: 5,
    name: "selectedProperty",
    label: "Selected Property",
    type: "text",
    placeholder: "Enter your Message here..",
    required: true,
    readOnly: true,
  },
  {
    id: 6,
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Enter your Message here..",
    required: true,
    rows: 6,
  },
];
