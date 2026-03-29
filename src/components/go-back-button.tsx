"use client";

import { ArrowUDownLeftIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="ring-border hover:ring-purple-60 my-5 flex w-full items-center justify-center gap-x-2.5 px-5 py-3.5 ring md:w-fit"
    >
      <ArrowUDownLeftIcon aria-hidden="true" weight="bold" className="size-5" />
      <span>Go Back</span>
    </button>
  );
}
