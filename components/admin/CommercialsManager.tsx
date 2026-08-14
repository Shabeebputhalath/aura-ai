'use client';

import React, { useState, useEffect } from 'react';

export interface CommercialWork {
  id: string;
  name: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  resolution: string;
  description: string;
  tags: string[];
  thumbnail: string;
  status: 'published' | 'draft' | 'featured';
  views?: string;
  dateAdded: string;
}

const INITIAL_COMMERCIALS: CommercialWork[] = [
  {
    id: 'comm-1',
    name: 'AURA Commercial Ad — Luxe Fragrance',
    category: 'Product Commercial',
    client: 'Kira Perfumes',
    year: '2026',
    duration: '30s',
    resolution: '4K UHD',
    description: 'High-end AI product ad showcasing liquid particle dynamics, custom sound design, and color grading.',
    tags: ['AI Product Ad', 'Color Grading', 'Sound Design'],
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
    status: 'featured',
    views: '14.2K',
    dateAdded: '2026-08-10',
  },
  {
    id: 'comm-2',
    name: 'Neo-Tokyo AI Reel Series',
    category: 'Cinematic Storytelling',
    client: 'Velentis Studio',
    year: '2026',
    duration: '60s',
    resolution: '4K UHD',
    description: 'A 60-second atmospheric narrative video built with cutting-edge AI video generation & Premiere Pro editing.',
    tags: ['Cinematic AI', 'Storytelling', '4K Export'],
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    status: 'featured',
    views: '28.9K',
    dateAdded: '2026-08-08',
  },
  {
    id: 'comm-3',
    name: 'Chronos Timepiece Showcase',
    category: 'Product Commercial',
    client: 'Chronos Swiss',
    year: '2026',
    duration: '45s',
    resolution: '4K UHD',
    description: 'Precision mechanical close-up product commercial with macro AI rendering and studio lighting.',
    tags: ['Product Showcase', 'AI Visuals', '3D Motion'],
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    status: 'published',
    views: '9.4K',
    dateAdded: '2026-08-05',
  },
  {
    id: 'comm-4',
    name: 'Luminary 3D Pixar Animation',
    category: '3D Animation',
    client: 'Luminary Digital',
    year: '2026',
    duration: '15s',
    resolution: '4K UHD',
    description: 'Expressive 3D Pixar-style character commercial for digital brand campaigns.',
    tags: ['3D Pixar Style', 'Animation', 'Character Design'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    status: 'published',
    views: '32.1K',
    dateAdded: '2026-08-01',
  },
  {
    id: 'comm-5',
    name: 'AURA Cyberpunk Electric Hypercar',
    category: 'Cinematic Storytelling',
    client: 'Apex Automotive',
    year: '2026',
    duration: '40s',
    resolution: '8K HDR',
    description: 'Futuristic night street racing commercial with AI reflections and engine audio synthesis.',
    tags: ['Automotive Ad', 'Cyberpunk', 'HDR Color'],
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    status: 'published',
    views: '18.7K',
    dateAdded: '2026-07-28',
  },
];

const PRESET_THUMBNAILS = [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
];

export default function CommercialsManager() {
  const [works, setWorks] = useState<CommercialWork[]>(() => {
    if (typeof window === 'undefined') return INITIAL_COMMERCIALS;
    try {
      const stored = localStorage.getItem('aura_commercials');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COMMERCIALS;
  });

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<CommercialWork | null>(null);
  const [deleteConfirmWork, setDeleteConfirmWork] = useState<CommercialWork | null>(null);
  const [previewWork, setPreviewWork] = useState<CommercialWork | null>(null);

  // Upload Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Product Commercial',
    client: '',
    year: '2026',
    duration: '30s',
    resolution: '4K UHD',
    description: '',
    tags: 'AI Product Ad, Color Grading, 4K Export',
    thumbnail: PRESET_THUMBNAILS[0],
    status: 'published' as 'published' | 'draft' | 'featured',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Synchronize to localStorage whenever works list changes
  const updateWorksState = (newWorks: CommercialWork[]) => {
    setWorks(newWorks);
    try {
      localStorage.setItem('aura_commercials', JSON.stringify(newWorks));
    } catch (e) {
      console.error('Failed to save commercials:', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handle Form Upload Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);

      const parsedTags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      if (editingWork) {
        // Edit Existing
        const updated = works.map((item) =>
          item.id === editingWork.id
            ? {
                ...item,
                name: formData.name,
                category: formData.category,
                client: formData.client || 'Private Client',
                year: formData.year,
                duration: formData.duration,
                resolution: formData.resolution,
                description: formData.description,
                tags: parsedTags,
                thumbnail: formData.thumbnail,
                status: formData.status,
              }
            : item
        );
        updateWorksState(updated);
        showToast(`Commercial "${formData.name}" updated successfully!`);
      } else {
        // Create New
        const newCommercial: CommercialWork = {
          id: `comm-${Date.now()}`,
          name: formData.name,
          category: formData.category,
          client: formData.client || 'AURA Studio',
          year: formData.year,
          duration: formData.duration,
          resolution: formData.resolution,
          description: formData.description || 'High-impact AI commercial production.',
          tags: parsedTags,
          thumbnail: formData.thumbnail,
          status: formData.status,
          views: '1.2K',
          dateAdded: new Date().toISOString().split('T')[0],
        };

        updateWorksState([newCommercial, ...works]);
        showToast(`New commercial "${formData.name}" uploaded successfully!`);
      }

      setIsUploadModalOpen(false);
      setEditingWork(null);
      resetForm();
    }, 1100);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Product Commercial',
      client: '',
      year: '2026',
      duration: '30s',
      resolution: '4K UHD',
      description: '',
      tags: 'AI Product Ad, Color Grading, 4K Export',
      thumbnail: PRESET_THUMBNAILS[Math.floor(Math.random() * PRESET_THUMBNAILS.length)],
      status: 'published',
    });
  };

  // Open Edit Modal
  const handleOpenEdit = (work: CommercialWork) => {
    setEditingWork(work);
    setFormData({
      name: work.name,
      category: work.category,
      client: work.client,
      year: work.year,
      duration: work.duration,
      resolution: work.resolution,
      description: work.description,
      tags: work.tags.join(', '),
      thumbnail: work.thumbnail,
      status: work.status,
    });
    setIsUploadModalOpen(true);
  };

  // Toggle Featured Status
  const handleToggleFeatured = (id: string) => {
    const updated = works.map((item) => {
      if (item.id === id) {
        const nextStatus: 'published' | 'featured' = item.status === 'featured' ? 'published' : 'featured';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    updateWorksState(updated);
    const target = works.find((w) => w.id === id);
    showToast(`"${target?.name}" status set to ${target?.status === 'featured' ? 'Published' : 'Featured on Portfolio'}`);
  };

  // Delete Work
  const handleDeleteWork = (id: string) => {
    const target = works.find((w) => w.id === id);
    const updated = works.filter((item) => item.id !== id);
    updateWorksState(updated);
    setDeleteConfirmWork(null);
    showToast(`Commercial "${target?.name || 'Work'}" deleted.`);
  };

  // Image Upload File Converter
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, thumbnail: reader.result as string }));
      showToast('Custom video thumbnail uploaded');
    };
    reader.readAsDataURL(file);
  };

  // Filtering
  const filteredWorks = works.filter((work) => {
    if (activeCategory !== 'all' && work.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        work.name.toLowerCase().includes(q) ||
        work.client.toLowerCase().includes(q) ||
        work.category.toLowerCase().includes(q) ||
        work.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[150] bg-[#111111] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-3 border border-white/20 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Section Header & Pill Badge (Exact Reference Image Design) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e6e5e2] shadow-xs">
        <div>
          {/* Commercials Badge Pill (Exact Reference Image Pill Badge) */}
          <div className="inline-flex items-center gap-2.5 bg-[#f4f3ef] border border-[#e6e5e2] px-4 py-2 rounded-2xl mb-2.5 shadow-2xs">
            <span className="w-6 h-6 rounded-lg bg-[#f3e8ff] text-[#9333ea] flex items-center justify-center text-xs">
              🎬
            </span>
            <span className="text-sm font-bold text-[#111111] tracking-tight">Commercials</span>
            <span className="bg-[#b15f2c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
              {works.length} Works
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
            Commercial Ads, Reels & Works Management
          </h2>
          <p className="text-xs sm:text-sm text-[#111111]/60 mt-0.5">
            Upload new video campaigns, edit project details, or feature commercials directly on the public portfolio.
          </p>
        </div>

        {/* Upload Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetForm();
              setEditingWork(null);
              setIsUploadModalOpen(true);
            }}
            className="px-5 py-3 bg-[#111111] text-white hover:bg-[#b15f2c] text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2 group"
          >
            <span className="text-sm group-hover:rotate-90 transition-transform">＋</span>
            <span>Upload Commercial</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Categories, Search, and View Mode Toggle */}
      <div className="bg-white p-5 rounded-2xl border border-[#e6e5e2] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'Product Commercial', label: 'Product Commercials' },
              { id: 'Cinematic Storytelling', label: 'Cinematic AI' },
              { id: '3D Animation', label: '3D Animation' },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-xs font-bold'
                      : 'bg-[#f4f3ef] text-[#111111]/70 hover:text-[#111111] hover:bg-[#e6e5e2]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle & Search */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commercials..."
                className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2 pl-9 text-xs text-[#111111] placeholder:text-[#111111]/40 outline-none focus:border-[#111111]"
              />
              <span className="absolute left-3 top-2.5 text-xs text-[#111111]/40">🔍</span>
            </div>

            {/* View Switcher (Grid vs Table) */}
            <div className="flex items-center bg-[#f4f3ef] p-1 rounded-xl border border-[#e6e5e2]">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-[#111111] shadow-2xs' : 'text-[#111111]/50'
                }`}
                title="Cards Grid View"
              >
                ▦ Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  viewMode === 'table' ? 'bg-white text-[#111111] shadow-2xs' : 'text-[#111111]/50'
                }`}
                title="Data Table View"
              >
                ☰ Table
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content View (Grid or Table) */}
      {viewMode === 'grid' ? (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-2xl border border-[#e6e5e2] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-[#111111] transition-all"
            >
              {/* Media Thumbnail Poster Header */}
              <div className="relative h-48 bg-[#111111] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.thumbnail}
                  alt={work.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20 uppercase tracking-wider">
                    {work.category}
                  </span>
                  {work.status === 'featured' && (
                    <span className="bg-[#b15f2c] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Top Right Duration */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-1 rounded-md border border-white/20">
                  {work.duration} • {work.resolution}
                </div>

                {/* Quick Play Overlay Button */}
                <button
                  onClick={() => setPreviewWork(work)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white flex items-center justify-center text-lg hover:scale-110 transition-transform cursor-pointer"
                  title="Preview Video"
                >
                  ▶
                </button>

                {/* Bottom Title on Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm leading-tight truncate">{work.name}</h3>
                  <span className="text-[10px] text-white/70 block mt-0.5">Client: {work.client} ({work.year})</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#111111]/70 line-clamp-2 leading-relaxed">
                  {work.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#f4f3ef] text-[#111111]/80 text-[10px] font-medium px-2 py-0.5 rounded-md border border-[#e6e5e2]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Controls Footer */}
                <div className="pt-3 border-t border-[#e6e5e2] flex items-center justify-between">
                  <button
                    onClick={() => handleToggleFeatured(work.id)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      work.status === 'featured'
                        ? 'bg-[#b15f2c]/10 text-[#b15f2c] border-[#b15f2c]/30'
                        : 'bg-[#f4f3ef] text-[#111111]/70 border-[#e6e5e2] hover:text-[#111111]'
                    }`}
                  >
                    {work.status === 'featured' ? '★ Featured' : 'Make Featured'}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(work)}
                      className="px-3 py-1 bg-[#f4f3ef] text-[#111111] hover:bg-[#111111] hover:text-white rounded-lg text-xs font-semibold transition-colors border border-[#e6e5e2] cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmWork(work)}
                      className="px-2.5 py-1 bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444] hover:text-white rounded-lg text-xs font-semibold transition-colors border border-[#ef4444]/20 cursor-pointer"
                      title="Delete Commercial"
                    >
                      🗑
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        /* DATA TABLE VIEW */
        <div className="bg-white rounded-2xl border border-[#e6e5e2] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f4f3ef]/80 border-b border-[#e6e5e2] text-[11px] font-bold text-[#111111]/60 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Preview</th>
                  <th className="py-3.5 px-4">Title & Client</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Format</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e5e2]">
                {filteredWorks.map((work) => (
                  <tr key={work.id} className="hover:bg-[#f4f3ef]/40 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4 sm:px-6">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-[#111111] flex-shrink-0 border border-[#e6e5e2]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={work.thumbnail} alt={work.name} className="w-full h-full object-cover" />
                      </div>
                    </td>

                    {/* Title & Client */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#111111]">{work.name}</div>
                      <div className="text-[10px] text-[#111111]/60">{work.client} ({work.year})</div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 font-semibold text-[#111111]">
                      {work.category}
                    </td>

                    {/* Format */}
                    <td className="py-3 px-4 font-mono text-[#111111]/80">
                      {work.duration} • {work.resolution}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {work.status === 'featured' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#b15f2c]/15 text-[#b15f2c] border border-[#b15f2c]/30">
                          ★ Featured
                        </span>
                      ) : work.status === 'published' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                          ✓ Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#111111]/10 text-[#111111]/70 border border-[#e6e5e2]">
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setPreviewWork(work)}
                          className="px-2.5 py-1 bg-[#f4f3ef] hover:bg-[#111111] hover:text-white rounded-lg text-xs font-semibold transition-colors border border-[#e6e5e2] cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleOpenEdit(work)}
                          className="px-2.5 py-1 bg-[#f4f3ef] hover:bg-[#111111] hover:text-white rounded-lg text-xs font-semibold transition-colors border border-[#e6e5e2] cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmWork(work)}
                          className="text-[#111111]/30 hover:text-[#ef4444] transition-colors p-1 cursor-pointer"
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UPLOAD & EDIT COMMERCIAL MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#e6e5e2] space-y-5 animate-scale-up max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-[#e6e5e2] pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#f3e8ff] text-[#9333ea] flex items-center justify-center font-bold text-sm">
                  🎬
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#111111]">
                    {editingWork ? 'Edit Commercial Work' : 'Upload New Commercial'}
                  </h3>
                  <p className="text-xs text-[#111111]/60">
                    Fill in video details and media asset for portfolio publication.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setEditingWork(null);
                }}
                className="w-8 h-8 rounded-full bg-[#f4f3ef] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              {/* Title */}
              <div>
                <label className="block font-bold text-[#111111] mb-1">
                  Commercial Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. AURA Rolex Perpetual — AI Metallic Commercial"
                  className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              {/* Row: Category & Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#111111] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                  >
                    <option value="Product Commercial">Product Commercial</option>
                    <option value="Cinematic Storytelling">Cinematic Storytelling</option>
                    <option value="3D Animation">3D Animation</option>
                    <option value="Social Media Reel">Social Media Reel</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#111111] mb-1">
                    Client / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Velentis / Nike"
                    className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Row: Duration, Resolution, Year */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#111111] mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="30s"
                    className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3 py-2 text-xs text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#111111] mb-1">Format</label>
                  <input
                    type="text"
                    value={formData.resolution}
                    onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                    placeholder="4K UHD"
                    className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3 py-2 text-xs text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#111111] mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3 py-2 text-xs text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* File Upload / Image Poster Dropzone */}
              <div>
                <label className="block font-bold text-[#111111] mb-1">
                  Thumbnail / Video Poster Asset
                </label>
                
                <div className="border-2 border-dashed border-[#e6e5e2] hover:border-[#111111] bg-[#f4f3ef]/50 p-4 rounded-xl text-center transition-colors relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg mb-3 border border-[#e6e5e2]"
                  />

                  <p className="text-[#111111]/70 font-semibold text-xs mb-2">
                    Drag & drop video thumbnail or click to upload image file
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />

                  {/* Preset quick picks */}
                  <div className="pt-2 border-t border-[#e6e5e2] flex items-center justify-center gap-2">
                    <span className="text-[10px] text-[#111111]/50 font-bold uppercase">Or choose sample preset:</span>
                    {PRESET_THUMBNAILS.slice(0, 4).map((url, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setFormData({ ...formData, thumbnail: url })}
                        className={`w-6 h-6 rounded-md overflow-hidden border-2 cursor-pointer transition-transform hover:scale-110 ${
                          formData.thumbnail === url ? 'border-[#b15f2c]' : 'border-transparent'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-[#111111] mb-1">
                  Project Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the commercial concept, lighting, and AI techniques used..."
                  className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold text-[#111111] mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. AI Product Ad, Color Grading, 3D Render"
                  className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              {/* Status Select */}
              <div>
                <label className="block font-bold text-[#111111] mb-1">
                  Portfolio Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                >
                  <option value="published">Published (Visible in Portfolio)</option>
                  <option value="featured">Featured on Homepage</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[11px] font-bold text-[#b15f2c]">
                    <span>Uploading 4K commercial assets...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-[#f4f3ef] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#b15f2c] h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Controls */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e6e5e2]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-[#f4f3ef] text-[#111111] text-xs font-semibold rounded-xl hover:bg-[#e6e5e2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-[#b15f2c] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {editingWork ? 'Save Changes' : 'Publish Commercial'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* PREVIEW VIDEO MODAL */}
      {previewWork && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] text-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-white/20 space-y-4 animate-scale-up">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#b15f2c] uppercase tracking-wider">
                  {previewWork.category} • {previewWork.duration}
                </span>
                <h3 className="text-lg font-bold">{previewWork.name}</h3>
              </div>
              <button
                onClick={() => setPreviewWork(null)}
                className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white hover:text-[#111111] font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Poster Image Stage */}
            <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden bg-black border border-white/10 grid place-items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewWork.thumbnail}
                alt={previewWork.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#b15f2c] text-white flex items-center justify-center text-2xl shadow-xl mb-3">
                  ▶
                </div>
                <span className="text-sm font-bold">4K Studio Commercial Render Preview</span>
                <p className="text-xs text-white/70 max-w-md mt-1">
                  {previewWork.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-white/60">
              <span>Client: <strong className="text-white">{previewWork.client}</strong></span>
              <span>Year: <strong className="text-white">{previewWork.year}</strong></span>
              <span>Resolution: <strong className="text-white">{previewWork.resolution}</strong></span>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmWork && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e6e5e2] space-y-4 animate-scale-up text-center">
            <div className="w-12 h-12 rounded-full bg-[#ef4444]/15 text-[#ef4444] text-xl font-bold flex items-center justify-center mx-auto">
              🗑
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#111111]">Delete Commercial Work?</h3>
              <p className="text-xs text-[#111111]/70 mt-1">
                Are you sure you want to permanently delete <strong>&quot;{deleteConfirmWork.name}&quot;</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmWork(null)}
                className="px-4 py-2 bg-[#f4f3ef] text-[#111111] text-xs font-semibold rounded-xl hover:bg-[#e6e5e2]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteWork(deleteConfirmWork.id)}
                className="px-5 py-2 bg-[#ef4444] text-white text-xs font-bold rounded-xl hover:bg-[#dc2626]"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
