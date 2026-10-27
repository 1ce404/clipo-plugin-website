"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

/** 每个区块只入场一次：上浮 + 去模糊。开启「减少动态效果」时直接显示。 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, ease, delay }}
    >
      {children}
    </Tag>
  );
}
