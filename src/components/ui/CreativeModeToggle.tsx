'use client';

import { useCreativeMode } from '@/providers/CreativeModeProvider';
import { useCursorState } from '@/providers/CursorProvider';

/**
 * Creative Mode / Lab Mode toggle per §22.
 * Subtle persistent toggle — normal mode is the professional default.
 */
export function CreativeModeToggle() {
  const { isCreativeMode, toggleCreativeMode } = useCreativeMode();
  const { setCursor, resetCursor } = useCursorState();

  return (
    <button
      onClick={toggleCreativeMode}
      onMouseEnter={() => setCursor('open')}
      onMouseLeave={resetCursor}
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 transition-all duration-300 cursor-none group"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5625rem',
        letterSpacing: '0.2em',
        color: isCreativeMode ? 'var(--gold)' : 'var(--muted-grey)',
        textTransform: 'uppercase',
        background: 'none',
        border: 'none',
        padding: '0.5rem',
        opacity: 0.5,
      }}
      aria-label={isCreativeMode ? 'Switch to professional mode' : 'Switch to lab mode'}
      title={isCreativeMode ? 'EXIT LAB MODE' : 'ENTER LAB MODE'}
    >
      {/* Toggle indicator */}
      <div
        className="relative transition-colors duration-300"
        style={{
          width: '24px',
          height: '12px',
          borderRadius: '6px',
          border: `1px solid ${isCreativeMode ? 'var(--gold)' : 'var(--border)'}`,
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
          style={{
            width: '6px',
            height: '6px',
            background: isCreativeMode ? 'var(--gold)' : 'var(--muted-grey)',
            left: isCreativeMode ? '14px' : '2px',
          }}
        />
      </div>
      <span className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isCreativeMode ? 'LAB' : 'PRO'}
      </span>
    </button>
  );
}
