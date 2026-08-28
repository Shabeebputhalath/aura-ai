'use client';

import React, { useState } from 'react';
import { LogoMark, GridIcon } from './Icons';

interface HeaderProps {
  ready: boolean;
  onOpenMenu: () => void;
  onOpenModal: () => void;
  scrollTo: (id: string) => void;
  currentId?: string;
}

export default function Header({ ready, onOpenMenu, onOpenModal, scrollTo, currentId = 'home' }: HeaderProps) {
  const [logoHover, setLogoHover] = useState(false);
  const [menuHover, setMenuHover] = useState(false);

  const navItems: { label: string; id: string; isModal?: boolean; hasDropdown?: boolean }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Work', id: 'works' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className="absolute inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? 'translateY(0)' : 'translateY(-14px)',
        transitionDelay: ready ? '150ms' : '0ms',
      }}
    >
      <div className="shell flex items-center justify-between gap-6 px-5 py-5 sm:px-8 sm:py-6">
        {/* Left — Brand logo button */}
        <button
          onClick={() => scrollTo('home')}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#111111] transition-transform duration-300 ease-out"
          style={{ transform: logoHover ? 'scale(1.04)' : 'scale(1)' }}
        >
          <LogoMark className="w-5 h-5 text-[#b15f2c]" />
          <span>AURA AI</span>
        </button>

        {/* Center — Primary Nav */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const isCurrent = item.id === currentId;
              if (item.isModal) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={onOpenModal}
                      className="text-[#111111]/80 hover:text-[#111111] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {item.label}
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center gap-1 transition-all duration-300 hover:-translate-y-0.5 ${
                      isCurrent ? 'text-[#111111] font-semibold underline underline-offset-4' : 'text-[#111111]/80 hover:text-[#111111]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <span className="text-xs opacity-60">▾</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right — Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            onMouseEnter={() => setMenuHover(true)}
            onMouseLeave={() => setMenuHover(false)}
            className="border border-[#e6e5e2]/80 bg-white/40 backdrop-blur-md rounded-[0.875rem] hover:bg-white/70 transition-colors duration-200"
          >
            <span
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#111111] transition-transform duration-300 ease-out"
              style={{ transform: menuHover ? 'scale(1.05)' : 'scale(1)' }}
            >
              <GridIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Menu</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
