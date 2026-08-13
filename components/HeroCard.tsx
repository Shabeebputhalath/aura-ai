'use client';

import React, { useState } from 'react';
import { LogoMark, ArrowRight } from './Icons';

interface CarouselItem {
  caption: string;
  title: string;
}

const ITEMS: CarouselItem[] = [
  { caption: 'AI Product Ads', title: 'High-End Visuals from ₹60/s' },
  { caption: 'Reels & Shorts', title: 'Viral Ads starting ₹40/s' },
  { caption: 'Cinematic Stories', title: 'Brand Storytelling from ₹80/s' },
  { caption: '3D Pixar Animation', title: '3D Styling starting ₹100/s' },
];

export default function HeroCard({ ready }: { ready: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % ITEMS.length);
    setTimeout(() => setAnimating(false), 300);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
    setTimeout(() => setAnimating(false), 300);
  };

  const currentItem = ITEMS[currentIndex];

  return (
    <div
      onClick={() => handleNext()}
      className="w-full max-w-[24rem] lg:w-[19rem] rounded-[1.25rem] bg-white/70 p-2 shadow-sm ring-1 ring-[#e6e5e2]/70 backdrop-blur-md cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
        transitionDelay: ready ? '400ms' : '0ms',
      }}
    >
      <div className="flex gap-2 rounded-[0.875rem]">
        {/* Left Tile */}
        <div className="aspect-square w-24 grid place-items-center rounded-[0.875rem] bg-[#0a0a0a] text-white flex-shrink-0">
          <LogoMark className="w-8 h-8 text-[#cf8047]" />
        </div>

        {/* Right Panel */}
        <div className="flex-1 rounded-[0.875rem] bg-[#f1f0ee]/70 p-3 flex flex-col justify-between">
          {/* Top Text Slot */}
          <div className="relative min-h-[3.25rem] overflow-hidden">
            <div
              className={`transition-all duration-300 ease-out ${
                animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              <span className="block text-[0.65rem] font-medium uppercase tracking-wider text-[#111111]/45">
                {currentItem.caption}
              </span>
              <h4 className="max-w-[8rem] text-sm font-medium leading-snug text-[#111111]">
                {currentItem.title}
              </h4>
            </div>
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center justify-between pt-1">
            {/* Dashes Indicator */}
            <div className="flex items-center gap-1">
              {ITEMS.map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: idx === currentIndex ? '1rem' : '0.375rem',
                    backgroundColor:
                      idx === currentIndex
                        ? 'rgba(17,17,17,0.7)'
                        : 'rgba(17,17,17,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="w-7 h-7 grid place-items-center rounded-full bg-white text-[#111111]/70 ring-1 ring-[#e6e5e2] hover:text-[#111111] transition-colors"
                aria-label="Previous slide"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
              <button
                onClick={(e) => handleNext(e)}
                className="w-7 h-7 grid place-items-center rounded-full bg-white text-[#111111]/70 ring-1 ring-[#e6e5e2] hover:text-[#111111] transition-colors"
                aria-label="Next slide"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
