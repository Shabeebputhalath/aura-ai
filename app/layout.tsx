import type { Metadata } from 'next';
import './globals.css';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
