'use client';

import React from 'react';
import LiquidReveal from './LiquidReveal';
import HeroCard from './HeroCard';
import PillButton from './PillButton';
import { Eyebrow } from './Eyebrow';
import { LineReveal } from './TextReveal';
import { Star, CircleDot } from './Icons';

interface HeroProps {
  ready: boolean;
  onOpenModal: () => void;
  scrollTo: (id: string) => void;
}

const PARTNERS = [
  'Instagram',
  'Meta Ads',
  'YouTube',
  'E-Commerce',
  'Real Estate',
  'Lifestyle',
  'Fashion',
];

export default function Hero({ ready, onOpenModal, scrollTo }: HeroProps) {
  return (
    <section id="home" className="relative isolate overflow-hidden rounded-b-[2rem] bg-[#c9c9c9]">
      {/* Liquid Reveal Background */}
      <LiquidReveal />

      {/* Legibility Vignette Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-white/35 via-transparent to-white/35" />

      {/* Brand Watermark */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[7rem] z-1 text-center select-none font-bold leading-none text-[10rem] sm:text-[13rem] tracking-tight text-white/40 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          opacity: ready ? 0.4 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: ready ? '300ms' : '0ms',
        }}
      >
        AURA.AI
      </div>

      {/* Main Content Grid */}
      <div className="shell relative z-20 flex flex-col gap-8 px-5 pt-[7rem] pb-[5rem] sm:px-8 lg:grid lg:min-h-lvh lg:grid-cols-12 lg:gap-10 lg:pt-[9rem] lg:pb-[7rem]">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-7 justify-between">
          <div className="flex flex-col gap-7">
            {/* Eyebrow */}
            <div
              className="transition-all duration-500 ease-out"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: ready ? '200ms' : '0ms',
              }}
            >
              <Eyebrow tone="dark">AI Video Production Studio</Eyebrow>
            </div>

            {/* Main Headline (Line Reveal) */}
            <LineReveal
              as="h1"
              ready={ready}
              delay={250}
              lineStagger={120}
              lines={['Redefining', 'Commercials', 'with AI.']}
              className="max-w-[18ch] text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] font-semibold leading-[0.98] tracking-[-0.02em] text-[#111111]"
            />

            {/* Rating Row */}
            <div
              className="flex items-center gap-3 transition-all duration-500 ease-out"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: ready ? '650ms' : '0ms',
              }}
            >
              <div className="flex items-center gap-1 text-[#b15f2c]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#111111]/70">
                High-End Product Ads & Cinematic Videos • 40+ Posts & Campaigns
              </span>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap items-center gap-3 pt-1 transition-all duration-500 ease-out"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: ready ? '750ms' : '0ms',
              }}
            >
              <PillButton variant="dark" arrow="right" onClick={onOpenModal}>
                Inquire via DM / Form
              </PillButton>
              <PillButton variant="outline" onClick={() => scrollTo('pricing')}>
                View Pricing
              </PillButton>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-8 justify-between">
          {/* Interactive Carousel Card */}
          <HeroCard ready={ready} />

          {/* Partners Trusted By */}
          <div
            className="w-full max-w-[24rem] lg:w-[19rem] transition-all duration-500 ease-out"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(14px)',
              transitionDelay: ready ? '550ms' : '0ms',
            }}
          >
            <p className="mb-3 text-xs font-medium text-[#111111]/45 text-left lg:text-right">
              Optimized For & Suitable For
            </p>
            <div className="grid grid-cols-4 gap-x-4 gap-y-3">
              {PARTNERS.map((partner) => (
                <span
                  key={partner}
                  className="inline-flex items-center gap-1.5 text-xs text-[#111111]/70 hover:text-[#111111] transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                >
                  <CircleDot className="w-3.5 h-3.5 text-[#111111]/40 flex-shrink-0" />
                  <span className="truncate">{partner}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div
        className="relative z-20 border-t border-[#111111]/10 py-5 transition-opacity duration-700 ease-out"
        style={{
          opacity: ready ? 1 : 0,
          transitionDelay: ready ? '900ms' : '0ms',
        }}
      >
        <div className="shell px-5 sm:px-8 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#111111]/60">
          <span>AI Video Production 2026</span>
          <span className="hidden sm:inline">Elevate Your Brand&apos;s Aura</span>
          <button
            onClick={() => scrollTo('pricing')}
            className="inline-flex items-center gap-2 hover:text-[#111111] transition-colors"
          >
            <span>Explore Pricing & Services</span>
            <span>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
