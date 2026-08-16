'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const subscribeTouch = (callback: () => void) => {
  if (typeof window === 'undefined') return () => { };
  const mediaQuery = window.matchMedia('(pointer: coarse)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};
const getTouchSnapshot = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const getServerTouchSnapshot = () => false;
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorState, cursorLabels } from '@/providers/CursorProvider';

/**
 * Custom cursor with contextual states per §04.
 * Hidden on touch devices, respects reduced motion.
 */
export function CustomCursor() {
  const { variant, isVisible } = useCursorState();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const isTouchDevice = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getServerTouchSnapshot);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  const label = cursorLabels[variant];
  const isDefault = variant === 'default';
  const dotSize = isDefault ? 8 : 12;

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      animate={{
        x: position.x - dotSize / 2,
        y: position.y - dotSize / 2,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      {/* Dot */}
      <motion.div
        className="rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          background: isDefault ? 'var(--white)' : 'var(--gold)',
        }}
        animate={{ scale: isDefault ? 1 : 1.5 }}
        transition={{ duration: 0.2 }}
      />

      {/* Label */}
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
