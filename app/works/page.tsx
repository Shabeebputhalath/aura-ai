'use client';

import React, { useState } from 'react';
import AdaptiveGrid from '@/components/AdaptiveGrid';
import Header from '@/components/Header';
import Works3DShowcase from '@/components/Works3DShowcase';
import CreateBand from '@/components/CreateBand';
import Footer from '@/components/Footer';
import NavMenu from '@/components/NavMenu';
import Link from 'next/link';

export default function WorksPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (id: string) => {
    if (id === 'home') {
      window.location.href = '/';
    } else if (id === 'works') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'about') {
      window.location.href = '/about';
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
    <div className="relative min-h-screen bg-[#f4f3ef] text-[#111111] font-sans selection:bg-[#111111] selection:text-white">
      <AdaptiveGrid />

      {/* Header with active 'works' tab */}
      <Header
        ready={true}
        currentId="works"
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenModal={handleOpenContact}
        scrollTo={handleNavigate}
      />

      {/* Main Works Section */}
      <main id="main" className="pt-28 sm:pt-36 pb-16 space-y-16 sm:space-y-24">
        {/* Page Hero Header */}
        <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#e6e5e2]">
            <div className="space-y-4 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 bg-white border border-[#e6e5e2] px-4 py-2 rounded-2xl shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b15f2c]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Interactive 3D Spatial Gallery
                </span>
                <span className="bg-[#b15f2c]/10 text-[#b15f2c] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  8+ Signature Campaigns
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] leading-[1.08]">
                Commercial Showcase & AI Video Works
              </h1>
              
              <p className="text-base sm:text-lg text-[#111111]/70 leading-relaxed max-w-2xl">
                Explore our signature AI product ads, cinematic reel narratives, and 3D Pixar-style animations. Drag, scroll, or spin the 3D cylinder to interact with each campaign.
              </p>
            </div>

            {/* Quick Action */}
            <div className="flex items-center gap-3">
              <Link
                href="/pricing"
                className="px-5 py-3 rounded-2xl bg-white border border-[#e6e5e2] text-xs font-bold text-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-xs"
              >
                🏷 View Rate Card
              </Link>
              <Link
                href="/contact"
                className="px-5 py-3 rounded-2xl bg-[#111111] text-white text-xs font-bold hover:bg-[#b15f2c] transition-all shadow-md flex items-center gap-2"
              >
                <span>Produce Your Ad</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3D Circular Spatial Showcase Section */}
        <section className="px-4 sm:px-8 lg:px-16 max-w-[90rem] mx-auto">
          <Works3DShowcase />
        </section>

        {/* AI Production Pipeline Capabilities Block */}
        <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#e6e5e2] p-8 sm:p-12 shadow-xs space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#b15f2c] font-bold">
                The AURA AI Studio Difference
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                High-End Creative Direction Meets Generative AI
              </h2>
              <p className="text-xs sm:text-sm text-[#111111]/60">
                Every frame is meticulously crafted using cutting-edge models combined with human post-production color grading and sound design.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-[#f4f3ef] p-6 rounded-2xl border border-[#e6e5e2] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg text-[#b15f2c] font-bold border border-[#e6e5e2]">
                  ✦
                </div>
                <h3 className="text-base font-bold text-[#111111]">Multi-Model AI Video</h3>
                <p className="text-xs text-[#111111]/70 leading-relaxed">
                  We blend Runway Gen-3 Alpha, Midjourney v6.1, Kling AI, and Luma Dream Machine to achieve cinema-grade motion consistency.
                </p>
              </div>

              <div className="bg-[#f4f3ef] p-6 rounded-2xl border border-[#e6e5e2] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg text-[#b15f2c] font-bold border border-[#e6e5e2]">
                  🔊
                </div>
                <h3 className="text-base font-bold text-[#111111]">Custom Foley & Audio Stems</h3>
                <p className="text-xs text-[#111111]/70 leading-relaxed">
                  Synthetic voice synthesis via ElevenLabs paired with custom acoustic sound design, risers, and licensed commercial music.
                </p>
              </div>

              <div className="bg-[#f4f3ef] p-6 rounded-2xl border border-[#e6e5e2] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg text-[#b15f2c] font-bold border border-[#e6e5e2]">
                  ⚡
                </div>
                <h3 className="text-base font-bold text-[#111111]">48-Hour Rapid Delivery</h3>
                <p className="text-xs text-[#111111]/70 leading-relaxed">
                  Go from concept script to 4K master delivery in 2 to 3 business days, with optional express 24-hour rush turnaround.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Band */}
        <div>
          <CreateBand />
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

