'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { certificates, certificateCategories } from '@/data/certificates';
import type { Certificate } from '@/data/types';
import { useCursorState } from '@/providers/CursorProvider';

const FolderCard = ({ category, certs, onClick }: { category: string; certs: Certificate[]; onClick?: () => void }) => {
  const { setCursor, resetCursor } = useCursorState();

  // Pick up to 3 certs to display as cards
  const displayCerts = certs.slice(0, 3);
  const rotations = [-12, 0, 12];
  const translateYs = [-30, -50, -30];
  const translateXs = [-40, 0, 40];

  return (
    <div
      className="relative w-full max-w-sm mx-auto aspect-[4/3] group cursor-pointer perspective-[2000px]"
      onMouseEnter={() => setCursor('open')}
      onMouseLeave={resetCursor}
      onClick={onClick}
    >
      {/* ── BACK OF THE FOLDER ── */}
      <div className="absolute inset-0 bg-[#1c1c1c] border border-white/5 rounded-xl rounded-tl-none shadow-xl transition-colors duration-500 group-hover:bg-[#252525]">
        {/* Folder Tab */}
        <div className="absolute top-[-20px] left-[-1px] w-[40%] h-[20px] bg-[#1c1c1c] border-t border-l border-white/5 rounded-tl-xl rounded-tr-lg before:content-[''] before:absolute before:bottom-0 before:-right-[10px] before:w-[10px] before:h-[10px] before:bg-transparent before:-shadow-[5px_5px_0_0_#1c1c1c] transition-colors duration-500 group-hover:bg-[#252525]">
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-widest text-[var(--gold)]/70 uppercase">
            {certs.length} FILES
          </span>
        </div>
      </div>

      {/* ── CARDS ALIGNING OUT ── */}
      <div className="absolute inset-0 w-full h-full flex items-end justify-center pb-8 pointer-events-none">
        {displayCerts.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ y: 0, x: 0, rotate: 0, scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`absolute bottom-6 w-[80%] aspect-[3/2] bg-[#0c0c0c] border border-white/10 rounded-lg shadow-2xl overflow-hidden`}
            style={{ zIndex: index }}
            variants={{
              rest: { y: 10 + index * 5, x: 0, rotate: 0, scale: 0.95 },
              hover: {
                y: translateYs[index],
                x: translateXs[index],
                rotate: rotations[index],
                scale: 1
              }
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {cert.image ? (
              <img src={cert.image} alt={cert.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[7px] text-[var(--gold)] uppercase font-mono tracking-wider line-clamp-1">{cert.issuer}</span>
                  <h4 className="text-white text-xs font-semibold leading-tight line-clamp-2">{cert.title}</h4>
                </div>
              </div>
            )}

            {/* Holographic shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* ── FRONT FLAP (FROSTED GLASS) ── */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[75%] rounded-xl rounded-tl-none border-t border-l border-white/10 shadow-2xl z-10 origin-bottom flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.4) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
        variants={{
          rest: { rotateX: 0 },
          hover: { rotateX: -15, y: 5 }
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Specular highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--gold)]/10 to-transparent mix-blend-overlay" />

        <h3 className="text-white font-extrabold text-2xl uppercase tracking-widest drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] z-20">
          {category.replace('_', ' ')}
        </h3>
      </motion.div>

    </div>
  );
};

export function ArchiveSection() {
  const { setCursor, resetCursor } = useCursorState();

  // Modal State
  const [activeFolder, setActiveFolder] = useState<{ category: string; certs: Certificate[] } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Group certificates by category, excluding 'ALL'
  const folders = certificateCategories
    .filter(cat => cat !== 'ALL')
    .map(category => ({
      category,
      certs: certificates.filter(c => c.category === category)
    }))
    .filter(folder => folder.certs.length > 0);

  const openFolder = (folder: { category: string; certs: Certificate[] }) => {
    setActiveFolder(folder);
    setActiveIndex(0);
    resetCursor();
  };

  const closeFolder = () => {
    setActiveFolder(null);
    resetCursor();
  };

  const nextCert = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeFolder) setActiveIndex(prev => (prev + 1) % activeFolder.certs.length);
  };

  const prevCert = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeFolder) setActiveIndex(prev => (prev - 1 + activeFolder.certs.length) % activeFolder.certs.length);
  };

  return (
    <section
      id="archive"
      className="section-spacing relative"
      style={{ background: 'var(--deep-black)' }}
    >
      <div className="section-container">
        {/* ── Editorial Header ── */}
        <div className="flex flex-col items-center justify-center text-center gap-4 w-full shrink-0 mt-4 mb-20 lg:mb-24">
          <FadeIn>
            <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--muted-grey)] uppercase block">
              05 / PROOF OF WORK
            </span>
          </FadeIn>
          <TextReveal as="h2" className="text-section-title text-[var(--gold)]">
            CERTIFICATIONS
          </TextReveal>
        </div>

        {/* ── Folder Grid ── */}
        <motion.div
          initial="rest"
          whileHover="hover"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-24 mt-12"
        >
          {folders.map(folder => (
            <motion.div
              key={folder.category}
              initial="rest"
              whileHover="hover"
              whileTap="hover"
              animate="rest"
              onClick={() => openFolder(folder)}
              className="cursor-pointer"
            >
              <FolderCard category={folder.category} certs={folder.certs} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {activeFolder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
              onClick={closeFolder}
              onMouseEnter={() => resetCursor()}
              onMouseLeave={resetCursor}
            />

            {/* Modal Content container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-5xl px-4 md:px-12 flex flex-col items-center pointer-events-none"
            >

              {/* Modal Header */}
              <div className="w-full flex justify-between items-end mb-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase">
                    {activeFolder.category.replace('_', ' ')}
                  </span>
                  <span className="text-white/50 text-xs font-mono tracking-widest uppercase">
                    {activeIndex + 1} OF {activeFolder.certs.length}
                  </span>
                </div>
                <button
                  onClick={closeFolder}
                  onMouseEnter={() => resetCursor()}
                  onMouseLeave={resetCursor}
                  className="pointer-events-auto text-white/50 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
                >
                  [ CLOSE ]
                </button>
              </div>

              {/* Image Viewer */}
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] bg-[#0c0c0c] border border-white/10 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden pointer-events-auto group">
                <AnimatePresence mode='wait'>
                  <motion.img
                    key={activeFolder.certs[activeIndex].id}
                    src={activeFolder.certs[activeIndex].image}
                    alt={activeFolder.certs[activeIndex].title}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Left/Right Controls (Inside Viewer on Mobile, Edges on Desktop) */}
                {activeFolder.certs.length > 1 && (
                  <>
                    <button
                      onClick={prevCert}
                      onMouseEnter={() => setCursor('view')}
                      onMouseLeave={resetCursor}
                      className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/60 hover:bg-[var(--gold)] border border-white/10 hover:border-transparent rounded-full flex items-center justify-center text-white hover:text-black backdrop-blur-md transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextCert}
                      onMouseEnter={() => setCursor('view')}
                      onMouseLeave={resetCursor}
                      className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/60 hover:bg-[var(--gold)] border border-white/10 hover:border-transparent rounded-full flex items-center justify-center text-white hover:text-black backdrop-blur-md transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Metadata Footer */}
              <div className="w-full mt-6 text-center">
                <h3 className="text-white text-lg md:text-xl font-bold uppercase tracking-tight">
                  {activeFolder.certs[activeIndex].title}
                </h3>
                <p className="text-[var(--gold)]/70 text-xs font-mono uppercase tracking-widest mt-2">
                  {activeFolder.certs[activeIndex].issuer}
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
