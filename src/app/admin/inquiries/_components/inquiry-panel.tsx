"use client";

import { useState } from "react";
import { type Inquiry } from "../page";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  EnvelopeIcon,
  PhoneIcon,
  HouseIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react";
import { updateInquiryStatus } from "@/actions/inquiries";
import { showCustomToast } from "@/components/customToast";
import Link from "next/link";
import AnimatedButton from "@/components/ui/animated-button";

type Props = {
  inquiry: Inquiry;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onStatusUpdateAction: (id: number, status: Inquiry["status"]) => void;
};

const statusStyles: Record<string, string> = {
  new: "bg-purple-60/10 text-purple-60",
  read: "bg-green-500/10 text-green-400",
  archived: "bg-border text-sub-foreground",
};

export default function InquiryPanel({
  inquiry,
  open,
  onOpenChangeAction,
  onStatusUpdateAction,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(status: Inquiry["status"]) {
    setIsUpdating(true);
    const result = await updateInquiryStatus(inquiry.id, status);
    setIsUpdating(false);

    if (result?.error) {
      showCustomToast.error("Failed to update status.");
      return;
    }

    onStatusUpdateAction(inquiry.id, status);
    showCustomToast.success(`Marked as ${status}.`);
  }

  const handleRespond = () => {
    const subject = encodeURIComponent(
      inquiry.type === "property" && inquiry.Property?.[0]
        ? `Re: Your inquiry about ${inquiry.Property[0].name}`
        : "Re: Your message to Estatein",
    );
    const body = encodeURIComponent(
      `Hi ${inquiry.firstName},\n\nThank you for reaching out to Estatein.\n\n`,
    );
    window.open(`mailto:${inquiry.email}?subject=${subject}&body=${body}`);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChangeAction} direction="right">
      <DrawerContent className="border-border fixed inset-y-0 right-0 mt-0 flex h-full w-full max-w-md flex-col rounded-none">
        <DrawerHeader className="border-border border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <DrawerTitle className="text-foreground font-semibold">
              Inquiry Details
            </DrawerTitle>
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${statusStyles[inquiry.status] ?? statusStyles.archived}`}
            >
              {inquiry.status}
            </span>
          </div>
        </DrawerHeader>

        {/* Content */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {/* Contact Info */}
          <div className="border-border bg-sub-background space-y-3 rounded-xl border p-4">
            <h3 className="text-sub-foreground text-xs font-semibold tracking-widest uppercase">
              Contact Information
            </h3>
            <p className="text-foreground text-body">
              {inquiry.firstName} {inquiry.lastName}
            </p>
            <div className="flex items-center gap-2">
              <EnvelopeIcon
                aria-hidden
                className="text-sub-foreground size-4 shrink-0"
              />
              <p className="text-sub-foreground text-body">{inquiry.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon
                aria-hidden
                className="text-sub-foreground size-4 shrink-0"
              />
              <p className="text-sub-foreground text-body">{inquiry.phone}</p>
            </div>
          </div>

          {/* Property */}
          {inquiry.type === "property" && inquiry.Property?.[0] && (
            <div className="border-border bg-sub-background space-y-2 rounded-xl border p-4">
              <h3 className="text-sub-foreground text-xs font-semibold tracking-widest uppercase">
                Inquired Property
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HouseIcon
                    aria-hidden
                    className="text-sub-foreground size-4 shrink-0"
                  />
                  <div>
                    <p className="text-foreground text-body">
                      {inquiry.Property[0].name}
                    </p>
                    <p className="text-sub-foreground text-sm">
                      {inquiry.Property[0].location}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/properties/${inquiry.propertyId}/edit`}
                  className="text-purple-60 y hover:opacity-80"
                  aria-label="View property"
                >
                  <ArrowSquareOutIcon className="size-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Contact-specific fields */}
          {inquiry.type === "contact" &&
            (inquiry.inquiryType || inquiry.hearAboutUs) && (
              <div className="border-border bg-sub-background space-y-3 rounded-xl border p-4">
                <h3 className="text-sub-foreground text-xs font-semibold tracking-widest uppercase">
                  Additional Info
                </h3>
                {inquiry.inquiryType && (
                  <div>
                    <p className="text-sub-foreground text-xs">Inquiry Type</p>
                    <p className="text-foreground text-body">
                      {inquiry.inquiryType}
                    </p>
                  </div>
                )}
                {inquiry.hearAboutUs && (
                  <div>
                    <p className="text-sub-foreground text-xs">
                      How they heard about us
                    </p>
                    <p className="text-foreground text-body">
                      {inquiry.hearAboutUs}
                    </p>
                  </div>
                )}
              </div>
            )}

          {/* Message */}
          <div className="border-border bg-sub-background space-y-2 rounded-xl border p-4">
            <h3 className="text-sub-foreground text-xs font-semibold tracking-widest uppercase">
              Message
            </h3>
            <p className="text-foreground text-body leading-relaxed whitespace-pre-wrap">
              {inquiry.message}
            </p>
          </div>

          {/* Date */}
          <p className="text-sub-foreground text-xs">
            Submitted{" "}
            {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="border-border space-y-3 border-t p-5">
          <div className="flex gap-2">
            {inquiry.status !== "read" && (
              <AnimatedButton
                type="button"
                onClick={() => handleStatusChange("read")}
                disabled={isUpdating}
                className="border-border text-sub-foreground hover:text-foreground flex-1 rounded-lg border px-4 py-2.5 text-sm hover:bg-white/5 disabled:opacity-50"
              >
                Mark as Read
              </AnimatedButton>
            )}
            {inquiry.status !== "archived" && (
              <AnimatedButton
                type="button"
                onClick={() => handleStatusChange("archived")}
                disabled={isUpdating}
                className="border-border text-sub-foreground hover:text-foreground flex-1 rounded-lg border px-4 py-2.5 text-sm hover:bg-white/5 disabled:opacity-50"
              >
                Archive
              </AnimatedButton>
            )}
            {inquiry.status === "archived" && (
              <AnimatedButton
                type="button"
                onClick={() => handleStatusChange("new")}
                disabled={isUpdating}
                className="border-border text-sub-foreground hover:text-foreground flex-1 rounded-lg border px-4 py-2.5 text-sm hover:bg-white/5 disabled:opacity-50"
              >
                Unarchive
              </AnimatedButton>
            )}
          </div>

          <AnimatedButton
            type="button"
            onClick={handleRespond}
            className="bg-purple-60 hover:bg-purple-60/90 w-full rounded-lg px-4 py-2.5 text-sm text-white"
          >
            Respond via Email
          </AnimatedButton>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
