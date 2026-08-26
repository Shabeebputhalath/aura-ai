'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  Copy,
  Trash2,
  ExternalLink,
  Film,
  Sparkles,
  CheckCircle2,
  Plus,
  X,
} from 'lucide-react';
import { AdminMediaAsset } from '../types';

interface MediaLibraryCMSProps {
  mediaAssets: AdminMediaAsset[];
  onAddMediaAsset: (asset: AdminMediaAsset) => void;
  onDeleteMediaAsset: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function MediaLibraryCMS({
  mediaAssets,
  onAddMediaAsset,
  onDeleteMediaAsset,
  showToast,
}: MediaLibraryCMSProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [newAsset, setNewAsset] = useState<Partial<AdminMediaAsset>>({
    name: '',
    url: '',
    type: 'image',
    category: 'Commercial Thumbnail',
    dimensions: '3840 x 2160',
    size: '2.4 MB',
    tags: ['4K', 'Render'],
  });

  const filteredAssets = mediaAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.category?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (asset.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Asset CDN URL copied to clipboard');
  };

  const handleAddAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name?.trim() || !newAsset.url?.trim()) {
      showToast('Please provide both asset name and image URL');
      return;
    }

    const assetToSave: AdminMediaAsset = {
      id: 'media-' + Date.now(),
      name: newAsset.name || 'New Media Asset',
      url: newAsset.url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      type: newAsset.type || 'image',
      size: newAsset.size || '1.8 MB',
      dimensions: newAsset.dimensions || '3840 x 2160',
      category: newAsset.category || 'Commercial Thumbnail',
      createdAt: new Date().toISOString().split('T')[0],
      tags: Array.isArray(newAsset.tags) ? newAsset.tags : ['4K'],
    };

    onAddMediaAsset(assetToSave);
    setIsUploadModalOpen(false);
    showToast('Media asset registered in studio library');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Media Assets & CDN Library
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-bold">
              {mediaAssets.length} Renders
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage 4K commercial keyframes, video stills, portfolio banners, and cloud CDN assets.
          </p>
        </div>

        <button
          onClick={() => {
            setNewAsset({
              name: '',
              url: '',
              type: 'image',
              category: 'Commercial Thumbnail',
              dimensions: '3840 x 2160',
              size: '2.4 MB',
              tags: ['4K', 'Commercial'],
            });
            setIsUploadModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload / Register Asset</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media by filename, tag, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#b15f2c]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'image', 'video'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                selectedType === type
                  ? 'bg-[#b15f2c] text-white font-bold shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-[#b15f2c]/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Preview */}
            <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
              <img
                src={asset.url}
                alt={asset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCopyUrl(asset.url)}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-[#b15f2c] text-white transition-colors cursor-pointer"
                  title="Copy CDN URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-[#b15f2c] text-white transition-colors cursor-pointer"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onDeleteMediaAsset(asset.id)}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  title="Delete asset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase font-bold bg-black/70 backdrop-blur-md text-white rounded">
                  {asset.dimensions}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3.5 space-y-2">
              <p className="text-xs font-semibold text-slate-900 truncate" title={asset.name}>
                {asset.name}
              </p>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{asset.category}</span>
                <span>{asset.size}</span>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {asset.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload/Register Asset Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Register New Media Asset
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAssetSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Asset Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  placeholder="e.g. Neo Tokyo Cyberpunk 4K Frame"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Image / Video CDN URL *
                </label>
                <input
                  type="url"
                  required
                  value={newAsset.url}
                  onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                    placeholder="Commercial Thumbnail"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={newAsset.dimensions}
                    onChange={(e) => setNewAsset({ ...newAsset, dimensions: e.target.value })}
                    placeholder="3840 x 2160"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#b15f2c] hover:bg-[#97501f] text-xs font-semibold text-white rounded-xl shadow-sm cursor-pointer transition-all"
                >
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
