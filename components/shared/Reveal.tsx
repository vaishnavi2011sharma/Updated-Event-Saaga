"use client";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealType = "fade" | "slide-up" | "slide-left" | "slide-right" | "zoom";

interface Props {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const VARIANTS: Record<RevealType, Variants> = {
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  "slide-up": { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  "slide-left": { hidden: { opacity: 0, x: 36 }, show: { opacity: 1, x: 0 } },
  "slide-right": { hidden: { opacity: 0, x: -36 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
};

export default function Reveal({ children, type = "slide-up", delay = 0, duration = 0.6, className, style }: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={VARIANTS[type]}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — wrap a list of <Reveal> or <StaggerItem> children to cascade them in. */
export function StaggerGroup({ children, className, style, gap = 0.08 }: { children: ReactNode; className?: string; style?: React.CSSProperties; gap?: number }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: gap }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, style, type = "slide-up" }: { children: ReactNode; className?: string; style?: React.CSSProperties; type?: RevealType }) {
  return (
    <motion.div className={className} style={style} variants={VARIANTS[type]} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
