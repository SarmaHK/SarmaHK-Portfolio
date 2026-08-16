'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { sectionReveal } from '@/lib/motion';

interface SectionTransitionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

/**
 * Reusable section transition wrapper.
 * Applies a consistent viewport-triggered reveal animation to section content.
 * Sections smoothly fade + slide into view when they approach the viewport.
 */
export function SectionTransition({ children, className = '', id }: SectionTransitionProps) {
    const prefersReduced = useReducedMotion();

    if (prefersReduced) {
        return <div className={className} id={id}>{children}</div>;
    }

    return (
        <motion.div
            id={id}
            className={className}
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
        >
            {children}
        </motion.div>
    );
}
