'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export interface CommercialItem {
  id: string;
  name: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  resolution: string;
  description: string;
  tags: string[];
  thumbnail: string;
  tools?: string[];
  metrics?: string;
  aspectRatio?: string;
}

const DEFAULT_COMMERCIALS: CommercialItem[] = [
  {
    id: 'comm-1',
    name: 'AURA Luxe Fragrance — Liquid Gold',
    category: 'Product Commercial',
    client: 'Kira Parfums',
    year: '2026',
    duration: '30s',
    resolution: '4K UHD',
    description: 'Fluid particle dynamics and photorealistic glass caustics created for an ultra-luxury perfume brand launch campaign.',
    tags: ['Liquid Physics', 'Color Grading', 'Sound Design', 'Luxury'],
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&auto=format&fit=crop&q=80',
    tools: ['Midjourney v6.1', 'Runway Gen-3 Alpha', 'DaVinci Resolve', 'Logic Pro'],
    metrics: '+340% Social Engagement',
    aspectRatio: '9:16 & 16:9',
  },
  {
    id: 'comm-2',
    name: 'Neo-Tokyo Cyber Runner — Reel Series',
    category: 'Cinematic Storytelling',
    client: 'Velentis Media',
    year: '2026',
    duration: '60s',
    resolution: '4K UHD',
    description: 'Atmospheric cyberpunk narrative short film generated with multi-prompt camera sweeps and synthetic voiceover.',
    tags: ['Cinematic AI', 'Storytelling', '4K Master', 'Sci-Fi'],
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=900&auto=format&fit=crop&q=80',
    tools: ['Runway Gen-3', 'Kling AI', 'ElevenLabs Studio', 'Premiere Pro'],
    metrics: '1.2M+ Organic Views',
    aspectRatio: '9:16 Vertical Reel',
  },
  {
    id: 'comm-3',
    name: 'Chronos Precision Timepiece',
    category: 'Product Commercial',
    client: 'Chronos Swiss Horology',
    year: '2026',
    duration: '45s',
    resolution: '4K UHD',
    description: 'Hyper-macro mechanical tourbillon movements and titanium reflections rendered with dynamic studio lighting physics.',
    tags: ['Product Showcase', 'AI Visuals', '3D Motion', 'Macro'],
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&auto=format&fit=crop&q=80',
    tools: ['Luma Dream Machine', 'Topaz Video AI', 'Studio Lighting AI'],
    metrics: 'Featured at Horology Summit',
    aspectRatio: '16:9 Commercial Cut',
  },
  {
    id: 'comm-4',
    name: 'Luminary 3D Pixar — The Stargazer',
    category: '3D Pixar & Animation',
    client: 'Luminary Digital',
    year: '2026',
    duration: '15s',
    resolution: '4K UHD',
    description: 'Stylized 3D character animation with emotive facial keyframing, subsurface skin scattering, and custom orchestral music.',
    tags: ['3D Pixar Style', 'Animation', 'Character Design', 'Emotional'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80',
    tools: ['Midjourney Character Consistency', 'Runway Gen-3', 'Custom Voice Foley'],
    metrics: '94% Retention Score',
    aspectRatio: '1:1 & 9:16 Cuts',
  },
  {
    id: 'comm-5',
    name: 'Apex Hypercar — Electric Aerodynamics',
    category: 'Automotive & Tech',
    client: 'Apex Motors',
    year: '2026',
    duration: '40s',
    resolution: '8K HDR',
    description: 'High-speed night track commercial showcasing carbon-fiber reflections, wind tunnel neon trails, and electric motor foley.',
    tags: ['Automotive Ad', 'Cyberpunk', 'HDR Color', 'Speed'],
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format&fit=crop&q=80',
    tools: ['Runway Gen-3', 'Kling AI', 'Topaz Video AI 8K', 'Custom Synth Score'],
    metrics: '8.4x CTR on Paid Ads',
    aspectRatio: '16:9 Cinema Scope',
  },
  {
    id: 'comm-6',
    name: 'Vortex Energy — Splash Physics',
    category: 'Product Commercial',
    client: 'Vortex Labs',
    year: '2026',
    duration: '20s',
    resolution: '4K UHD',
    description: 'Explosive citrus water drops and carbonation foley designed for high-energy social media ads and billboard displays.',
    tags: ['Fluid Dynamics', 'High Energy', 'Product Ad', 'CGI Splash'],
    thumbnail: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80',
    tools: ['Luma Dream Machine', 'Midjourney v6.1', 'After Effects VFX'],
    metrics: '+410% Conversion Lift',
    aspectRatio: '9:16 TikTok / Reels',
  },
  {
    id: 'comm-7',
    name: 'Éclat Skincare — Botanical Caustics',
    category: 'Product Commercial',
    client: 'Éclat Botanic Labs',
    year: '2026',
    duration: '30s',
    resolution: '4K UHD',
    description: 'Ethereal morning sunlight caustics through frosted glass bottles with blooming botanical petal VFX and ambient acoustic sound.',
    tags: ['Beauty & Skincare', 'Soft Caustics', 'Organic AI', 'Aesthetic'],
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80',
    tools: ['Midjourney v6', 'Runway Gen-3', 'Custom Foley Engine'],
    metrics: '2.5M+ Social Impressions',
    aspectRatio: '4:5 & 9:16 Social',
  },
  {
    id: 'comm-8',
    name: 'Aero Spatial Sound — Audio Visualized',
    category: 'Automotive & Tech',
    client: 'Aero Audio Co.',
    year: '2026',
    duration: '35s',
    resolution: '4K UHD',
    description: 'Minimalist titanium headphone commercial featuring rhythmic sonic waves and dynamic floating magnetic drivers.',
    tags: ['Consumer Tech', 'Audio Visualizer', '3D Motion', 'Minimalist'],
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80',
    tools: ['Runway Gen-3', 'Kling AI', 'Spatial Audio Synth'],
    metrics: 'Featured on DesignBoom',
    aspectRatio: '16:9 & 9:16',
  },
];

const CATEGORIES = [
  'All Campaigns',
  'Product Commercial',
  'Cinematic Storytelling',
  '3D Pixar & Animation',
  'Automotive & Tech',
];

export default function Works3DShowcase() {
  const [items, setItems] = useState<CommercialItem[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_COMMERCIALS;
    try {
      const stored = localStorage.getItem('aura_commercials');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: CommercialItem[] = parsed
            .filter((p: any) => p.status !== 'draft')
            .map((p: any) => ({
              id: p.id || `custom-${Date.now()}`,
              name: p.name || 'Untitled Commercial',
              category: p.category || 'Product Commercial',
              client: p.client || 'AURA Client',
              year: p.year || '2026',
              duration: p.duration || '30s',
              resolution: p.resolution || '4K UHD',
              description: p.description || 'High-impact AI video campaign.',
              tags: p.tags || ['AI Video', 'Commercial'],
              thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
              tools: ['Runway Gen-3', 'Midjourney v6.1', 'ElevenLabs'],
              metrics: p.views ? `${p.views} Views` : 'High ROI Campaign',
              aspectRatio: '16:9 & 9:16',
            }));
          if (formatted.length >= 4) {
            return formatted;
          }
        }
      }
    } catch (e) {
      console.error('Failed to load local commercials:', e);
    }
    return DEFAULT_COMMERCIALS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All Campaigns');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [selectedCommercial, setSelectedCommercial] = useState<CommercialItem | null>(null);

  // 3D Cylinder state
  const [rotation, setRotation] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState<number>(0.035);
  const [radius, setRadius] = useState<number>(() => {
    if (typeof window === 'undefined') return 640;
    if (window.innerWidth < 640) return 380;
    if (window.innerWidth < 1024) return 500;
    return 640;
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [rotationStart, setRotationStart] = useState<number>(0);

  const animationFrameRef = useRef<number | null>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  // Listen for custom commercials update event
  useEffect(() => {
    const handleCommercialsUpdated = () => {
      try {
        const stored = localStorage.getItem('aura_commercials');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const formatted: CommercialItem[] = parsed
              .filter((p: any) => p.status !== 'draft')
              .map((p: any) => ({
                id: p.id || `custom-${Date.now()}`,
                name: p.name || 'Untitled Commercial',
                category: p.category || 'Product Commercial',
                client: p.client || 'AURA Client',
                year: p.year || '2026',
                duration: p.duration || '30s',
                resolution: p.resolution || '4K UHD',
                description: p.description || 'High-impact AI video campaign.',
                tags: p.tags || ['AI Video', 'Commercial'],
                thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
                tools: ['Runway Gen-3', 'Midjourney v6.1', 'ElevenLabs'],
                metrics: p.views ? `${p.views} Views` : 'High ROI Campaign',
                aspectRatio: '16:9 & 9:16',
              }));
            if (formatted.length >= 4) {
              setItems(formatted);
            }
          }
        }
      } catch (e) {
        console.error('Failed to sync updated commercials:', e);
      }
    };

    window.addEventListener('aura_commercials_updated', handleCommercialsUpdated);
    return () => window.removeEventListener('aura_commercials_updated', handleCommercialsUpdated);
  }, []);

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(380);
      } else if (window.innerWidth < 1024) {
        setRadius(500);
      } else {
        setRadius(640);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter items
  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All Campaigns') return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(item.category.toLowerCase());
  });

  const displayItems = filteredItems.length > 0 ? filteredItems : items;
  const anglePerItem = 360 / displayItems.length;

  // Auto-rotation loop
  useEffect(() => {
    const animate = () => {
      if (isAutoRotating && !isDragging && viewMode === '3d') {
        setRotation((prev) => (prev + autoRotateSpeed) % 360);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoRotating, isDragging, autoRotateSpeed, viewMode]);

  // Mouse Drag / Touch Gestures for 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setRotationStart(rotation);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    // Factor determines sensitivity
    const newRotation = rotationStart - deltaX * 0.25;
    setRotation(newRotation);
  }, [isDragging, dragStartX, rotationStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
      setRotationStart(rotation);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    const newRotation = rotationStart - deltaX * 0.3;
    setRotation(newRotation);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel handling for smooth rotational scrub
  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode !== '3d') return;
    const delta = e.deltaX || e.deltaY;
    if (Math.abs(delta) > 10) {
      setRotation((prev) => prev + delta * 0.08);
    }
  };

  // Step rotation helpers
  const rotateStep = (direction: 'next' | 'prev') => {
    setIsAutoRotating(false);
    const step = direction === 'next' ? -anglePerItem : anglePerItem;
    setRotation((prev) => prev + step);
  };

  return (
    <div className="relative w-full space-y-10">

      {/* TOP CONTROLS & FILTER TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-[#0e0e0e] text-white p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
        
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#b15f2c] text-white shadow-md'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle & 3D Settings */}
        <div className="flex items-center gap-3 justify-between lg:justify-end">
          
          {/* 3D Motion Controls (Only in 3D Mode) */}
          {viewMode === '3d' && (
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                title={isAutoRotating ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#b15f2c] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                {isAutoRotating ? '⏸' : '▶'}
              </button>
              
              <button
                onClick={() => rotateStep('prev')}
                title="Rotate Left"
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                ◀
              </button>
              
              <button
                onClick={() => rotateStep('next')}
                title="Rotate Right"
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                ▶
              </button>

              <span className="text-[10px] text-white/50 hidden sm:inline font-mono">
                Drag to Spin ✦
              </span>
            </div>
          )}

          {/* View Switcher: 3D Spatial Cylinder vs Editorial Grid */}
          <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === '3d' ? 'bg-[#b15f2c] text-white shadow-xs' : 'text-white/60 hover:text-white'
              }`}
            >
              <span>🪐 3D Spatial View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-[#b15f2c] text-white shadow-xs' : 'text-white/60 hover:text-white'
              }`}
            >
              <span>▦ Editorial Grid</span>
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: INTERACTIVE 3D CIRCULAR SPATIAL CYLINDER SHOWCASE */}
      {/* ========================================================================= */}
      {viewMode === '3d' && (
        <div
          ref={galleryContainerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className="relative w-full h-[580px] sm:h-[680px] rounded-3xl bg-[#080808] border border-white/10 overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing shadow-2xl"
          style={{ perspective: '2200px' }}
        >
          {/* Ambient Lighting & Stage Grid */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(177,95,44,0.15)_0%,transparent_70%)]" />
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          {/* Floating Instructions Helper Pill */}
          <div className="absolute top-6 z-30 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-[11px] font-semibold text-white/80 tracking-wide flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>Swipe, Drag or Scroll to Rotate • Click any card for Campaign Details</span>
          </div>

          {/* Center Stage Ring Floor */}
          <div
            className="absolute bottom-10 w-[500px] sm:w-[700px] h-[180px] rounded-[100%] border border-[#b15f2c]/20 bg-gradient-to-t from-[#b15f2c]/10 to-transparent pointer-events-none blur-xs"
            style={{ transform: 'rotateX(75deg)' }}
          />

          {/* 3D ROTATING CYLINDER */}
          <div
            className="relative w-full h-full"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            {displayItems.map((item, index) => {
              const itemAngle = index * anglePerItem;
              const totalRotation = rotation % 360;
              const relativeAngle = (itemAngle + totalRotation + 360) % 360;
              const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
              
              // Dynamic depth opacity & focal sharpness
              const opacity = Math.max(0.18, 1 - (normalizedAngle / 160));
              const isFrontCard = normalizedAngle < 35;

              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCommercial(item);
                  }}
                  className={`absolute w-[260px] sm:w-[320px] h-[370px] sm:h-[430px] transition-opacity duration-200 cursor-pointer ${
                    isFrontCard ? 'z-40' : 'z-10'
                  }`}
                  style={{
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-130px', // half width for mobile
                    marginTop: '-185px',
                    opacity: opacity,
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden group border transition-all duration-300 ${
                      isFrontCard
                        ? 'border-[#b15f2c] shadow-[0_0_40px_rgba(177,95,44,0.35)] ring-2 ring-[#b15f2c]/40 scale-100 sm:scale-105'
                        : 'border-white/10 shadow-2xl bg-[#111111]/80 hover:border-white/30'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/15">
                        {item.category.split(' ')[0]}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#b15f2c] text-[10px] font-bold text-white shadow-xs">
                        {item.duration} • {item.resolution}
                      </span>
                    </div>

                    {/* Centered Play Button on Hover / Front */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="w-14 h-14 rounded-full bg-[#b15f2c] text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <span className="text-xl pl-1">▶</span>
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-10 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/60 font-semibold uppercase tracking-wider">
                        <span>{item.client}</span>
                        <span>•</span>
                        <span>{item.year}</span>
                      </div>
                      
                      <h3 className="text-sm sm:text-base font-bold line-clamp-2 leading-snug text-white group-hover:text-[#cf8047] transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[10px] text-[#b15f2c] font-bold">
                        <span>View Campaign Case Study →</span>
                        <span className="text-white/40">{item.metrics}</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Center Rotation Scrub Slider & Speed Control */}
          <div className="absolute bottom-4 inset-x-6 z-30 flex flex-col sm:flex-row items-center justify-between gap-2 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-xs text-white/80">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
              <span className="text-[11px] font-mono text-white/60">
                Campaigns: <strong className="text-white">{displayItems.length}</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/50">Speed:</span>
                {[0.02, 0.04, 0.08].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      setAutoRotateSpeed(spd);
                      setIsAutoRotating(true);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      autoRotateSpeed === spd && isAutoRotating
                        ? 'bg-[#b15f2c] text-white'
                        : 'bg-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {spd === 0.02 ? '1x' : spd === 0.04 ? '2x' : '3x'}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-white/50 hidden sm:block">
              {displayItems.find((_, i) => {
                const itemAngle = i * anglePerItem;
                const totalRotation = rotation % 360;
                const relativeAngle = (itemAngle + totalRotation + 360) % 360;
                return relativeAngle < anglePerItem / 2 || relativeAngle > 360 - anglePerItem / 2;
              })?.name || 'Selected AURA Commercial'}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: CURATED EDITORIAL GRID VIEW */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedCommercial(item)}
              className="bg-[#0f0f0f] rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-[#b15f2c]/60 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              {/* Card Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#b15f2c] text-[10px] font-bold text-white">
                    {item.duration} • {item.resolution}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-12 h-12 rounded-full bg-[#b15f2c] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <span className="pl-0.5 text-base">▶</span>
                  </div>
                </div>
              </div>

              {/* Card Content Details */}
              <div className="p-5 text-white space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
                    <span>{item.client}</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 className="text-base font-bold leading-snug group-hover:text-[#cf8047] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-semibold text-white/70 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[#10b981] font-semibold text-[11px]">{item.metrics}</span>
                    <span className="text-[#b15f2c] font-bold group-hover:translate-x-1 transition-transform">
                      Case Study →
                    </span>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL COMMERCIAL CASE STUDY & PREVIEW MODAL */}
      {/* ========================================================================= */}
      {selectedCommercial && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-[#111111] text-white rounded-3xl max-w-3xl w-full border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
            
            {/* Modal Header Media Banner */}
            <div className="relative aspect-video w-full max-h-72 overflow-hidden bg-black flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedCommercial.thumbnail}
                alt={selectedCommercial.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCommercial(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 text-white font-bold text-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer border border-white/20"
              >
                ✕
              </button>

              {/* Top Banner Tag */}
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#b15f2c] text-xs font-bold text-white shadow-md">
                  {selectedCommercial.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                  {selectedCommercial.duration} • {selectedCommercial.resolution}
                </span>
              </div>

              {/* Banner Title */}
              <div className="absolute bottom-4 inset-x-6 z-10">
                <span className="text-xs uppercase tracking-widest text-[#b15f2c] font-bold">
                  Client: {selectedCommercial.client} ({selectedCommercial.year})
                </span>
                <h2 className="text-xl sm:text-2xl font-black mt-0.5 text-white">
                  {selectedCommercial.name}
                </h2>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              
              {/* Synopsis */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1.5">
                  Production Synopsis & Creative Brief
                </h4>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {selectedCommercial.description}
                </p>
              </div>

              {/* Grid of Technical Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <span className="text-[10px] text-white/50 uppercase font-bold block">Aspect Ratio</span>
                  <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                    {selectedCommercial.aspectRatio || '16:9 & 9:16'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase font-bold block">Resolution</span>
                  <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                    {selectedCommercial.resolution}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase font-bold block">Campaign ROI</span>
                  <span className="text-xs font-bold text-[#10b981] font-mono mt-0.5 block">
                    {selectedCommercial.metrics || 'High Engagement'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase font-bold block">Delivery Turnaround</span>
                  <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                    2–3 Days
                  </span>
                </div>
              </div>

              {/* AI Tech Stack Used */}
              {selectedCommercial.tools && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-2">
                    AI Pipeline & Audio Engineering Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommercial.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-xl bg-white/10 text-xs font-semibold text-white border border-white/10 flex items-center gap-1.5"
                      >
                        <span className="text-[#b15f2c]">✦</span>
                        <span>{tool}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-2">
                  Campaign Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCommercial.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-white/70 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Bottom CTA Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-white/60 text-center sm:text-left">
                  Need a commercial like this for your product launch?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCommercial(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    Close
                  </button>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Inquiry for ${selectedCommercial.name}`)}`}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#cf8047] text-xs font-bold text-white transition-all shadow-lg text-center"
                  >
                    Request Similar Video Campaign →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
