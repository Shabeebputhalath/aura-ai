import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AURA AI Studio — Redefining Commercials with AI',
  description:
    'Creative AI Videos | Professional Editing | Cinematic Storytelling. High-End Product Ads & AI Commercials. Elevate your brand\'s aura.',
  themeColor: '#0a0a0a',
  openGraph: {
    title: 'AURA AI Studio — Redefining Commercials with AI',
    description:
      'Creative AI Videos | Professional Editing | Cinematic Storytelling. High-End Product Ads & AI Commercials.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA AI Studio — Redefining Commercials with AI',
    description:
      'Creative AI Videos | Professional Editing | Cinematic Storytelling. High-End Product Ads & AI Commercials.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
