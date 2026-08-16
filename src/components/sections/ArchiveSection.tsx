'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { certificates, certificateCategories } from '@/data/certificates';
import type { Certificate } from '@/data/types';
import { useCursorState } from '@/providers/CursorProvider';

const FolderCard = ({ category, certs }: { category: string; certs: Certificate[] }) => {
  const { setCursor, resetCursor } = useCursorState();

  // Pick up to 3 certs to display as cards
  const displayCerts = certs.slice(0, 3);
  const rotations = [-12, 0, 12];
  const translateYs = [-30, -50, -30];
  const translateXs = [-40, 0, 40];

  return (
    <div
      className="relative w-full max-w-sm mx-auto aspect-[4/3] group cursor-pointer perspective-[2000px]"
      onMouseEnter={() => setCursor('explore')}
      onMouseLeave={resetCursor}
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
        className="absolute bottom-0 left-0 w-full h-[75%] rounded-xl rounded-tl-none border-t border-l border-white/20 shadow-2xl z-10 origin-bottom flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
        variants={{
          rest: { rotateX: 0 },
          hover: { rotateX: -15, y: 5 }
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Specular highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--gold)]/10 to-transparent mix-blend-overlay" />

        <h3 className="text-white font-bold text-2xl uppercase tracking-widest drop-shadow-lg z-20">
          {category.replace('_', ' ')}
        </h3>
      </motion.div>

    </div>
  );
};

export function ArchiveSection() {
  // Group certificates by category, excluding 'ALL'
  const folders = certificateCategories
    .filter(cat => cat !== 'ALL')
    .map(category => ({
      category,
      certs: certificates.filter(c => c.category === category)
    }))
    .filter(folder => folder.certs.length > 0);

  return (
    <section
      id="archive"
      className="section-spacing"
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
            <motion.div key={folder.category} initial="rest" whileHover="hover" whileTap="hover" animate="rest">
              <FolderCard category={folder.category} certs={folder.certs} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
