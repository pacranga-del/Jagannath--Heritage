import React from "react";
import { motion } from "framer-motion";

// Masked line-by-line reveal
export function MaskedLines({ lines = [], className = "", delay = 0, testId }) {
  return (
    <div data-testid={testId} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + i * 0.12,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// Scroll-triggered fade + rise
export function Reveal({ children, delay = 0, y = 24, className = "", once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// Simple word stagger reveal
export function StaggerWords({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block mr-[0.28em] overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + i * 0.04,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
