import Star from "../../../public/assets/Star.svg";

export default function TripleStar() {
  return (
    <div className="absolute -top-5 -ml-3 flex items-center gap-x-1 md:-top-6 lg:-top-7 xl:-top-8">
      {/* Large star */}
      <Star
        aria-hidden="true"
        className="text-grey-15 dark:text-grey-40 size-6 md:size-6.5 lg:size-7 xl:size-7.5"
      />
      {/* Medium star */}
      <Star
        aria-hidden="true"
        className="text-grey-20 size-4 md:size-4.5 lg:size-5 xl:size-5.5"
      />
      {/* Small star */}
      <Star
        aria-hidden="true"
        className="text-grey-40 dark:text-grey-15 size-2 md:size-2.5 lg:size-3 xl:size-3.5"
      />
    </div>
  );
}
