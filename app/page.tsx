'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import AdaptiveGrid from '@/components/AdaptiveGrid';
import PageLoader from '@/components/PageLoader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CreateBand from '@/components/CreateBand';
import LandingProjectShowcase from '@/components/LandingProjectShowcase';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Stats from '@/components/Stats';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import NavMenu from '@/components/NavMenu';

export default function Home() {
  const [ready, setReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const handleOpenContact = useCallback(() => {
    window.location.href = '/contact';
  }, []);

  useEffect(() => {
    // Reset scroll position on initial load
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    function raf(t: number) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stopScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    document.documentElement.style.position = 'relative';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
  }, []);

  const startScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    document.documentElement.style.removeProperty('position');
    document.documentElement.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('height');
  }, []);

  const handleScrollTo = useCallback((id: string) => {
    if (id === 'works') {
      window.location.href = '/works';
      return;
    }
    if (id === 'about') {
      window.location.href = '/about';
      return;
    }
    if (id === 'contact') {
      window.location.href = '/contact';
      return;
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetEl = document.getElementById(id);
    if (targetEl && lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, { duration: 1.2 });
    } else if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleLoaderFinish = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      <AdaptiveGrid />

      {/* Skip Link for Accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[0.875rem] focus:bg-[#0a0a0a] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      {/* Intro Page Loader */}
      <PageLoader
        onFinish={handleLoaderFinish}
        stopScroll={stopScroll}
        startScroll={startScroll}
      />

      {/* Fixed Header */}
      <Header
        ready={ready}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenModal={handleOpenContact}
        scrollTo={handleScrollTo}
      />

      {/* Main Content Area */}
      <main id="main" className="relative">
        <Hero
          ready={ready}
          onOpenModal={handleOpenContact}
          scrollTo={handleScrollTo}
        />
        <About ready={ready} />
        <CreateBand />
        <LandingProjectShowcase />
        <Services />
        <Pricing onOpenModalWithConfig={handleOpenContact} />
        <FAQ />
        <Stats />
      </main>

      {/* Footer */}
      <Footer
        onOpenModal={handleOpenContact}
        scrollTo={handleScrollTo}
      />

      {/* Full-screen Nav Menu Overlay */}
      <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenModal={handleOpenContact}
        scrollTo={handleScrollTo}
        stopScroll={stopScroll}
        startScroll={startScroll}
      />
    </>
  );
}
