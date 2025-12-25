import {
  HouseLineIcon,
  CurrencyDollarIcon,
  BuildingsIcon,
  ChartLineUpIcon,
} from "@phosphor-icons/react/dist/ssr";

export const NavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
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
      { id: 1, name: "Hero Section", url: "/#hero" },
      { id: 2, name: "Features", url: "/#features" },
      { id: 3, name: "Testimonials", url: "/#testimonials" },
      { id: 4, name: "FAQ's", url: "/#faq" },
    ],
  },
  {
    id: 2,
    title: "About Us",
    links: [
      { id: 1, name: "Our Story", url: "/about#ourstory" },
      { id: 2, name: "Our Works", url: "/about#ourworks" },
      { id: 3, name: "How It Works", url: "/about#howitworks" },
      { id: 4, name: "Our Team", url: "/about#ourteam" },
      { id: 5, name: "Our Clients", url: "/about#ourclients" },
    ],
  },
  {
    id: 3,
    title: "Properties",
    links: [
      { id: 1, name: "Portfolio", url: "/properties#portfolio" },
      { id: 2, name: "Categories", url: "/properties#categories" },
    ],
  },
  {
    id: 4,
    title: "Services",
    links: [
      { id: 1, name: "Valuation Mastery", url: "/services#valuation" },
      { id: 2, name: "Strategic Marketing", url: "/services#marketing" },
      { id: 3, name: "Negotiation Wizardry", url: "/services#negotiation" },
      { id: 4, name: "Closing Success", url: "/services#closing" },
      {
        id: 5,
        name: "Property Management",
        url: "/services#property-management",
      },
    ],
  },
  {
    id: 5,
    title: "Contact Us",
    links: [
      { id: 1, name: "Contact Form", url: "/contact#contactform" },
      { id: 2, name: "Our Offices", url: "/contact#offices" },
    ],
  },
];
