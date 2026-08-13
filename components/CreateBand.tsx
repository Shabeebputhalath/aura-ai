'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from './Icons';

export default function CreateBand() {
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

  const items = [
    {
      type: 'text',
      label: 'We',
      classes: 'bg-[#f1f0ee] text-[#111111]',
    },
    {
      type: 'text',
      label: 'Create',
      classes: 'bg-gradient-to-br from-[#cf8047] to-[#97501f] text-white',
    },
    {
      type: 'icon',
      classes: 'bg-[#0a0a0a] text-white',
    },
    {
      type: 'text',
      label: 'AURA',
      classes: 'bg-[#0a0a0a] text-white tracking-widest uppercase font-bold',
    },
  ];

  return (
    <section className="bg-white">
      <ul
        ref={containerRef}
        className="shell flex flex-col sm:flex-row gap-3 sm:gap-4 px-5 py-10 sm:px-8"
      >
        {items.map((item, index) => {
          const delay = index * 120;

          return (
            <li
              key={index}
              className="flex-1 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${delay}ms`,
              }}
            >
              <div
                className={`grid place-items-center h-[6rem] sm:h-[10rem] rounded-full text-3xl sm:text-4xl font-medium select-none transition-transform duration-300 ease-[cubic-bezier(0.3,1,0.3,1)] hover:scale-103 ${item.classes}`}
              >
                {item.type === 'text' ? (
                  <span>{item.label}</span>
                ) : (
                  <ArrowRight className="w-9 h-9 sm:w-12 sm:h-12" />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
