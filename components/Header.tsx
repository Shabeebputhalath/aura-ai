'use client';

import React, { useEffect, useState } from 'react';
import { LogoMark, GridIcon } from './Icons';

interface HeaderProps {
  ready: boolean;
  onOpenMenu: () => void;
  onOpenModal: () => void;
  scrollTo: (id: string) => void;
}

export default function Header({ ready, onOpenMenu, onOpenModal, scrollTo }: HeaderProps) {
  const [timeStr, setTimeStr] = useState('9:41am');
  const [dateStr, setDateStr] = useState('12 March, 2025');
  const [logoHover, setLogoHover] = useState(false);
  const [menuHover, setMenuHover] = useState(false);

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const hoursRaw = now.getHours();
      const hours = hoursRaw % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const meridiem = hoursRaw >= 12 ? 'pm' : 'am';
      setTimeStr(`${hours}:${minutes}${meridiem}`);

      const day = now.getDate();
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      setDateStr(`${day} ${month}, ${year}`);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { label: string; id: string; current?: boolean; isModal?: boolean; hasDropdown?: boolean }[] = [
    { label: 'Home', id: 'home', current: true },
    { label: 'Work', id: 'works' },
    { label: 'Services', id: 'services' },
    { label: 'Pricing', id: 'pricing' },
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
                      item.current ? 'text-[#111111] font-semibold' : 'text-[#111111]/80 hover:text-[#111111]'
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

        {/* Right — Clock Chip & Menu */}
        <div className="flex items-center gap-3">
          {/* Live Clock Chip */}
          <div className="hidden md:flex items-center gap-3 border border-[#e6e5e2]/80 bg-white/40 backdrop-blur-md rounded-[0.875rem] px-3 py-2 text-xs text-[#111111]/70">
            <span className="text-[#111111]/45 font-normal">Local time</span>
            <span className="min-w-[3.5rem] tabular-nums font-medium text-[#111111]">{timeStr}</span>
            <span className="text-[#111111]/30">•</span>
            <span className="font-medium text-[#111111]">{dateStr}</span>
          </div>

          {/* Menu Button */}
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
