'use client';

import React, { useState, useEffect } from 'react';
import { User, Sparkles, Building2, Layers, Check, MessageSquare, ArrowRight } from 'lucide-react';
import { DEFAULT_PRICING_CONFIG, FullPricingConfig } from './admin/PricingManager';
import { PricingColumn, PricingColumnProps } from '@/components/ui/pricing-utils/pricing-column';
import { Section } from '@/components/ui/pricing-utils/section';
import { buildPricingInquiryUrl } from '@/lib/whatsapp';

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
  { id: 'thumbnail', name: 'Custom Poster / Thumbnail', price: 700 },
  { id: 'logo_anim', name: 'Logo Animation', price: 1500 },
];

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
  const starterTier =
    ratesConfig.tiers.find((t) => t.id === 'starter') || DEFAULT_PRICING_CONFIG.tiers[0];
  const businessTier =
    ratesConfig.tiers.find((t) => t.id === 'business') || DEFAULT_PRICING_CONFIG.tiers[1];
  const enterpriseTier =
    ratesConfig.tiers.find((t) => t.id === 'enterprise') || DEFAULT_PRICING_CONFIG.tiers[2];

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

    const summary = `${planName} (${durationSeconds}s) - ₹${finalPrice.toLocaleString('en-IN')}${
      addOnNames ? ` + Add-ons: [${addOnNames}]` : ''
    }${isExpress ? ' (Express 24h)' : ''}`;

    // Generate dedicated WhatsApp link with pre-filled details
    const whatsappUrl = buildPricingInquiryUrl(
      planName,
      durationSeconds,
      finalPrice,
      addOnNames || undefined,
      isExpress
    );

    window.open(whatsappUrl, '_blank');

    if (onOpenModalWithConfig) {
      onOpenModalWithConfig(summary);
    }
  };

  const plans: PricingColumnProps[] = [
    {
      name: 'Starter',
      icon: <User className="size-4 text-gray-700" />,
      description: 'AI Reels & Short Videos for Instagram, Facebook Ads & YouTube Shorts.',
      price: `₹${starterPrice.toLocaleString('en-IN')}`,
      priceNote: `₹${starterTier.ratePerSecond}/sec · ${durationSeconds}s video output`,
      cta: {
        variant: 'outline',
        label: 'Book Starter on WhatsApp',
        onClick: () => handleSelectPlan('Starter AI Reels', starterPrice),
      },
      features: [
        'AI Concept & Prompt Development',
        'Social Media Optimized 9:16 Aspect Ratio',
        'Standard Video Editing & Assembly',
        'Full HD / 4K Video Export',
        '1 Free Revision Round Included',
        '2–5 Working Days Delivery',
      ],
      variant: 'default',
    },
    {
      name: 'Business',
      icon: <Sparkles className="size-4 text-brand" />,
      description: 'High-end product commercials, sound design & studio-grade AI visuals.',
      price: `₹${businessPrice.toLocaleString('en-IN')}`,
      priceNote: `₹${businessTier.ratePerSecond}/sec · ${durationSeconds}s commercial`,
      promotionText: 'MOST POPULAR',
      cta: {
        variant: 'glow-brand',
        label: 'Book Business on WhatsApp',
        onClick: () => handleSelectPlan('Business Product Commercial', businessPrice),
      },
      features: [
        'Premium AI Visual & Texture Renders',
        'Product Showcase & Macro Details',
        'Professional Premiere Pro Editing',
        'Custom Sound Design & Audio Mixing',
        'Cinematic Studio Color Grading',
        '2 Free Revisions Included',
      ],
      variant: 'glow-brand',
    },
    {
      name: 'Enterprise',
      icon: <Building2 className="size-4 text-blue-600" />,
      description: 'Cinematic brand stories, travel, real estate & 3D Pixar-style animation.',
      price: `₹${enterprisePrice.toLocaleString('en-IN')}`,
      priceNote: `₹${enterpriseTier.ratePerSecond}/sec · ${durationSeconds}s cinematic`,
      cta: {
        variant: 'glow',
        label: 'Book Enterprise on WhatsApp',
        onClick: () => handleSelectPlan('Enterprise Cinematic & 3D', enterprisePrice),
      },
      features: [
        'Storytelling & 3D Character/Style',
        'Brand Stories, Tourism & Real Estate',
        'Script Writing & Flow Integration',
        'AI Voiceover & Sound Master',
        '3 Free Revisions Included',
        'Priority Rendering Queue & Fast Turnaround',
      ],
      variant: 'glow',
    },
  ];

  return (
    <Section id="pricing" className="bg-white py-20 sm:py-28 transition-colors">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {/* Header Block */}
        <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/10 text-brand border border-brand/20 text-xs font-bold tracking-wider uppercase">
            <Layers className="size-3.5" />
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
            Plans that work best for your{' '}
            <span className="relative inline-block text-brand">
              business
            </span>
          </h2>

          <p className="text-sm text-muted-foreground sm:text-base max-w-[620px] leading-relaxed">
            Select a commercial duration to calculate transparent, instant rates. Powered by AURA Studio OS with zero hidden fees.
          </p>

          {/* Interactive Duration Selector */}
          <div className="mt-2 inline-flex flex-wrap items-center justify-center gap-1.5 bg-muted/60 p-1.5 rounded-full border border-border/80 shadow-2xs">
            {DURATIONS.map((dur) => (
              <button
                key={dur.seconds}
                onClick={() => setDurationSeconds(dur.seconds)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  durationSeconds === dur.seconds
                    ? 'bg-foreground text-background shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Launch UI Shadcn Cards */}
        <div className="w-full grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          {plans.map((plan) => (
            <PricingColumn
              key={plan.name}
              name={plan.name}
              icon={plan.icon}
              description={plan.description}
              price={plan.price}
              originalPrice={plan.originalPrice}
              promotionText={plan.promotionText}
              priceNote={plan.priceNote}
              cta={plan.cta}
              features={plan.features}
              variant={plan.variant}
              className={plan.className}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

