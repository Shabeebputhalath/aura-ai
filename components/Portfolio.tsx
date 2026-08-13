'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Eyebrow, TagChip } from './Eyebrow';
import { LineReveal } from './TextReveal';
import { LogoMark, ArrowUpRight } from './Icons';

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'luxe-perfume',
    name: 'AURA Commercial Ad — Luxe Fragrance',
    category: 'Product Commercial',
    year: '2026',
    description: 'High-end AI product ad showcasing liquid particle dynamics, custom sound design, and color grading.',
    tags: ['AI Product Ad', 'Color Grading', 'Sound Design'],
  },
  {
    id: 'cyber-runner',
    name: 'Neo-Tokyo AI Reel Series',
    category: 'Cinematic Storytelling',
    year: '2026',
    description: 'A 60-second atmospheric narrative video built with cutting-edge AI video generation & Premiere Pro editing.',
    tags: ['Cinematic AI', 'Storytelling', '4K Export'],
  },
  {
    id: 'chronos-watch',
    name: 'Chronos Timepiece Showcase',
    category: 'Product Commercial',
    year: '2026',
    description: 'Precision mechanical close-up product commercial with macro AI rendering and studio lighting.',
    tags: ['Product Showcase', 'AI Visuals', '3D Motion'],
  },
  {
    id: 'pixar-quest',
    name: 'Luminary 3D Pixar Animation',
    category: '3D Animation',
    year: '2026',
    description: 'Expressive 3D Pixar-style character commercial for digital brand campaigns.',
    tags: ['3D Pixar Style', 'Animation', 'Character Design'],
  },
];

function PortfolioCard({ project, index, isVisible }: { project: ProjectItem; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const delay = index * 90;

  return (
    <li
      className="transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(48px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <a
        href={`#${project.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block"
      >
        <article
          className="relative min-h-[22rem] sm:min-h-[26rem] overflow-hidden rounded-[2rem] bg-[#0a0a0a] p-6 sm:p-8 text-white ring-1 ring-white/5 transition-transform duration-300 ease-[cubic-bezier(0.26,1,0.22,1)]"
          style={{
            transform: isHovered ? 'translateY(-8px) scale(1.012)' : 'translateY(0px) scale(1)',
          }}
        >
          {/* Top Meta Row */}
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-white/45 relative z-10">
            <span>{project.category} — {project.year}</span>
            <div
              className="w-11 h-11 grid place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-transform duration-300 ease-out"
              style={{
                transform: isHovered ? 'rotate(45deg) scale(1.08)' : 'rotate(0deg) scale(1)',
              }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* Centered Watermark */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none z-0">
            <div className="flex items-start gap-1 text-white/9">
              <LogoMark className="w-20 h-20 text-white/10" />
              <span className="text-xs text-white/40">®</span>
            </div>
          </div>

          {/* Bottom Block */}
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 z-10">
            <h3 className="text-2xl sm:text-[1.875rem] font-medium tracking-tight">
              {project.name}
            </h3>
            <p className="mt-2 max-w-[28rem] text-sm text-white/55 leading-relaxed">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TagChip key={tag}>{tag}</TagChip>
              ))}
            </div>
          </div>
        </article>
      </a>
    </li>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLUListElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="works" className="bg-white">
      <div className="shell px-5 py-10 sm:px-8 lg:pb-28">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <Eyebrow tone="dark" bordered>
            Portfolio
          </Eyebrow>

          <LineReveal
            as="h2"
            lines={['Selected Work']}
            className="text-[2.25rem] sm:text-[3rem] font-semibold tracking-[-0.02em] text-[#111111]"
          />
        </div>

        {/* Cards Grid */}
        <ul ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
