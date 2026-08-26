'use client';

import React from 'react';
import { Eyebrow } from './Eyebrow';
import { StaggerTestimonials } from './ui/stagger-testimonials';

export default function LandingTestimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden bg-white border-t border-[#e6e5e2]">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#b15f2c]/5 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="shell px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="mb-4">
            <Eyebrow>Client Endorsements</Eyebrow>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight font-display">
            Trusted by creators &amp; global enterprises
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8d8d8d] leading-relaxed max-w-2xl">
            See how forward-thinking studios, architectural firms, and digital directors accelerate production using AURA AI&apos;s generative workflows.
          </p>
        </div>

        {/* Interactive Stagger Testimonial Carousel */}
        <div className="w-full">
          <StaggerTestimonials />
        </div>
      </div>
    </section>
  );
}
