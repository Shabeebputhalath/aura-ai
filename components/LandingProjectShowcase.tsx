'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import ThreeDImageRing from './ThreeDImageRing';
import { XIcon } from './Icons';

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

export default function LandingProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<typeof SHOWCASE_PROJECTS[0] | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const initialRotation = 180;
  // One full revolution (360 degrees) across the scroll track
  const currentRotation = useMemo(() => {
    return initialRotation - scrollProgress * 360;
  }, [scrollProgress]);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      // When the top of track hits top of viewport (rect.top <= 0)
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollableDistance, 0), 1);

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
    <div
      id="works"
      ref={trackRef}
      className="relative w-full h-[220vh] sm:h-[240vh] bg-white select-none"
    >
      {/* Sticky Fullscreen 3D Stage */}
      <section className="sticky top-0 h-screen w-full bg-white text-[#111111] flex flex-col items-center justify-between py-10 sm:py-14 px-4 sm:px-8 overflow-hidden z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto pt-2 sm:pt-4 z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4f4f4] text-xs font-semibold text-black mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>Interactive 3D Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight font-display">
            Selected 3D Works & Motion
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
            Scroll down to rotate through our complete portfolio of brand visuals and 3D commercials.
          </p>
        </div>

        {/* 3D Image Ring Stage */}
        <div className="w-full flex-1 relative flex items-center justify-center min-h-[360px] sm:min-h-[440px] my-auto">
          <ThreeDImageRing
            projects={SHOWCASE_PROJECTS}
            onSelectProject={(index) => setSelectedProject(SHOWCASE_PROJECTS[index])}
            controlledRotation={currentRotation}
            width={280}
            perspective={1800}
            imageDistance={480}
            initialRotation={initialRotation}
            animationDuration={1.2}
            staggerDelay={0.08}
            hoverOpacity={0.4}
            draggable={true}
            inertiaPower={0.8}
            inertiaTimeConstant={320}
            inertiaVelocityMultiplier={22}
            mobileBreakpoint={768}
            mobileScaleFactor={0.72}
          />
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full max-w-md mx-auto z-20 flex flex-col items-center gap-2.5 pb-2">
          {/* Scroll Rotation Progress Track */}
          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-neutral-400">0°</span>
            <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200/80">
              <div
                className="h-full bg-black rounded-full transition-all duration-75 ease-out"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-neutral-400">360°</span>
          </div>

          <span className="text-[11px] text-neutral-400 font-normal">
            {scrollProgress >= 0.98
              ? '✦ 360° Complete — Continue scrolling'
              : 'Scroll to complete full 360° rotation'}
          </span>
        </div>

      </section>

      {/* Video / Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#e6e5e2] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-[#faf9f6] border-b border-[#e6e5e2]">
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono text-black uppercase tracking-wider font-semibold">
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

            <div className="p-6 bg-white flex flex-col gap-2">
              <p className="text-sm text-neutral-600 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
