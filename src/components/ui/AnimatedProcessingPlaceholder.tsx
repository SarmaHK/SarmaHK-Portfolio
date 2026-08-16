'use client';

import { motion } from 'framer-motion';

export function AnimatedProcessingPlaceholder({ projectName }: { projectName?: string }) {
    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[var(--near-black)] border border-[var(--border-subtle)] overflow-hidden text-[var(--gold)] font-mono">
            {/* Scanning line */}
            <motion.div
                className="absolute inset-0 border-t border-[var(--signal)] bg-gradient-to-b from-[var(--signal)]/10 to-transparent opacity-20 pointer-events-none"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            />

            {/* Grid background */}
            <div className="absolute inset-x-0 inset-y-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xOSAxOUgxVjFoMTh2MTh6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

            {/* Spinning core */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="w-16 h-16 border border-[var(--gold)] border-dashed rounded-full flex items-center justify-center mb-6 opacity-60 relative z-10"
            >
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                    className="w-8 h-8 border border-[var(--signal)] border-r-transparent rounded-full"
                />
            </motion.div>

            {projectName && (
                <div className="text-[var(--white)] font-bold text-lg md:text-xl tracking-tight mb-3 relative z-10 font-[var(--font-body)]">
                    {projectName}
                </div>
            )}

            <div className="text-[10px] tracking-[0.4em] uppercase opacity-80 flex items-center gap-3 relative z-10 mt-1">
                IN DEVELOPMENT
                <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="w-2 h-2 rounded-full bg-[var(--signal)] shadow-[0_0_10px_var(--signal)]"
                />
            </div>
        </div>
    );
}
