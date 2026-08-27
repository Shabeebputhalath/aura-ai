'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play as PlayIcon, X as XIcon } from 'lucide-react';

interface AboutPageContentProps {
  ready?: boolean;
}

export default function AboutPageContent({ ready = true }: AboutPageContentProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const bodyText =
    'A distributed team building across every time zone. We partner with ambitious teams to ship digital products, brand systems, and the strategy that holds them together.';

  const bodyWords = useMemo(() => bodyText.split(' '), [bodyText]);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      const startOffset = windowHeight * 0.8;
      const endOffset = windowHeight * 0.25;
      const totalDistance = rect.height + (startOffset - endOffset);

      const currentPosition = startOffset - rect.top;
      const progress = Math.min(Math.max(currentPosition / totalDistance, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div id="about-page-root" className="w-full bg-white text-[#111111] overflow-hidden">
      
      {/* -------------------------------------------------------------
          1. HERO SECTION: Clean 4-Corner Accent White Hero with On-Scroll Reveal
      -------------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[88vh] lg:min-h-screen bg-white text-[#111111] flex flex-col items-center justify-center py-16 sm:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden select-none border-b border-[#f0eee9]"
      >
        {/* Top-Left Corner Bracket (Red / Coral) */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:top-10 lg:left-12 pointer-events-none z-10">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22"
          >
            <path
              d="M 8 76 L 8 40 C 8 22.327 22.327 8 40 8 L 76 8"
              stroke="#EF3842"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Top-Right Corner Bracket (Cobalt / Blue) */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 lg:top-10 lg:right-12 pointer-events-none z-10">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22"
          >
            <path
              d="M 4 8 L 40 8 C 57.673 8 72 22.327 72 40 L 72 76"
              stroke="#1D70B8"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Bottom-Left Corner Bracket (Teal / Cyan) */}
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-12 pointer-events-none z-10">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22"
          >
            <path
              d="M 8 4 L 8 40 C 8 57.673 22.327 72 40 72 L 76 72"
              stroke="#00A896"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Bottom-Right Corner Bracket (Warm Amber / Orange) */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12 pointer-events-none z-10">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22"
          >
            <path
              d="M 4 72 L 40 72 C 57.673 72 72 57.673 72 40 L 72 4"
              stroke="#F58220"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Center Content */}
        <div className="relative z-20 w-full max-w-2xl sm:max-w-3xl mx-auto flex flex-col items-center justify-center text-center my-auto px-4 sm:px-6">
          <p className="text-base sm:text-xl md:text-2xl lg:text-[25px] leading-[1.65] sm:leading-[1.55] tracking-[-0.015em] font-normal font-display text-center">
            {bodyWords.map((word, idx) => {
              const threshold = idx / bodyWords.length;
              const isFilled = scrollProgress >= threshold;
              const partial = Math.min(Math.max((scrollProgress - threshold + 0.08) / 0.12, 0), 1);
              const currentAlpha = 0.22 + partial * 0.78;

              return (
                <span
                  key={idx}
                  className="inline-block mr-[0.26em] transition-colors duration-200 ease-out"
                  style={{
                    color: isFilled
                      ? '#000000'
                      : `rgba(0, 0, 0, ${currentAlpha})`,
                    fontWeight: isFilled ? 600 : 400,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. STUDIO MISSION & TEAM COLLABORATION
      -------------------------------------------------------------- */}
      <section className="w-full py-16 sm:py-24 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <span className="text-xs sm:text-sm font-semibold text-[#111111]/85 tracking-normal">
              Our mission & vision
            </span>
            <div className="w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#e8e6e1] bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80"
                alt="Creative AI Studio Team collaborating in modern design laboratory"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6 text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-normal">
            <p>
              We are an AI video and digital design collective engineering next-generation brand experiences, cinematic commercial ads, and bespoke strategy for pioneering brands worldwide.
            </p>
            <p>
              By unifying synthetic intelligence, high-fidelity 3D visualization, and bold art direction, we empower founders and marketing leaders to produce campaign assets at unprecedented velocity without compromising craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. CUSTOMER STORIES & CLIENT IMPACT
      -------------------------------------------------------------- */}
      <section className="w-full py-16 sm:py-24 bg-white border-t border-[#f0eee9]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-12 sm:gap-16">
          <div className="text-center flex flex-col items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#111111] tracking-[-0.02em] font-display">
              Customer stories that matter
            </h2>
            <p className="text-xs sm:text-sm text-[#111111]/65 max-w-lg leading-relaxed">
              Discover why growing and enterprise teams partner with us to transform their commercial visual identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto min-h-[340px] shadow-lg border border-[#e8e6e1] group bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                alt="AI Video Director & Commercial Producer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              <button
                onClick={() => setIsPlayingVideo(true)}
                aria-label="Play testimonial video story"
                className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#f97316] shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer z-10"
              >
                <PlayIcon className="w-5 h-5 fill-current ml-0.5" />
              </button>
            </div>

            <div className="rounded-3xl border border-[#f0eee9] bg-[#faf9f6]/70 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-normal">
                &ldquo;Aura Studio reimagined our product commercials completely. The AI-generated renders and cinematic motion delivered a 3.4x spike in ad engagement across all global channels.&rdquo;
              </p>
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-[#e8e6e1]/70">
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
                    Brand Director, TechNova
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#f0eee9] bg-[#faf9f6]/70 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-normal">
                &ldquo;From prompt to final 4K masters, the speed and aesthetic precision were unbelievable. They are our go-to creative partner for all brand product launches.&rdquo;
              </p>
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-[#e8e6e1]/70">
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
                    VP Marketing, PulseWave
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
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
