'use client';

import React from 'react';
import { ArrowRight, Leaf, Boxes, PenTool } from 'lucide-react';
import { buildPricingInquiryUrl } from '@/lib/whatsapp';

interface PricingProps {
  onOpenModalWithConfig?: (configSummary: string) => void;
}

interface PlanItem {
  id: string;
  name: string;
  badge: string;
  price: number;
  description: string;
  iconType: 'leaf' | 'boxes' | 'pen';
  highlighted?: boolean;
  features: string[];
}

const PLANS: PlanItem[] = [
  {
    id: 'standard',
    name: 'Standard',
    badge: 'STANDARD',
    price: 99,
    description: 'Great for startups and personal projects with a clean and simple design.',
    iconType: 'leaf',
    highlighted: false,
    features: [
      '2 Logo Variations',
      '3 Revisions',
      'Custom Color Palette',
      'File Formats: AI, PDF SVG, PNG',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Logo Design',
    badge: 'PROFESSIONAL LOGO DESIGN',
    price: 299,
    description:
      'The comprehensive solution for businesses looking for a fully customized logo with all essential assets included.',
    iconType: 'boxes',
    highlighted: true,
    features: [
      '6 Logo Variations',
      'Unlimited Revisions',
      'Custom Color Palette & Branding Guidelines',
      'FileFormats: .AI, .PDF, .SVG, .PNG',
      'Estimated Delivery Time: 3 Days',
      'Extra assets: Favicon, Social Media Kit',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Logo Design',
    badge: 'PREMIUM LOGO DESIGN',
    price: 199,
    description:
      'For businesses seeking a solid logo with room for refinement and custom branding.',
    iconType: 'pen',
    highlighted: false,
    features: [
      '4 Logo Variations',
      '4 Revisions',
      'Custom Color Palette',
      'File Formats: AI, PDF SVG, PNG',
    ],
  },
];

export default function Pricing({ onOpenModalWithConfig }: PricingProps) {
  const handleSelectPlan = (plan: PlanItem) => {
    const summary = `${plan.name} - $${plan.price}`;
    
    // Direct WhatsApp inquiry with pre-filled details
    const whatsappUrl = buildPricingInquiryUrl(
      plan.name,
      0,
      plan.price,
      plan.features.slice(0, 2).join(', '),
      false
    );

    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }

    if (onOpenModalWithConfig) {
      onOpenModalWithConfig(summary);
    }
  };

  const renderIcon = (type: PlanItem['iconType'], isHighlighted?: boolean) => {
    if (type === 'leaf') {
      return (
        <div className="w-12 h-12 rounded-full bg-[#f4f4f4] flex items-center justify-center text-black">
          <Leaf className="w-5 h-5 stroke-[1.75]" />
        </div>
      );
    }
    if (type === 'boxes') {
      return (
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-xs">
          <Boxes className="w-5 h-5 stroke-[1.75]" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-full bg-[#f4f4f4] flex items-center justify-center text-black">
        <PenTool className="w-5 h-5 stroke-[1.75]" />
      </div>
    );
  };

  return (
    <section id="pricing" className="w-full bg-white py-20 sm:py-28 lg:py-32 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-black uppercase block mb-3 font-sans">
            PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4 font-display">
            Choose the right plan for you
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 font-normal max-w-xl mx-auto leading-relaxed">
            Find the ideal plan that fits your budget and goals. Make informed choices with ease.
          </p>
        </div>

        {/* Pricing Cards Grid: 3 columns, middle highlighted */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {PLANS.map((plan) => {
            const isDark = plan.highlighted;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-[28px] p-8 sm:p-10 transition-all duration-300 ${
                  isDark
                    ? 'bg-[#141414] text-white shadow-2xl lg:-translate-y-4 lg:scale-[1.03] z-10 border border-neutral-800'
                    : 'bg-white text-black border border-neutral-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Top Section: Icon, Badge, Price, Description */}
                <div>
                  {/* Top Icon */}
                  <div className="mb-6">{renderIcon(plan.iconType, isDark)}</div>

                  {/* Badge */}
                  <div className="mb-6">
                    <span
                      className={`inline-block text-[11px] font-bold tracking-wider px-3.5 py-1.5 rounded-full uppercase ${
                        isDark
                          ? 'bg-white text-black'
                          : 'bg-black text-white'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline mb-5">
                    <span
                      className={`text-xl sm:text-2xl font-bold mr-1.5 self-start pt-1.5 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      $
                    </span>
                    <span
                      className={`text-5xl sm:text-6xl font-extrabold tracking-tight ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      {plan.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-8 ${
                      isDark ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isDark ? 'bg-white text-black' : 'bg-black text-white'
                          }`}
                        >
                          <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isDark ? 'text-white' : 'text-neutral-900'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      isDark
                        ? 'bg-white text-black hover:bg-neutral-200 active:scale-[0.98]'
                        : 'bg-white text-neutral-900 border border-neutral-300 hover:border-black hover:bg-neutral-50 active:scale-[0.98]'
                    }`}
                  >
                    <span>Get started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
