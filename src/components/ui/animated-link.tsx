"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ComponentProps } from "react";

/*
 * Animation configuration for the link
 * - whileTap: Scales down when clicked/tapped
 * - transition: Spring animation for smooth, natural motion
 */
const animation = {
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300, damping: 15 },
} as const;

// Creates a motion-enabled version of Next.js Link component
// This allows the Link to accept Framer Motion animation props
const MotionLink = motion.create(Link);

export default function AnimatedLink(props: ComponentProps<typeof Link>) {
  return (
    <MotionLink
      {...animation}
      /*
       * Type assertion is needed because motion.create() doesn't fully align Motion's types
       * with Next.js Link's types. We cast through `unknown` first (safer than `any`) to satisfy
       * TypeScript's type safety requirements while maintaining runtime compatibility.
       */
      {...(props as unknown as ComponentProps<typeof MotionLink>)}
    />
  );
}
