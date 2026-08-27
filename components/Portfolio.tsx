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
  thumbnail?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'luxe-perfume',
    name: 'AURA Commercial Ad — Luxe Fragrance',
    category: 'Product Commercial',
    year: '2026',
    description: 'High-end AI product ad showcasing liquid particle dynamics, custom sound design, and color grading.',
    tags: ['AI Product Ad', 'Color Grading', 'Sound Design'],
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'cyber-runner',
    name: 'Neo-Tokyo AI Reel Series',
    category: 'Cinematic Storytelling',
    year: '2026',
    description: 'A 60-second atmospheric narrative video built with cutting-edge AI video generation & Premiere Pro editing.',
    tags: ['Cinematic AI', 'Storytelling', '4K Export'],
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'chronos-watch',
    name: 'Chronos Timepiece Showcase',
    category: 'Product Commercial',
    year: '2026',
    description: 'Precision mechanical close-up product commercial with macro AI rendering and studio lighting.',
    tags: ['Product Showcase', 'AI Visuals', '3D Motion'],
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'pixar-quest',
    name: 'Luminary 3D Pixar Animation',
    category: '3D Animation',
    year: '2026',
    description: 'Expressive 3D Pixar-style character commercial for digital brand campaigns.',
    tags: ['3D Pixar Style', 'Animation', 'Character Design'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
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
          {/* Background Poster Image Overlay */}
          {project.thumbnail && (
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30" />
            </div>
          )}

          {/* Top Meta Row */}
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-white/70 relative z-10">
            <span className="font-semibold bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
              {project.category} — {project.year}
            </span>
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
          {!project.thumbnail && (
            <div className="absolute inset-0 grid place-items-center pointer-events-none z-0">
              <div className="flex items-start gap-1 text-white/9">
                <LogoMark className="w-20 h-20 text-white/10" />
                <span className="text-xs text-white/40">®</span>
              </div>
            </div>
          )}

          {/* Bottom Block */}
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 z-10">
            <h3 className="text-2xl sm:text-[1.875rem] font-medium tracking-tight">
              {project.name}
            </h3>
            <p className="mt-2 max-w-[28rem] text-sm text-white/75 leading-relaxed">
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
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(() => {
    if (typeof window === 'undefined') return PROJECTS;
    try {
      const stored = localStorage.getItem('aura_commercials');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mapped = parsed
            .filter((p: any) => p.status !== 'draft')
            .map((p: any) => ({
              id: p.id,
              name: p.name || p.title,
              category: p.category,
              year: p.year || '2026',
              description: p.description || p.shortDescription,
              tags: p.tags || p.toolsUsed || ['AI Commercial'],
              thumbnail: p.thumbnail,
            }));
          if (mapped.length > 0) {
            return mapped;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return PROJECTS;
  });

  useEffect(() => {
    // Fetch live projects from MongoDB
    fetch('/api/projects?status=published')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          const mapped: ProjectItem[] = data.data.map((p: any) => ({
            id: p.id || p._id,
            name: p.title || p.name,
            category: p.category || 'Product Commercial',
            year: p.year || '2026',
            description: p.shortDescription || p.description,
            tags: p.toolsUsed || ['4K AI', 'Commercial'],
            thumbnail: p.thumbnail,
          }));
          setProjectsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

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
          {projectsList.map((project, index) => (
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
