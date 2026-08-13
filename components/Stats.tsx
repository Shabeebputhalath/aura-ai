'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Eyebrow } from './Eyebrow';
import { LineReveal } from './TextReveal';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { target: 40, suffix: '+', label: 'Commercial posts & ads' },
  { target: 100, suffix: '%', label: 'AI video generation' },
  { target: 2, suffix: '–5 Days', label: 'Fast delivery turnaround' },
  { target: 4, suffix: 'K', label: 'Ultra HD video export' },
];

function StatCounter({
  stat,
  index,
  panelVisible,
}: {
  stat: StatItem;
  index: number;
  panelVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const itemRef = useRef<HTMLLIElement>(null);
  const delay = index * 90;

  useEffect(() => {
    if (!panelVisible) return;

    let animId: number;
    let startTime: number | null = null;
    const duration = 1200; // 1.2s count up

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * stat.target));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    }

    // Delay count up slightly per stat index
    const timeout = setTimeout(() => {
      animId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [panelVisible, stat.target, delay]);

  return (
    <li
      ref={itemRef}
      className="flex flex-col justify-start transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
      style={{
        opacity: panelVisible ? 1 : 0,
        transform: panelVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-[3.25rem] font-bold tracking-tight text-white tabular-nums leading-none whitespace-nowrap">
        <span>{count}</span>
        <span>{stat.suffix}</span>
      </div>
      <p className="mt-3.5 text-xs sm:text-sm text-white/60 font-medium leading-relaxed tracking-wide">
        {stat.label}
      </p>
    </li>
  );
}

export default function Stats() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white">
      <div className="shell px-5 pb-20 sm:px-8 lg:pb-28">
        <div
          ref={panelRef}
          className="rounded-[2rem] bg-[#0a0a0a] p-8 sm:p-12 md:px-16 text-white transition-all duration-700 ease-[cubic-bezier(0.18,1,0.26,1)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.99)',
          }}
        >
          <Eyebrow tone="light">By the numbers</Eyebrow>

          <LineReveal
            as="h2"
            lines={['Proof in the work,', 'not the words.']}
            className="mt-4 max-w-[20ch] text-2xl sm:text-3xl md:text-[2.25rem] font-medium tracking-tight text-white"
          />

          <ul className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {STATS.map((stat, index) => (
              <StatCounter
                key={stat.label}
                stat={stat}
                index={index}
                panelVisible={isVisible}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
