'use client';

import React, { useEffect, useRef } from 'react';

const ASSET_BASE = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68';
const BEFORE_SRC = `${ASSET_BASE}/hero/after.jpg`; // Always shown base image
const AFTER_SRC = `${ASSET_BASE}/hero/before.jpg`; // Brush-revealed image

export default function LiquidReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const brushRadius = 143;
    const decay = 0.016;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load after image offscreen
    const afterImg = new Image();
    afterImg.crossOrigin = 'anonymous';
    afterImg.src = AFTER_SRC;

    let coverCanvas = document.createElement('canvas');
    let coverCtx = coverCanvas.getContext('2d');

    let brushCanvas = document.createElement('canvas');
    let brushCtx = brushCanvas.getContext('2d');

    let points: { x: number; y: number }[] = [];
    let lastPoint: { x: number; y: number } | null = null;
    let isDrawing = false;
    let idleFrames = 0;
    let animId: number;

    let width = 0;
    let height = 0;
    let radius = brushRadius * dpr;
    let diam = Math.ceil(radius * 2);

    function updateCover() {
      if (!afterImg.complete || afterImg.naturalWidth === 0) return;
      if (!coverCtx || width === 0 || height === 0) return;

      coverCanvas.width = width;
      coverCanvas.height = height;

      // Cover scaling math
      const imgRatio = afterImg.naturalWidth / afterImg.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      coverCtx.clearRect(0, 0, width, height);
      coverCtx.drawImage(afterImg, offsetX, offsetY, drawWidth, drawHeight);
    }

    afterImg.onload = updateCover;

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.ceil(rect.width * dpr);
      height = Math.ceil(rect.height * dpr);

      canvas.width = width;
      canvas.height = height;

      radius = brushRadius * dpr;
      diam = Math.ceil(radius * 2);

      brushCanvas.width = diam;
      brushCanvas.height = diam;

      updateCover();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    function stamp(x: number, y: number) {
      if (!brushCtx || !coverCtx || !ctx) return;

      brushCtx.clearRect(0, 0, diam, diam);

      // 1. Radial gradient on brush
      const grad = brushCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.82)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      brushCtx.globalCompositeOperation = 'source-over';
      brushCtx.fillStyle = grad;
      brushCtx.fillRect(0, 0, diam, diam);

      // 2. Source-in from cover canvas
      brushCtx.globalCompositeOperation = 'source-in';
      const sourceX = x - radius;
      const sourceY = y - radius;
      brushCtx.drawImage(coverCanvas, sourceX, sourceY, diam, diam, 0, 0, diam, diam);

      // 3. Composite onto main canvas
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(brushCanvas, x - radius, y - radius);
    }

    function onPointerMove(e: PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;

      // Ignore points outside canvas by more than radius
      if (x < -radius || x > width + radius || y < -radius || y > height + radius) {
        lastPoint = null;
        return;
      }

      isDrawing = true;
      idleFrames = 0;

      if (!lastPoint) {
        points.push({ x, y });
      } else {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const step = Math.max(radius * 0.3, 1);
        const count = Math.min(Math.ceil(dist / step), 60);

        for (let i = 1; i <= count; i++) {
          const t = i / count;
          points.push({
            x: lastPoint.x + dx * t,
            y: lastPoint.y + dy * t,
          });
        }
      }

      lastPoint = { x, y };
    }

    window.addEventListener('pointermove', onPointerMove);

    function tick() {
      if (points.length === 0) {
        idleFrames++;
      } else {
        idleFrames = 0;
      }

      if (idleFrames > 120) {
        // Clear remaining canvas after long idle
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
        }
      } else if (ctx) {
        // Decay existing pixels
        const fade = isDrawing ? decay : Math.min(decay + idleFrames * 0.004, 0.5);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
        ctx.fillRect(0, 0, width, height);

        // Stamp new points
        if (points.length > 0) {
          for (const p of points) {
            stamp(p.x, p.y);
          }
          points = [];
        }
      }

      isDrawing = false;
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden select-none">
      {/* Base Always Visible Image */}
      <img
        src={BEFORE_SRC}
        alt="Lumora Hero Architecture"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Liquid Canvas Trail Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
