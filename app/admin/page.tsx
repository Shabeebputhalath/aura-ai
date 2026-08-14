'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RequestsTable from '@/components/admin/RequestsTable';
import CommercialsManager from '@/components/admin/CommercialsManager';
import PricingManager from '@/components/admin/PricingManager';

// Types for Admin Panel
interface LeadInquiry {
  id: string;
  clientName: string;
  company: string;
  service: string;
  budget: string;
  status: 'pending' | 'accepted' | 'declined';
  time: string;
  avatar: string;
  details: string;
}

const INITIAL_INQUIRIES: LeadInquiry[] = [
  {
    id: 'req-101',
    clientName: 'Alex Rivera',
    company: 'Velentis Luxury Watches',
    service: 'Luxury Commercial Video (30s)',
    budget: '₹1,20,000',
    status: 'pending',
    time: '12 mins ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    details: 'Looking for a cinematic 4K commercial reel featuring liquid metallic textures and studio macro product shots.',
  },
  {
    id: 'req-102',
    clientName: 'Sarah Jenkins',
    company: 'Aura Skincare Co.',
    service: 'Social Media Reel Campaign',
    budget: '₹85,000',
    status: 'pending',
    time: '45 mins ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    details: 'Need 3 vertical 9:16 ads for Instagram and TikTok with photorealistic AI model motion.',
  },
  {
    id: 'req-103',
    clientName: 'Michael Chang',
    company: 'Nebula Tech Labs',
    service: 'App Launch Teaser Trailer',
    budget: '₹2,50,000',
    status: 'pending',
    time: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    details: '3D futurism render with motion typography and custom AI voiceover scoring for product launch.',
  },
  {
    id: 'req-104',
    clientName: 'Elena Rostova',
    company: 'Mode Atelier',
    service: 'E-commerce Listing Ads',
    budget: '₹95,000',
    status: 'pending',
    time: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    details: 'High-end runway simulation for fashion line preview.',
  },
  {
    id: 'req-105',
    clientName: 'David K.',
    company: 'Apex Performance Auto',
    service: 'Broadcast Television Ad',
    budget: '₹3,20,000',
    status: 'pending',
    time: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    details: 'Full 16:9 4K UHD commercial campaign with sound design and rapid turnarounds.',
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'models' | 'projects' | 'requests' | 'pricing' | 'analytics' | 'settings'>('dashboard');
  const [inquiries, setInquiries] = useState<LeadInquiry[]>(INITIAL_INQUIRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<LeadInquiry | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleInquiryStatus = (id: string, status: 'accepted' | 'declined', clientName: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Project inquiry from ${clientName} ${status === 'accepted' ? 'APPROVED & MOVED TO QUEUE' : 'DECLINED'}`);
  };

  const pendingCount = inquiries.filter((i) => i.status === 'pending').length;

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#111111] font-sans flex flex-col lg:flex-row selection:bg-[#111111] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[100] bg-[#111111] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-3 animate-fade-in border border-white/20">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* LEFT SIDEBAR: Brand & Navigation (Site Palette & Curved Active Indicator) */}
      {/* ========================================================= */}
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
              { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
              { id: 'models', label: 'AI Models', icon: '⚙' },
              { id: 'projects', label: 'Commercials', icon: '🎬' },
              { id: 'requests', label: 'Requests', icon: '📩', count: pendingCount },
              { id: 'pricing', label: 'Pricing Rates', icon: '🏷' },
              { id: 'analytics', label: 'Analytics', icon: '📊' },
              { id: 'settings', label: 'Settings', icon: '🔒' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-[#b15f2c] text-white' : 'bg-[#b15f2c] text-white'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
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

      {/* ========================================================= */}
      {/* CENTER DASHBOARD AREA */}
      {/* ========================================================= */}
      {activeTab === 'requests' ? (
        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
          <RequestsTable />
        </main>
      ) : activeTab === 'projects' || (activeTab as string) === 'commercials' ? (
        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
          <CommercialsManager />
        </main>
      ) : activeTab === 'pricing' ? (
        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
          <PricingManager />
        </main>
      ) : (
        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto space-y-8">
          
          {/* Top Bar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e6e5e2] shadow-xs">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-[#111111]/60 mt-0.5">
                Welcome back, <span className="font-semibold text-[#b15f2c]">Lead Producer</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Quick Filter or Live Indicator */}
              <div className="flex items-center gap-2 bg-[#f4f3ef] px-3 py-1.5 rounded-full border border-[#e6e5e2] text-xs font-semibold text-[#111111]">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>4K Render Pipeline Online</span>
              </div>

              {/* Notification Icon */}
              <button
                onClick={() => setActiveTab('requests')}
                className="relative p-2.5 rounded-xl border border-[#e6e5e2] hover:bg-[#f4f3ef] transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <svg className="w-5 h-5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#b15f2c] text-white text-[9px] font-bold flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Hero Score & Points Metric Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e5e2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center rounded-full border-4 border-[#b15f2c] bg-[#f4f3ef]/50">
                <span className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">86</span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                  Active Commercial Renders
                </h2>
                <p className="text-xs sm:text-sm text-[#111111]/60 mt-1 max-w-md">
                  Keep up the studio quality and turnaround speed to maintain top client ratings!
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end border-t md:border-t-0 md:border-l border-[#e6e5e2] pt-4 md:pt-0 md:pl-8">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#111111]/50">Studio Rating</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-[#111111]">4.9</span>
                <span className="text-xs text-[#111111]/50">/ 5.0</span>
              </div>
              <div className="flex gap-1 text-[#b15f2c] text-sm mt-1">
                ★★★★★
              </div>
            </div>
          </div>

          {/* Middle Row: AI Models Capacity & Commercial Ratings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: AI Model Utilization Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-[#e6e5e2] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#111111] tracking-tight">AI Models Pipeline</h3>
                <button
                  onClick={() => setActiveTab('models')}
                  className="text-xs font-semibold text-[#b15f2c] hover:underline"
                >
                  See All →
                </button>
              </div>

              <div className="flex items-center gap-6 my-2">
                <div className="relative w-20 h-20 rounded-full border-4 border-[#111111] flex items-center justify-center bg-[#f4f3ef] flex-shrink-0">
                  <div className="text-center">
                    <span className="text-lg font-bold text-[#111111]">86</span>
                    <span className="block text-[8px] uppercase tracking-wider text-[#111111]/60">Renders</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Runway Gen-3 Alpha</span>
                      <span className="text-[#b15f2c]">85%</span>
                    </div>
                    <div className="w-full bg-[#f4f3ef] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#b15f2c] h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Sora Ultra 4K</span>
                      <span className="text-[#111111]">80%</span>
                    </div>
                    <div className="w-full bg-[#f4f3ef] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#111111] h-full rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Kling AI Pro</span>
                      <span className="text-[#b15f2c]">75%</span>
                    </div>
                    <div className="w-full bg-[#f4f3ef] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#b15f2c]/80 h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Midjourney v6</span>
                      <span className="text-[#111111]">65%</span>
                    </div>
                    <div className="w-full bg-[#f4f3ef] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#111111]/60 h-full rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Recent Commercials & Ratings */}
            <div className="bg-white p-6 rounded-2xl border border-[#e6e5e2] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#111111] tracking-tight">Recent Client Ratings</h3>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs font-semibold text-[#b15f2c] hover:underline"
                >
                  See More →
                </button>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="text-center flex-shrink-0">
                  <span className="text-3xl font-black text-[#111111]">4.9</span>
                  <span className="text-xs text-[#111111]/50 block">/ 5.0</span>
                  <div className="text-[#b15f2c] text-xs mt-0.5">★★★★★</div>
                  <span className="text-[10px] text-[#b15f2c] font-semibold mt-1 block">164 Approved Ads</span>
                </div>

                <div className="flex-1 space-y-2 border-l border-[#e6e5e2] pl-4">
                  <div className="text-xs">
                    <div className="font-semibold text-[#111111]">Luxury Watch Ad - Rolex</div>
                    <div className="text-[10px] text-[#111111]/60">Created by Velentis Manager • 4.9 ★</div>
                  </div>
                  <div className="text-xs pt-1 border-t border-[#f4f3ef]">
                    <div className="font-semibold text-[#111111]">E-commerce Reel - Nike</div>
                    <div className="text-[10px] text-[#111111]/60">Created by Request Manager • 4.8 ★</div>
                  </div>
                  <div className="text-xs pt-1 border-t border-[#f4f3ef]">
                    <div className="font-semibold text-[#111111]">App Teaser - TechCo</div>
                    <div className="text-[10px] text-[#111111]/60">Created by Product Lead • 5.0 ★</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Quick Studio Actions */}
          <div>
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-3">
              Recommended Studio Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => showToast('AI Prompt Campaign Builder Launched')}
                className="bg-white p-4 rounded-xl border border-[#e6e5e2] hover:border-[#111111] transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#b15f2c]">Production</span>
                  <h4 className="text-sm font-bold text-[#111111] mt-0.5">New Video Campaign</h4>
                </div>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={() => showToast('4K Render Batch Engine Ready')}
                className="bg-white p-4 rounded-xl border border-[#e6e5e2] hover:border-[#111111] transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#b15f2c]">Export</span>
                  <h4 className="text-sm font-bold text-[#111111] mt-0.5">Batch 4K Renders</h4>
                </div>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className="bg-white p-4 rounded-xl border border-[#e6e5e2] hover:border-[#111111] transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#b15f2c]">Pricing</span>
                  <h4 className="text-sm font-bold text-[#111111] mt-0.5">Manage Rates (₹/s)</h4>
                </div>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

        </main>
      )}

      {/* ========================================================= */}
      {/* RIGHT PANEL: Requests & Lead Inquiries List (Reference Layout) */}
      {/* ========================================================= */}
      <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-[#e6e5e2] p-5 lg:p-6 flex flex-col justify-between flex-shrink-0 z-10">
        <div>
          {/* Search Input Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search requests..."
              className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] placeholder:text-[#111111]/40 outline-none focus:border-[#111111] transition-colors"
            />
            <span className="absolute right-3 top-2.5 text-xs text-[#111111]/40">🔍</span>
          </div>

          {/* Requests Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#111111]">Requests</h3>
              <span className="bg-[#b15f2c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            </div>
            <button className="text-xs text-[#111111]/50 hover:text-[#111111]">
              ⚙ Filter
            </button>
          </div>

          {/* Inquiry Cards List */}
          <div className="space-y-3.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {filteredInquiries.length === 0 ? (
              <p className="text-xs text-[#111111]/50 py-8 text-center">No matching requests found.</p>
            ) : (
              filteredInquiries.map((req) => (
                <div
                  key={req.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    req.status === 'accepted'
                      ? 'bg-[#10b981]/5 border-[#10b981]/30'
                      : req.status === 'declined'
                      ? 'bg-[#ef4444]/5 border-[#ef4444]/30'
                      : 'bg-[#f4f3ef]/50 border-[#e6e5e2] hover:border-[#111111]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={req.avatar}
                      alt={req.clientName}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-[#e6e5e2]"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#111111] truncate">
                        {req.service}
                      </h4>
                      <p className="text-[10px] text-[#111111]/60 truncate">
                        By {req.clientName} ({req.company})
                      </p>
                      
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e6e5e2]">
                        <button
                          onClick={() => setSelectedInquiry(req)}
                          className="text-[10px] font-semibold text-[#b15f2c] hover:underline"
                        >
                          Project Agreement 📥
                        </button>

                        {/* Accept / Decline Interactive Buttons */}
                        {req.status === 'pending' ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleInquiryStatus(req.id, 'declined', req.clientName)}
                              className="w-6 h-6 rounded-md bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center hover:bg-[#dc2626] transition-colors cursor-pointer"
                              title="Decline"
                            >
                              ✕
                            </button>
                            <button
                              onClick={() => handleInquiryStatus(req.id, 'accepted', req.clientName)}
                              className="w-6 h-6 rounded-md bg-[#10b981] text-white text-xs font-bold flex items-center justify-center hover:bg-[#059669] transition-colors cursor-pointer"
                              title="Accept & Start"
                            >
                              ✓
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              req.status === 'accepted'
                                ? 'bg-[#10b981] text-white'
                                : 'bg-[#ef4444] text-white'
                            }`}
                          >
                            {req.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          onClick={() => setActiveTab('requests')}
          className="w-full mt-4 py-2.5 text-center text-xs font-bold text-[#b15f2c] hover:underline border-t border-[#e6e5e2] pt-4"
        >
          See More Requests →
        </button>
      </aside>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e6e5e2] space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-[#b15f2c] uppercase tracking-wider">
                  Inquiry Brief
                </span>
                <h3 className="text-lg font-bold text-[#111111]">{selectedInquiry.service}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#111111]/80 bg-[#f4f3ef] p-4 rounded-xl">
              <div><strong className="text-[#111111]">Client:</strong> {selectedInquiry.clientName} ({selectedInquiry.company})</div>
              <div><strong className="text-[#111111]">Estimated Budget:</strong> {selectedInquiry.budget}</div>
              <div><strong className="text-[#111111]">Submitted:</strong> {selectedInquiry.time}</div>
              <p className="pt-2 border-t border-[#e6e5e2] text-[#111111]/90">{selectedInquiry.details}</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black"
              >
                Close
              </button>
              {selectedInquiry.status === 'pending' && (
                <button
                  onClick={() => {
                    handleInquiryStatus(selectedInquiry.id, 'accepted', selectedInquiry.clientName);
                    setSelectedInquiry(null);
                  }}
                  className="px-4 py-2 bg-[#10b981] text-white text-xs font-bold rounded-xl hover:bg-[#059669]"
                >
                  Accept Project & Generate Storyboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
