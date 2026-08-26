'use client';

import React, { useState } from 'react';
import ThreeDImageRing from './ThreeDImageRing';
import { ArrowRight, ArrowUpRight, XIcon } from './Icons';

const SHOWCASE_PROJECTS = [
  {
    name: 'GILDED SMOKE',
    category: 'Luxury Fragrance',
    client: 'Maison N°5',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2940&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Swirling liquid amber fluid dynamics and perfume bottle caustics rendered with generative physics.',
  },
  {
    name: 'INK BLOOM',
    category: 'Fine Art & Motion',
    client: 'Velentis Media',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2940&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Baroque floral vermilion and azure pigments expanding through clear optical resin emulsion.',
  },
  {
    name: 'SILVER STORM',
    category: 'Automotive & Hardware',
    client: 'Apex Hypercars',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2940&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Ferrofluid chrome dynamics and specular metallic waves captured in generative 4K resolution.',
  },
  {
    name: 'MOLTEN DRIFT',
    category: 'Macro Fluid Dynamics',
    client: 'Vortex Energy Labs',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Hyper-kinetic orange magma streams clashing with deep oceanic obsidian fluid currents.',
  },
  {
    name: 'SOLAR TIDE',
    category: 'Procedural Optics',
    client: 'Éclat Luxury Lab',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2940&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Golden solar flare caustics and soap-bubble film iridescence rendered with generative optics.',
  },
  {
    name: 'COPPER VEIN',
    category: 'Spatial Audio Tech',
    client: 'Aero Audio Systems',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2940&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Deep cobalt resin marbling layered with liquid metallic copper circuitry paths.',
  },
  {
    name: 'NEO NOIR',
    category: 'Cinema Narrative',
    client: 'Midnight Studio',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2940&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Midnight obsidian prism refractions and chromatic aberrations in zero-gravity space.',
  },
  {
    name: 'VELVET AURA',
    category: 'Fashion Week AI',
    client: 'Aura Haute Couture',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2940&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Silken undulating chromatic fabrics floating gracefully across still mirror surfaces.',
  },
];

const PROJECT_IMAGE_URLS = SHOWCASE_PROJECTS.map((p) => p.image);

export default function LandingProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<typeof SHOWCASE_PROJECTS[0] | null>(null);

  return (
    <section id="works" className="relative w-full bg-white text-[#111111] py-16 sm:py-20 lg:py-24 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f1f0ee] text-xs font-semibold text-[#111111]/70 mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e65c00] animate-pulse" />
            <span>Interactive 3D Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight font-display">
            Selected 3D Works & Motion
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#666666] leading-relaxed">
            Drag, spin, and interact with our cylindrical 3D visual archive. Experience dynamic depth with smooth deceleration inertia.
          </p>
        </div>

        {/* 3D Image Ring Stage */}
        <div className="w-full h-[460px] sm:h-[540px] lg:h-[600px] relative flex items-center justify-center">
          <ThreeDImageRing
            images={PROJECT_IMAGE_URLS}
            width={280}
            perspective={1800}
            imageDistance={460}
            initialRotation={180}
            animationDuration={1.2}
            staggerDelay={0.08}
            hoverOpacity={0.4}
            draggable={true}
            inertiaPower={0.8}
            inertiaTimeConstant={320}
            inertiaVelocityMultiplier={22}
            mobileBreakpoint={768}
            mobileScaleFactor={0.75}
            imageClassName="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-300 rounded-2xl shadow-xl border border-white/40"
          />
        </div>

      </div>

      {/* Video Modal if clicked */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#e6e5e2] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-[#faf9f6] border-b border-[#e6e5e2]">
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono text-[#e65c00] uppercase tracking-wider font-semibold">
                  {selectedProject.category}
                </span>
                <span className="text-base font-bold text-[#111111] tracking-wide font-display">
                  {selectedProject.name} — {selectedProject.client}
                </span>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-[#f1f0ee] hover:bg-[#e6e5e2] text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={selectedProject.videoUrl}
                title={selectedProject.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
