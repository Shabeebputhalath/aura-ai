'use client';

import { useEffect } from 'react';

export default function AdaptiveGrid() {
  useEffect(() => {
    function applyAdaptiveGrid() {
      const FONT_BASE = 16;
      const baseWidth = 1920;
      const coef = 0.6666;
      const w = window.innerWidth;
      const widthReduction = ((baseWidth - w) / baseWidth) * 100; // negative when w > baseWidth
      const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;

      if (size > FONT_BASE) {
        document.documentElement.style.fontSize = `${size}px`;
      } else {
        document.documentElement.style.removeProperty('font-size');
      }
    }

    applyAdaptiveGrid();
    window.addEventListener('resize', applyAdaptiveGrid);
    return () => window.removeEventListener('resize', applyAdaptiveGrid);
  }, []);

  return null;
}
