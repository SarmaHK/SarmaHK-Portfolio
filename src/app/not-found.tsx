import Link from 'next/link';

/**
 * Custom 404 page per §25.
 * "YOU FOUND A BUG. OR MAYBE A FEATURE."
 */
export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'var(--deep-black)' }}
    >
      {/* 404 — oversized */}
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'var(--white)',
          lineHeight: 1,
        }}
      >
        404
      </h1>

      {/* Message */}
      <div
        className="mt-6 flex flex-col items-center gap-2"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
          fontWeight: 300,
          color: 'var(--soft-white)',
          letterSpacing: '0.05em',
          textAlign: 'center',
        }}
      >
        <p>YOU FOUND A BUG.</p>
        <p>OR MAYBE A FEATURE.</p>
      </div>

      {/* Terminal-style nav hint */}
      <div
        className="mt-12 flex items-center gap-2"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--gold)',
          letterSpacing: '0.05em',
        }}
      >
        <span style={{ color: 'var(--muted-grey)' }}>$</span>
        <Link
          href="/"
          className="hover:underline underline-offset-4 transition-colors duration-300"
          style={{ color: 'var(--gold)' }}
        >
          cd /archive
        </Link>
      </div>

      {/* Metadata */}
      <p
        className="absolute bottom-8"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          letterSpacing: '0.2em',
          color: 'var(--muted-grey)',
          textTransform: 'uppercase',
        }}
      >
        SarmaHK / ERROR_STATE
      </p>
    </div >
  );
}
