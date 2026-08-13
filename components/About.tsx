'use client';

import React from 'react';
import { Eyebrow } from './Eyebrow';
import { WordReveal } from './TextReveal';
import PillButton from './PillButton';
import { Globe, TwitterIcon, CircleDot } from './Icons';

interface AboutProps {
  ready: boolean;
}

export default function About({ ready }: AboutProps) {
  return (
    <section id="about" className="bg-white">
      <div className="shell grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-5 py-20 sm:px-8 lg:py-28">
        {/* Left — Globe Block */}
        <div className="relative min-h-[14rem] lg:min-h-[20rem] flex flex-col justify-between">
          <Globe className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-[12rem] h-[12rem] sm:w-[16rem] sm:h-[16rem] lg:w-[20rem] lg:h-[20rem] text-[#111111]/10 pointer-events-none select-none" />

          <div className="relative z-10">
            <Eyebrow tone="dark">About AURA AI</Eyebrow>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-sm text-[#111111]/70 max-w-[20rem]">
            <Globe className="w-6 h-6 text-[#111111] flex-shrink-0" />
            <p>Redefining Commercials with AI. Worldwide digital video creation & editing.</p>
          </div>
        </div>

        {/* Right — Statement & Socials */}
        <div className="flex flex-col gap-10">
          <WordReveal
            ready={ready}
            text="We redefine video commercials using cutting-edge AI."
            mutedText="High-end product ads, cinematic video storytelling, and 3D Pixar animations crafted to elevate your brand's aura."
            className="text-2xl sm:text-3xl font-medium leading-snug tracking-[-0.01em] text-[#111111]"
          />

          {/* Footer Row */}
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[#e6e5e2] pt-6">
            {/* Social Chips */}
            <div className="flex flex-col gap-2">
              <span className="text-sm text-[#111111]/45">Follow us on Instagram</span>
              <div className="flex items-center gap-2">
                {/* Instagram Handle */}
                <a
                  href="https://instagram.com/_aura_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#0a0a0a] text-white text-xs font-semibold tracking-wide flex items-center gap-2 transition-transform duration-300 hover:scale-105"
                  aria-label="Instagram @_aura_ai"
                >
                  <span className="text-[#cf8047]">@</span>_aura_ai
                </a>
              </div>
            </div>

            {/* About CTA */}
            <PillButton variant="outline" arrow="right" href="#pricing">
              Get Price Quote
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
