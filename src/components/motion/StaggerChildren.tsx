'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, ReactNode, CSSProperties } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Container that staggers the entrance of its children.
 * Wrap child elements in motion.div for automatic stagger.
 */
export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  delay = 0,
  className = '',
  style,
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Variant for child items inside StaggerChildren */
export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};
