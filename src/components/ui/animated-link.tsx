"use client";

import Link from "next/link";
import { motion, type MotionProps } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Props for AnimatedLink
 * - All Next.js Link props (href, replace, prefetch, etc.)
 * - Plus Motion animation props
 */
type AnimatedLinkProps = ComponentPropsWithoutRef<typeof Link> & MotionProps;

/*
 * Animation configuration for the link
 * - whileTap: Scales down when clicked/tapped
 * - transition: Spring animation for smooth, natural motion
 */
const animation = {
  whileTap: { scale: 0.95 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 15,
  },
} as const;

// Creates a motion-enabled version of Next.js Link component
// This allows the Link to accept Framer Motion animation props
const MotionLink = motion.create(Link);

export default function AnimatedLink({
  children,
  ...props
}: AnimatedLinkProps) {
  return (
    <MotionLink {...animation} {...props}>
      {children}
    </MotionLink>
  );
}
