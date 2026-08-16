'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '@/data/navigation';
import { useCursorState } from '@/providers/CursorProvider';
import { useCreativeMode } from '@/providers/CreativeModeProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { menuOverlay, menuItem, menuMetadata, staggerContainer } from '@/lib/motion';

/**
 * Global Navigation — Digital Archive Interface
 * SHK ← → MENU with cinematic fullscreen overlay
 */
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { setCursor, resetCursor } = useCursorState();
  const { isCreativeMode } = useCreativeMode();
  const prefersReduced = useReducedMotion();
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    // Smooth scroll after menu closes
    setTimeout(() => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }, []);

  return (
    <>
      {/* ── Fixed Top Bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500"
        style={{
          padding: 'clamp(1.25rem, 2.5vw, 2.5rem) clamp(1.5rem, 4vw, 4rem)',
          mixBlendMode: isOpen ? 'normal' : 'difference',
        }}
      >
        {/* SHK Identity */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={resetCursor}
          className="relative z-[101] select-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.35em',
            color: 'var(--white)',
          }}
          aria-label="Scroll to top"
        >
          SarmaHK
        </a>

        {/* Right controls */}
        <div className="flex items-center gap-6 relative z-[101]">
          {/* Creative Mode badge */}
          {isCreativeMode && (
            <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--gold)] uppercase hidden md:inline">
              LAB MODE
            </span>
          )}

          {/* Menu button */}
          <button
            ref={menuBtnRef}
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setCursor('open')}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-3 bg-transparent border-none outline-none select-none"
            style={{ cursor: 'none' }}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="nav-menu"
          >
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ color: 'var(--white)' }}
            >
              {isOpen ? 'CLOSE' : 'MENU'}
            </span>
            {/* Animated hamburger → X */}
            <div className="relative flex flex-col items-end gap-[5px]" style={{ width: '22px' }}>
              <motion.span
                className="block h-[1px] bg-[var(--white)]"
                style={{ width: '100%', transformOrigin: 'right' }}
                animate={isOpen ? { rotate: -45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.span
                className="block h-[1px] bg-[var(--white)]"
                style={{ transformOrigin: 'right' }}
                animate={isOpen ? { rotate: 45, y: -3, width: '100%' } : { rotate: 0, y: 0, width: '55%' }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ── Fullscreen Nav Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="nav-menu"
            key="nav-overlay"
            className="fixed inset-0 z-[99] flex flex-col justify-center"
            variants={prefersReduced ? undefined : menuOverlay}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ background: 'var(--deep-black)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Navigation Title */}
            <motion.div
              variants={prefersReduced ? undefined : menuMetadata}
              initial="initial"
              animate="animate"
              exit="exit"
              className="section-container w-full mb-8 lg:mb-12"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[var(--gold)] opacity-50"></span>
                <span className="font-mono text-[9px] lg:text-[10px] tracking-[0.4em] text-[var(--muted-grey)] uppercase">
                  NAVIGATION
                </span>
              </div>
            </motion.div>

            {/* Menu Items */}
            <div className="section-container w-full">
              <motion.ul
                className="flex flex-col"
                variants={staggerContainer(0.08, 0.15)}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.number}
                    variants={prefersReduced ? undefined : menuItem}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                      onMouseEnter={() => setCursor('explore')}
                      onMouseLeave={resetCursor}
                      className="group flex items-baseline gap-4 lg:gap-6 py-3 lg:py-4 relative"
                      style={{ cursor: 'none' }}
                      tabIndex={0}
                    >
                      {/* Active / hover indicator */}
                      <motion.span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] bg-[var(--gold)] rounded-full"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: hoveredIndex === index ? 28 : 0,
                          opacity: hoveredIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      />

                      {/* Number */}
                      <span className="font-mono text-[10px] lg:text-xs tracking-[0.2em] text-[var(--muted-grey)] group-hover:text-[var(--gold)] transition-all duration-300 w-6 pl-4 group-hover:translate-x-1">
                        {item.number}
                      </span>

                      {/* Separator */}
                      <span className="font-mono text-[10px] lg:text-xs text-[var(--border)] group-hover:text-[var(--gold)] transition-colors duration-300 opacity-50">
                        /
                      </span>

                      {/* Label */}
                      <span
                        className="transition-all duration-300 group-hover:translate-x-2 group-hover:text-[var(--white)]"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.6rem, 4.5vw, 3.5rem)',
                          fontWeight: 300,
                          letterSpacing: '0.03em',
                          color: hoveredIndex === index ? 'var(--white)' : 'var(--soft-white)',
                        }}
                      >
                        {item.label}
                      </span>
                    </a>

                    {/* Divider */}
                    <div
                      className="h-[1px] transition-all duration-500 ease-out"
                      style={{
                        background: hoveredIndex === index ? 'var(--border)' : 'var(--border-subtle)',
                        transform: `scaleX(${hoveredIndex === index ? 1 : 0.2})`,
                        transformOrigin: 'left',
                      }}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Bottom metadata bar */}
            <motion.div
              variants={prefersReduced ? undefined : menuMetadata}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute bottom-6 lg:bottom-10 left-0 right-0 section-container flex justify-between items-end"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[8px] lg:text-[9px] tracking-[0.3em] text-[var(--muted-grey)] uppercase">
                  SARMA HK / DIGITAL ARCHIVE
                </span>
                <span className="font-mono text-[8px] tracking-[0.2em] text-[var(--border)] uppercase">
                  © 2026
                </span>
              </div>
              <span className="font-mono text-[8px] tracking-[0.2em] text-[var(--muted-grey)] uppercase hidden md:block">
                CTRL + K / COMMAND PALETTE
              </span>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
