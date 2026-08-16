'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/providers/LoadingProvider';
import { useEffect, useState } from 'react';

/**
 * Branded loading screen per §24.
 * SHK identity + sequential loading stages.
 * Does not artificially delay — reflects actual loading.
 */
export function LoadingScreen() {
  const { isLoading, loadingStage, loadingProgress } = useLoading();
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth visual counting for the huge background number
  useEffect(() => {
    let current = displayProgress;
    const step = () => {
      if (current < Math.floor(loadingProgress)) {
        current += 1;
        setDisplayProgress(current);
        requestAnimationFrame(step);
      }
    };
    if (Math.floor(loadingProgress) > displayProgress) {
      requestAnimationFrame(step);
    }
  }, [loadingProgress, displayProgress]);

  // Framer motion variants
  const containerVariants: any = {
    exit: {
      y: '-100%',
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2, // let inner elements fade out first
      },
    },
  };

  const textVariants: any = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--deep-black)' }}
          variants={containerVariants}
          exit="exit"
        >
          {/* Background Huge Progress Number */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.5, ease: 'easeOut' } }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5 } }}
          >
            <span
              className="font-[var(--font-display)] text-[25vw] md:text-[30vw] font-black text-white/[0.015] tracking-tighter"
              style={{ lineHeight: 0 }}
            >
              {displayProgress}
            </span>
          </motion.div>

          <div className="relative z-10 flex flex-col items-center w-full h-full justify-between py-12 md:py-24">

            {/* Top Minimal Text */}
            <div className="overflow-hidden">
              <motion.p
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase"
              >
                SYSTEM INITIALIZATION
              </motion.p>
            </div>

            {/* Central Monogram */}
            <div className="flex flex-col items-center relative">
              <div className="overflow-hidden mb-6">
                <motion.div
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem, 5vw, 4rem)',
                      fontWeight: 800,
                      letterSpacing: '0.4em',
                      color: 'var(--white)',
                      marginRight: '-0.4em' // adjust for letter-spacing
                    }}
                  >
                    SARMAHK
                  </span>
                </motion.div>
              </div>

              {/* Progress Line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-[var(--gold)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </motion.div>

              {/* Dynamic Stage Text */}
              <div className="overflow-hidden mt-6">
                <motion.p
                  key={loadingStage}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-[var(--gold)]/80 uppercase h-4"
                >
                  {loadingStage}
                </motion.p>
              </div>
            </div>

            {/* Bottom Footer Data */}
            <div className="w-full px-8 md:px-16 flex justify-between items-end overflow-hidden">
              <motion.div
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] text-[#555] uppercase"
              >
                v1.0 / 2026
              </motion.div>

              <motion.div
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] text-[#555] uppercase text-right"
              >
                DIGITAL ARCHIVE <br /><span className="text-[var(--cyan)]">INITIALIZING</span>
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
