'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/providers/LoadingProvider';

/**
 * Branded loading screen per §24.
 * SHK identity + sequential loading stages.
 * Does not artificially delay — reflects actual loading.
 */
export function LoadingScreen() {
  const { isLoading, loadingStage, loadingProgress } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: 'var(--deep-black)' }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* SHK Monogram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '0.3em',
                color: 'var(--white)',
              }}
            >
              SarmaHK
            </span>
          </motion.div>

          {/* Loading Title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              letterSpacing: '0.3em',
              color: 'var(--muted-grey)',
              textTransform: 'uppercase',
            }}
          >
            LOADING DIGITAL ARCHIVE
          </motion.p>

          {/* Loading Stage */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                minHeight: '1.2em',
              }}
            >
              {loadingStage}
            </p>

            {/* Progress bar */}
            <div
              className="relative overflow-hidden"
              style={{
                width: '200px',
                height: '1px',
                background: 'var(--border-subtle)',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'var(--gold)',
                  transformOrigin: 'left',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: loadingProgress / 100 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          {/* Subtle corner metadata */}
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.15em',
              color: 'var(--muted-grey)',
            }}
          >
            v1.0 / 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
