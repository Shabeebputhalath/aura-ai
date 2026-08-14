'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';

const showcaseProjects: GalleryItem[] = [
  {
    common: 'AURA Luxe Fragrance',
    binomial: 'Product Commercial',
    photo: {
      url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&auto=format&fit=crop&q=80',
      text: 'AURA Luxe Fragrance fluid dynamics commercial',
      pos: 'center',
      by: 'Kira Parfums',
    },
  },
  {
    common: 'Neo-Tokyo Cyber Runner',
    binomial: 'Cinematic Storytelling',
    photo: {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=900&auto=format&fit=crop&q=80',
      text: 'Neo-Tokyo Cyber Runner AI Reel Series',
      pos: 'center',
      by: 'Velentis Media',
    },
  },
  {
    common: 'Chronos Precision',
    binomial: 'Product Commercial',
    photo: {
      url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&auto=format&fit=crop&q=80',
      text: 'Chronos Swiss Horology precision watch',
      pos: 'center',
      by: 'Chronos Horology',
    },
  },
  {
    common: 'Luminary 3D Pixar',
    binomial: '3D Pixar & Animation',
    photo: {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80',
      text: 'Luminary stylized 3D character animation',
      pos: 'center',
      by: 'Luminary Digital',
    },
  },
  {
    common: 'Apex Electric Hypercar',
    binomial: 'Automotive & Tech',
    photo: {
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format&fit=crop&q=80',
      text: 'Apex motors electric hypercar night track',
      pos: 'center',
      by: 'Apex Motors',
    },
  },
  {
    common: 'Vortex Energy Splash',
    binomial: 'High-Speed Fluid Dynamics',
    photo: {
      url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80',
      text: 'Vortex energy citrus splash dynamics',
      pos: 'center',
      by: 'Vortex Labs',
    },
  },
  {
    common: 'Éclat Botanical Glow',
    binomial: 'Beauty & Skincare',
    photo: {
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80',
      text: 'Éclat skincare sunlight caustics',
      pos: 'center',
      by: 'Éclat Botanic',
    },
  },
  {
    common: 'Aero Spatial Headset',
    binomial: 'Consumer Tech & Audio',
    photo: {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80',
      text: 'Aero audio minimalist headphone render',
      pos: 'center',
      by: 'Aero Audio Co.',
    },
  },
];

export default function LandingProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [radius, setRadius] = useState(600);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(340);
      } else if (window.innerWidth < 1024) {
        setRadius(480);
      } else {
        setRadius(600);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;

      if (scrollableDist <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="works"
      ref={containerRef}
      className="relative w-full bg-white text-[#111111]"
      style={{ height: '350vh' }}
    >
      {/* Sticky container that locks in view while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white">
        
        {/* Clean Header exactly matching the reference style with white background */}
        <div className="text-center mb-8 absolute top-12 sm:top-16 z-20 pointer-events-none px-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111]">
            Project Showcase
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/60 font-medium mt-1.5 sm:mt-2">
            Scroll to rotate the gallery
          </p>
        </div>

        {/* 3D Circular Gallery Viewport */}
        <div className="w-full h-full pt-16">
          <CircularGallery
            items={showcaseProjects}
            radius={radius}
            scrollProgress={scrollProgress}
            disableGlobalScroll={true}
            autoRotateSpeed={0.015}
          />
        </div>

        {/* Subtle bottom progress bar indicator */}
        <div className="absolute bottom-6 inset-x-0 max-w-xs mx-auto px-6 pointer-events-none">
          <div className="h-1 w-full bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#111111] transition-[width] duration-75 ease-out rounded-full"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
