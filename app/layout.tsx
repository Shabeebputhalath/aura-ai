import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={onest.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
