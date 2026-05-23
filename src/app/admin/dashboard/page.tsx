import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  BuildingOfficeIcon,
  ChatCenteredIcon,
  StarIcon,
  BellRingingIcon,
} from "@phosphor-icons/react/dist/ssr";
import { formatCurrency } from "@/lib/utils";
import AnimatedLink from "@/components/ui/animated-link";
import AddPropertyButton from "../_components/add-property-button";
import { timeAgo } from "@/lib/utils";

type RecentProperty = {
  id: number;
  name: string;
  location: string;
  price: number;
  propertyType: string;
  isFeatured: boolean;
  createdAt: string;
};

type RecentInquiry = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: "contact" | "property";
  status: "new" | "read" | "archived";
  createdAt: string;
  Property: { name: string }[] | null;
};

// Defines CSS classes for styling status badges in the Recent Inquiries list
const statusBadgeStyles: Record<string, string> = {
  new: "bg-purple-60/10 text-purple-60",
  read: "bg-green-500/10 text-green-400",
  archived: "bg-border text-sub-foreground",
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const [
    { count: totalProperties },
    { count: totalInquiries },
    { count: newInquiries },
    { count: featuredProperties },
    { data: recentProperties },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from("Property").select("*", { count: "exact", head: true }),
    supabase.from("Inquiry").select("*", { count: "exact", head: true }),
    supabase
      .from("Inquiry")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("Property")
      .select("*", { count: "exact", head: true })
      .eq("isFeatured", true),
    supabase
      .from("Property")
      .select("id, name, location, price, propertyType, isFeatured, createdAt")
      .order("createdAt", { ascending: false })
      .limit(5),
    supabase
      .from("Inquiry")
      .select(
        "id, firstName, lastName, email, type, status, createdAt, Property(name)",
      )
      .order("createdAt", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      label: "Total Properties",
      value: totalProperties ?? 0,
      icon: BuildingOfficeIcon,
      href: "/admin/properties",
    },
    {
      label: "Total Inquiries",
      value: totalInquiries ?? 0,
      icon: ChatCenteredIcon,
      href: "/admin/inquiries",
    },
    {
      label: "New Inquiries",
      value: newInquiries ?? 0,
      icon: BellRingingIcon,
      href: "/admin/inquiries",
    },
    {
      label: "Featured Properties",
      value: featuredProperties ?? 0,
      icon: StarIcon,
      href: "/admin/properties",
    },
  ];

  return (
    <main className="wrapper my-10 space-y-8">
      {/* Header */}
      <div className="items-center justify-between gap-4 space-y-4 md:flex">
        <div>
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
            Dashboard
          </h1>
          <p className="text-sub-foreground text-body mt-1">
            Welcome back. Here&apos;s an overview of your platform.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <AddPropertyButton />
          <AnimatedLink
            href="/admin/inquiries"
            className="ring-border hover:ring-purple-60 text-sub-foreground hover:text-foreground text-body rounded-lg px-4 py-3 ring"
          >
            View Inquiries
          </AnimatedLink>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <div className="border-border bg-sub-background hover:border-purple-60/40 flex items-center gap-4 rounded-xl border p-5 transition-colors select-none">
              <div className="bg-purple-60/10 rounded-lg p-3">
                <Icon aria-hidden className="text-purple-60 size-5" />
              </div>
              <div>
                <p className="text-sub-foreground text-body font-medium">
                  {label}
                </p>
                <p className="text-foreground text-2xl font-semibold">
                  {value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Properties */}
        <div className="border-border bg-sub-background rounded-xl border">
          <div className="border-border text-body flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-sub-foreground">Recent Properties</h2>
            <Link
              href="/admin/properties"
              className="text-purple-60 hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="divide-border divide-y">
            {(recentProperties as RecentProperty[])?.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between px-5 py-3 select-none"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground text-body">{property.name}</p>
                    {property.isFeatured && (
                      <StarIcon
                        aria-hidden
                        className="text-purple-60 size-3 shrink-0"
                        weight="fill"
                      />
                    )}
                  </div>
                  <p className="text-sub-foreground text-sm">
                    {property.location} · {property.propertyType}
                  </p>
                </div>
                <div className="ml-4 shrink-0 text-right">
                  <p className="text-foreground text-body font-semibold">
                    {formatCurrency(property.price)}
                  </p>
                  <p className="text-sub-foreground text-sm">
                    {timeAgo(property.createdAt)}
                  </p>
                </div>
              </div>
            ))}
            {!recentProperties?.length && (
              <p className="text-sub-foreground text-body px-5 py-8 text-center">
                No properties yet.
              </p>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="border-border bg-sub-background rounded-xl border">
          <div className="border-border text-body flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-sub-foreground">Recent Inquiries</h2>
            <AnimatedLink
              href="/admin/inquiries"
              className="text-purple-60 hover:underline"
            >
              View all →
            </AnimatedLink>
          </div>
          <div className="divide-border divide-y">
            {(recentInquiries as RecentInquiry[])?.map((inquiry) => (
              <div
                key={inquiry.id}
                className="flex items-center justify-between px-5 py-3 select-none"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground text-body">
                      {inquiry.firstName} {inquiry.lastName}
                    </p>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${statusBadgeStyles[inquiry.status] ?? statusBadgeStyles.archived}`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-sub-foreground truncate text-sm">
                    {inquiry.type === "property" && inquiry.Property?.[0]
                      ? inquiry.Property[0].name
                      : "General inquiry"}
                  </p>
                </div>
                <div className="ml-4 shrink-0 text-right">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold uppercase ${
                      inquiry.type === "property"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {inquiry.type}
                  </span>
                  <p className="text-sub-foreground mt-0.5 text-sm">
                    {timeAgo(inquiry.createdAt)}
                  </p>
                </div>
              </div>
            ))}
            {!recentInquiries?.length && (
              <p className="text-sub-foreground text-body px-5 py-8 text-center">
                No inquiries yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
