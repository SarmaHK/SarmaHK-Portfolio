'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorState } from '@/providers/CursorProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { navigation } from '@/data/navigation';
import { fade, fadeUp } from '@/lib/motion';

interface Command {
    id: string;
    label: string;
    category: string;
    action: () => void;
}

/**
 * Command Palette — Ctrl+K / Cmd+K
 * Archive-themed search & navigate interface.
 */
export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const { setCursor, resetCursor } = useCursorState();
    const prefersReduced = useReducedMotion();

    // Build command entries from navigation
    const commands: Command[] = useMemo(() => {
        const navCommands = navigation.map((item) => ({
            id: `nav-${item.number}`,
            label: `Go to ${item.label}`,
            category: 'NAVIGATION',
            action: () => {
                const id = item.href.replace('#', '');
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            },
        }));
        return [
            ...navCommands,
            {
                id: 'nav-top',
                label: 'Back to Top',
                category: 'NAVIGATION',
                action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            },
        ];
    }, []);

    // Filter commands by query
    const filtered = useMemo(() => {
        if (!query.trim()) return commands;
        const q = query.toLowerCase();
        return commands.filter((c) => c.label.toLowerCase().includes(q));
    }, [query, commands]);

    // Reset selection on filter change
    useEffect(() => setSelectedIndex(0), [filtered]);

    // Keyboard shortcut to open
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                setQuery('');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => inputRef.current?.focus());
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Navigation inside palette
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex((i) => Math.max(i - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filtered[selectedIndex]) {
                        filtered[selectedIndex].action();
                        setIsOpen(false);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    setIsOpen(false);
                    break;
            }
        },
        [filtered, selectedIndex]
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[200] bg-[var(--deep-black)]/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Palette */}
                    <motion.div
                        className="fixed top-[20vh] left-1/2 z-[201] w-[90vw] max-w-[520px]"
                        style={{ transform: 'translateX(-50%)' }}
                        variants={prefersReduced ? fade : fadeUp}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        role="dialog"
                        aria-label="Command palette"
                        aria-modal="true"
                    >
                        <div
                            className="border border-[var(--border)] bg-[var(--near-black)] overflow-hidden shadow-2xl"
                            onKeyDown={handleKeyDown}
                        >
                            {/* Input */}
                            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-5 py-4">
                                <span className="font-mono text-[10px] text-[var(--gold)] opacity-70">{'>'}</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search the archive..."
                                    className="flex-1 bg-transparent text-[var(--white)] font-mono text-sm outline-none placeholder:text-[var(--muted-grey)] placeholder:tracking-wide"
                                    aria-label="Search commands"
                                />
                                <kbd className="font-mono text-[8px] tracking-wider text-[var(--muted-grey)] border border-[var(--border)] px-1.5 py-0.5 hidden md:inline">
                                    ESC
                                </kbd>
                            </div>

                            {/* Keyboard hint */}
                            <div className="flex items-center justify-between px-5 py-2 border-b border-[var(--border-subtle)]">
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[8px] tracking-wider text-[var(--muted-grey)]">↑↓ Navigate</span>
                                    <span className="font-mono text-[8px] tracking-wider text-[var(--muted-grey)]">↵ Open</span>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="max-h-[300px] overflow-y-auto py-2">
                                {filtered.length === 0 ? (
                                    <div className="px-5 py-6 text-center">
                                        <span className="font-mono text-xs text-[var(--muted-grey)] tracking-wide">No results found.</span>
                                    </div>
                                ) : (
                                    filtered.map((cmd, i) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => { cmd.action(); setIsOpen(false); }}
                                            onMouseEnter={() => { setSelectedIndex(i); setCursor('explore'); }}
                                            onMouseLeave={resetCursor}
                                            className={`w-full text-left flex items-center gap-4 px-5 py-3 transition-colors duration-200 ${i === selectedIndex
                                                    ? 'bg-[var(--surface)] text-[var(--white)]'
                                                    : 'text-[var(--soft-white)] hover:bg-[var(--surface)]'
                                                }`}
                                            style={{ cursor: 'none' }}
                                        >
                                            {i === selectedIndex && (
                                                <span className="w-[2px] h-4 bg-[var(--gold)] rounded-full shrink-0"></span>
                                            )}
                                            <span className="font-sans text-[0.85rem] tracking-wide">{cmd.label}</span>
                                            <span className="font-mono text-[8px] tracking-[0.2em] text-[var(--muted-grey)] uppercase ml-auto">
                                                {cmd.category}
                                            </span>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
