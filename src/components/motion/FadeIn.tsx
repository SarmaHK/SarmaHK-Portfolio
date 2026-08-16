'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Intersection-based fade-in with directional variants.
 * Respects prefers-reduced-motion.
 */
export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = useReducedMotion();

  const directionOffsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionOffsets[direction] }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      }}
    >
      {children}
    </motion.div>
  );
}
