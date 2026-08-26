'use client';

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Star,
  CheckCircle2,
  Sparkles,
  Layers,
  X,
  Clock,
  Info,
} from 'lucide-react';
import { AdminPricingPlan } from '../types';

interface PricingCMSProps {
  pricingPlans: AdminPricingPlan[];
  onSavePlan: (plan: AdminPricingPlan) => void;
  onDeletePlan: (planId: string) => void;
  onToggleActive: (planId: string) => void;
  onToggleFeatured: (planId: string) => void;
  onDuplicatePlan: (plan: AdminPricingPlan) => void;
  showToast: (msg: string) => void;
}

export default function PricingCMS({
  pricingPlans,
  onSavePlan,
  onDeletePlan,
  onToggleActive,
  onToggleFeatured,
  onDuplicatePlan,
  showToast,
}: PricingCMSProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AdminPricingPlan | null>(null);

  const [formData, setFormData] = useState<Partial<AdminPricingPlan>>({
    name: '',
    tagline: '',
    price: '₹35,000',
    billingLabel: 'per commercial',
    description: '',
    features: [],
    turnaroundTime: '3 Days',
    ctaText: 'Get Started',
    isFeatured: false,
    displayOrder: 1,
    isActive: true,
    badge: '',
  });

  const [featuresText, setFeaturesText] = useState('');

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      tagline: '',
      price: '₹35,000',
      billingLabel: 'per commercial',
      description: '',
      features: [],
      turnaroundTime: '3 Days',
      ctaText: 'Select Package',
      isFeatured: false,
      displayOrder: pricingPlans.length + 1,
      isActive: true,
      badge: 'New Tier',
    });
    setFeaturesText('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (plan: AdminPricingPlan) => {
    setEditingPlan(plan);
    setFormData({ ...plan });
    setFeaturesText(plan.features.join('\n'));
    setIsEditorOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.price?.trim()) {
      showToast('Please enter tier name and price');
      return;
    }

    const featureList = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const planToSave: AdminPricingPlan = {
      id: editingPlan ? editingPlan.id : 'tier-' + Date.now(),
      name: formData.name || 'Custom Tier',
      tagline: formData.tagline || '',
      price: formData.price || '₹35,000',
      billingLabel: formData.billingLabel || 'per spot',
      description: formData.description || '',
      features: featureList.length > 0 ? featureList : ['4K Commercial Delivery'],
      turnaroundTime: formData.turnaroundTime || '3 Days',
      ctaText: formData.ctaText || 'Get Started',
      isFeatured: !!formData.isFeatured,
      displayOrder: Number(formData.displayOrder) || 1,
      isActive: formData.isActive !== false,
      badge: formData.badge || '',
    };

    onSavePlan(planToSave);
    setIsEditorOpen(false);
    showToast(editingPlan ? 'Pricing tier updated' : 'New pricing tier created');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Public Website Pricing CMS
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-bold">
              {pricingPlans.length} Rate Cards
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage public production tiers, rate estimates, turnaround times, and featured badges shown on the live website.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Pricing Tier</span>
        </button>
      </div>

      {/* Info Notice regarding Public Display CMS scope */}
      <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-[#b15f2c] shrink-0 mt-0.5" />
        <span>
          This CMS manages public rate cards, scope inclusions, and turnaround tags displayed on the live AURA AI website. Changes update the public calculator in real-time.
        </span>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pricingPlans
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((plan) => (
            <div
              key={plan.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 relative ${
                plan.isFeatured
                  ? 'bg-white border-[#b15f2c] shadow-lg ring-1 ring-[#b15f2c]/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              } ${!plan.isActive && 'opacity-60'}`}
            >
              {/* Featured Badge */}
              {plan.badge && (
                <div className="absolute -top-2.5 left-4">
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#b15f2c] text-white rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                  <button
                    onClick={() => onToggleActive(plan.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                      plan.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {plan.isActive ? 'Active' : 'Disabled'}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    /{plan.billingLabel}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-[#b15f2c] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Turnaround: {plan.turnaroundTime}</span>
                </div>
              </div>

              {/* Description & Features */}
              <div className="space-y-2">
                <p className="text-xs text-slate-700">{plan.description}</p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                    Included Scope ({plan.features.length})
                  </span>
                  <ul className="space-y-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b15f2c] shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onToggleFeatured(plan.id)}
                  className={`flex items-center gap-1 text-xs cursor-pointer ${
                    plan.isFeatured ? 'text-amber-600 font-bold' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${plan.isFeatured ? 'fill-current' : ''}`} />
                  <span>{plan.isFeatured ? 'Featured Tier' : 'Set as Featured'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(plan)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Edit Plan"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDuplicatePlan(plan)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Duplicate Plan"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeletePlan(plan.id)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Plan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add / Edit Plan Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  {editingPlan ? 'Edit Pricing Tier' : 'Create New Pricing Tier'}
                </h2>
                <p className="text-xs text-slate-500">
                  Configure website tier name, price, inclusions, turnaround, and promotional badge.
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
                    Tier Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Growth Studio"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Most Popular / Best Value"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="₹45,000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Billing Label
                  </label>
                  <input
                    type="text"
                    value={formData.billingLabel}
                    onChange={(e) => setFormData({ ...formData, billingLabel: e.target.value })}
                    placeholder="per commercial"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Turnaround Time
                  </label>
                  <input
                    type="text"
                    value={formData.turnaroundTime}
                    onChange={(e) => setFormData({ ...formData, turnaroundTime: e.target.value })}
                    placeholder="4–5 Days"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Our most popular tier for luxury brands and scaleups"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Full 30-second cinema-grade commercial with fluid mechanics..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Included Features List (One per line)
                </label>
                <textarea
                  rows={5}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="30s 4K Cinema Master Commercial&#10;Full Multi-Format Suite (9:16, 16:9)&#10;Deep Brand Consistency & Color Match&#10;Neural Voiceover in 20+ Languages"
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
                  {editingPlan ? 'Save Tier' : 'Publish Tier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
