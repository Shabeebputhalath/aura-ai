"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface TestimonialItem {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
  role?: string;
  rating?: number;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    tempId: 0,
    testimonial: "AURA AI transformed our architectural visualization pipeline. We deliver 5x faster with photorealistic 8K fidelity.",
    by: "Alexandre Moreau",
    role: "Principal Architect, Atelier Moreau",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 1,
    testimonial: "The real-time neural renders and lighting simulations have completely replaced our traditional render farm.",
    by: "Daniela Vance",
    role: "CTO, Lumina Spatial Studio",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 2,
    testimonial: "Unprecedented realism in procedural interior generation. Our enterprise real-estate clients are thoroughly impressed.",
    by: "Stephanie Zhao",
    role: "Head of Design, Metaspace Corp",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 3,
    testimonial: "AURA's generative architectural models cut our preliminary concept phase from 4 weeks down to 48 hours.",
    by: "Marcus Lindqvist",
    role: "Creative Director, Nordic Form",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars out of 10 for spatial fidelity and AI material physics, I would. Truly phenomenal work.",
    by: "Andre Rossi",
    role: "Chief Spatial Officer, Horizon Urban",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 5,
    testimonial: "Saved our studio over 300 compute hours on our last flagship skyscraper presentation. Seamless and intuitive.",
    by: "Jeremy Chen",
    role: "Lead 3D Director, Vertex Global",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 6,
    testimonial: "The precision in ray-traced ambient lighting and parametric structures is completely unmatched in modern AI tools.",
    by: "Pamela Sterling",
    role: "Partner, Foster & Sterling Design",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 7,
    testimonial: "The client acquisition conversion increased by 64% after switching to AURA's interactive cinematic walkthroughs.",
    by: "David K. Hoffmann",
    role: "Managing Director, Munich Living",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    rating: 5
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-7 sm:p-8 transition-all duration-500 ease-in-out select-none flex flex-col justify-between",
        isCenter 
          ? "z-20 bg-[#b15f2c] text-white border-[#b15f2c] shadow-2xl shadow-[#b15f2c]/30" 
          : "z-0 bg-white text-[#111111] border-[#e6e5e2] hover:border-[#b15f2c]/50 shadow-lg shadow-black/5"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.45) * position}px)
          translateY(${isCenter ? -35 : position % 2 ? 20 : -20}px)
          rotate(${isCenter ? 0 : position % 2 ? 3 : -3}deg)
          scale(${isCenter ? 1.05 : 0.92})
        `,
        opacity: Math.abs(position) > 3 ? 0 : Math.abs(position) === 3 ? 0.3 : 1,
        pointerEvents: Math.abs(position) > 2 ? 'none' : 'auto'
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-white/30" : "bg-[#e6e5e2]"
        )}
        style={{
          right: -2,
          top: 38,
          width: SQRT_5000,
          height: 2
        }}
      />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <img
            src={testimonial.imgSrc}
            alt={testimonial.by}
            className={cn(
              "h-12 w-12 rounded-xl object-cover ring-2",
              isCenter ? "ring-white/40" : "ring-[#b15f2c]/30"
            )}
          />
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-3.5 h-3.5",
                  isCenter ? "fill-amber-200 text-amber-200" : "fill-[#b15f2c] text-[#b15f2c]"
                )} 
              />
            ))}
          </div>
        </div>

        <h3 className={cn(
          "text-sm sm:text-base font-medium leading-relaxed font-sans line-clamp-4",
          isCenter ? "text-white" : "text-[#111111]"
        )}>
          &ldquo;{testimonial.testimonial}&rdquo;
        </h3>
      </div>

      <div className={cn(
        "pt-3 border-t",
        isCenter ? "border-white/20" : "border-[#e6e5e2]"
      )}>
        <p className={cn(
          "text-xs sm:text-sm font-bold tracking-tight",
          isCenter ? "text-white" : "text-[#111111]"
        )}>
          {testimonial.by}
        </p>
        {testimonial.role && (
          <p className={cn(
            "text-[11px] truncate mt-0.5 font-mono",
            isCenter ? "text-white/80" : "text-[#8d8d8d]"
          )}>
            {testimonial.role}
          </p>
        )}
      </div>
    </div>
  );
};

export interface StaggerTestimonialsProps {
  items?: TestimonialItem[];
  className?: string;
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  items = defaultTestimonials,
  className
}) => {
  const [cardSize, setCardSize] = useState(360);
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>(items);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardSize(280);
      } else if (width < 1024) {
        setCardSize(320);
      } else {
        setCardSize(360);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none py-6",
        className
      )}
      style={{ height: 520 }}
    >
      <div className="relative w-full h-[430px] flex items-center justify-center">
        {testimonialsList.map((testimonial, index) => {
          const position = testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
      </div>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 z-30">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl transition-all cursor-pointer shadow-md",
            "bg-white border border-[#e6e5e2] text-[#111111] hover:bg-[#b15f2c] hover:text-white hover:border-[#b15f2c]",
            "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b15f2c]"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-[11px] font-mono text-[#8d8d8d] px-2 font-semibold tracking-wider uppercase">
          Drag / Click to Navigate
        </span>

        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl transition-all cursor-pointer shadow-md",
            "bg-white border border-[#e6e5e2] text-[#111111] hover:bg-[#b15f2c] hover:text-white hover:border-[#b15f2c]",
            "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b15f2c]"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
