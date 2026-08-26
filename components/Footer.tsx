'use client';

import React from 'react';
import { LogoMark } from './Icons';
import PillButton from './PillButton';
import { LineReveal } from './TextReveal';
import { AnimatedLink } from './Eyebrow';

interface FooterProps {
  onOpenModal: () => void;
  scrollTo: (id: string) => void;
}

export default function Footer({ onOpenModal, scrollTo }: FooterProps) {
  return (
    <footer className="relative overflow-hidden rounded-t-[2rem] bg-[#0a0a0a] text-white">
      {/* Background Watermark */}
      <div className="absolute inset-x-0 -bottom-[1.5rem] z-0 text-center pointer-events-none select-none font-bold leading-none text-[10rem] sm:text-[13rem] tracking-tight text-white/5">
        AURA.AI
      </div>

      <div className="shell relative z-10 px-5 pt-20 pb-10 sm:px-8 lg:pt-24">
        {/* CTA Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-16">
          <LineReveal
            as="h2"
            lines={["Elevate your brand's aura.", "Inquiries via DM or Form."]}
            className="max-w-3xl lg:max-w-4xl text-[2.25rem] sm:text-[3.25rem] md:text-[4rem] font-bold tracking-tight text-white leading-[1.1]"
          />

          <div className="flex-shrink-0">
            <PillButton variant="light" arrow="up-right" onClick={onOpenModal}>
              Inquire via DM
            </PillButton>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
              <LogoMark className="w-5 h-5 text-[#cf8047]" />
              <span>AURA AI STUDIO</span>
            </div>
            <p className="max-w-[20rem] text-sm text-white/55 leading-relaxed">
              Redefining Commercials with AI. High-End Product Ads, Cinematic Videos & 3D Animations.
            </p>
          </div>

          {/* Studio Col */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-wider text-white/40 font-medium">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <AnimatedLink href="#home" onClick={() => scrollTo('home')}>
                  Home
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#works" onClick={() => scrollTo('works')}>
                  Work
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#about" onClick={() => scrollTo('about')}>
                  About
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#contact" onClick={() => scrollTo('contact')}>
                  Contact
                </AnimatedLink>
              </li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-wider text-white/40 font-medium">
              AI Video Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <AnimatedLink href="#pricing" onClick={() => scrollTo('pricing')}>
                  AI Reels & Short Videos (₹40/s)
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#pricing" onClick={() => scrollTo('pricing')}>
                  Product Commercial Ads (₹60/s)
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#pricing" onClick={() => scrollTo('pricing')}>
                  Storytelling Videos (₹80/s)
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#pricing" onClick={() => scrollTo('pricing')}>
                  3D Pixar Animation (₹100/s)
                </AnimatedLink>
              </li>
            </ul>
          </div>

          {/* Social Col */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-wider text-white/40 font-medium">
              Connect
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <AnimatedLink href="https://instagram.com/_aura_ai">Instagram @_aura_ai</AnimatedLink>
              </li>
              <li>
                <button
                  onClick={onOpenModal}
                  className="text-[#cf8047] hover:text-white transition-colors duration-200 text-left font-medium"
                >
                  Direct Inquiry / DM
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45">
          <p>© 2026 AURA AI Studio. Creative AI Videos | Professional Editing | Cinematic Storytelling.</p>
          <div className="flex items-center gap-6">
            <AnimatedLink href="/admin" shiftAmount={3}>
              Studio Admin
            </AnimatedLink>
            <AnimatedLink href="#privacy" shiftAmount={3}>
              50% Advance Terms
            </AnimatedLink>
            <AnimatedLink href="#terms" shiftAmount={3}>
              Revision Policy
            </AnimatedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
