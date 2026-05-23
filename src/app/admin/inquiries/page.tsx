import { createSupabaseServerClient } from "@/lib/supabase/server";
import InquiriesClient from "./_components/inquries-client";

export type Inquiry = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  type: "contact" | "property";
  status: "new" | "read" | "archived";
  inquiryType: string | null;
  hearAboutUs: string | null;
  propertyId: number | null;
  createdAt: string;
  Property: { id: number; name: string; location: string }[] | null;
};

export default async function InquiriesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: inquiries } = await supabase
    .from("Inquiry")
    .select(
      "id, firstName, lastName, email, phone, message, type, status, inquiryType, hearAboutUs, propertyId, createdAt, Property(id, name, location)",
    )
    .order("createdAt", { ascending: false });

  return (
    <main className="wrapper my-10 space-y-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
          Inquiries
        </h1>
        <p className="text-sub-foreground text-body mt-1">
          Manage and respond to contact and property inquiries.
        </p>
      </div>
      <InquiriesClient inquiries={(inquiries as Inquiry[]) ?? []} />
    </main>
  );
}
