'use client';

import { motion } from 'framer-motion';
import { useActiveSection, useScrollProgress } from '@/hooks/useActiveSection';

/**
 * Vertical section progress indicator — subtle active section display.
 * Shows section number + thin progress line anchored to viewport right edge.
 */
export function SectionIndicator() {
    const active = useActiveSection();
    const progress = useScrollProgress();

    return (
        <div
            className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col items-center gap-4 mix-blend-difference pointer-events-none select-none"
            role="complementary"
            aria-label="Section progress indicator"
        >
            {/* Active section number */}
            <motion.span
                key={active.number}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[10px] tracking-[0.3em] text-[var(--soft-white)]"
            >
                {active.number}
            </motion.span>

            {/* Progress track */}
            <div className="relative w-[1px] h-20 bg-[var(--border)] overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-[var(--gold)]"
                    style={{ height: `${progress * 100}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            {/* Active section label (vertical) */}
            <motion.span
                key={active.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-[7px] tracking-[0.4em] text-[var(--soft-white)] uppercase"
                style={{ writingMode: 'vertical-rl' }}
            >
                {active.label}
            </motion.span>
        </div>
    );
}
