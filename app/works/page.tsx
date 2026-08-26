'use client';

import React, { useState } from 'react';
import AdaptiveGrid from '@/components/AdaptiveGrid';
import Header from '@/components/Header';
import CreateBand from '@/components/CreateBand';
import Footer from '@/components/Footer';
import NavMenu from '@/components/NavMenu';
import Link from 'next/link';
import { XIcon, ArrowUpRight } from '@/components/Icons';

interface Project {
  id: string;
  categoryTag: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  filterCategory: 'All' | 'Commercial' | 'Cinematic' | '3D Animation' | 'Identity & Luxury';
  videoUrl?: string;
  previewImage?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'helio-studio',
    categoryTag: 'IDENTITY — 2026',
    year: '2026',
    title: 'Helio Studio',
    description: 'A bold visual identity and art direction system built to scale across every surface.',
    tags: ['Brand Identity', 'Art Direction', 'Design System'],
    filterCategory: 'Identity & Luxury',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  },
  {
    id: 'pulse-health',
    categoryTag: 'MOBILE — 2026',
    year: '2026',
    title: 'Pulse Health',
    description: 'A wellness app grounded in research, shipped end to end from concept to release.',
    tags: ['Mobile App', 'UX Research', 'Development'],
    filterCategory: 'Commercial',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  },
  {
    id: 'maison-luxe',
    categoryTag: 'COMMERCIAL — 2026',
    year: '2026',
    title: 'Maison Luxe N°5',
    description: 'Liquid specular fluid dynamics and luxury fragrance cinematography rendered with generative AI.',
    tags: ['AI Commercial', 'Fluid Optics', '4K Master'],
    filterCategory: 'Commercial',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  },
  {
    id: 'apex-gt',
    categoryTag: 'AUTOMOTIVE — 2026',
    year: '2026',
    title: 'Apex GT Hypercar',
    description: 'High-speed synthetic tracking shots through alpine tunnels with procedural telemetry and sound design.',
    tags: ['Cinema Shutter', 'Automotive', 'Sound Design'],
    filterCategory: 'Commercial',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  },
  {
    id: 'neo-tokyo',
    categoryTag: 'CINEMATIC — 2026',
    year: '2026',
    title: 'Obsidian Noir Series',
    description: 'Atmospheric cyberpunk narrative reel blending multi-model character generation and anamorphic post-grading.',
    tags: ['Cinematic Reel', 'AI Narrative', 'Anamorphic'],
    filterCategory: 'Cinematic',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  },
  {
    id: 'luminary-pixar',
    categoryTag: 'ANIMATION — 2026',
    year: '2026',
    title: 'The Stargazer 3D',
    description: 'Expressive Pixar-style character lighting and animated motion tailored for international commercial campaigns.',
    tags: ['3D Pixar Style', 'Animation', 'Character AI'],
    filterCategory: '3D Animation',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  },
];

const FILTER_CATEGORIES = ['All', 'Commercial', 'Cinematic', '3D Animation', 'Identity & Luxury'] as const;

export default function WorksPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);

  const handleNavigate = (id: string) => {
    if (id === 'home') {
      window.location.href = '/';
    } else if (id === 'works') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'about') {
      window.location.href = '/about';
    } else if (id === 'contact') {
      window.location.href = '/contact';
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleOpenContact = () => {
    window.location.href = '/contact';
  };

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterCategory === activeCategory);

  return (
    <div className="relative min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white">
      <AdaptiveGrid />

      {/* Header */}
      <Header
        ready={true}
        currentId="works"
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenModal={handleOpenContact}
        scrollTo={handleNavigate}
      />

      {/* Main Content Area */}
      <main id="main" className="pt-28 sm:pt-36 pb-24">
        
        {/* Page Top Header */}
        <section className="px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto pb-10 sm:pb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#e6e5e2]">
            <div className="flex flex-col items-start gap-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#111111]/50 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#b15f2c] animate-pulse" />
                <span>Selected Works</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] font-display">
                Featured Projects
              </h1>
              <p className="text-sm sm:text-base text-[#111111]/60 leading-relaxed mt-1">
                A selection of digital identity, commercial campaigns, and AI-powered productions built with high-craft precision.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {FILTER_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#111111] text-white font-semibold shadow-md'
                        : 'bg-[#f4f3f0] text-[#111111]/70 hover:text-[#111111] hover:bg-[#eae8e4] border border-[#e6e5e2]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2-Column Exact Clone Project Cards Grid */}
        <section className="px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  if (project.videoUrl) {
                    setActiveVideo({ title: project.title, url: project.videoUrl });
                  }
                }}
                className="group relative rounded-[2rem] sm:rounded-[2.25rem] bg-[#f8f7f5] hover:bg-white border border-[#e6e5e2] hover:border-[#111111]/30 p-8 sm:p-10 min-h-[360px] sm:min-h-[400px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden select-none"
              >
                {/* Top Meta Row (Left: META TAG, Right: Arrow Button) */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] sm:text-xs font-mono font-medium tracking-widest text-[#111111]/50 uppercase">
                    {project.categoryTag}
                  </span>

                  <div className="w-10 h-10 rounded-full bg-white group-hover:bg-[#111111] text-[#111111] group-hover:text-white border border-[#e6e5e2] flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Center Star Diamond Icon with Registered Mark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <div className="relative flex items-start text-[#111111]/15 group-hover:text-[#111111]/25 transition-colors duration-500">
                    <svg
                      className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-500 group-hover:scale-110"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                    >
                      <path d="M 16 0 C 16 8.5 8.5 16 0 16 C 8.5 16 16 23.5 16 32 C 16 23.5 23.5 16 32 16 C 23.5 16 16 8.5 16 0 Z" />
                    </svg>
                    <span className="text-[10px] sm:text-xs font-normal text-[#111111]/30 ml-1.5 -mt-1 select-none">
                      ®
                    </span>
                  </div>
                </div>

                {/* Bottom Content Row */}
                <div className="flex flex-col gap-5 z-10 mt-16 sm:mt-24">
                  {/* Title & Description */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight font-display transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#111111]/60 leading-relaxed font-normal max-w-md">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Rounded Pill Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full border border-[#e6e5e2] text-xs text-[#111111]/80 font-normal bg-white group-hover:border-[#111111]/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Bottom Marquee Band */}
        <div className="mt-20">
          <CreateBand />
        </div>
      </main>

      {/* Video Modal Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#e6e5e2]">
            <div className="flex items-center justify-between px-6 py-4 bg-[#faf9f6] border-b border-[#e6e5e2]">
              <span className="text-xs sm:text-sm font-semibold text-[#111111] truncate max-w-md">
                {activeVideo.title}
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-[#f1f0ee] hover:bg-[#e6e5e2] text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={activeVideo.url}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onOpenModal={handleOpenContact}
        scrollTo={handleNavigate}
      />

      {/* Drawer Nav Menu */}
      <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenModal={handleOpenContact}
        scrollTo={handleNavigate}
        stopScroll={() => {}}
        startScroll={() => {}}
      />
    </div>
  );
}
