'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface InteractiveNameProps {
    name: string;
    className?: string;
}

export function InteractiveName({ name, className = '' }: InteractiveNameProps) {
    const prefersReduced = useReducedMotion();
    const letters = name.split('');

    return (
        <div className={`flex overflow-visible relative ${className}`} role="heading" aria-level={1} aria-label={name}>
            {letters.map((letter, i) => {
                const isDot = letter === '.';
                return (
                    <motion.span
                        key={`${letter}-${i}`}
                        style={{ display: 'inline-block', position: 'relative' }}
                        variants={{
                            initial: {
                                y: 40,
                                opacity: 0,
                                rotateX: -90,
                                filter: 'blur(8px)'
                            },
                            enter: {
                                y: 0,
                                opacity: 1,
                                rotateX: 0,
                                filter: 'blur(0px)',
                                transition: {
                                    duration: 0.9,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: i * 0.04
                                }
                            }
                        }}
                        whileHover={
                            !prefersReduced
                                ? {
                                    y: -6,
                                    scale: 1.08,
                                    color: 'var(--gold)',
                                    textShadow: '0 0 30px rgba(201,162,39,0.3)',
                                    transition: {
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 15
                                    },
                                }
                                : {}
                        }
                        className={`cursor-default origin-bottom will-change-transform ${isDot ? 'text-[var(--gold)]' : ''}`}
                    >
                        {letter}
                    </motion.span>
                );
            })}
        </div>
    );
}
