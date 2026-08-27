"use client"

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
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
    testimonial: "AURA transformed our architectural visualization pipeline. We deliver 5x faster with photorealistic 8K fidelity.",
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
    testimonial: "The generative design models cut our preliminary concept phase from 4 weeks down to 48 hours.",
    by: "Marcus Lindqvist",
    role: "Creative Director, Nordic Form",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars out of 10 for spatial fidelity and material physics, I would. Truly phenomenal work.",
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
    testimonial: "The precision in ambient lighting and parametric structures is completely unmatched in modern digital design tools.",
    by: "Pamela Sterling",
    role: "Partner, Foster & Sterling Design",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    tempId: 7,
    testimonial: "Client acquisition conversion increased by 64% after switching to interactive cinematic walkthroughs.",
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
          ? "z-20 bg-[#111111] text-white border-[#111111] shadow-2xl shadow-black/30" 
          : "z-0 bg-white text-[#111111] border-neutral-200 hover:border-black shadow-lg shadow-black/5"
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
      {/* Geometric chamfer accent line */}
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-white/25" : "bg-neutral-200"
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
              isCenter ? "ring-white/30" : "ring-neutral-200"
            )}
          />
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-3.5 h-3.5",
                  isCenter ? "fill-white text-white" : "fill-black text-black"
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
        isCenter ? "border-white/15" : "border-neutral-200"
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
            isCenter ? "text-neutral-400" : "text-neutral-500"
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
  const [isPaused, setIsPaused] = useState(false);

  const handleMove = React.useCallback((steps: number) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  }, []);

  // Infinite 1-second auto progression
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleMove(1);
    }, 1000);

    return () => clearInterval(interval);
  }, [handleMove, isPaused]);

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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
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
    </div>
  );
};

export default StaggerTestimonials;
