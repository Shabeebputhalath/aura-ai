'use client';

import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  Film,
  Camera,
  Eye,
  X,
  Clock,
  Package,
} from 'lucide-react';
import { AdminService } from '../types';

interface ServicesCMSProps {
  services: AdminService[];
  onSaveService: (service: AdminService) => void;
  onDeleteService: (serviceId: string) => void;
  onToggleActive: (serviceId: string) => void;
  onDuplicateService: (service: AdminService) => void;
  showToast: (msg: string) => void;
}

export default function ServicesCMS({
  services,
  onSaveService,
  onDeleteService,
  onToggleActive,
  onDuplicateService,
  showToast,
}: ServicesCMSProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminService | null>(null);

  const [formData, setFormData] = useState<Partial<AdminService>>({
    name: '',
    icon: 'Film',
    category: 'Core Production',
    shortDescription: '',
    detailedDescription: '',
    features: [],
    startingPrice: '₹35,000 / spot',
    ctaText: 'Book Production',
    displayOrder: 1,
    isFeatured: true,
    isActive: true,
    deliverables: '4K ProRes Master, Social Aspect Ratios',
    turnaround: '3–5 Days',
  });

  const [featuresText, setFeaturesText] = useState('');

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      name: '',
      icon: 'Film',
      category: 'Core Production',
      shortDescription: '',
      detailedDescription: '',
      features: [],
      startingPrice: '₹35,000 / spot',
      ctaText: 'Book Production',
      displayOrder: services.length + 1,
      isFeatured: false,
      isActive: true,
      deliverables: '4K ProRes Master, Social Aspect Ratios',
      turnaround: '3–5 Days',
    });
    setFeaturesText('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (service: AdminService) => {
    setEditingService(service);
    setFormData({ ...service });
    setFeaturesText(service.features.join('\n'));
    setIsEditorOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast('Please enter a service name');
      return;
    }

    const featureList = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const serviceToSave: AdminService = {
      id: editingService ? editingService.id : 'serv-' + Date.now(),
      name: formData.name || 'Untitled Service',
      icon: formData.icon || 'Film',
      category: formData.category || 'Production',
      shortDescription: formData.shortDescription || '',
      detailedDescription: formData.detailedDescription || '',
      features: featureList.length > 0 ? featureList : ['Cinema-grade 4K Deliverables'],
      startingPrice: formData.startingPrice || 'Custom Quote',
      ctaText: formData.ctaText || 'Get Started',
      displayOrder: Number(formData.displayOrder) || 1,
      isFeatured: !!formData.isFeatured,
      isActive: formData.isActive !== false,
      deliverables: formData.deliverables || '4K Master Video',
      turnaround: formData.turnaround || '3–5 Days',
    };

    onSaveService(serviceToSave);
    setIsEditorOpen(false);
    showToast(editingService ? 'Service updated successfully' : 'New service created');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Services & Offerings CMS
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-purple-50 text-purple-700 border border-purple-200 rounded-md font-bold">
              {services.length} Capabilities
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage video production capabilities, deliverables, turnaround times, and public website descriptions.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((service) => (
            <div
              key={service.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                service.isActive
                  ? 'bg-white border-slate-200 hover:border-[#b15f2c]/50 hover:shadow-md'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#b15f2c]">
                    {service.icon === 'Sparkles' ? (
                      <Sparkles className="w-5 h-5" />
                    ) : service.icon === 'Camera' ? (
                      <Camera className="w-5 h-5" />
                    ) : (
                      <Film className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {service.category} • Order #{service.displayOrder}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{service.name}</h3>
                  </div>
                </div>

                <button
                  onClick={() => onToggleActive(service.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                    service.isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {service.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>

              {/* Descriptions */}
              <div className="space-y-2">
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {service.shortDescription}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {service.detailedDescription}
                </p>
              </div>

              {/* Features List */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                  Key Features ({service.features.length})
                </span>
                <ul className="space-y-1">
                  {service.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b15f2c]" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-[10px] text-slate-400 font-mono pl-3.5">
                      + {service.features.length - 3} more included
                    </li>
                  )}
                </ul>
              </div>

              {/* Specs & Pricing Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                    Starting At
                  </span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {service.startingPrice}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(service)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDuplicateService(service)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Duplicate Service"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteService(service.id)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add / Edit Service Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  {editingService ? 'Edit Production Service' : 'Add New Production Service'}
                </h2>
                <p className="text-xs text-slate-500">
                  Define public website service cards, rate indicators, and feature checklists.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. AI Video Commercials & Product Ads"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Core Production"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Starting Rate
                  </label>
                  <input
                    type="text"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    placeholder="₹35,000 / spot"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Turnaround Time
                  </label>
                  <input
                    type="text"
                    value={formData.turnaround}
                    onChange={(e) => setFormData({ ...formData, turnaround: e.target.value })}
                    placeholder="3–5 Days"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Short Synopsis
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Cinema-grade 4K commercials for luxury products and tech hardware..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={formData.detailedDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, detailedDescription: e.target.value })
                  }
                  placeholder="Full description of the pipeline, LoRA models, audio scoring..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Features & Deliverables List (One per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="30s – 60s 4K Master Video&#10;9:16 Vertical + 16:9 Cinema formats&#10;Photorealistic fluid & particle physics"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] font-mono resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
