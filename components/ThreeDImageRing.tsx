"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ThreeDImageRingProject {
  name: string;
  category: string;
  client: string;
  image: string;
  videoUrl?: string;
  description?: string;
}

export interface ThreeDImageRingProps {
  /** Array of image URLs or full project items */
  images?: string[];
  projects?: ThreeDImageRingProject[];
  onSelectProject?: (index: number) => void;
  /** Controlled rotation from external scroll or state */
  controlledRotation?: number;
  /** Container width in pixels (will be scaled) */
  width?: number;
  /** 3D perspective value */
  perspective?: number;
  /** Distance of images from center (z-depth) */
  imageDistance?: number;
  /** Initial rotation of the ring */
  initialRotation?: number;
  /** Animation duration for entrance */
  animationDuration?: number;
  /** Stagger delay between images */
  staggerDelay?: number;
  /** Hover opacity for non-hovered images */
  hoverOpacity?: number;
  /** Custom container className */
  containerClassName?: string;
  /** Custom ring className */
  ringClassName?: string;
  /** Custom image className */
  imageClassName?: string;
  /** Background color of the stage */
  backgroundColor?: string;
  /** Enable/disable drag functionality */
  draggable?: boolean;
  /** Breakpoint for mobile responsiveness (e.g., 768 for iPad mini) */
  mobileBreakpoint?: number;
  /** Scale factor for mobile (e.g., 0.7 for 70% size) */
  mobileScaleFactor?: number;
  /** Power for the drag end inertia animation */
  inertiaPower?: number;
  /** Time constant for the drag end inertia animation */
  inertiaTimeConstant?: number;
  /** Multiplier for initial velocity when drag ends */
  inertiaVelocityMultiplier?: number;
}

export function ThreeDImageRing({
  images = [],
  projects = [],
  onSelectProject,
  controlledRotation,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.2,
  staggerDelay = 0.08,
  hoverOpacity = 0.45,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.78,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
}: ThreeDImageRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Normalize items array
  const displayItems = useMemo(() => {
    if (projects.length > 0) return projects.map((p) => ({ ...p }));
    return images.map((img, i) => ({
      name: `Project 0${i + 1}`,
      category: 'Creative Design',
      client: 'Studio Selection',
      image: img,
    }));
  }, [projects, images]);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef<number>(0);
  const currentRotationY = useRef<number>(initialRotation);
  const isDragging = useRef<boolean>(false);
  const velocity = useRef<number>(0);

  const [currentScale, setCurrentScale] = useState(1);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  const angle = useMemo(() => 360 / Math.max(displayItems.length, 1), [displayItems.length]);

  // Sync with controlledRotation when provided (e.g. from smooth scroll-track)
  useEffect(() => {
    if (controlledRotation !== undefined && !isDragging.current) {
      rotationY.set(controlledRotation);
      currentRotationY.current = controlledRotation;
    }
  }, [controlledRotation, rotationY]);

  // Responsive scale
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  // Drag & touch listeners
  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grabbing";
    }
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag, { passive: false });
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!draggable || !isDragging.current) return;
    const clientX = "touches" in event ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    const deltaX = clientX - startX.current;
    velocity.current = -deltaX * 0.45;
    rotationY.set(currentRotationY.current + velocity.current);
    currentRotationY.current = rotationY.get();
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * inertiaVelocityMultiplier;
    const target = initial + velocityBoost;

    animate(initial, target, {
      type: "inertia",
      velocity: velocityBoost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (t) => Math.round(t / angle) * angle,
      onUpdate: (latest) => {
        rotationY.set(latest);
        currentRotationY.current = latest;
      },
    });

    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 150, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden select-none relative flex items-center justify-center",
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${width * 1.38}px`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn("w-full h-full absolute", ringClassName)}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
        >
          <AnimatePresence>
            {displayItems.map((item, index) => (
              <motion.div
                key={index}
                onClick={(e) => {
                  if (onSelectProject) {
                    e.stopPropagation();
                    onSelectProject(index);
                  }
                }}
                className={cn(
                  "w-full h-full absolute rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/20 group cursor-pointer",
                  imageClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  rotateY: index * -angle,
                  z: -imageDistance * currentScale,
                  transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                  opacity:
                    activeHoverIndex !== null && activeHoverIndex !== index
                      ? hoverOpacity
                      : 1,
                  transition: "opacity 0.25s ease-out, border-color 0.25s ease-out",
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={imageVariants}
                transition={{
                  delay: index * staggerDelay,
                  duration: animationDuration,
                  ease: easeOut,
                }}
                onHoverStart={() => {
                  if (!isDragging.current) {
                    setActiveHoverIndex(index);
                  }
                }}
                onHoverEnd={() => {
                  setActiveHoverIndex(null);
                }}
              >
                {/* Clean Image Background with 100% full cover - No white blanks */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
                />

                {/* Ambient vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Subtle project card top badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/15">
                    {item.category.split(' ')[0]}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-[#e65c00] transition-colors" />
                </div>

                {/* Bottom title & client info */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white pointer-events-none flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                    {item.client}
                  </span>
                  <h3 className="text-sm font-bold tracking-tight text-white line-clamp-1 group-hover:text-[#f97316] transition-colors">
                    {item.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default ThreeDImageRing;
