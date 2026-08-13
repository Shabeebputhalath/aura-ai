'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from './Icons';

interface PillButtonProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light' | 'outline';
  arrow?: 'right' | 'up-right' | 'none';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  className?: string;
  disabled?: boolean;
}

export default function PillButton({
  children,
  variant = 'dark',
  arrow = 'none',
  onClick,
  type = 'button',
  href,
  className = '',
  disabled = false,
}: PillButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease',
    transform: isHovered && !disabled ? 'scale(1.04)' : 'scale(1)',
    opacity: disabled ? 0.6 : 1,
  };

  let variantClasses = '';
  if (variant === 'dark') {
    variantClasses = 'bg-[#0a0a0a] text-white';
  } else if (variant === 'light') {
    variantClasses = 'bg-[#f1f0ee] text-[#111111] hover:bg-[#e3e2df]';
  } else if (variant === 'outline') {
    variantClasses = 'border border-[#e6e5e2] bg-transparent text-[#111111] hover:bg-[#f1f0ee]';
  }

  const paddingClasses = arrow !== 'none' ? 'py-1.5 pl-6 pr-1.5' : 'py-3.5 px-7';

  let badgeStyle: React.CSSProperties = {};
  if (variant === 'dark') {
    badgeStyle = {
      backgroundColor: '#ffffff',
      color: '#0a0a0a',
    };
  } else {
    badgeStyle = {
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
    };
  }

  const arrowShift: React.CSSProperties = {
    transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
    transform:
      isHovered && !disabled
        ? arrow === 'up-right'
          ? 'translate(2px, -2px)'
          : 'translate(3px, 0)'
        : 'translate(0, 0)',
  };

  const content = (
    <>
      <span>{children}</span>
      {arrow !== 'none' && (
        <span
          className="w-9 h-9 grid place-items-center rounded-full text-base flex-shrink-0"
          style={badgeStyle}
        >
          <span style={arrowShift}>
            {arrow === 'up-right' ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        style={baseStyle}
        className={`${variantClasses} ${paddingClasses} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={baseStyle}
      className={`${variantClasses} ${paddingClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
  );
}
