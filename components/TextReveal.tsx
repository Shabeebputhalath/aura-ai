'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LineRevealProps {
  lines: string[];
  className?: string;
  lineStagger?: number; // ms delay per line
  ready?: boolean; // if gated on intro loader
  delay?: number; // base delay in ms
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export function LineReveal({
  lines,
  className = '',
  lineStagger = 120,
  ready = true,
  delay = 0,
  as: Component = 'h1',
}: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;

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
  }, [ready]);

  return (
    <Component ref={containerRef as any} className={className}>
      {lines.map((line, index) => {
        const lineDelay = delay + index * lineStagger;
        const active = ready && isVisible;

        return (
          <span key={index} className="block overflow-hidden py-0.5">
            <span
              className="block transition-all duration-900 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
              style={{
                transform: active ? 'translateY(0%)' : 'translateY(110%)',
                opacity: active ? 1 : 0,
                transitionDelay: `${lineDelay}ms`,
              }}
            >
              {line}
            </span>
          </span>
        );
      })}
    </Component>
  );
}

interface WordRevealProps {
  text: string;
  mutedText?: string;
  className?: string;
  wordStagger?: number; // ms per word
  delay?: number;
  ready?: boolean;
}

export function WordReveal({
  text,
  mutedText,
  className = '',
  wordStagger = 35,
  delay = 0,
  ready = true,
}: WordRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;

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
  }, [ready]);

  const mainWords = text.split(' ');
  const mutedWords = mutedText ? mutedText.split(' ') : [];
  const active = ready && isVisible;

  let totalIndex = 0;

  return (
    <h2 ref={containerRef} className={className}>
      {mainWords.map((word, index) => {
        const wordDelay = delay + totalIndex * wordStagger;
        totalIndex++;

        return (
          <span key={`m-${index}`} className="inline-block overflow-hidden mr-[0.28em] vertical-bottom">
            <span
              className="inline-block transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              style={{
                transform: active ? 'translateY(0)' : 'translateY(24px)',
                opacity: active ? 1 : 0,
                transitionDelay: `${wordDelay}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}

      {mutedWords.map((word, index) => {
        const wordDelay = delay + totalIndex * wordStagger;
        totalIndex++;

        return (
          <span key={`muted-${index}`} className="inline-block overflow-hidden mr-[0.28em] text-[#8d8d8d] vertical-bottom">
            <span
              className="inline-block transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              style={{
                transform: active ? 'translateY(0)' : 'translateY(24px)',
                opacity: active ? 1 : 0,
                transitionDelay: `${wordDelay}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </h2>
  );
}
