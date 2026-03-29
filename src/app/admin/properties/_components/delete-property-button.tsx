"use client";

import { useState } from "react";
import { TrashIcon, WarningIcon } from "@phosphor-icons/react";
import AnimatedButton from "@/components/ui/animated-button";
import { showCustomToast } from "@/components/customToast";
import { deleteProperty } from "@/actions/properties";
import { useTransition } from "react";

interface DeletePropertyButtonProps {
  id: number;
  name: string;
}

export default function DeletePropertyButton({
  id,
  name,
}: DeletePropertyButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    const loadingId = showCustomToast.loading("Deleting Property...");

    startTransition(async () => {
      try {
        const result = await deleteProperty(id, name);

        if (result?.error) {
          showCustomToast.error(
            "Failed to delete property. Please try again.",
            "",
            {
              id: loadingId,
              duration: 5000,
            },
          );
          return;
        }

        showCustomToast.success("Property deleted successfully.", "", {
          id: loadingId,
          duration: 5000,
        });
      } catch (error) {
        console.error("[DeleteProperty] Failed to delete property", {
          propertyName: name,
          error,
        });
        showCustomToast.error("Something went wrong. Please try again.", "", {
          duration: 5000,
          id: loadingId,
        });
      }
    });
  };

  return (
    <form action={onSubmit}>
      <AnimatedButton
        type="button"
        onClick={() => setOpen(true)}
        className="bg-sub-background border-border rounded-lg border p-3 text-red-400 hover:border-red-400"
      >
        <TrashIcon aria-hidden className="size-5" />
      </AnimatedButton>

      {/* Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="border-border bg-background relative mx-4 w-full max-w-sm rounded-xl border p-6 shadow-2xl md:p-10">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <WarningIcon
                aria-label="Warning icon"
                className="size-5 text-red-400"
              />
            </div>

            <h2 className="mb-1 text-lg font-semibold lg:text-xl xl:text-2xl">
              Delete Property
            </h2>
            <p className="text-sub-foreground text-body mb-5">
              Are you sure you want to delete{" "}
              <span className="underline underline-offset-2">{name}</span>? This
              action cannot be undone.
            </p>

            <div className="flex gap-3">
              <AnimatedButton
                onClick={() => setOpen(false)}
                type="button"
                disabled={isPending}
                className="border-border text-sub-foreground enabled:hover:bg-sub-background enabled:hover:text-foreground text-body flex-1 rounded-lg border py-3 disabled:opacity-50"
              >
                Cancel
              </AnimatedButton>
              <AnimatedButton
                type="submit"
                disabled={isPending}
                className="text-body flex-1 rounded-lg bg-red-400 py-3 text-white enabled:hover:bg-red-500 disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
