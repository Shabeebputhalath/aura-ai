'use client';

import React, { useState } from 'react';
import { PlayIcon, CheckIcon, GridIcon, ShieldIcon, XIcon } from './Icons';

interface AboutPageContentProps {
  ready?: boolean;
}

export default function AboutPageContent({ ready = true }: AboutPageContentProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section id="about-details" className="relative w-full bg-white text-[#111111] py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-16 sm:gap-20">
        
        {/* Top Centered Section Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111] uppercase font-display">
            ABOUT US
          </h2>
        </div>

        {/* 2-Column Intro Section: Text Narrative on Left, Video Media Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative & Details */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight leading-[1.2] font-display">
              Introduction to the best<br />
              <span className="text-[#111111]">Finest Art Supplies!</span>
            </h3>
            
            {/* Dark horizontal underline divider */}
            <div className="w-12 h-0.5 bg-[#111111] mt-3 mb-6" />

            <div className="flex flex-col gap-4 text-xs sm:text-[13px] text-[#111111]/75 leading-relaxed font-normal">
              <p>
                so every idea can be brought to life with confidence. Backed by years of experience and multiple branches, we are committed to consistency, reliability, and customer satisfaction, making us a trusted destination for art and stationery supplies.
              </p>
              <p>
                At Finest Art Supplies, we are passionate about empowering creativity at every level. With a wide range of premium art materials, painting tools, canvases, and stationery essentials, we proudly serve artists, students, and creative professionals alike. Our carefully curated products are sourced for quality, durability, and performance.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Video Container with Overlapping PIP Card */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Main Video Frame Container */}
            <div className="relative w-full aspect-[16/10] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-2 border-[#1e1b4b]/30 shadow-2xl bg-neutral-900 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80"
                alt="Creative art and video supplies"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
              />
              
              {/* Dark subtle overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

              {/* Central Translucent Play Button */}
              <button
                onClick={() => setIsPlayingVideo(true)}
                aria-label="Play video showcase"
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/75 hover:bg-white text-[#111111] backdrop-blur-md shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer z-10"
              >
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-[#222222]"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            {/* Floating Picture-in-Picture Card Overlap (Top-Right) */}
            <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 w-36 sm:w-48 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-neutral-800 z-20 hover:scale-105 transition-transform duration-300 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
                alt="Sketchbook and paints preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* Middle Stats Bar: Large Clean Pill with 3 Metric Columns */}
        <div className="w-full rounded-full border border-[#e5e5e5] bg-white py-5 sm:py-7 px-8 sm:px-14 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5] items-center text-center md:text-left">
            
            {/* Metric 1 */}
            <div className="flex items-center justify-center md:justify-start gap-4 px-4 sm:px-8">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
                100K+
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-[#111111]/60 leading-tight max-w-[100px] text-left">
                High ranking product
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center justify-center md:justify-start gap-4 px-4 sm:px-8 pt-4 md:pt-0">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
                100K+
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-[#111111]/60 leading-tight max-w-[100px] text-left">
                High ranking product
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center justify-center md:justify-start gap-4 px-4 sm:px-8 pt-4 md:pt-0">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
                100K+
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-[#111111]/60 leading-tight max-w-[100px] text-left">
                High ranking product
              </span>
            </div>

          </div>
        </div>

        {/* Bottom Feature Cards Grid: 3 Pillars with Overlapping Circular Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 pt-4">
          
          {/* Card 1: Quality (Orange Theme) */}
          <div className="relative rounded-[1.75rem] border border-[#f97316]/40 p-6 sm:p-8 pt-9 sm:pt-10 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute -top-5 left-6 w-11 h-11 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-[#ea580c] mb-2 font-display">
              Quality
            </h4>
            <p className="text-xs sm:text-[13px] text-[#111111]/70 leading-relaxed font-normal">
              Our commitment to quality ensures every tool you buy performs exactly as you expect.
            </p>
          </div>

          {/* Card 2: Variety (Navy Blue Theme) */}
          <div className="relative rounded-[1.75rem] border border-[#1e1b4b]/40 p-6 sm:p-8 pt-9 sm:pt-10 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute -top-5 left-6 w-11 h-11 rounded-full bg-[#1e1b4b] text-white flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-[#1e1b4b] mb-2 font-display">
              Varity
            </h4>
            <p className="text-xs sm:text-[13px] text-[#111111]/70 leading-relaxed font-normal">
              Our commitment to quality ensures every tool you buy performs exactly as you expect.
            </p>
          </div>

          {/* Card 3: Trust (Black Theme) */}
          <div className="relative rounded-[1.75rem] border border-black/40 p-6 sm:p-8 pt-9 sm:pt-10 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute -top-5 left-6 w-11 h-11 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-[#0a0a0a] mb-2 font-display">
              Trust
            </h4>
            <p className="text-xs sm:text-[13px] text-[#111111]/70 leading-relaxed font-normal">
              Our commitment to quality ensures every tool you buy performs exactly as you expect.
            </p>
          </div>

        </div>

      </div>

      {/* Video Modal Preview */}
      {isPlayingVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/15">
            <button
              onClick={() => setIsPlayingVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close video"
            >
              <XIcon className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Studio Commercial Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
