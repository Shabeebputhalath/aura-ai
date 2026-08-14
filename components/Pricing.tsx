'use client';

import React, { useState, useEffect } from 'react';
import { DEFAULT_PRICING_CONFIG, FullPricingConfig } from './admin/PricingManager';

interface PricingProps {
  onOpenModalWithConfig?: (configSummary: string) => void;
}

const DURATIONS = [
  { label: '15 Seconds', seconds: 15 },
  { label: '30 Seconds (Popular)', seconds: 30 },
  { label: '45 Seconds', seconds: 45 },
  { label: '60 Seconds', seconds: 60 },
];

const ADD_ONS = [
  { id: 'script', name: 'Script Writing', price: 500 },
  { id: 'voiceover', name: 'AI Voiceover', price: 500 },
  { id: 'subtitles', name: 'Subtitle Integration', price: 300 },
  { id: 'thumbnail', name: 'Custom Thumbnail / Poster', price: 700 },
  { id: 'logo_anim', name: 'Logo Animation', price: 1500 },
];

const PHOTOGRAPHY_SERVICES = [
  { name: 'AI Product Image', price: '₹500 / Image' },
  { name: 'Premium Commercial Image', price: '₹800 / Image' },
  { name: 'Product Poster', price: '₹700 onwards' },
];

