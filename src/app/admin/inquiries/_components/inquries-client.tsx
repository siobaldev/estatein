"use client";

import { useState } from "react";
import { type Inquiry } from "../page";
import InquiryPanel from "./inquiry-panel";
import { TrashIcon, EyeIcon } from "@phosphor-icons/react";
import { deleteInquiry } from "@/actions/inquiries";
import { showCustomToast } from "@/components/customToast";
import { timeAgo } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedButton from "@/components/ui/animated-button";

type FilterTab = "all" | "contact" | "property" | "new" | "archived";

const TABS: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Contact", value: "contact" },
  { label: "Property", value: "property" },
  { label: "New", value: "new" },
  { label: "Archived", value: "archived" },
];

const statusStyles: Record<string, string> = {
  new: "bg-purple-60/10 text-purple-60",
  read: "bg-green-500/10 text-green-400",
  archived: "bg-border text-sub-foreground",
};

const typeStyles: Record<string, string> = {
  property: "bg-blue-500/10 text-blue-400",
  contact: "bg-green-500/10 text-green-400",
};

type Props = {
  inquiries: Inquiry[];
};

export default function InquiriesClient({ inquiries }: Props) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [localInquiries, setLocalInquiries] = useState<Inquiry[]>(inquiries);

  const filtered = localInquiries.filter((inq) => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return inq.status === "new";
    if (activeTab === "archived") return inq.status === "archived";
    return inq.type === activeTab;
  });

  function handleStatusUpdate(id: number, status: Inquiry["status"]) {
    setLocalInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
    }
  }

  const handleDelete = async (id: number) => {
    const result = await deleteInquiry(id);
    if (result?.error) {
      showCustomToast.error("Failed to delete inquiry.");
      return;
    }
    setLocalInquiries((prev) => prev.filter((inq) => inq.id !== id));
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
    showCustomToast.success("Inquiry deleted.");
  };

  return (
    <>
      {/* Mobile Select */}
      <div className="sm:hidden">
        <Select
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as FilterTab)}
        >
          <SelectTrigger className="border-border text-body data-placeholder:text-sub-foreground bg-sub-background focus-visible:ring-purple-60 w-full rounded px-4 py-6 focus-visible:shadow-none focus-visible:ring-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            className="border-border bg-background"
            position={"popper"}
          >
            {TABS.map((tab) => {
              const count =
                tab.value === "all"
                  ? localInquiries.length
                  : localInquiries.filter((inq) =>
                      tab.value === "new" || tab.value === "archived"
                        ? inq.status === tab.value
                        : inq.type === tab.value,
                    ).length;

              return (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label} ({count})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Filter Tabs */}
      <div className="border-border hidden gap-1 overflow-x-auto rounded-xl border p-1 sm:flex">
        {TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? localInquiries.length
              : localInquiries.filter((inq) =>
                  tab.value === "new" || tab.value === "archived"
                    ? inq.status === tab.value
                    : inq.type === tab.value,
                ).length;

          return (
            <AnimatedButton
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm ${
                activeTab === tab.value
                  ? "bg-purple-60 text-white"
                  : "text-sub-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {tab.label}
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                  activeTab === tab.value
                    ? "bg-white/20 text-white"
                    : "bg-border text-sub-foreground"
                }`}
              >
                {count}
              </span>
            </AnimatedButton>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="border-border bg-sub-background hidden overflow-hidden rounded-xl border lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-border border-b">
              {["Name", "Contact", "Type", "Property", "Status", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="text-sub-foreground px-5 py-3 text-left text-base font-semibold"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inq) => (
              <tr
                key={inq.id}
                className="border-border hover:bg-background border-b transition-colors last:border-0"
              >
                {/* Name + Date */}
                <td className="px-5 py-4">
                  <p className="text-foreground text-body font-medium">
                    {inq.firstName} {inq.lastName}
                  </p>
                  <p className="text-sub-foreground text-sm">
                    {timeAgo(inq.createdAt)}
                  </p>
                </td>

                {/* Email + Phone */}
                <td className="px-5 py-4">
                  <p className="text-sub-foreground text-body">{inq.email}</p>
                  <p className="text-sub-foreground text-sm">{inq.phone}</p>
                </td>

                {/* Type */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold uppercase ${typeStyles[inq.type]}`}
                  >
                    {inq.type}
                  </span>
                </td>

                {/* Property */}
                <td className="text-sub-foreground text-body px-5 py-4">
                  {inq.Property?.[0]?.name ?? "—"}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold uppercase ${statusStyles[inq.status] ?? statusStyles.archived}`}
                  >
                    {inq.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(inq)}
                      aria-label="View inquiry"
                      className="bg-sub-background border-border hover:border-purple-60 text-foreground rounded-lg border p-3 transition-colors"
                    >
                      <EyeIcon aria-hidden className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      aria-label="Delete inquiry"
                      className="bg-sub-background border-border text-foreground rounded-lg border p-3 transition-colors hover:border-red-500/40 hover:text-red-400"
                    >
                      <TrashIcon aria-hidden className="size-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-sub-foreground text-body py-12 text-center">
            No inquiries found.
          </p>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {filtered.map((inq) => (
          <div
            key={inq.id}
            className="border-border rounded-xl border p-5 select-none"
          >
            {/* Type + Status */}
            <div className="flex items-center justify-between">
              <p className="text-sub-foreground text-body">
                {inq.type === "property" && inq.Property?.[0]
                  ? inq.Property[0].name
                  : "General Inquiry"}
              </p>
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${typeStyles[inq.type]}`}
              >
                {inq.type}
              </span>
            </div>

            {/* Status + Date */}
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sub-foreground text-body">Status</p>
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${statusStyles[inq.status] ?? statusStyles.archived}`}
              >
                {inq.status}
              </span>
            </div>

            {/* Divider */}
            <hr className="border-border my-3 h-px" />

            {/* Name, Email, Phone */}
            <div className="flex items-center justify-between">
              <p className="text-foreground text-body">
                {inq.firstName} {inq.lastName}
              </p>
              <p className="text-sub-foreground text-sm">
                {timeAgo(inq.createdAt)}
              </p>
            </div>
            <p className="text-sub-foreground text-body">{inq.email}</p>
            <p className="text-sub-foreground text-body">{inq.phone}</p>

            {/* Message */}
            <div className="bg-sub-background mt-4 rounded-lg p-6">
              <p className="text-sub-foreground mb-2 text-xs font-semibold tracking-widest uppercase">
                Message
              </p>
              <p className="text-foreground line-clamp-2 text-sm">
                {inq.message}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex items-center justify-end gap-x-2">
              <AnimatedButton
                type="button"
                onClick={() => setSelectedInquiry(inq)}
                aria-label="View inquiry"
                className="bg-sub-background border-border hover:border-purple-60 text-foreground rounded-lg border p-3 transition-colors"
              >
                <EyeIcon aria-hidden className="size-5" />
              </AnimatedButton>
              <AnimatedButton
                type="button"
                onClick={() => handleDelete(inq.id)}
                aria-label="Delete inquiry"
                className="bg-sub-background border-border text-foreground rounded-lg border p-3 transition-colors hover:border-red-500/40 hover:text-red-400"
              >
                <TrashIcon aria-hidden className="size-5" />
              </AnimatedButton>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sub-foreground text-body py-12 text-center">
            No inquiries found.
          </p>
        )}
      </div>

      {/* Detailed Inquiry Drawer */}
      {selectedInquiry && (
        <InquiryPanel
          inquiry={selectedInquiry}
          open={!!selectedInquiry}
          onOpenChangeAction={(open) => {
            if (!open) setSelectedInquiry(null);
          }}
          onStatusUpdateAction={handleStatusUpdate}
        />
      )}
    </>
  );
}
