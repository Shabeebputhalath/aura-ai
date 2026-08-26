'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import {
  getActiveWhatsAppConfig,
  buildWhatsAppUrl,
  recordWhatsAppInquiry,
  WhatsAppConfig,
  DEFAULT_WHATSAPP_CONFIG,
} from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
  const [config, setConfig] = useState<WhatsAppConfig>(() => getActiveWhatsAppConfig());
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  useEffect(() => {
    const handleConfigUpdate = () => {
      setConfig(getActiveWhatsAppConfig());
    };

    window.addEventListener('aura_admin_whatsapp_updated', handleConfigUpdate);
    window.addEventListener('storage', handleConfigUpdate);

    // Auto show teaser bubble after 4 seconds
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);

    return () => {
      window.removeEventListener('aura_admin_whatsapp_updated', handleConfigUpdate);
      window.removeEventListener('storage', handleConfigUpdate);
      clearTimeout(timer);
    };
  }, []);

  if (!config.isEnabled) return null;

  const handleDirectWhatsAppClick = () => {
    recordWhatsAppInquiry('Direct WhatsApp Floating Button', window.location.pathname || 'Homepage');
    const url = buildWhatsAppUrl();
    window.open(url, '_blank');
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    recordWhatsAppInquiry(
      customMsg ? `Custom Inquiry: ${customMsg}` : 'Direct Floating Chat',
      window.location.pathname || 'Homepage'
    );
    const url = buildWhatsAppUrl(customMsg || undefined);
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Mini Chat Popover Card */}
      {isOpen && (
        <div
          id="whatsapp-chat-popover"
          className="mb-3 w-[320px] sm:w-[350px] bg-[#0d1117] border border-[#2d3748] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#075E54] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-sm tracking-wider">
                  🎬
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight">AURA AI Studio</h4>
                <p className="text-[11px] text-white/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Typically replies in 5 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body Bubble */}
          <div className="p-4 bg-[#161b22] space-y-3">
            <div className="bg-[#21262d] border border-[#30363d] text-slate-100 rounded-2xl rounded-tl-xs p-3 text-xs leading-relaxed max-w-[90%] shadow-xs">
              <p className="font-semibold text-emerald-400 mb-1">AURA AI Production Team</p>
              <p>{config.defaultGreeting || 'Hello! Welcome to AURA AI Studio. Looking for 4K AI commercials or rate cards?'}</p>
              <span className="block text-[10px] text-slate-400 text-right mt-1 font-mono">Just now</span>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setCustomMsg("Hi! I'd like to get a quote for a 30s product commercial.");
                }}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#21262d] hover:bg-[#30363d] text-slate-300 hover:text-white border border-[#30363d] transition-colors cursor-pointer text-left"
              >
                🎥 30s Product Commercial quote
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomMsg("Hi AURA AI! Can you share recent AI commercial video samples?");
                }}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#21262d] hover:bg-[#30363d] text-slate-300 hover:text-white border border-[#30363d] transition-colors cursor-pointer text-left"
              >
                ✨ Request Video Portfolio
              </button>
            </div>
          </div>

          {/* Input & Send Form */}
          <form onSubmit={handleSendCustomMessage} className="p-3 bg-[#0d1117] border-t border-[#21262d] flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type your message on WhatsApp..."
              className="flex-1 px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#075E54] font-bold text-xs rounded-xl flex items-center gap-1 transition-transform hover:scale-105 cursor-pointer shadow-md"
            >
              <span>Send</span>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button Group */}
      <div className="flex items-center gap-2.5">
        {/* Subtle Greeting Bubble tooltip when closed */}
        {!isOpen && hasPrompted && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-[#111111]/90 backdrop-blur-md border border-white/10 text-white rounded-2xl shadow-xl text-xs font-medium cursor-pointer hover:bg-black transition-all hover:scale-102 animate-in fade-in slide-in-from-right-3 duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping shrink-0" />
            <span className="truncate max-w-[180px]">Chat on WhatsApp</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHasPrompted(false);
              }}
              className="ml-1 text-slate-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* WhatsApp Round Floating Action Button */}
        <button
          id="btn-whatsapp-floating"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              // Direct WhatsApp or open popover
              handleDirectWhatsAppClick();
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl hover:shadow-[#25D366]/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-white/10 focus:outline-none"
          aria-label={config.ctaText || 'Chat with AURA AI on WhatsApp'}
          title={config.ctaText || 'Chat with AURA AI on WhatsApp'}
        >
          {/* Subtle radiating wave */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

          {/* WhatsApp SVG Icon */}
          <svg
            className="w-7 h-7 fill-current relative z-10 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.073-2.023-.475-1.503-.623-2.482-2.138-2.556-2.238-.075-.099-.607-.808-.607-1.543s.387-1.096.525-1.246c.137-.149.3-.186.4-.186.1 0 .2.001.288.006.09.006.211-.034.33.252.123.297.424 1.036.46 1.112.037.075.062.164.013.264-.05.099-.075.161-.15.249-.075.087-.157.195-.224.262-.075.075-.153.157-.066.307.087.149.387.638.83 1.031.57.508 1.05.665 1.199.74.149.075.236.062.324-.038.087-.1.374-.436.474-.586.099-.149.2-.124.337-.075.137.05.87.41 1.02.485.149.075.249.112.286.175.037.062.037.362-.107.767zM12.05 2C6.508 2 2.016 6.5 2.016 12.05c0 2.023.6 3.921 1.636 5.526L2 22l4.576-1.597c1.545.918 3.336 1.447 5.253 1.447 5.542 0 10.034-4.5 10.034-10.05C21.863 6.5 17.571 2 12.05 2z" />
          </svg>

          {/* Online badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
        </button>
      </div>
    </div>
  );
}
