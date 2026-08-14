'use client';

import React, { useState } from 'react';
import AdaptiveGrid from '@/components/AdaptiveGrid';
import Header from '@/components/Header';
import AboutPageContent from '@/components/AboutPageContent';
import Stats from '@/components/Stats';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import NavMenu from '@/components/NavMenu';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (id: string) => {
    if (id === 'home') {
      window.location.href = '/';
    } else if (id === 'works') {
      window.location.href = '/works';
    } else if (id === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'contact') {
      window.location.href = '/contact';
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleOpenContact = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white">
      <AdaptiveGrid />

      {/* Header with active 'about' tab */}
      <Header
        ready={true}
        currentId="about"
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenModal={handleOpenContact}
        scrollTo={handleNavigate}
      />

      {/* Main Content */}
      <main id="main" className="pt-24 sm:pt-28">
        <AboutPageContent ready={true} />

        {/* Studio Impact & Metrics */}
        <div className="border-t border-[#e6e5e2]/80">
          <Stats />
        </div>

        {/* FAQ Section */}
        <div className="border-t border-[#e6e5e2]/80">
          <FAQ />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenModal={handleOpenContact}
        scrollTo={handleNavigate}
      />

      {/* Drawer Nav Menu */}
      <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenModal={handleOpenContact}
        scrollTo={handleNavigate}
        stopScroll={() => {}}
        startScroll={() => {}}
      />
    </div>
  );
}
