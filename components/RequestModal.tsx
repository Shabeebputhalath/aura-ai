'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { LogoMark, XIcon } from './Icons';
import PillButton from './PillButton';

interface RequestModalProps {
  isOpen: boolean;
  initialConfig?: string;
  onClose: () => void;
  stopScroll: () => void;
  startScroll: () => void;
}

export default function RequestModal({
  isOpen,
  initialConfig = '',
  onClose,
  stopScroll,
  startScroll,
}: RequestModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [prevConfig, setPrevConfig] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync state during render when prop changes
  if (initialConfig !== prevConfig) {
    setPrevConfig(initialConfig);
    setProject(initialConfig);
  }

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setProject('');
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      stopScroll();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      startScroll();
    }
  }, [isOpen, stopScroll, startScroll, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !project) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-md transition-opacity duration-300 ease-out"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[32rem] overflow-hidden rounded-[2rem] bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-[#e6e5e2] transition-all duration-300 ease-out"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(28px)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 w-9 h-9 grid place-items-center rounded-full bg-[#f1f0ee] text-[#111111]/60 hover:bg-[#e3e2df] hover:text-[#111111] transition-colors"
          aria-label="Close modal"
        >
          <XIcon className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          /* Default Form View */
          <div className="flex flex-col">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-[#111111]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b15f2c]" />
                <span>AURA AI Video Inquiry</span>
              </div>
              <h2 className="text-2xl sm:text-[1.875rem] font-semibold tracking-tight text-[#111111]">
                Book your AI video campaign.
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="req-name"
                  className="text-xs font-medium uppercase tracking-wider text-[#111111]/50"
                >
                  Name
                </label>
                <input
                  id="req-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#e6e5e2] bg-[#f1f0ee]/50 rounded-[0.875rem] px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#111111]/30 focus:bg-white transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="req-email"
                  className="text-xs font-medium uppercase tracking-wider text-[#111111]/50"
                >
                  Email
                </label>
                <input
                  id="req-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#e6e5e2] bg-[#f1f0ee]/50 rounded-[0.875rem] px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#111111]/30 focus:bg-white transition-all"
                />
              </div>

              {/* Project Details */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="req-project"
                  className="text-xs font-medium uppercase tracking-wider text-[#111111]/50"
                >
                  Project
                </label>
                <textarea
                  id="req-project"
                  rows={4}
                  required
                  placeholder="A few words about your project, timeline, and budget."
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full border border-[#e6e5e2] bg-[#f1f0ee]/50 rounded-[0.875rem] px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#111111]/30 focus:bg-white resize-none transition-all"
                />
              </div>

              {/* Bottom Row */}
              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-[#111111]/45">
                  We reply within one business day.
                </span>
                <PillButton
                  type="submit"
                  variant="dark"
                  arrow="up-right"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send request'}
                </PillButton>
              </div>
            </form>
          </div>
        ) : (
          /* Success View */
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <div className="w-14 h-14 grid place-items-center rounded-full bg-[#0a0a0a] text-[#cf8047]">
              <LogoMark className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">
              Request received
            </h2>
            <p className="max-w-[32ch] text-sm text-[#111111]/60 leading-relaxed">
              Thanks for reaching out — we&apos;ll get back to you within one business day.
            </p>
            <div className="mt-2">
              <PillButton variant="dark" onClick={handleClose}>
                Close
              </PillButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
