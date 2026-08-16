'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxWrapperProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

/**
 * Subtle scroll-based parallax effect.
 * Displacement is restrained per §04 (motion should feel controlled).
 */
export function ParallaxWrapper({
  children,
  offset = 50,
  className = '',
}: ParallaxWrapperProps) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
