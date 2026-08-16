'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import { useCursorState } from '@/providers/CursorProvider';

const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.56 6.5-7.14a5.8 5.8 0 0 0-1.6-4.04 5.42 5.42 0 0 0-.15-3.98s-1.3-.4-4 1.4a13.3 13.3 0 0 0-7 0C6.3 2 5 2.4 5 2.4a5.42 5.42 0 0 0-.15 3.98 5.8 5.8 0 0 0-1.6 4.04c0 5.58 3.32 6.79 6.5 7.14a4.8 4.8 0 0 0-1 3.02V22" /><path d="M9 20c-5 1.5-5-2.5-7-3" /></svg>
);

const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);

const MediumIcon = () => (
  <svg width="22" height="22" viewBox="0 0 1043.63 592.71" fill="currentColor">
    <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
  </svg>
);

export function Footer() {
  const { setCursor, resetCursor } = useCursorState();

  const footerLinks = [
    { label: 'GITHUB', href: 'https://github.com/SarmaHK', icon: <GithubIcon /> },
    { label: 'LINKEDIN', href: 'https://linkedin.com/in/sarmahk', icon: <LinkedinIcon /> },
    { label: 'EMAIL', href: 'mailto:kuganes.hds@gmail.com', icon: <MailIcon /> },
    { label: 'MEDIUM', href: '#', icon: <MediumIcon /> },
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-32 pb-12 overflow-hidden flex flex-col items-center">
      {/* Massive Background Text */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
        <h1 className="text-[25vw] md:text-[22vw] font-black font-[var(--font-display)] tracking-tighter whitespace-nowrap text-white" style={{ lineHeight: 0.8 }}>SARMAHK</h1>
      </div>

      <div className="section-container relative z-10 flex flex-col items-start text-left w-full max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn className="flex flex-col items-start w-full">
          <div className="w-12 h-12 rounded-full border border-[var(--gold)]/30 flex items-center justify-center mb-10">
            <span className="w-2 h-2 bg-[var(--gold)] rounded-full animate-pulse shadow-[0_0_10px_var(--gold)]" />
          </div>

          <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mb-16">
            <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-[var(--font-display)] font-extrabold text-white uppercase tracking-tight leading-[0.9]">
              Ready to build <br className="hidden md:block" />
              <span className="text-[var(--gold)] italic font-light lowercase">the future?</span>
            </h3>

            {/* Download CV button */}
            <a
              href="/sarmahk_cv.pdf"
              download="SarmaHK_CV.pdf"
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={resetCursor}
              className="shrink-0 inline-flex items-center justify-center gap-3 transition-all duration-300 group select-none relative overflow-hidden z-20"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                letterSpacing: '0.15em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                padding: '1.25rem 3rem',
                border: '1px solid var(--gold)',
                background: 'rgba(212, 175, 55, 0.03)',
              }}
            >
              <div className="absolute inset-0 bg-[var(--gold)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

              <span className="relative z-10 group-hover:text-[var(--deep-black)] font-bold transition-colors duration-300">
                DOWNLOAD CV
              </span>
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-y-1 group-hover:text-[var(--deep-black)]">
                ↓
              </span>
            </a>
          </div>

          {/* Links Grid */}
          <div className="w-full flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-32 z-20">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('external')}
                onMouseLeave={resetCursor}
                className="text-[#a1a1aa] hover:text-[var(--gold)] transition-colors duration-300 relative group p-2"
                aria-label={link.label}
              >
                {link.icon}
                <span className="absolute left-0 bottom-[-8px] w-full h-[2px] bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            ))}
          </div>

          {/* Bottom Credits Line */}
          <div className="w-full h-px bg-white/5 mb-8" />

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
              © {new Date().getFullYear()} SARMA HK — DIGITAL ARCHITECTURE
            </span>

            <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--gold)]/50 uppercase">
              ENGINEERED IN SRI LANKA
            </span>
          </div>
        </FadeIn>
      </div >
    </footer >
  );
}
