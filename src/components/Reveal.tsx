"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "scale";

const offsets: Record<RevealDirection, { x?: number; y?: number; rotate?: number; scale?: number }> = {
  up: { y: 72, scale: 0.94 },
  down: { y: -72, scale: 0.94 },
  left: { x: -110, rotate: -5, scale: 0.94 },
  right: { x: 110, rotate: 5, scale: 0.94 },
  scale: { scale: 0.55 },
};

function makeVariants(direction: RevealDirection): Variants {
  const o = offsets[direction];
  return {
    hidden: { opacity: 0, x: o.x ?? 0, y: o.y ?? 0, rotate: o.rotate ?? 0, scale: o.scale ?? 1, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: "blur(0px)" },
  };
}

/** Kinetic "arriving into place" reveal-on-scroll — elements fly in from a
 * direction and land with a snappy spring overshoot, like pieces of a scene
 * assembling themselves. Same call-site API as before (children/className/
 * delay), plus an optional `direction` to control where each piece flies in
 * from — mix directions across a grid (left/up/right) for a converging,
 * multi-point "assembly" feel. */
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
} & Omit<HTMLMotionProps<"div">, "children" | "className" | "initial" | "animate" | "whileInView" | "variants" | "transition">;

export function Reveal({ children, className = "", delay = 0, direction = "up", ...rest }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      variants={makeVariants(direction)}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.9, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
