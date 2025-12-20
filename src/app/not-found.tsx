import Link from "next/link";
import PageNotFound from "../../public/assets/page-not-found.svg";
import { ArrowUDownLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="wrapper flex h-screen flex-col items-center justify-center font-semibold">
      {/* Large 404 error code with fluid, responsive sizing */}
      <h1 className="text-[clamp(6rem,4.6667rem+6.6667vw,8rem)] leading-30 font-semibold">
        404
      </h1>

      {/* Title and description */}
      <div className="space-y-1 text-center">
        <h2 className="text-sub-title">Page Not Found</h2>
        <p className="text-body text-sub-foreground">
          This property doesn&apos;t exist or may have been moved.
        </p>
      </div>

      {/* Call-to-action button to return to homepage */}
      <Link
        href="/"
        className="ring-border hover:ring-purple-60 my-5 flex w-full items-center justify-center gap-x-2.5 px-5 py-3.5 ring md:w-fit"
      >
        {/* Decorative Icon */}
        <ArrowUDownLeftIcon aria-hidden="true" />
        <span>Go Home</span>
      </Link>

      {/* Decorative illustration */}
      <PageNotFound
        aria-hidden="true"
        className="w-[clamp(20rem,13.3333rem+33.3333vw,40rem)]"
      />
    </div>
  );
}
