// components/animated-button.tsx
"use client";

import { motion } from "motion/react";
import { ComponentProps } from "react";

/*
 * Animation configuration for the button
 * - whileTap: Scales down slightly (5%) when clicked/tapped
 * - transition: Spring animation with custom stiffness and damping for smooth, natural motion
 */
const animation = {
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300, damping: 15 },
} as const;

export default function AnimatedButton(props: ComponentProps<"button">) {
  return (
    <motion.button
      {...animation}
      {...(props as unknown as ComponentProps<typeof motion.button>)}
    />
  );
}
