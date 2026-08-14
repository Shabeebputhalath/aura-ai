'use client';

import React, { useState, useEffect } from 'react';

export interface LeadInquiry {
  id: string;
  clientName: string;
  company: string;
  service: string;
  budget: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  time: string;
  submittedDate?: string;
  email?: string;
  website?: string;
  avatar: string;
  details: string;
}

const INITIAL_INQUIRIES: LeadInquiry[] = [
  {
    id: 'req-8314KDH',
    clientName: 'Alex Rivera',
    company: 'Velentis Luxury Watches',
    service: 'Luxury Commercial Video (30s)',
    budget: '₹1,20,000',
    status: 'accepted',
    time: '12 mins ago',
    submittedDate: '2026-08-13',
    email: 'alex@velentis.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    details: 'Looking for a cinematic 4K commercial reel featuring liquid metallic textures and studio macro product shots.',
  },
  {
    id: 'req-831KSDH',
    clientName: 'Sarah Jenkins',
    company: 'Aura Skincare Co.',
    service: 'Social Media Reel Campaign',
    budget: '₹85,000',
    status: 'declined',
    time: '45 mins ago',
    submittedDate: '2026-08-13',
    email: 'sarah@auraskincare.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    details: 'Need 3 vertical 9:16 ads for Instagram and TikTok with photorealistic AI model motion.',
  },
  {
    id: 'req-831HKDH',
    clientName: 'Michael Chang',
    company: 'Nebula Tech Labs',
    service: 'App Launch Teaser Trailer',
    budget: '₹2,50,000',
    status: 'accepted',
    time: '2 hours ago',
    submittedDate: '2026-08-12',
    email: 'm.chang@nebulatech.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    details: '3D futurism render with motion typography and custom AI voiceover scoring for product launch.',
  },
  {
    id: 'req-631HKDH',
    clientName: 'Elena Rostova',
    company: 'Mode Atelier',
    service: 'E-commerce Listing Ads',
    budget: '₹95,000',
    status: 'accepted',
    time: '5 hours ago',
    submittedDate: '2026-08-12',
    email: 'elena@modeatelier.fr',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    details: 'High-end runway simulation for fashion line preview.',
  },
  {
    id: 'req-632HKDH',
    clientName: 'David K.',
    company: 'Apex Performance Auto',
    service: 'Broadcast Television Ad',
    budget: '₹3,20,000',
    status: 'declined',
    time: '1 day ago',
    submittedDate: '2026-08-11',
    email: 'david@apexauto.de',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    details: 'Full 16:9 4K UHD commercial campaign with sound design and rapid turnarounds.',
  },
  {
    id: 'req-831K2DH',
    clientName: 'Priya Sharma',
    company: 'Luminary Jewelry',
    service: '3D Gold Macro Product Reel',
    budget: '₹1,80,000',
    status: 'accepted',
    time: '2 days ago',
    submittedDate: '2026-08-10',
    email: 'priya@luminary.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    details: 'Macro studio shots of diamond and gold jewelry with liquid metallic reflection background.',
  },
  {
    id: 'req-131HKDH',
    clientName: 'Marcus Vance',
    company: 'Vance Audio Gear',
    service: 'Product Commercial Ad',
    budget: '₹1,10,000',
    status: 'declined',
    time: '3 days ago',
    submittedDate: '2026-08-09',
    email: 'marcus@vanceaudio.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    details: 'Sub-woofer soundwave visual simulation with dramatic lighting.',
  },
  {
    id: 'req-902KDH',
    clientName: 'Aisha Malik',
    company: 'Kira Fragrances',
    service: 'Perfume Launch Reel',
    budget: '₹1,40,000',
    status: 'pending',
    time: 'Just now',
    submittedDate: '2026-08-13',
    email: 'aisha@kira.co',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    details: 'Floral particle simulation with photorealistic perfume bottle floating in mist.',
  },
];

