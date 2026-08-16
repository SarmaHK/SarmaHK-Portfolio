'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  staggerDelay?: number;
  className?: string;
  by?: 'character' | 'word' | 'line';
}

/**
 * Character/word/line text reveal animation.
 * Cinematic, smooth, controlled per §04.
 */
export function TextReveal({
  children,
  as: Tag = 'span',
  delay = 0,
  staggerDelay = 0.03,
  className = '',
  by = 'word',
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const units = by === 'character'
    ? children.split('')
    : by === 'word'
      ? children.split(' ')
      : [children];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = (motion as any)[Tag];

  return (
    <MotionTag ref={ref} className={className} aria-label={children}>
      {units.map((unit, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-hidden="true"
          >
            {unit}
            {by === 'word' && i < units.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
