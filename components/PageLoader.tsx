'use client';

import React, { useEffect, useState } from 'react';
import { LogoMark } from './Icons';

interface PageLoaderProps {
  onFinish: () => void;
  stopScroll: () => void;
  startScroll: () => void;
}

export default function PageLoader({ onFinish, stopScroll, startScroll }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    stopScroll();

    const FILL_MS = 1300;
    const startTime = performance.now();

    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    let animationFrameId: number;

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / FILL_MS, 1);
      const easedProgress = Math.round(easeInOutCubic(t) * 100);

      setProgress(easedProgress);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Finished counting, start exit animation
        setTimeout(() => {
          setIsExiting(true);

          setTimeout(() => {
            setIsRemoved(true);
            startScroll();
            onFinish();
          }, 700); // 700ms slide up duration
        }, 100);
      }
    }

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onFinish, stopScroll, startScroll]);

  if (isRemoved) return null;

  const paddedCounter = String(progress).padStart(3, '0');

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 bg-[#0a0a0a] text-white rounded-b-[2rem] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto"
      style={{
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0%)',
      }}
    >
      {/* Center Content */}
      <div
        className="flex flex-col items-center text-center gap-5 transition-all duration-500 ease-out"
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? 'translateY(-12px)' : 'translateY(0px)',
        }}
      >
        <div className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold tracking-tight">
          <LogoMark className="w-7 h-7 sm:w-8 sm:h-8 text-[#cf8047]" />
          <span>AURA AI</span>
        </div>
        <p className="max-w-[28ch] text-sm text-white/55 font-normal leading-relaxed">
          Redefining Commercials with AI.
        </p>
      </div>

      {/* Progress Block */}
      <div
        className="w-[min(22rem,72vw)] flex flex-col gap-3 transition-opacity duration-300"
        style={{ opacity: isExiting ? 0 : 1 }}
      >
        <div className="h-[1px] w-full bg-white/15 overflow-hidden relative">
          <div
            className="h-full bg-[#cf8047] transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs font-medium uppercase tracking-wider text-white/45">
          <span>Loading</span>
          <span className="tabular-nums text-white/80">{paddedCounter}</span>
        </div>
      </div>
    </div>
  );
}
