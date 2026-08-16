'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ImageRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Mask-based image reveal animation.
 * Cinematic wipe effect for photography elements.
 */
export function ImageReveal({
  children,
  direction = 'left',
  delay = 0,
  duration = 1.2,
  className = '',
}: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const clipPaths = {
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0% 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0%)',
    },
    top: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0% 0)',
    },
    bottom: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0% 0 0 0)',
    },
  };

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ clipPath: clipPaths[direction].hidden, scale: 1.1 }}
        animate={
          isInView
            ? { clipPath: clipPaths[direction].visible, scale: 1 }
            : { clipPath: clipPaths[direction].hidden, scale: 1.1 }
        }
        transition={{
          duration,
          delay,
          ease: [0.76, 0, 0.24, 1], // ease-in-out-quart
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
