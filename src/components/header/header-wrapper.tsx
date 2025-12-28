"use client";

import { motion } from "motion/react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { ReactNode, useState } from "react";

interface StickyAnimatedHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function StickyAnimatedHeader({
  children,
  className = "",
}: StickyAnimatedHeaderProps) {
  // Track vertical scroll position
  const { scrollY } = useScroll();

  // Controls header visibility
  const [hidden, setHidden] = useState(false);

  // Listen for scroll changes and determine direction
  useMotionValueEvent(scrollY, "change", (current) => {
    // Get previous scroll position
    const previous = scrollY.getPrevious();

    // Calculate scroll direction
    const diff = current - previous!;

    // Hide header when scrolling down AND past 200px threshold
    if (diff > 0 && current > 200) {
      setHidden(true);
    }
    // Show header when scrolling up (any position)
    else if (diff < 0) {
      setHidden(false);
    }
  });

  return (
    <motion.header
      className={`bg-sub-background sticky top-0 z-50 ${className}`}
      initial={{ y: 0, opacity: 1 }} // Start visible at normal position
      animate={{
        y: hidden ? -100 : 0, // Move up -100px when hidden, 0 when visible
        opacity: hidden ? 0 : 1, // Fade out when hidden, fade in when visible
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth 0.3s animation
    >
      {children}
    </motion.header>
  );
}
