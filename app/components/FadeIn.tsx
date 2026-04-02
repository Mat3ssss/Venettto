"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 48 },
  down:  { y: -48 },
  left:  { x: -64 },
  right: { x: 64 },
};

const supportsIO = typeof window !== "undefined" && typeof window.IntersectionObserver !== "undefined";

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "0px" });

  const { x = 0, y = 0 } = offsets[direction];
  const visible = !supportsIO || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
