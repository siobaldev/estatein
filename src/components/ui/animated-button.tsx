"use client";

import { motion, type MotionProps } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Props for AnimatedButton
 * - All normal <button> props (onClick, disabled, etc.)
 * - Plus Framer Motion animation props (whileTap, transition, etc.)
 */
type AnimatedButtonProps = ComponentPropsWithoutRef<"button"> & MotionProps;

/*
 * Animation configuration for the button
 * - whileTap: Scales down slightly (5%) when clicked/tapped
 * - transition: Spring animation with custom stiffness and damping for smooth, natural motion
 */
const animation = {
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300, damping: 15 },
} as const;

export default function AnimatedButton({
  children,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button {...animation} {...props}>
      {children}
    </motion.button>
  );
}
