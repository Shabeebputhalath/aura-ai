'use client';

import React, { useState } from 'react';
import { PlayIcon, XIcon } from './Icons';

interface AboutPageContentProps {
  ready?: boolean;
}

export default function AboutPageContent({ ready = true }: AboutPageContentProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div id="about-page-root" className="w-full bg-white text-[#111111] overflow-hidden">
      
      {/* -------------------------------------------------------------
          1. HERO SECTION: Cinematic Landscape with Overlay & Metrics Card
      -------------------------------------------------------------- */}
      <section className="relative w-full px-4 sm:px-6 lg:px-10 pt-4 pb-12 sm:pb-16 max-w-[1400px] mx-auto">
        <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-between">
          
          {/* Panoramic Landscape Background Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2000&auto=format&fit=crop&q=85"
            alt="Cinematic landscape with rolling green hills"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
          />

          {/* Atmospheric Cinematic Lighting Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[1]" />

          {/* Hero Content Grid (Left Headline + Right Metrics Card) */}
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Bold Display Headline & Mission */}
            <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-[-0.03em] leading-[1.12] font-display">
                Reimagining identity for the modern internet
              </h1>
              <p className="mt-6 text-sm sm:text-base text-white/85 leading-relaxed font-normal max-w-xl">
                Our mission is to help organizations navigate identity, compliance, and trust in an increasingly complex digital world.
              </p>
            </div>

            {/* Right: Floating White Stats Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[340px] sm:max-w-[380px] bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/40 flex flex-col gap-6 text-[#111111]">
                
                {/* Metric 1 */}
                <div className="flex flex-col relative pl-4 border-l-[3px] border-emerald-500">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
                    99.9%
                  </span>
                  <span className="text-xs sm:text-[13px] text-[#111111]/70 leading-snug mt-1">
                    Platform uptime trusted by growing and enterprise teams
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col relative pl-4 border-l-[3px] border-blue-500">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
                    100+
                  </span>
                  <span className="text-xs sm:text-[13px] text-[#111111]/70 leading-snug mt-1">
                    Seamlessly connects with existing tools and systems.
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col relative pl-4 border-l-[3px] border-amber-500">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
                    40%
                  </span>
                  <span className="text-xs sm:text-[13px] text-[#111111]/70 leading-snug mt-1">
                    Operational efficiency achieved by customers on average
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="flex flex-col relative pl-4 border-l-[3px] border-indigo-500">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
                    10k+
                  </span>
                  <span className="text-xs sm:text-[13px] text-[#111111]/70 leading-snug mt-1">
                    Businesses using our platform to scale with confidence
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* -------------------------------------------------------------
          2. SOCIAL PROOF / PARTNER LOGOS BAR
      -------------------------------------------------------------- */}
      <section className="w-full py-12 sm:py-16 border-b border-[#f0eee9]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <h2 className="text-xs sm:text-sm font-semibold text-[#111111]/80 tracking-wide mb-8">
            1000+ Companies support
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20">
            
            {/* Logo 1: PulseWave */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#111111] tracking-tight">
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white text-[10px]">
                ✦
              </span>
              <span>PulseWave</span>
            </div>

            {/* Logo 2: SunFlare */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#111111] tracking-tight">
              <span className="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-[10px]">
                ●
              </span>
              <span>SunFlare</span>
            </div>

            {/* Logo 3: TechNova */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#111111] tracking-tight">
              <span className="w-5 h-5 rounded-md bg-[#2563EB] flex items-center justify-center text-white text-[10px]">
                ❖
              </span>
              <span>TechNova</span>
            </div>

            {/* Logo 4: SkyGlide */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#111111] tracking-tight">
              <span className="w-5 h-5 rounded-full bg-[#EF4444] flex items-center justify-center text-white text-[10px]">
                ⚡
              </span>
              <span>SkyGlide</span>
            </div>

            {/* Logo 5: WidDesk */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#111111] tracking-tight">
              <span className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px]">
                ✹
              </span>
              <span>WidDesk</span>
            </div>

          </div>

        </div>
      </section>


      {/* -------------------------------------------------------------
          3. OUR MISSION & TARGET SECTION
      -------------------------------------------------------------- */}
      <section className="w-full py-16 sm:py-24 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Label + Studio Team Image */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <span className="text-xs sm:text-sm font-semibold text-[#111111]/85 tracking-normal">
              Our mission & target
            </span>

            {/* AI Video Production Team / Director Collaboration Photo */}
            <div className="w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#e8e6e1] bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80"
                alt="AI Video Production Creative Team collaborating in modern studio"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Mission & Target Paragraphs */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-normal">
            <p>
              Our mission is to solve one of the internet&apos;s biggest challenges: digital identity. We build secure, scalable, and seamless solutions that help businesses verify users with confidence, protect sensitive data, and create trust across digital interactions. By simplifying identity verification, we empower organizations to grow faster while keeping compliance and security at the forefront.
            </p>
            <p>
              Our target is businesses that require secure, scalable, and reliable digital identity solutions. We focus on helping organizations streamline verification, maintain compliance, and build trust across all online interactions.
            </p>
          </div>

        </div>
      </section>


      {/* -------------------------------------------------------------
          4. CUSTOMER STORIES THAT MATTER (Testimonials & Video Showcase)
      -------------------------------------------------------------- */}
      <section className="w-full py-16 sm:py-24 bg-white border-t border-[#f0eee9]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-12 sm:gap-16">
          
          {/* Centered Heading */}
          <div className="text-center flex flex-col items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#111111] tracking-[-0.02em] font-display">
              Customer stories that matter
            </h2>
            <p className="text-xs sm:text-sm text-[#111111]/65 max-w-lg leading-relaxed">
              Discover why growing and enterprise teams trust us to support their long-term success.
            </p>
          </div>

          {/* 3-Column Stories / Testimonials Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* Card 1: Video Portrait Card with Play Button */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto min-h-[340px] shadow-lg border border-[#e8e6e1] group bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                alt="AI Video Director & Commercial Producer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 select-none"
              />
              
              {/* Subtle Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

              {/* Play Button in Top-Left Corner matching image */}
              <button
                onClick={() => setIsPlayingVideo(true)}
                aria-label="Play testimonial video story"
                className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#f97316] shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer z-10"
              >
                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            {/* Card 2: Testimonial 1 (Michael Chen) */}
            <div className="rounded-3xl border border-[#f0eee9] bg-[#faf9f6]/70 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-normal">
                &ldquo;This platform transformed the way our teams collaborate. Processes that used to take days now take hours, and we can scale without adding complexity.&rdquo;
              </p>

              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-[#e8e6e1]/70">
                {/* Avatar */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Michael Chen"
                  className="w-10 h-10 rounded-full object-cover border border-[#e8e6e1]"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-[#111111]">
                    Michael Chen
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#111111]/55 font-normal">
                    Operations Lead
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Testimonial 2 (Emily Carter) */}
            <div className="rounded-3xl border border-[#f0eee9] bg-[#faf9f6]/70 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-normal">
                &ldquo;Adopting this software was seamless, and the impact was immediate. It integrates well with our existing tools and drives measurable results.&rdquo;
              </p>

              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-[#e8e6e1]/70">
                {/* Avatar */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Emily Carter"
                  className="w-10 h-10 rounded-full object-cover border border-[#e8e6e1]"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-[#111111]">
                    Emily Carter
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#111111]/55 font-normal">
                    Product Manager
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

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
                title="Customer Story Video Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
