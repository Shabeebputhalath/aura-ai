'use client';

import React, { useEffect, useState, useRef } from 'react';

interface PageLoaderProps {
  onFinish: () => void;
  stopScroll: () => void;
  startScroll: () => void;
}

export default function PageLoader({ onFinish, stopScroll, startScroll }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'aura' | 'ai' | 'shine' | 'ready' | 'exit'>('enter');
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    stopScroll();

    // Smooth numerical progress counter
    const startTime = performance.now();
    const duration = 2400; // 2.4s to count to 100

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const linear = Math.min(elapsed / duration, 1);
      // Ease out cubic for satisfying deceleration at 99-100%
      const ease = 1 - Math.pow(1 - linear, 3);
      const currentPct = Math.min(Math.round(ease * 100), 100);
      setProgress(currentPct);

      if (linear < 1) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    // Choreographed animation phase timings
    const tAura = setTimeout(() => setPhase('aura'), 250);
    const tAI = setTimeout(() => setPhase('ai'), 950);
    const tShine = setTimeout(() => setPhase('shine'), 1650);
    const tReady = setTimeout(() => setPhase('ready'), 2400);

    const tExit = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsRemoved(true);
        startScroll();
        onFinish();
      }, 750);
    }, 2850);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearTimeout(tAura);
      clearTimeout(tAI);
      clearTimeout(tShine);
      clearTimeout(tReady);
      clearTimeout(tExit);
    };
  }, [onFinish, stopScroll, startScroll]);

  const handleSkip = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsExiting(true);
    setTimeout(() => {
      setIsRemoved(true);
      startScroll();
      onFinish();
    }, 450);
  };

  if (isRemoved) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#070709] text-white overflow-hidden select-none pointer-events-auto"
      style={{
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0%)',
        transition: 'transform 0.75s cubic-bezier(0.85, 0, 0.15, 1)',
      }}
    >
      {/* Cinematic Ambient Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep radial illumination in center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_0%,rgba(20,20,24,0.4)_45%,#070709_90%)]" />
        
        {/* Micro noise grain texture */}
        <div
          className="absolute inset-0 opacity-[0.25] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
        />

        {/* Subtle top & bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Top Bar with Minimalist Status */}
      <div className="absolute top-8 inset-x-0 px-8 sm:px-14 flex items-center justify-between z-20">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/40 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>INITIALIZING EXPERIENCE</span>
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          aria-label="Skip intro animation"
          className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] font-mono tracking-wider uppercase text-white/60 hover:text-white transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95"
        >
          Skip ✕
        </button>
      </div>

      {/* Center Cinematic Brandmark with Distinct Spacing between AURA and AI */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 transition-all duration-700"
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? 'scale(0.95) translateY(-15px)' : 'scale(1) translateY(0)',
        }}
      >
        {/* SVG Wordmark with Generous Spacing & Chrome Gradients */}
        <div className="relative flex items-center justify-center">
          <svg
            className="w-[300px] sm:w-[480px] md:w-[620px] lg:w-[740px] h-auto overflow-visible"
            viewBox="0 0 920 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Ultra-luxe Platinum/Silver specular gradient */}
              <linearGradient id="chromeSpecular" gradientUnits="userSpaceOnUse" x1="20" y1="10" x2="620" y2="130">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#d4d4d8" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="75%" stopColor="#a1a1aa" />
                <stop offset="100%" stopColor="#f4f4f5" />
              </linearGradient>

              {/* Accent AI Gradient with userSpaceOnUse so zero-width strokes never fail */}
              <linearGradient id="aiGradient" gradientUnits="userSpaceOnUse" x1="640" y1="10" x2="880" y2="130">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#f4f4f5" />
                <stop offset="70%" stopColor="#d4d4d8" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              {/* Shimmer Light Reflection Sweep */}
              <linearGradient id="lightShimmer" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="140">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Deep soft shadow filter */}
              <filter id="luxeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.9" />
              </filter>
            </defs>

            {/* PART 1: "AURA" Wordmark with refined geometric geometry */}
            <g
              filter="url(#luxeShadow)"
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: phase !== 'enter' ? 1 : 0,
                transform: phase !== 'enter' ? 'translateX(0px)' : 'translateX(-25px)',
              }}
            >
              {/* 'A' 1 (x: 25 - 145) */}
              <path
                d="M 30 118 L 80 22 C 84 14 92 8 102 8 C 112 8 120 14 124 22 L 174 118"
                stroke="url(#chromeSpecular)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 320,
                  strokeDashoffset: phase !== 'enter' ? 0 : 320,
                  transition: 'stroke-dashoffset 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* 'U' (x: 205 - 295) */}
              <path
                d="M 205 22 L 205 78 C 205 102 224 120 248 120 C 272 120 291 102 291 78 L 291 22"
                stroke="url(#chromeSpecular)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 320,
                  strokeDashoffset: phase !== 'enter' ? 0 : 320,
                  transition: 'stroke-dashoffset 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s',
                }}
              />

              {/* 'R' (x: 325 - 425) */}
              <path
                d="M 325 118 L 325 22 L 368 22 C 396 22 414 36 414 58 C 414 80 396 92 368 92 L 325 92 M 366 92 L 416 118"
                stroke="url(#chromeSpecular)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 420,
                  strokeDashoffset: phase !== 'enter' ? 0 : 420,
                  transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.24s',
                }}
              />

              {/* 'A' 2 (x: 450 - 594) */}
              <path
                d="M 450 118 L 500 22 C 504 14 512 8 522 8 C 532 8 540 14 544 22 L 594 118"
                stroke="url(#chromeSpecular)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 320,
                  strokeDashoffset: phase !== 'enter' ? 0 : 320,
                  transition: 'stroke-dashoffset 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.36s',
                }}
              />
            </g>

            {/* PART 2: "AI" Mark with Elegant Space matching the official AURA AI brand typography */}
            <g
              filter="url(#luxeShadow)"
              className="transition-all duration-800 ease-out"
              style={{
                opacity: phase === 'ai' || phase === 'shine' || phase === 'ready' ? 1 : 0,
                transform:
                  phase === 'ai' || phase === 'shine' || phase === 'ready'
                    ? 'translateX(0px) scale(1)'
                    : 'translateX(20px) scale(0.96)',
                transformOrigin: '760px 70px',
                transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Letter 'A' in AI (sleek arch matching AURA without crossbar) */}
              <path
                d="M 670 118 L 720 22 C 724 14 732 8 742 8 C 752 8 760 14 764 22 L 814 118"
                stroke="url(#aiGradient)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 320,
                  strokeDashoffset: phase === 'ai' || phase === 'shine' || phase === 'ready' ? 0 : 320,
                  transition: 'stroke-dashoffset 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
                }}
              />

              {/* Letter 'I' in AI - Solid bold rounded pillar */}
              <path
                d="M 855 18 L 855 118"
                stroke="url(#aiGradient)"
                strokeWidth="16"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 140,
                  strokeDashoffset: phase === 'ai' || phase === 'shine' || phase === 'ready' ? 0 : 140,
                  transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                }}
              />
            </g>

            {/* Sweep Light Beam Sheen */}
            {(phase === 'shine' || phase === 'ready') && (
              <rect
                x="0"
                y="0"
                width="220"
                height="140"
                fill="url(#lightShimmer)"
                className="pointer-events-none"
                style={{
                  mixBlendMode: 'overlay',
                  animation: 'shimmerSweep 1.1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                }}
              />
            )}
          </svg>
        </div>

        {/* Subtitle & Studio Tagline */}
        <div
          className="mt-8 flex flex-col items-center gap-2 transition-all duration-700"
          style={{
            opacity: phase === 'ai' || phase === 'shine' || phase === 'ready' ? 1 : 0,
            transform:
              phase === 'ai' || phase === 'shine' || phase === 'ready'
                ? 'translateY(0px)'
                : 'translateY(10px)',
          }}
        >
          <p className="text-xs sm:text-sm font-medium tracking-[0.35em] sm:tracking-[0.45em] uppercase text-white/50 text-center font-display">
            Commercials Redefined With AI
          </p>
        </div>
      </div>

      {/* Bottom Counter & Smooth Linear Gauge */}
      <div className="absolute bottom-10 inset-x-0 px-8 sm:px-14 flex flex-col items-center gap-4 z-20">
        <div className="w-full max-w-xs flex items-center justify-between text-xs font-mono tracking-widest text-white/50">
          <span>AURA STUDIO</span>
          <span className="text-white font-bold text-sm tabular-nums">{String(progress).padStart(3, '0')}%</span>
        </div>

        {/* Ultra-sleek progress line */}
        <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neutral-400 via-white to-neutral-200 transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Twinkling 4-Point Star Diamond Icon */}
      <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-10 pointer-events-none hidden sm:block">
        <svg
          className="w-5 h-5 text-white/40 animate-pulse"
          viewBox="0 0 32 32"
          fill="currentColor"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
            animationDuration: '2.5s',
          }}
        >
          <path d="M 16 0 C 16 8.5 8.5 16 0 16 C 8.5 16 16 23.5 16 32 C 16 23.5 23.5 16 32 16 C 23.5 16 16 8.5 16 0 Z" />
        </svg>
      </div>

      {/* Keyframe animation for specular gleam sweep */}
      <style jsx>{`
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-200px) skewX(-25deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(920px) skewX(-25deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