function CheckIcon({ className = 'w-4 h-4 text-[#b15f2c]' }: { className?: string }) {
  return (
    <div className="w-5 h-5 rounded-full bg-[#b15f2c]/10 flex items-center justify-center flex-shrink-0">
      <svg
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function Pricing({ onOpenModalWithConfig }: PricingProps) {
  const [durationSeconds, setDurationSeconds] = useState<number>(30);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isExpress, setIsExpress] = useState<boolean>(false);
  const [ratesConfig, setRatesConfig] = useState<FullPricingConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_PRICING_CONFIG;
    try {
      const stored = localStorage.getItem('aura_pricing_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.tiers) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PRICING_CONFIG;
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem('aura_pricing_config');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.tiers) setRatesConfig(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('aura_pricing_updated', handleSync);
    return () => window.removeEventListener('aura_pricing_updated', handleSync);
  }, []);

  // Rate calculations
  const starterTier = ratesConfig.tiers.find((t) => t.id === 'starter') || DEFAULT_PRICING_CONFIG.tiers[0];
  const businessTier = ratesConfig.tiers.find((t) => t.id === 'business') || DEFAULT_PRICING_CONFIG.tiers[1];
  const enterpriseTier = ratesConfig.tiers.find((t) => t.id === 'enterprise') || DEFAULT_PRICING_CONFIG.tiers[2];

  const starterPrice = durationSeconds * starterTier.ratePerSecond;
  const businessPrice = durationSeconds * businessTier.ratePerSecond;
  const enterprisePrice = durationSeconds * enterpriseTier.ratePerSecond;

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleSelectPlan = (planName: string, basePrice: number) => {
    const addOnNames = selectedAddOns
      .map((id) => ADD_ONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const addOnsTotal = selectedAddOns.reduce((sum, id) => {
      const found = ADD_ONS.find((a) => a.id === id);
      return sum + (found ? found.price : 0);
    }, 0);

    const subtotal = basePrice + addOnsTotal;
    const expressSurcharge = isExpress ? Math.round(subtotal * 0.3) : 0;
    const finalPrice = subtotal + expressSurcharge;

    const summary = `${planName} Package (${durationSeconds}s) - ₹${finalPrice.toLocaleString('en-IN')}${
      addOnNames ? ` + Add-ons: [${addOnNames}]` : ''
    }${isExpress ? ' (Express 24h)' : ''}`;

    window.open('https://instagram.com/_aura_ai', '_blank');
    if (onOpenModalWithConfig) {
      onOpenModalWithConfig(summary);
    }
  };

  return (
    <section id="pricing" className="bg-white py-20 sm:py-28 transition-colors">
      <div className="shell px-5 sm:px-8">
        
        {/* Top Header Badge & Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b15f2c]/10 text-[#b15f2c] border border-[#b15f2c]/20 text-xs font-semibold tracking-wide uppercase mb-4">
            <span>Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] leading-tight">
            Plans that work best for your{' '}
            <span className="relative inline-block text-[#b15f2c]">
              business
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#b15f2c]/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,15 Q50,2 100,15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#111111]/60 max-w-xl leading-relaxed">
            Select a duration to calculate instant prices. Clear 2026 rates with zero hidden fees.
          </p>

          {/* Duration Selector Tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 bg-[#f8f7f5] p-1.5 rounded-full border border-[#e6e5e2] shadow-sm">
            {DURATIONS.map((dur) => (
              <button
                key={dur.seconds}
                onClick={() => setDurationSeconds(dur.seconds)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  durationSeconds === dur.seconds
                    ? 'bg-[#0a0a0a] text-white shadow'
                    : 'text-[#111111]/70 hover:text-[#111111] hover:bg-[#f1f0ee]'
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-16">
          
          {/* Card 1: Starter */}
          <div className="bg-white rounded-[1.5rem] p-7 sm:p-8 border border-[#e6e5e2] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#111111]">Starter</h3>
                <p className="text-xs text-[#111111]/55 mt-1 leading-relaxed min-h-[2.5rem]">
                  AI Reels & Short Videos for Instagram, Facebook Ads & YouTube Shorts.
                </p>
              </div>

              {/* Price Tag */}
              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#111111]">
                    ₹{starterPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-[#111111]/50">
                    / {durationSeconds}s
                  </span>
                </div>
                <span className="inline-block mt-1 text-[11px] font-semibold text-[#b15f2c] bg-[#b15f2c]/10 px-2 py-0.5 rounded">
                  ₹{starterTier.ratePerSecond} / second
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan('Starter AI Reels', starterPrice)}
                className="w-full py-3.5 px-6 rounded-full bg-[#0a0a0a] hover:bg-[#222222] text-white text-xs font-semibold tracking-wide transition-all duration-200 text-center mb-8 shadow-sm"
              >
                Get Started
              </button>

              {/* Included Checklist */}
              <div>
                <p className="text-xs font-semibold text-[#111111]/70 uppercase tracking-wider mb-4">
                  What&apos;s included:
                </p>
                <ul className="flex flex-col gap-3 text-xs text-[#111111]/80">
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>AI Concept Development</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Social Media Optimized Output</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Standard Video Editing & Assembly</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>HD / 4K Video Export</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>1 Free Revision Included</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>2–5 Working Days Delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: Business (FEATURED / HIGHLIGHTED) */}
          <div className="bg-[#fcf8f5] rounded-[1.5rem] p-7 sm:p-8 border-2 border-[#b15f2c] shadow-lg flex flex-col justify-between relative hover:shadow-xl transition-all duration-300 scale-[1.02] md:-translate-y-1">
            
            {/* Featured Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#b15f2c] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
              Most Popular
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#111111]">Business</h3>
                <p className="text-xs text-[#111111]/60 mt-1 leading-relaxed min-h-[2.5rem]">
                  High-end product commercials, sound design & studio-grade AI visuals.
                </p>
              </div>

              {/* Price Tag */}
              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#111111]">
                    ₹{businessPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-[#111111]/50">
                    / {durationSeconds}s
                  </span>
                </div>
                <span className="inline-block mt-1 text-[11px] font-semibold text-[#b15f2c] bg-[#b15f2c]/15 px-2 py-0.5 rounded">
                  ₹{businessTier.ratePerSecond} / second
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan('Business Product Commercial', businessPrice)}
                className="w-full py-3.5 px-6 rounded-full bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold tracking-wide transition-all duration-200 text-center mb-8 shadow-sm"
              >
                Get Started
              </button>

              {/* Included Checklist */}
              <div>
                <p className="text-xs font-semibold text-[#111111]/70 uppercase tracking-wider mb-4">
                  Everything in Starter, plus:
                </p>
                <ul className="flex flex-col gap-3 text-xs text-[#111111]/85">
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span className="font-medium text-[#111111]">Premium AI Visual Renders</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span className="font-medium text-[#111111]">Product Showcase Focus</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Professional Premiere Pro Editing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Sound Design & Audio Mix</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Cinematic Color Grading</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>2 Free Revisions Included</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3: Enterprise */}
          <div className="bg-white rounded-[1.5rem] p-7 sm:p-8 border border-[#e6e5e2] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#111111]">Enterprise</h3>
                <p className="text-xs text-[#111111]/55 mt-1 leading-relaxed min-h-[2.5rem]">
                  Cinematic brand stories, travel, real estate & 3D Pixar style animation.
                </p>
              </div>

              {/* Price Tag */}
              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#111111]">
                    ₹{enterprisePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-[#111111]/50">
                    / {durationSeconds}s
                  </span>
                </div>
                <span className="inline-block mt-1 text-[11px] font-semibold text-[#b15f2c] bg-[#b15f2c]/10 px-2 py-0.5 rounded">
                  ₹{enterpriseTier.ratePerSecond} / second
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan('Enterprise Cinematic & 3D', enterprisePrice)}
                className="w-full py-3.5 px-6 rounded-full bg-[#0a0a0a] hover:bg-[#222222] text-white text-xs font-semibold tracking-wide transition-all duration-200 text-center mb-8 shadow-sm"
              >
                Get Started
              </button>

              {/* Included Checklist */}
              <div>
                <p className="text-xs font-semibold text-[#111111]/70 uppercase tracking-wider mb-4">
                  Everything in Business, plus:
                </p>
                <ul className="flex flex-col gap-3 text-xs text-[#111111]/80">
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Storytelling & 3D Pixar Style</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Brand Stories, Tourism & Real Estate</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Script Writing Integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>AI Voiceover Customization</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>3 Free Revisions Included</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span>Priority Queue & Fast Delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
