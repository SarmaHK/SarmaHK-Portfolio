import type { Metadata } from 'next';
import { outfit, inter, jetbrainsMono } from '@/lib/fonts';
import { CursorProvider } from '@/providers/CursorProvider';
import { CreativeModeProvider } from '@/providers/CreativeModeProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navigation } from '@/components/ui/Navigation';
import { SectionIndicator } from '@/components/ui/SectionIndicator';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { CreativeModeToggle } from '@/components/ui/CreativeModeToggle';
import './globals.css';

/**
 * SEO metadata per §35.
 * Placeholders for personal details — not invented.
 */
export const metadata: Metadata = {
  title: 'Sarma HK',
  description:
    'Portfolio of Sarma HK — Software Engineering Student at the University of Kelaniya, specializing in I  oT, Cloud Computing, and modern web architectures.',
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    title: 'Sarma HK | Portfolio',
    description:
      'Explore my digital archive: Software Engineering, Hackathons, Team Leadership, and Creative Technology.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sarma HK Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarma HK | Portfolio',
    description: 'Portfolio of Sarma HK — Software Engineering Student and modern web architect.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="overflow-x-hidden w-full bg-[var(--deep-black)] text-[var(--white)] font-sans antialiased">
        <CursorProvider>
          <CreativeModeProvider>
            <LoadingProvider>
              <CustomCursor />
              <LoadingScreen />
              <Navigation />
              <SectionIndicator />
              <CommandPalette />
              {children}
              <CreativeModeToggle />
            </LoadingProvider>
          </CreativeModeProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
