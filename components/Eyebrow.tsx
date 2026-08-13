import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  tone?: 'dark' | 'light';
  bordered?: boolean;
  className?: string;
}

export function Eyebrow({ children, tone = 'dark', bordered = false, className = '' }: EyebrowProps) {
  const isLight = tone === 'light';

  const dotClass = isLight ? 'bg-white/60' : 'bg-[#111111]/50';
  const textClass = isLight ? 'text-white/70' : 'text-[#111111]/70';
  const borderClass = bordered
    ? 'border border-[#e6e5e2] rounded-full px-4 py-1.5'
    : '';

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${textClass} ${borderClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span>{children}</span>
    </span>
  );
}

export function TagChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex border border-white/25 text-white rounded-full px-4 py-2 text-sm font-normal backdrop-blur-xs">
      {children}
    </span>
  );
}

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  shiftAmount?: number;
}

export function AnimatedLink({
  href,
  children,
  onClick,
  className = '',
  shiftAmount = 4,
}: AnimatedLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center transition-all duration-300 hover:translate-x-1 opacity-70 hover:opacity-100 ${className}`}
      style={{
        transformOrigin: 'left center',
      }}
    >
      {children}
    </a>
  );
}
