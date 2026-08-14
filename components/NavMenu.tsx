'use client';

import React, { useEffect } from 'react';
import { LogoMark, XIcon } from './Icons';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
  scrollTo: (id: string) => void;
  stopScroll: () => void;
  startScroll: () => void;
}

interface MenuItem {
  label: string;
  id: string;
  isModal?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'works' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export default function NavMenu({
  isOpen,
  onClose,
  onOpenModal,
  scrollTo,
  stopScroll,
  startScroll,
}: NavMenuProps) {
  useEffect(() => {
    if (isOpen) {
      stopScroll();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      startScroll();
    }
  }, [isOpen, stopScroll, startScroll, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (item: typeof MENU_ITEMS[0]) => {
    onClose();
    setTimeout(() => {
      if (item.isModal) {
        onOpenModal();
      } else {
        scrollTo(item.id);
      }
    }, 150);
  };

  const handleStartProject = () => {
    onClose();
    setTimeout(() => {
      onOpenModal();
    }, 150);
  };

  return (
    <div
      className="fixed inset-0 z-[115] flex flex-col bg-[#0a0a0a] text-white transition-opacity duration-300 ease-out"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      {/* Top Bar */}
      <div className="shell w-full flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <LogoMark className="w-5 h-5 text-[#cf8047]" />
          <span>AURA AI STUDIO</span>
        </div>

        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 border border-white/15 rounded-[0.875rem] px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/70 hover:text-white hover:border-white/40 transition-colors"
        >
          <XIcon className="w-3.5 h-3.5" />
          <span>Close</span>
        </button>
      </div>

      {/* Navigation List */}
      <div className="shell flex-1 flex flex-col justify-center px-5 sm:px-8 py-6">
        <ul className="flex flex-col gap-1">
          {MENU_ITEMS.map((item, index) => {
            const delay = index * 45 + 80;

            return (
              <li key={item.label}>
                <button
                  onClick={() => handleItemClick(item)}
                  className="group w-full flex items-baseline gap-4 py-2 text-left text-3xl sm:text-6xl font-semibold tracking-tight transition-all duration-500 ease-out"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(1rem)',
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  <span className="text-base font-normal text-white/30 group-hover:text-[#cf8047] transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-white/70 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Bar */}
      <div className="shell w-full flex items-center justify-end border-t border-white/10 px-5 py-6 sm:px-8 text-xs uppercase tracking-wider">
        <button
          onClick={handleStartProject}
          className="text-white/70 hover:text-white hover:underline transition-colors"
        >
          Start a project →
        </button>
      </div>
    </div>
  );
}
