'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Eyebrow } from './Eyebrow';
import { LineReveal } from './TextReveal';
import { ArrowUpRight } from './Icons';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'AI Reels & Short Videos',
    description: 'Starting from ₹40/Sec. Perfect for Reels, Facebook Ads & Shorts.',
  },
  {
    number: '02',
    title: 'Product Commercial Ads',
    description: 'Starting from ₹60/Sec. High-end AI product showcases & sound design.',
  },
  {
    number: '03',
    title: 'Storytelling Videos',
    description: 'Starting from ₹80/Sec. For Brand Stories, Travel, Tourism & Real Estate.',
  },
  {
    number: '04',
    title: 'Documentary Videos',
    description: 'Starting from ₹100/Sec. Immersive long-form cinematic AI narrative.',
  },
  {
    number: '05',
    title: 'Historical / Cinematic',
    description: 'Starting from ₹120/Sec. Premium cinematic historical visuals & grading.',
  },
  {
    number: '06',
    title: '3D Pixar Style Animation',
    description: 'Starting from ₹100/Sec. Creative 3D stylized characters & stories.',
  },
];

function ServiceRow({
  service,
  index,
  isVisible,
}: {
  service: ServiceItem;
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const delay = index * 80;

  return (
    <li
      className={`transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        index !== 0 ? 'border-t border-[#e6e5e2]' : ''
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <a
        href="#services"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block rounded-[1.25rem] transition-all duration-300 ease-[cubic-bezier(0.24,1,0.26,1)] my-1"
        style={{
          backgroundColor: isHovered ? 'rgba(241, 240, 238, 1)' : 'rgba(241, 240, 238, 0)',
          paddingLeft: isHovered ? '2rem' : '1.5rem',
          paddingRight: isHovered ? '1.25rem' : '1.5rem',
        }}
      >
        <div className="flex items-center gap-4 sm:gap-6 py-6 sm:py-8">
          {/* Number */}
          <span className="w-7 sm:w-10 text-sm font-medium text-[#111111]/4 flex-shrink-0">
            {service.number}
          </span>

          {/* Title */}
          <h3 className="flex-1 text-2xl sm:text-3xl md:text-[2.25rem] font-medium tracking-tight text-[#111111]">
            {service.title}
          </h3>

          {/* Description (Desktop) */}
          <p className="hidden lg:block max-w-[20rem] text-sm text-[#111111]/55 leading-relaxed pr-4">
            {service.description}
          </p>

          {/* Arrow Badge */}
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 grid place-items-center rounded-full bg-[#0a0a0a] text-white flex-shrink-0 transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? 'translateX(5px)' : 'translateX(0px)',
            }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </a>
    </li>
  );
}

export default function Services() {
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
    <section id="services" className="bg-white">
      <div className="shell px-5 py-20 sm:px-8 lg:py-28">
        <Eyebrow tone="dark">Services</Eyebrow>

        <LineReveal
          as="h2"
          lines={['What we do best']}
          className="mt-5 mb-12 sm:mb-14 max-w-[16ch] text-[2.25rem] sm:text-[3rem] font-semibold tracking-[-0.02em] text-[#111111]"
        />

        <ul ref={containerRef} className="flex flex-col">
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
