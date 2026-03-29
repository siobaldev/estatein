import PageNotFound from "../../public/assets/page-not-found.svg";
import { Metadata } from "next";
import GoBackButton from "@/components/go-back-button";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default async function NotFound() {
  return (
    <div className="wrapper flex h-screen flex-col items-center justify-center font-semibold">
      <h1 className="text-[clamp(6rem,4.6667rem+6.6667vw,8rem)] leading-30 font-semibold">
        404
      </h1>
      <div className="space-y-1 text-center">
        <h2 className="text-sub-title">Page Not Found</h2>
        <p className="text-body text-sub-foreground">
          This property doesn&apos;t exist or may have been moved.
        </p>
      </div>

      {/* Call-to-action button to return to previous homepage */}
      <GoBackButton />

      {/* Decorative illustration */}
      <PageNotFound
        aria-hidden="true"
        className="w-[clamp(20rem,13.3333rem+33.3333vw,40rem)]"
      />
    </div>
  );
}
