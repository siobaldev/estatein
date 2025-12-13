import {
  MapPinHouse,
  CircleDollarSign,
  Building2,
  ChartNoAxesCombined,
} from "lucide-react";

export const NavItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
];

export const HeroStats = [
  { id: 1, value: "200+", label: "Happy Customers" },
  { id: 2, value: "10k+", label: "Properties for Clients" },
  { id: 3, value: "16+", label: "Years of Experience" },
];

export const FeatureCards = [
  { id: 1, icon: MapPinHouse, label: "Find Your Dream Home" },
  { id: 2, icon: CircleDollarSign, label: "Unlock Property Value" },
  { id: 3, icon: Building2, label: "Effortless Property Management" },
  {
    id: 4,
    icon: ChartNoAxesCombined,
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
