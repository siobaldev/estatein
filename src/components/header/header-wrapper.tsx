"use client";

import { motion } from "motion/react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { ReactNode, useState, useRef } from "react";

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

  // Skip first scroll event (scrollY = 0 on refresh)
  const isFirstScroll = useRef(true);

  // Tracks whether the initial mount animation has finished
  // Used to switch from slow mount animation to faster scroll-based animations
  const [isMountedAnimDone, setIsMountedAnimDone] = useState<boolean>(false);

  // Controls header visibility
  const [hidden, setHidden] = useState<boolean>(false);

  // Listen for scroll changes and determine direction
  useMotionValueEvent(scrollY, "change", (current) => {
    // Skip the first emitted value (always 0 on refresh)
    if (isFirstScroll.current) {
      isFirstScroll.current = false;
      return;
    }

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
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: hidden ? -100 : 0, // Move up -100px when hidden, 0 when visible
        opacity: hidden ? 0 : 1, // Fade out when hidden, fade in when visible
      }}
      transition={{
        duration: isMountedAnimDone ? 0.3 : 0.6, // After first animation, switch from 0.6 to 0.3 duration
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        setIsMountedAnimDone(true); // After first animation, switch to scroll-speed
      }}
    >
      {children}
    </motion.header>
  );
}