export default function RequestsTable() {
  const [inquiries, setInquiries] = useState<LeadInquiry[]>(() => {
    if (typeof window === 'undefined') return INITIAL_INQUIRIES;
    try {
      const storedRaw = localStorage.getItem('aura_inquiries');
      if (storedRaw) {
        const stored = JSON.parse(storedRaw);
        const combined = [...stored, ...INITIAL_INQUIRIES];
        return Array.from(new Map(combined.map((item) => [item.id, item])).values());
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_INQUIRIES;
  });
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'declined'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('2026-08-01');
  const [dateTo, setDateTo] = useState('2026-08-13');
  const [selectedInquiry, setSelectedInquiry] = useState<LeadInquiry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateStatus = (id: string, status: 'accepted' | 'declined' | 'completed') => {
    setInquiries((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, status } : item));
      try {
        localStorage.setItem('aura_inquiries', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    const target = inquiries.find((i) => i.id === id);
    const label = status === 'accepted' ? 'Accepted & Sent to Production' : status === 'completed' ? 'Marked as Delivered' : 'Declined';
    showToast(`Request ${id} (${target?.clientName || 'Client'}) ${label}`);
  };

  const handleDeleteRequest = (id: string) => {
    setInquiries((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('aura_inquiries', JSON.stringify(filtered));
      } catch (e) {
        console.error(e);
      }
      return filtered;
    });
    showToast(`Request ${id} deleted.`);
  };

  // Filter calculations
  const pendingCount = inquiries.filter((i) => i.status === 'pending').length;
  const acceptedCount = inquiries.filter((i) => i.status === 'accepted').length;
  const completedCount = inquiries.filter((i) => i.status === 'completed').length;
  const declinedCount = inquiries.filter((i) => i.status === 'declined').length;

  const filteredInquiries = inquiries.filter((item) => {
    // Filter by tab status
    if (activeFilter === 'pending' && item.status !== 'pending') return false;
    if (activeFilter === 'accepted' && item.status !== 'accepted') return false;
    if (activeFilter === 'completed' && item.status !== 'completed') return false;
    if (activeFilter === 'declined' && item.status !== 'declined') return false;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = item.clientName.toLowerCase().includes(query);
      const matchCompany = item.company.toLowerCase().includes(query);
      const matchService = item.service.toLowerCase().includes(query);
      const matchId = item.id.toLowerCase().includes(query);
      if (!matchName && !matchCompany && !matchService && !matchId) return false;
    }

    return true;
  });

  // Pagination (7 rows per page, matching reference image)
  const itemsPerPage = 7;
  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / itemsPerPage));
  const paginatedInquiries = filteredInquiries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[150] bg-[#111111] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-3 border border-white/20 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Section Header & Pill Badge (Reference Image 1 Aesthetic) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e6e5e2] shadow-xs">
        <div>
          {/* Requests Badge Pill (Reference Image 1) */}
          <div className="inline-flex items-center gap-2.5 bg-[#f4f3ef] border border-[#e6e5e2] px-4 py-2 rounded-2xl mb-2.5 shadow-2xs">
            <span className="w-6 h-6 rounded-lg bg-[#fce7f3] text-[#ec4899] flex items-center justify-center text-xs">
              📩
            </span>
            <span className="text-sm font-bold text-[#111111] tracking-tight">Requests</span>
            <span className="bg-[#b15f2c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
              {inquiries.length} Total
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
            Contact Form Submissions & Inquiries History
          </h2>
          <p className="text-xs sm:text-sm text-[#111111]/60 mt-0.5">
            Manage incoming campaign inquiries, project briefs, and client booking agreements.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiries, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `aura_inquiries_${new Date().toISOString().split('T')[0]}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
              showToast('Exported inquiries data successfully');
            }}
            className="px-4 py-2.5 bg-[#f4f3ef] text-[#111111] text-xs font-semibold rounded-xl border border-[#e6e5e2] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>📥</span>
            <span>Export Submissions</span>
          </button>
        </div>
      </div>

      {/* Main Container Card (Reference Image 2 Table Design) */}
      <div className="bg-white rounded-2xl border border-[#e6e5e2] shadow-xs overflow-hidden">
        
        {/* Top Control Bar: Search & Date Pickers & Category Tabs */}
        <div className="p-5 sm:p-6 border-b border-[#e6e5e2] bg-white space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Filter Tabs (All Orders, Summary, Completed, Cancelled / Pending) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
              {[
                { id: 'all', label: 'All Requests', count: inquiries.length },
                { id: 'pending', label: 'Pending', count: pendingCount },
                { id: 'accepted', label: 'Approved', count: acceptedCount },
                { id: 'completed', label: 'Completed', count: completedCount },
                { id: 'declined', label: 'Declined', count: declinedCount },
              ].map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveFilter(tab.id as any);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#111111] text-white shadow-xs font-bold'
                        : 'bg-[#f4f3ef] text-[#111111]/70 hover:text-[#111111] hover:bg-[#e6e5e2]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-[#b15f2c] text-white' : 'bg-[#e6e5e2] text-[#111111]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Date Range Inputs (Matching Reference Image 2 Top Right) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 bg-[#f4f3ef] px-3 py-1.5 rounded-xl border border-[#e6e5e2] text-xs">
                <span className="text-[#111111]/60 font-semibold">📅 From:</span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-transparent text-[#111111] font-medium outline-none cursor-pointer"
                />
              </div>

              <span className="text-xs text-[#111111]/40 font-semibold">To</span>

              <div className="flex items-center gap-2 bg-[#f4f3ef] px-3 py-1.5 rounded-xl border border-[#e6e5e2] text-xs">
                <span className="text-[#111111]/60 font-semibold">📅 To:</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-transparent text-[#111111] font-medium outline-none cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Search Bar Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ID, client name, company, or service..."
              className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-4 py-2.5 pl-10 text-xs text-[#111111] placeholder:text-[#111111]/40 outline-none focus:border-[#111111] transition-colors"
            />
            <span className="absolute left-3.5 top-2.5 text-xs text-[#111111]/50">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs text-[#111111]/50 hover:text-[#111111]"
              >
                ✕ Clear
              </button>
            )}
          </div>

        </div>

        {/* Structured Data Table (Reference Image 2 Order History Structure) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f3ef]/80 border-b border-[#e6e5e2] text-[11px] font-bold text-[#111111]/60 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">S.No</th>
                <th className="py-3.5 px-4">Inquiry ID</th>
                <th className="py-3.5 px-4 sm:px-6">Client & Company</th>
                <th className="py-3.5 px-4">Service Campaign</th>
                <th className="py-3.5 px-4">Estimated Value</th>
                <th className="py-3.5 px-4">Date Submitted</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e5e2] text-xs">
              {paginatedInquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#111111]/50">
                    No requests found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedInquiries.map((req, index) => {
                  const itemIndex = (currentPage - 1) * itemsPerPage + index + 1;
                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-[#f4f3ef]/40 transition-colors group"
                    >
                      {/* S.No */}
                      <td className="py-4 px-4 sm:px-6 text-[#111111]/50 font-medium">
                        {itemIndex}
                      </td>

                      {/* Inquiry ID */}
                      <td className="py-4 px-4 font-mono font-bold text-[#111111]">
                        {req.id}
                      </td>

                      {/* Client & Company */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={req.avatar}
                            alt={req.clientName}
                            className="w-8 h-8 rounded-full object-cover border border-[#e6e5e2] flex-shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-[#111111] truncate">{req.clientName}</span>
                            <span className="text-[10px] text-[#111111]/60 truncate">{req.company}</span>
                          </div>
                        </div>
                      </td>

                      {/* Service Campaign */}
                      <td className="py-4 px-4 font-semibold text-[#111111]">
                        {req.service}
                      </td>

                      {/* Estimated Value */}
                      <td className="py-4 px-4 font-bold text-[#111111]">
                        {req.budget}
                      </td>

                      {/* Date Submitted */}
                      <td className="py-4 px-4 text-[#111111]/70 whitespace-nowrap">
                        {req.submittedDate || req.time}
                      </td>

                      {/* Status Pill Badge (Matching Image 2 Delivered / Cancelled) */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {req.status === 'accepted' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            Approved
                          </span>
                        ) : req.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            Delivered
                          </span>
                        ) : req.status === 'declined' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                            Declined
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#b15f2c]/15 text-[#b15f2c] border border-[#b15f2c]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b15f2c] animate-pulse" />
                            Pending
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* View Brief Modal */}
                          <button
                            onClick={() => setSelectedInquiry(req)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-[#111111] bg-[#f4f3ef] hover:bg-[#111111] hover:text-white rounded-lg transition-colors border border-[#e6e5e2] cursor-pointer"
                          >
                            View Brief
                          </button>

                          {/* Quick Accept/Decline if Pending */}
                          {req.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(req.id, 'accepted')}
                                className="w-6 h-6 rounded-lg bg-[#10b981] text-white text-xs font-bold flex items-center justify-center hover:bg-[#059669] transition-colors cursor-pointer"
                                title="Approve Request"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(req.id, 'declined')}
                                className="w-6 h-6 rounded-lg bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center hover:bg-[#dc2626] transition-colors cursor-pointer"
                                title="Decline Request"
                              >
                                ✕
                              </button>
                            </>
                          )}

                          {/* Delete Request */}
                          <button
                            onClick={() => handleDeleteRequest(req.id)}
                            className="text-[#111111]/30 hover:text-[#ef4444] transition-colors p-1"
                            title="Delete Record"
                          >
                            🗑
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar (Matching Reference Image 2 Footer Pagination) */}
        <div className="p-4 sm:p-5 border-t border-[#e6e5e2] bg-[#f4f3ef]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#111111]/60 font-medium">
            Showing <span className="font-bold text-[#111111]">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-bold text-[#111111]">
              {Math.min(currentPage * itemsPerPage, filteredInquiries.length)}
            </span>{' '}
            of <span className="font-bold text-[#111111]">{filteredInquiries.length}</span> submissions
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-[#e6e5e2] bg-white flex items-center justify-center text-xs font-bold text-[#111111] hover:bg-[#111111] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#111111] transition-colors cursor-pointer"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-[#111111] text-white shadow-2xs'
                    : 'bg-white text-[#111111] border border-[#e6e5e2] hover:bg-[#f4f3ef]'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 rounded-lg border border-[#e6e5e2] bg-white flex items-center justify-center text-xs font-bold text-[#111111] hover:bg-[#111111] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#111111] transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>

      </div>

      {/* Submission Brief Modal Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e6e5e2] space-y-4 animate-scale-up">
            
            <div className="flex justify-between items-start border-b border-[#e6e5e2] pb-4">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedInquiry.avatar}
                  alt={selectedInquiry.clientName}
                  className="w-12 h-12 rounded-full object-cover border border-[#e6e5e2]"
                />
                <div>
                  <span className="text-[10px] font-bold text-[#b15f2c] uppercase tracking-wider">
                    Inquiry Details • {selectedInquiry.id}
                  </span>
                  <h3 className="text-lg font-bold text-[#111111]">{selectedInquiry.clientName}</h3>
                  <p className="text-xs text-[#111111]/60">{selectedInquiry.company}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-full bg-[#f4f3ef] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#111111]/80 bg-[#f4f3ef] p-4 rounded-xl border border-[#e6e5e2]">
              <div className="flex justify-between">
                <span className="text-[#111111]/60">Service Campaign:</span>
                <span className="font-bold text-[#111111]">{selectedInquiry.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#111111]/60">Estimated Budget:</span>
                <span className="font-bold text-[#111111]">{selectedInquiry.budget}</span>
              </div>
              {selectedInquiry.email && (
                <div className="flex justify-between">
                  <span className="text-[#111111]/60">Email:</span>
                  <span className="font-semibold text-[#111111]">{selectedInquiry.email}</span>
                </div>
              )}
              {selectedInquiry.website && (
                <div className="flex justify-between">
                  <span className="text-[#111111]/60">Website:</span>
                  <span className="font-semibold text-[#b15f2c]">{selectedInquiry.website}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#111111]/60">Submitted On:</span>
                <span className="font-medium text-[#111111]">{selectedInquiry.submittedDate || selectedInquiry.time}</span>
              </div>
              <div className="pt-2 border-t border-[#e6e5e2]">
                <span className="text-[#111111]/60 block mb-1 font-semibold">Client Project Brief / Message:</span>
                <p className="text-[#111111] leading-relaxed bg-white p-3 rounded-lg border border-[#e6e5e2]">
                  {selectedInquiry.details}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#111111]/50">
                Current Status: <strong className="uppercase text-[#111111]">{selectedInquiry.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                {selectedInquiry.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedInquiry.id, 'declined');
                        setSelectedInquiry(null);
                      }}
                      className="px-4 py-2 bg-[#ef4444] text-white text-xs font-bold rounded-xl hover:bg-[#dc2626] transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedInquiry.id, 'accepted');
                        setSelectedInquiry(null);
                      }}
                      className="px-4 py-2 bg-[#10b981] text-white text-xs font-bold rounded-xl hover:bg-[#059669] transition-colors"
                    >
                      Approve & Start
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-[#000000]"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
