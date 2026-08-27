'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';

interface AboutProps {
  ready?: boolean;
}

export default function About({ ready = true }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Exact text content formatted for balanced, rhythmic typography:
  // "A distributed team building across every time zone. We partner with ambitious teams to ship digital products, brand systems, and the strategy that holds them together."
  const bodyText =
    'A distributed team building across every time zone. We partner with ambitious teams to ship digital products, brand systems, and the strategy that holds them together.';

  // Split into words for fine-grained progressive on-scroll text color reveal
  const bodyWords = useMemo(() => bodyText.split(' '), [bodyText]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Start revealing when the section enters viewport and complete when centered
      const startOffset = windowHeight * 0.82;
      const endOffset = windowHeight * 0.22;
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
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-[85vh] lg:min-h-screen bg-white text-[#111111] flex flex-col items-center justify-center py-20 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden select-none"
    >
      {/* -------------------------------------------------------------
          1. FOUR COLORFUL CORNER BRACKETS (ACCORDING TO DESIGN)
      -------------------------------------------------------------- */}
      {/* Top-Left: Red / Coral Bracket */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:top-12 lg:left-14 pointer-events-none z-10">
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

      {/* Top-Right: Deep Cobalt Blue Bracket */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 lg:top-12 lg:right-14 pointer-events-none z-10">
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

      {/* Bottom-Left: Teal / Cyan Bracket */}
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 lg:bottom-12 lg:left-14 pointer-events-none z-10">
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

      {/* Bottom-Right: Warm Amber / Orange Bracket */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-14 pointer-events-none z-10">
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

      {/* -------------------------------------------------------------
          2. CENTER CONTENT: Optical text balance with on-scroll reveal
      -------------------------------------------------------------- */}
      <div className="relative z-20 w-full max-w-2xl sm:max-w-3xl mx-auto flex flex-col items-center justify-center text-center my-auto px-4 sm:px-6">
        <p className="text-base sm:text-xl md:text-2xl lg:text-[25px] leading-[1.65] sm:leading-[1.55] tracking-[-0.015em] font-normal font-display text-center">
          {bodyWords.map((word, idx) => {
            const threshold = idx / bodyWords.length;
            const isFilled = scrollProgress >= threshold;
            // Smooth gradient transition between light gray (0.22) and pure black (1.0)
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
  );
}
