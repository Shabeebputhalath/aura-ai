'use client';

import React, { useState } from 'react';
import ContactSection from '@/components/ContactSection';
import NavMenu from '@/components/NavMenu';

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <ContactSection
        onOpenMenu={() => setIsMenuOpen(true)}
        isStandalonePage={true}
      />

      <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenModal={() => {
          window.open('https://instagram.com/_aura_ai', '_blank');
        }}
        scrollTo={(id) => {
          window.location.href = `/#${id}`;
        }}
        stopScroll={() => {}}
        startScroll={() => {}}
      />
    </main>
  );
}
