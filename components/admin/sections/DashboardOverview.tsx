'use client';

import React, { useState } from 'react';
import {
  MoreVertical,
  SlidersHorizontal,
  Star,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Film,
  MessageSquare,
  Eye,
  Plus,
  Layers,
  Phone,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  AdminProject,
  AdminService,
  AdminPricingPlan,
  AdminMessage,
  AdminWhatsAppConfig,
} from '../types';

interface DashboardOverviewProps {
  projects: AdminProject[];
  services: AdminService[];
  pricingPlans: AdminPricingPlan[];
  messages: AdminMessage[];
  whatsappConfig: AdminWhatsAppConfig;
  onNavigateTab: (tab: string) => void;
  onOpenNewProject: () => void;
  onSelectMessage: (msg: AdminMessage) => void;
}

export default function DashboardOverview({
  projects,
  services,
  pricingPlans,
  messages,
  whatsappConfig,
  onNavigateTab,
  onOpenNewProject,
  onSelectMessage,
}: DashboardOverviewProps) {
  // Timeframe selector state (1H, 24H, 1W, 1M, 1Y, ALL)
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1W');

  // Watchlist starred state
  const [watchlist, setWatchlist] = useState<Record<string, boolean>>({
    band: false,
    vet: false,
    aave: true,
    waves: false,
  });

  // Table filter states
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('24h');
  const [gainersFilter, setGainersFilter] = useState<'Top gainers' | 'Top volume' | 'Recent Briefs'>('Top gainers');
  const [viewMode, setViewMode] = useState<'crypto' | 'studio'>('crypto');

  // Calculated studio stats
  const publishedProjects = projects.filter((p) => p.status === 'published');
  const activeServices = services.filter((s) => s.isActive);
  const activePricingPlans = pricingPlans.filter((p) => p.isActive);
  const newMessages = messages.filter((m) => m.status === 'new');
  const totalViews = projects.reduce((acc, curr) => acc + (curr.views || 0), 0);

  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock Market Data strictly matching the uploaded image
  const marketRows = [
    {
      id: 'band',
      name: 'Band Protocol',
      symbol: 'BAND',
      iconChar: 'B',
      price: '$2.42',
      change: '+13.38%',
      isPositive: true,
      marketCap: '$399.8M',
      clientOrCategory: 'Oracle & Diffusion',
    },
    {
      id: 'vet',
      name: 'VeChain',
      symbol: 'VET',
      iconChar: 'V',
      price: '$7.48',
      change: '+11.19%',
      isPositive: true,
      marketCap: '$152.5M',
      clientOrCategory: 'Supply Chain AI',
    },
    {
      id: 'aave',
      name: 'Aave',
      symbol: 'AAVE',
      iconChar: 'A',
      price: '$0.0184',
      change: '+7.57%',
      isPositive: true,
      marketCap: '$1.2B',
      clientOrCategory: 'Liquidity Protocol',
    },
    {
      id: 'waves',
      name: 'Waves',
      symbol: 'WAVES',
      iconChar: '◆',
      price: '$30.68',
      change: '+6.80%',
      isPositive: true,
      marketCap: '$399.8M',
      clientOrCategory: 'Custom Tokens',
    },
  ];

  return (
    <div className="space-y-7">
      {/* -------------------------------------------------------------
          TOP SECTION: PORTFOLIO (LEFT) & YOUR ASSETS (RIGHT)
      -------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        {/* =========================================================
            PORTFOLIO CARD (Col-Span 5.5)
        ========================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Portfolio</h2>
          </div>

          <div className="bg-[#ebf4ff] border border-[#d6e7fc] rounded-[26px] p-5 sm:p-6 flex-1 flex flex-col justify-between relative overflow-hidden shadow-sm">
            {/* Top row: Value, Label, and 3-dots */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-baseline gap-1">
                  <span>$ 17 643.41</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">Portfolio balance</p>
              </div>

              <button
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors cursor-pointer"
                title="Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Sparkline Chart with active Tooltip pill */}
            <div className="my-4 relative h-28 w-full flex items-center">
              {/* SVG Area spline */}
              <svg
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <path
                  d="M 0,65 Q 40,62 80,68 T 160,60 T 240,48 T 280,38 L 280,75 L 300,75 L 300,50 T 360,55 T 400,42 L 400,100 L 0,100 Z"
                  fill="url(#blueGradient)"
                />

                {/* Line */}
                <path
                  d="M 0,65 Q 40,62 80,68 T 160,60 T 240,48 T 280,38 L 280,75 L 300,75 L 300,50 T 360,55 T 400,42"
                  fill="none"
                  stroke="#388bfd"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Active marker dot on the peak */}
                <circle cx="280" cy="38" r="4.5" fill="#60a5fa" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Floating Tooltip Bubble matching screenshot ($27 482.00) */}
              <div className="absolute top-1 left-[64%] -translate-x-1/2 -translate-y-2 bg-[#181a20] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                <span>$27 482.00</span>
              </div>
            </div>

            {/* Bottom: Timeframe Filter Pills */}
            <div className="flex items-center justify-between pt-1 text-xs font-semibold text-gray-400">
              {['1H', '24H', '1W', '1M', '1Y', 'ALL'].map((tf) => {
                const isActive = selectedTimeframe === tf;
                return (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#181a20] text-white font-bold shadow-sm'
                        : 'hover:text-gray-900 text-gray-400'
                    }`}
                  >
                    {tf}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            YOUR ASSETS SECTION (Col-Span 7)
        ========================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Your Assets</h2>
            <button
              onClick={() => setViewMode((prev) => (prev === 'crypto' ? 'studio' : 'crypto'))}
              className="p-1 text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
              title="Toggle View Mode"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 flex-1">
            {/* Card 1: Lavender / Pastel Purple (1.25 BTC) */}
            <div className="bg-[#f0ecfb] border border-[#e2d9f7] rounded-[24px] p-4 sm:p-5 flex flex-col justify-between shadow-sm min-h-[160px]">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {viewMode === 'crypto' ? '1.25 BTC' : `${projects.length} Spots`}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {viewMode === 'crypto' ? '$ 2948.04' : '4K Commercials'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-gray-900 font-bold text-xs shadow-xs">
                  {viewMode === 'crypto' ? '₿' : <Film className="w-3.5 h-3.5 text-purple-600" />}
                </div>
                <span className="text-[11px] font-bold text-emerald-600">
                  {viewMode === 'crypto' ? '+ 0.14%' : `${publishedProjects.length} Live`}
                </span>
              </div>
            </div>

            {/* Card 2: Mint / Soft Pastel Green (0.32 LTC) */}
            <div className="bg-[#e6f7ec] border border-[#d2f1dc] rounded-[24px] p-4 sm:p-5 flex flex-col justify-between shadow-sm min-h-[160px]">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {viewMode === 'crypto' ? '0.32 LTC' : `${messages.length} Inquiries`}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {viewMode === 'crypto' ? '$ 2948.04' : `${newMessages.length} New Briefs`}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-gray-900 font-bold text-xs shadow-xs">
                  {viewMode === 'crypto' ? 'Ł' : <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <span className="text-[11px] font-bold text-emerald-600">+ 0.31%</span>
              </div>
            </div>

            {/* Card 3: Soft Cream / Warm Sand (1.25 ETH) */}
            <div className="bg-[#fef5e8] border border-[#fde8cc] rounded-[24px] p-4 sm:p-5 flex flex-col justify-between shadow-sm min-h-[160px]">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {viewMode === 'crypto' ? '1.25 ETH' : '4.9 ★ Rating'}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {viewMode === 'crypto' ? '$ 2948.04' : `${pricingPlans.length} Pricing Tiers`}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-gray-900 font-bold text-xs shadow-xs">
                  {viewMode === 'crypto' ? '◆' : <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                </div>
                <span className="text-[11px] font-bold text-emerald-600">+ 0.27%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          BOTTOM SECTION: MARKET TABLE (LEFT) & PROMO CARD (RIGHT)
      -------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* =========================================================
            MARKET IS DOWN 0.80% TABLE (Col-Span 7.5)
        ========================================================== */}
        <div className="lg:col-span-8 space-y-3">
          {/* Header Row with Dropdowns */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Market is down 0.80%
            </h2>

            <div className="flex items-center gap-2">
              {/* 24h Filter dropdown */}
              <div className="relative">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-200 text-xs font-semibold text-gray-700 py-1.5 pl-3 pr-7 rounded-xl hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer shadow-2xs"
                >
                  <option value="24h">24h</option>
                  <option value="7d">7d</option>
                  <option value="30d">30d</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Top gainers dropdown */}
              <div className="relative">
                <select
                  value={gainersFilter}
                  onChange={(e) => setGainersFilter(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-200 text-xs font-semibold text-gray-700 py-1.5 pl-3 pr-7 rounded-xl hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer shadow-2xs"
                >
                  <option value="Top gainers">Top gainers</option>
                  <option value="Top volume">Top volume</option>
                  <option value="Recent Briefs">Recent Briefs</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-transparent overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-medium text-gray-400">
                  <th className="py-2 font-normal">Name</th>
                  <th className="py-2 font-normal">Price</th>
                  <th className="py-2 font-normal">Change</th>
                  <th className="py-2 font-normal">Market Cap</th>
                  <th className="py-2 font-normal text-right pr-2">Watch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {marketRows.map((row) => {
                  const isWatched = watchlist[row.id];
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50/70 transition-colors group cursor-pointer"
                      onClick={() => onNavigateTab('Projects')}
                    >
                      {/* Name with Icon Badge */}
                      <td className="py-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-[#1e2025] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                          {row.iconChar}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {row.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-medium">
                            {row.symbol}
                          </p>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 text-xs sm:text-sm font-bold text-gray-900">
                        {row.price}
                      </td>

                      {/* Change */}
                      <td className="py-3.5 text-xs sm:text-sm font-semibold text-emerald-500">
                        {row.change}
                      </td>

                      {/* Market Cap */}
                      <td className="py-3.5 text-xs sm:text-sm font-bold text-gray-900">
                        {row.marketCap}
                      </td>

                      {/* Watch Star Toggle */}
                      <td className="py-3.5 text-right pr-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWatchlist(row.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isWatched
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-300 hover:text-gray-500'
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 ${isWatched ? 'fill-amber-400 text-amber-400' : ''}`}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick CMS Sub-tab Shortcuts for Studio Admin Navigation */}
          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-gray-100">
            <button
              onClick={() => onNavigateTab('Projects')}
              className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 text-purple-600" />
              <span>Commercials ({projects.length})</span>
            </button>

            <button
              onClick={() => onNavigateTab('Messages')}
              className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Inquiries ({messages.length})</span>
            </button>

            <button
              onClick={() => onNavigateTab('Pricing')}
              className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Rate Cards ({pricingPlans.length})</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            DARK PROMO / ACTION CARD (Col-Span 4.5)
        ========================================================== */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="bg-[#16171b] text-white rounded-[28px] p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-xl">
            {/* Background 3D Perspective Graphic wireframes */}
            <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-none stroke-current" strokeWidth="1.2">
                <rect x="70" y="40" width="110" height="90" rx="16" transform="rotate(15 125 85)" />
                <rect x="90" y="70" width="110" height="90" rx="16" transform="rotate(25 145 115)" />
                <rect x="110" y="100" width="110" height="90" rx="16" transform="rotate(35 165 145)" />
              </svg>
            </div>

            {/* Headline with glowing 'free' badge pill */}
            <div className="space-y-2.5 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                Earn{' '}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-gray-600 bg-black/80 text-[11px] font-bold text-white shadow-inner mx-0.5">
                  free
                </span>{' '}
                crypto with Coinview Earn!
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed max-w-[280px]">
                Learn about different cryptocurrencies and earn them for free!
              </p>
            </div>

            {/* CTA Pill Button (Light baby-blue) */}
            <div className="pt-6 relative z-10">
              <button
                onClick={onOpenNewProject}
                className="bg-[#c2e2fe] hover:bg-white text-gray-950 font-bold px-6 py-2.5 rounded-full text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Earn now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
