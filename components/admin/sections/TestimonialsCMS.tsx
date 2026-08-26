'use client';

import React, { useState } from 'react';
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  Building,
  Quote,
  X,
  Sparkles,
} from 'lucide-react';
import { AdminTestimonial } from '../types';

interface TestimonialsCMSProps {
  testimonials: AdminTestimonial[];
  onSaveTestimonial: (item: AdminTestimonial) => void;
  onDeleteTestimonial: (id: string) => void;
  onToggleActive: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function TestimonialsCMS({
  testimonials,
  onSaveTestimonial,
  onDeleteTestimonial,
  onToggleActive,
  showToast,
}: TestimonialsCMSProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminTestimonial | null>(null);

  const [formData, setFormData] = useState<Partial<AdminTestimonial>>({
    name: '',
    role: '',
    company: '',
    quote: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    verified: true,
    displayOrder: 1,
    isActive: true,
    projectName: '',
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      role: '',
      company: '',
      quote: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      verified: true,
      displayOrder: testimonials.length + 1,
      isActive: true,
      projectName: '',
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (item: AdminTestimonial) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsEditorOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.quote?.trim()) {
      showToast('Please enter client name and testimonial quote');
      return;
    }

    const itemToSave: AdminTestimonial = {
      id: editingItem ? editingItem.id : 'testi-' + Date.now(),
      name: formData.name || 'Anonymous Client',
      role: formData.role || 'Brand Manager',
      company: formData.company || 'Global Brand',
      avatar:
        formData.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      quote: formData.quote || '',
      rating: Number(formData.rating) || 5,
      verified: formData.verified !== false,
      projectName: formData.projectName || '',
      displayOrder: Number(formData.displayOrder) || 1,
      isActive: formData.isActive !== false,
    };

    onSaveTestimonial(itemToSave);
    setIsEditorOpen(false);
    showToast(editingItem ? 'Testimonial updated' : 'New testimonial published');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Client Testimonials & Case Reviews
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-bold">
              {testimonials.length} Reviews
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage client endorsements, verified brand testimonials, 5-star ratings, and campaign references.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Review</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[...testimonials]
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                item.isActive
                  ? 'bg-white border-slate-200 hover:border-[#b15f2c]/50 hover:shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              {/* Top Quote Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <button
                    onClick={() => onToggleActive(item.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                      item.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {item.isActive ? 'Active' : 'Hidden'}
                  </button>
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {item.projectName && (
                  <div className="p-2 bg-amber-50 border border-amber-200/60 rounded-lg text-[10px] font-mono text-[#b15f2c] font-semibold truncate">
                    Spot: {item.projectName}
                  </div>
                )}
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">{item.name}</span>
                      {item.verified && (
                        <CheckCircle2 className="w-3 h-3 text-[#b15f2c] shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono truncate block">
                      {item.role}, {item.company}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteTestimonial(item.id)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add / Edit Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingItem ? 'Edit Testimonial' : 'Add Client Testimonial'}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Élodie Laurent"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Kira Parfums Paris"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Client Title / Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Creative Director"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Campaign / Spot Reference
                  </label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="Liquid Gold Commercial"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Client Review Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="AURA AI delivered our luxury fragrance commercial in 4 days with unmatched photorealism..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#b15f2c] hover:bg-[#97501f] text-xs font-semibold text-white rounded-xl shadow-sm cursor-pointer transition-all"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
