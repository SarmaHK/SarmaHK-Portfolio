import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';

export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});
