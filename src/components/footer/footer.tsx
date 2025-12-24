import CallToAction from "./call-to-action";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/ssr";
import { FooterItems } from "@/lib/data";
import AnimatedLink from "../ui/animated-link";
import Newsletter from "./newsletter";

export default function Footer() {
  return (
    <footer>
      {/* Call-to-Action */}
      <div className="border-border relative overflow-hidden border-y py-12.5 lg:py-25">
        <CallToAction />
      </div>

      {/* Main Footer - brand info, email signup, and navigation */}
      <div className="wrapper flex flex-col gap-x-20 gap-y-12.5 py-12.5 md:py-20 xl:flex-row xl:justify-between xl:py-25">
        {/* Brand logo and email subscription form */}
        <div className="space-y-5">
          {/* Brand Logo - Links to homepage */}
          <AnimatedLink
            href={"/"}
            className="flex w-fit items-center gap-x-1.5 p-1 md:gap-x-2.5 md:p-2"
          >
            {/* Brand Icon */}
            <Image
              src={"/assets/Estatein-Icon.svg"}
              alt="estatein-icon"
              className="size-6 sm:size-8 lg:size-10"
              width={100}
              height={100}
            />
            {/* Brand Name Text */}
            <span className="text-foreground text-lg font-bold sm:text-xl lg:text-2xl">
              Estatein
            </span>
          </AnimatedLink>

          <Newsletter />
        </div>

        {/* Footer navigation links grouped by category */}
        <div className="xl: flex flex-wrap gap-10 2xl:gap-x-20">
          {/* Map through footer link categories (Home, About Us, Properties, Services, Contact Us) */}
          {FooterItems.map((item) => (
            <div key={item.id} className="flex-1 space-y-4">
              {/* Category Title */}
              <h1 className="text-sub-foreground text-base font-medium lg:text-lg xl:text-xl">
                {item.title}
              </h1>

              {/* Links List */}
              <ul className="flex flex-col gap-y-2">
                {item.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-body hover:text-purple-60 font-medium text-nowrap transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Bar - Copyright, terms, and social media icons */}
      <div className="bg-sub-background">
        <div className="wrapper flex flex-col-reverse gap-y-5 py-5 text-center md:flex-row md:items-center md:justify-between">
          {/* Copyright and Terms Text */}
          <div className="text-body flex flex-col gap-y-2.5 font-medium md:flex-row md:gap-x-10">
            <p>@2025 Estatein. All rights reserved.</p>
            <p>Terms & Conditions</p>
          </div>

          {/* Brand Logos Container */}
          <div className="flex items-center justify-center">
            {/* Facebook Logo */}
            <Link
              href={"/"}
              aria-label="Visit our Facebook page"
              className="bg-background flex size-15 items-center justify-center rounded-full p-1"
            >
              <FacebookLogoIcon
                weight="fill"
                aria-hidden="true"
                className="fill-foreground size-5"
              />
            </Link>

            {/* LinkedIn Logo */}
            <Link
              href={"/"}
              aria-label="Visit our LinkedIn page"
              className="bg-background flex size-15 items-center justify-center rounded-full p-2"
            >
              <LinkedinLogoIcon
                weight="fill"
                aria-hidden="true"
                className="fill-foreground size-5"
              />
            </Link>

            {/* Twitter Logo */}
            <Link
              href={"/"}
              aria-label="Visit our Twitter page"
              className="bg-background flex size-15 items-center justify-center rounded-full p-2"
            >
              <TwitterLogoIcon
                weight="fill"
                aria-hidden="true"
                className="fill-foreground size-5"
              />
            </Link>

            {/* Youtube Logo */}
            <Link
              href={"/"}
              aria-label="Visit our YouTube page"
              className="bg-background flex size-15 items-center justify-center rounded-full p-2"
            >
              <YoutubeLogoIcon
                weight="fill"
                aria-hidden="true"
                className="fill-foreground size-5"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
