'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

/**
 * Subtle magnetic interaction wrapper.
 * Only for selected premium interactive elements.
 * The element shifts a few pixels toward the cursor on hover.
 */
export function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const prefersReduced = useReducedMotion();

    const handleMouseMove = (e: React.MouseEvent) => {
        if (prefersReduced || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setOffset({
            x: (e.clientX - cx) * strength,
            y: (e.clientY - cy) * strength,
        });
    };

    const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: offset.x, y: offset.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
