'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, ArrowRight } from './Icons';

interface AboutProps {
  ready?: boolean;
}

export default function About({ ready = true }: AboutProps) {
  return (
    <section id="about" className="relative w-full bg-white text-[#111111] py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#e6e5e2]/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: The Studio & Wireframe Globe */}
          <div className="lg:col-span-5 flex flex-col justify-between min-h-[300px] sm:min-h-[360px] relative">
            
            {/* Eyebrow marker */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-[#111111]/80 tracking-normal">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>The Studio</span>
            </div>

            {/* Large Subtle Geometric Wireframe Globe matching image exactly */}
            <div className="my-6 sm:my-8 flex items-center justify-start">
              <svg
                viewBox="0 0 260 260"
                className="w-52 h-52 sm:w-64 sm:h-64 select-none pointer-events-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Circle with translucent overlapping blend */}
                <circle
                  cx="130"
                  cy="130"
                  r="110"
                  stroke="rgba(0, 0, 0, 0.11)"
                  strokeWidth="18"
                />
                
                {/* Center Vertical Ellipse */}
                <ellipse
                  cx="130"
                  cy="130"
                  rx="48"
                  ry="110"
                  stroke="rgba(0, 0, 0, 0.11)"
                  strokeWidth="18"
                />
                
                {/* Center Horizontal Equator Band */}
                <line
                  x1="12"
                  y1="130"
                  x2="248"
                  y2="130"
                  stroke="rgba(0, 0, 0, 0.11)"
                  strokeWidth="18"
                  strokeLinecap="square"
                />
              </svg>
            </div>

            {/* Bottom footnote with globe icon */}
            <div className="flex items-center gap-3 text-xs sm:text-[13px] text-[#111111]/75 max-w-xs leading-snug font-normal">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111] flex-shrink-0" />
              <span>A distributed team building across every time zone.</span>
            </div>

          </div>

          {/* Right Column: High-Impact Typography Statement & Links */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Main Statement */}
            <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-normal not-italic leading-[1.25] tracking-[-0.025em] text-[#111111] font-display">
              <span className="text-[#111111] font-bold text-[32px] sm:text-[36px] lg:text-[40px]">
                We partner with ambitious teams to ship
              </span>{' '}
              <span className="text-[#111111]/45 font-normal italic text-[32px] sm:text-[36px] lg:text-[40px]">
                digital products, brand systems, and the strategy that holds them together.
              </span>
            </h2>

            {/* Divider Line */}
            <div className="w-full h-px bg-[#e6e5e2] my-8 sm:my-10" />

            {/* Footer Row: Social Links & About Us Pill Button */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              
              {/* Find us online */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs text-[#111111]/50 font-normal">Find us online</span>
                <div className="flex items-center gap-2.5">
                  
                  {/* Terracotta Circular Social Badge (X / Twitter) */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X profile"
                    className="w-9 h-9 rounded-full bg-[#af4a20] hover:bg-[#993e18] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* Gray Circular Social Badge 1 */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Social profile"
                    className="w-9 h-9 rounded-full bg-[#ebe9e4] hover:bg-[#dedcd7] text-[#111111] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="7.5" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                    </svg>
                  </a>

                  {/* Gray Circular Social Badge 2 */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Social network"
                    className="w-9 h-9 rounded-full bg-[#ebe9e4] hover:bg-[#dedcd7] text-[#111111] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="7.5" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* About Us Pill Button with Black Arrow Circle */}
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full border border-[#e6e5e2] hover:border-[#111111]/40 bg-white text-[#111111] text-xs sm:text-sm font-medium tracking-tight shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.02]"
              >
                <span>About Us</span>
                <span className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
