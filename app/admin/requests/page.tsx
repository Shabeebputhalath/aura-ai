'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RequestsTable from '@/components/admin/RequestsTable';

export default function AdminRequestsPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'models' | 'projects' | 'requests' | 'pricing' | 'analytics' | 'settings'>('requests');

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#111111] font-sans flex flex-col lg:flex-row selection:bg-[#111111] selection:text-white">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-64 bg-[#111111] text-white flex flex-col justify-between p-4 lg:p-6 lg:min-h-screen z-20 flex-shrink-0">
        <div>
          {/* Brand Logo Header */}
          <div className="flex items-center justify-between pb-8 pt-2 px-2 border-b border-white/10 mb-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#b15f2c] flex items-center justify-center text-white font-black text-sm">
                ✦
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-[#b15f2c] transition-colors">
                  AURA<span className="text-[10px] font-normal align-top">®</span> AI
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/50">Admin Studio</span>
              </div>
            </Link>
          </div>

          {/* Navigation Bar Items */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '⊞', href: '/admin' },
              { id: 'requests', label: 'Requests', icon: '📩', href: '/admin/requests' },
              { id: 'models', label: 'AI Models', icon: '⚙', href: '/admin' },
              { id: 'projects', label: 'Commercials', icon: '🎬', href: '/admin' },
              { id: 'pricing', label: 'Pricing Rates', icon: '🏷', href: '/admin' },
              { id: 'analytics', label: 'Analytics', icon: '📊', href: '/admin' },
            ].map((tab) => {
              const isActive = tab.id === 'requests';
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#f4f3ef] text-[#111111] shadow-md font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
          <Link
            href="/"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
          >
            <span>← Exit to Main Site</span>
          </Link>

          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="w-8 h-8 rounded-full bg-[#b15f2c] flex items-center justify-center text-white text-xs font-bold">
              JP
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">Producer Mode</span>
              <span className="text-[10px] text-white/50">admin@aura.ai</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CENTER MAIN: Full Requests Data Table */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
        <RequestsTable />
      </main>

    </div>
  );
}
