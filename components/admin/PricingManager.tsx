'use client';

import React, { useState } from 'react';

export interface VideoTierConfig {
  id: string;
  name: string;
  tagline: string;
  ratePerSecond: number; // in INR ₹
  turnaround: string;
  isPopular?: boolean;
  features: string[];
}

export interface AddOnConfig {
  id: string;
  name: string;
  price: number; // in INR ₹
  enabled: boolean;
  description?: string;
}

export interface PhotographyServiceConfig {
  id: string;
  name: string;
  price: string;
  unitPrice: number;
}

export interface GlobalSurchargeConfig {
  expressSurchargePercent: number; // e.g. 30 = 30%
  bulkDiscountPercent: number; // e.g. 10 = 10%
  minOrderValue: number; // e.g. 600
}

export interface FullPricingConfig {
  tiers: VideoTierConfig[];
  addOns: AddOnConfig[];
  photoServices: PhotographyServiceConfig[];
  surcharges: GlobalSurchargeConfig;
}

export const DEFAULT_PRICING_CONFIG: FullPricingConfig = {
  tiers: [
    {
      id: 'starter',
      name: 'Starter (Social & Reels)',
      tagline: 'Ideal for Instagram Reels, TikToks & YouTube Shorts',
      ratePerSecond: 40,
      turnaround: '3 Days',
      isPopular: false,
      features: [
        '1080p Full HD Render',
        'AI Motion & Particle VFX',
        'Commercial Royalty-Free Music',
        '2 Revisions Included',
        'Vertical 9:16 or Landscape 16:9',
      ],
    },
    {
      id: 'business',
      name: 'Business (Product Ads)',
      tagline: 'Best for brand commercials, product launches & ads',
      ratePerSecond: 60,
      turnaround: '2 Days',
      isPopular: true,
      features: [
        '4K Ultra HD Crisp Render',
        'Premium Studio Lighting AI',
        'Liquid & Dynamic Physics FX',
        'Custom Sound Design & Foley',
        'Color Grading & Brand Matching',
        '3 Revisions Included',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise (Cinematic & 3D)',
      tagline: 'High-end narrative ads, 3D Pixar & cinematic visuals',
      ratePerSecond: 80,
      turnaround: '1-2 Days',
      isPopular: false,
      features: [
        '8K HDR Master Render',
        '3D Pixar & Hyper-Realistic AI',
        'Multilingual AI Voiceover',
        'Dedicated Creative Director',
        'Unlimited Revisions',
        'Full Commercial Copyright Transfer',
      ],
    },
  ],
  addOns: [
    { id: 'script', name: 'Script Writing & Copywriting', price: 500, enabled: true, description: 'Engaging 30s-60s commercial script' },
    { id: 'voiceover', name: 'AI Voiceover Studio Sync', price: 500, enabled: true, description: 'Natural human-like voice synthesis' },
    { id: 'subtitles', name: 'Subtitle Integration', price: 300, enabled: true, description: 'Animated kinetic captions' },
    { id: 'thumbnail', name: 'Custom Poster / Thumbnail', price: 700, enabled: true, description: 'High-CTR YouTube/Insta cover' },
    { id: 'logo_anim', name: '3D Logo Animation', price: 1500, enabled: true, description: 'Branded video intro/outro loop' },
  ],
  photoServices: [
    { id: 'p1', name: 'AI Product Image', price: '₹500 / Image', unitPrice: 500 },
    { id: 'p2', name: 'Premium Commercial Image', price: '₹800 / Image', unitPrice: 800 },
    { id: 'p3', name: 'Product Poster Art', price: '₹700 onwards', unitPrice: 700 },
  ],
  surcharges: {
    expressSurchargePercent: 30,
    bulkDiscountPercent: 10,
    minOrderValue: 600,
  },
};

export default function PricingManager() {
  const [config, setConfig] = useState<FullPricingConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_PRICING_CONFIG;
    try {
      const stored = localStorage.getItem('aura_pricing_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.tiers && parsed.addOns) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PRICING_CONFIG;
  });

  const [activeTab, setActiveTab] = useState<'tiers' | 'addons' | 'photo' | 'surcharges' | 'simulator'>('tiers');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Add-On Modal Form State
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState(false);
  const [newAddOn, setNewAddOn] = useState({ name: '', price: 500, description: '' });

  // Simulator State for Admin Testing
  const [simDuration, setSimDuration] = useState<number>(30);
  const [simTierId, setSimTierId] = useState<string>('business');
  const [simAddOns, setSimAddOns] = useState<string[]>(['script', 'voiceover']);
  const [simExpress, setSimExpress] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem('aura_pricing_config', JSON.stringify(config));
      // Dispatch custom event to notify open tabs/components
      window.dispatchEvent(new Event('aura_pricing_updated'));
      showToast('Pricing rates and package rules saved successfully!');
    } catch (e) {
      console.error('Failed to save rates:', e);
      showToast('Error saving pricing rates.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all rates to system defaults?')) {
      setConfig(DEFAULT_PRICING_CONFIG);
      localStorage.setItem('aura_pricing_config', JSON.stringify(DEFAULT_PRICING_CONFIG));
      window.dispatchEvent(new Event('aura_pricing_updated'));
      showToast('Rates reset to default baseline.');
    }
  };

  // Video Tier handlers
  const updateTierRate = (id: string, rate: number) => {
    const updatedTiers = config.tiers.map((t) => (t.id === id ? { ...t, ratePerSecond: rate } : t));
    setConfig({ ...config, tiers: updatedTiers });
  };

  const updateTierTurnaround = (id: string, turnaround: string) => {
    const updatedTiers = config.tiers.map((t) => (t.id === id ? { ...t, turnaround } : t));
    setConfig({ ...config, tiers: updatedTiers });
  };

  const togglePopularTier = (id: string) => {
    const updatedTiers = config.tiers.map((t) => ({ ...t, isPopular: t.id === id }));
    setConfig({ ...config, tiers: updatedTiers });
    showToast(`Popular badge set to ${config.tiers.find((t) => t.id === id)?.name}`);
  };

  const addFeatureToTier = (id: string, featureText: string) => {
    if (!featureText.trim()) return;
    const updatedTiers = config.tiers.map((t) =>
      t.id === id ? { ...t, features: [...t.features, featureText.trim()] } : t
    );
    setConfig({ ...config, tiers: updatedTiers });
  };

  const removeFeatureFromTier = (id: string, featureIndex: number) => {
    const updatedTiers = config.tiers.map((t) =>
      t.id === id ? { ...t, features: t.features.filter((_, idx) => idx !== featureIndex) } : t
    );
    setConfig({ ...config, tiers: updatedTiers });
  };

  // Add-on handlers
  const toggleAddOnEnabled = (id: string) => {
    const updatedAddOns = config.addOns.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a));
    setConfig({ ...config, addOns: updatedAddOns });
  };

  const updateAddOnPrice = (id: string, price: number) => {
    const updatedAddOns = config.addOns.map((a) => (a.id === id ? { ...a, price } : a));
    setConfig({ ...config, addOns: updatedAddOns });
  };

  const handleAddNewAddOn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddOn.name.trim()) return;

    const id = `addon-${Date.now()}`;
    const item: AddOnConfig = {
      id,
      name: newAddOn.name.trim(),
      price: Number(newAddOn.price) || 500,
      enabled: true,
      description: newAddOn.description.trim(),
    };

    setConfig({ ...config, addOns: [...config.addOns, item] });
    setIsAddOnModalOpen(false);
    setNewAddOn({ name: '', price: 500, description: '' });
    showToast(`Add-on service "${item.name}" added successfully.`);
  };

  const deleteAddOn = (id: string) => {
    const target = config.addOns.find((a) => a.id === id);
    setConfig({ ...config, addOns: config.addOns.filter((a) => a.id !== id) });
    showToast(`Add-on "${target?.name}" removed.`);
  };

  // Photo Services handlers
  const updatePhotoPrice = (id: string, priceStr: string, unitPrice: number) => {
    const updatedPhoto = config.photoServices.map((p) =>
      p.id === id ? { ...p, price: priceStr, unitPrice } : p
    );
    setConfig({ ...config, photoServices: updatedPhoto });
  };

  // Simulator Calculations
  const selectedSimTier = config.tiers.find((t) => t.id === simTierId) || config.tiers[1];
  const simBasePrice = simDuration * selectedSimTier.ratePerSecond;
  const simAddOnsTotal = simAddOns.reduce((sum, addOnId) => {
    const found = config.addOns.find((a) => a.id === addOnId && a.enabled);
    return sum + (found ? found.price : 0);
  }, 0);
  const simSubtotal = simBasePrice + simAddOnsTotal;
  const simExpressSurcharge = simExpress
    ? Math.round((simSubtotal * config.surcharges.expressSurchargePercent) / 100)
    : 0;
  const simFinalTotal = simSubtotal + simExpressSurcharge;

  return (
    <div className="space-y-6">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[150] bg-[#111111] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-3 border border-white/20 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER SECTION & EXACT REFERENCE PILL BADGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e6e5e2] shadow-xs">
        <div>
          {/* Exact Pill Badge with Yellow/Orange Tag Icon */}
          <div className="inline-flex items-center gap-2.5 bg-[#f4f3ef] border border-[#e6e5e2] px-4 py-2 rounded-2xl mb-2.5 shadow-2xs">
            <span className="w-6 h-6 rounded-lg bg-[#fef3c7] text-[#d97706] flex items-center justify-center text-xs">
              🏷
            </span>
            <span className="text-sm font-bold text-[#111111] tracking-tight">Pricing Rates</span>
            <span className="bg-[#b15f2c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
              {config.tiers.length} Tiers • {config.addOns.length} Add-ons
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
            Pricing Rates & Service Configurator
          </h2>
          <p className="text-xs sm:text-sm text-[#111111]/60 mt-0.5">
            Configure per-second video creation rates, add-on costs, photography rates, and express delivery surcharges.
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2.5 bg-[#f4f3ef] text-[#111111] hover:bg-[#e6e5e2] text-xs font-semibold rounded-xl transition-colors border border-[#e6e5e2] cursor-pointer"
          >
            🔄 Reset Defaults
          </button>
          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 bg-[#111111] text-white hover:bg-[#b15f2c] text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2"
          >
            <span>💾 Save Rates Changes</span>
          </button>
        </div>
      </div>

      {/* NAVIGATION CONTROL TABS */}
      <div className="bg-white p-4 rounded-2xl border border-[#e6e5e2] shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {[
            { id: 'tiers', label: '🎬 Video Tiers (Per-Second Rates)' },
            { id: 'addons', label: '✨ Add-On Services' },
            { id: 'photo', label: '📷 Photography Rates' },
            { id: 'surcharges', label: '⚡ Surcharges & Discounts' },
            { id: 'simulator', label: '🧪 Rates Simulator' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-[#f4f3ef] text-[#111111]/70 hover:text-[#111111] hover:bg-[#e6e5e2]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: VIDEO TIERS CONFIGURATION */}
      {activeTab === 'tiers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {config.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-2xl border ${
                tier.isPopular ? 'border-[#b15f2c] ring-2 ring-[#b15f2c]/20' : 'border-[#e6e5e2]'
              } shadow-xs p-6 space-y-5 flex flex-col justify-between relative`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <span className="absolute -top-3 right-6 bg-[#b15f2c] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-xs">
                  ★ MOST POPULAR
                </span>
              )}

              <div className="space-y-4">
                {/* Header Title */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#111111]">{tier.name}</h3>
                    <button
                      onClick={() => togglePopularTier(tier.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border cursor-pointer ${
                        tier.isPopular
                          ? 'bg-[#b15f2c]/10 text-[#b15f2c] border-[#b15f2c]/30'
                          : 'bg-[#f4f3ef] text-[#111111]/60 border-[#e6e5e2] hover:text-[#111111]'
                      }`}
                    >
                      {tier.isPopular ? 'Popular ✓' : 'Set Popular'}
                    </button>
                  </div>
                  <p className="text-xs text-[#111111]/60 mt-1">{tier.tagline}</p>
                </div>

                {/* Per Second Rate Input */}
                <div className="bg-[#f4f3ef] p-4 rounded-xl border border-[#e6e5e2] space-y-2">
                  <label className="block text-xs font-bold text-[#111111]/80 uppercase tracking-wider">
                    Base Rate Per Second (₹)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-[#111111]">₹</span>
                    <input
                      type="number"
                      value={tier.ratePerSecond}
                      onChange={(e) => updateTierRate(tier.id, Number(e.target.value))}
                      className="w-full bg-white border border-[#e6e5e2] rounded-lg px-3 py-2 text-base font-bold text-[#111111] outline-none focus:border-[#111111]"
                    />
                    <span className="text-xs text-[#111111]/60 font-semibold whitespace-nowrap">/ sec</span>
                  </div>
                  
                  {/* Quick Samples calculation */}
                  <div className="text-[11px] text-[#111111]/60 pt-1 flex justify-between font-mono">
                    <span>15s = ₹{(15 * tier.ratePerSecond).toLocaleString('en-IN')}</span>
                    <span>30s = ₹{(30 * tier.ratePerSecond).toLocaleString('en-IN')}</span>
                    <span>60s = ₹{(60 * tier.ratePerSecond).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Turnaround Input */}
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    Standard Delivery Turnaround
                  </label>
                  <input
                    type="text"
                    value={tier.turnaround}
                    onChange={(e) => updateTierTurnaround(tier.id, e.target.value)}
                    placeholder="e.g. 2-3 Days"
                    className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>

                {/* Tier Features Editor */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-[#111111]">
                    Package Features ({tier.features.length})
                  </label>
                  <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {tier.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between gap-2 bg-[#f4f3ef] px-3 py-1.5 rounded-lg text-xs font-medium text-[#111111]"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#b15f2c]">✓</span>
                          <span>{feat}</span>
                        </span>
                        <button
                          onClick={() => removeFeatureFromTier(tier.id, idx)}
                          className="text-[#111111]/30 hover:text-[#ef4444] font-bold text-xs p-0.5 cursor-pointer"
                          title="Remove Feature"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Add Feature Form */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      id={`new-feat-${tier.id}`}
                      placeholder="Add new feature bullet..."
                      className="flex-1 bg-[#f4f3ef] border border-[#e6e5e2] rounded-lg px-3 py-1.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addFeatureToTier(tier.id, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById(`new-feat-${tier.id}`) as HTMLInputElement;
                        if (input && input.value) {
                          addFeatureToTier(tier.id, input.value);
                          input.value = '';
                        }
                      }}
                      className="px-3 py-1.5 bg-[#111111] text-white rounded-lg text-xs font-bold hover:bg-[#b15f2c] transition-colors cursor-pointer"
                    >
                      ＋ Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Sync Status */}
              <div className="pt-4 border-t border-[#e6e5e2] text-[10px] text-[#111111]/50 font-mono flex items-center justify-between">
                <span>Tier ID: {tier.id}</span>
                <span className="text-[#10b981] font-bold">✓ Live Synced</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ADD-ON SERVICES CONFIGURATION */}
      {activeTab === 'addons' && (
        <div className="bg-white rounded-2xl border border-[#e6e5e2] shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6e5e2] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#111111]">Add-On Service Options</h3>
              <p className="text-xs text-[#111111]/60">
                Configure additional production add-ons selectable by clients during video ordering.
              </p>
            </div>
            <button
              onClick={() => setIsAddOnModalOpen(true)}
              className="px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-[#b15f2c] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>＋ Add New Add-On</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f4f3ef] border-b border-[#e6e5e2] text-[11px] font-bold text-[#111111]/60 uppercase tracking-wider">
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Add-On Service Name</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Price (₹)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e5e2]">
                {config.addOns.map((addon) => (
                  <tr key={addon.id} className="hover:bg-[#f4f3ef]/40 transition-colors">
                    {/* Toggle Enabled */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleAddOnEnabled(addon.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border cursor-pointer ${
                          addon.enabled
                            ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30'
                            : 'bg-[#111111]/10 text-[#111111]/50 border-[#e6e5e2]'
                        }`}
                      >
                        {addon.enabled ? 'Active ✓' : 'Disabled'}
                      </button>
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 font-bold text-[#111111]">
                      {addon.name}
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 text-[#111111]/70">
                      {addon.description || 'Custom production add-on'}
                    </td>

                    {/* Price Input */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 w-32 bg-[#f4f3ef] border border-[#e6e5e2] px-2.5 py-1 rounded-lg">
                        <span className="font-bold text-[#111111]">₹</span>
                        <input
                          type="number"
                          value={addon.price}
                          onChange={(e) => updateAddOnPrice(addon.id, Number(e.target.value))}
                          className="w-full bg-transparent font-bold text-[#111111] outline-none"
                        />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => deleteAddOn(addon.id)}
                        className="text-[#111111]/30 hover:text-[#ef4444] font-semibold text-xs p-1 cursor-pointer"
                        title="Remove Add-on"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PHOTOGRAPHY & GRAPHICS RATES */}
      {activeTab === 'photo' && (
        <div className="bg-white rounded-2xl border border-[#e6e5e2] shadow-xs p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#111111]">AI Photography & Visuals Rates</h3>
            <p className="text-xs text-[#111111]/60">
              Configure rates for static commercial photography, product banners, and AI promotional renders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.photoServices.map((photo) => (
              <div
                key={photo.id}
                className="bg-[#f4f3ef] rounded-2xl border border-[#e6e5e2] p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-white text-[#b15f2c] font-bold flex items-center justify-center text-sm border border-[#e6e5e2]">
                    📷
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#111111]/50">{photo.id}</span>
                </div>

                <h4 className="font-bold text-sm text-[#111111]">{photo.name}</h4>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-[#111111]/70">
                    Display Label / Price Rate
                  </label>
                  <input
                    type="text"
                    value={photo.price}
                    onChange={(e) => updatePhotoPrice(photo.id, e.target.value, photo.unitPrice)}
                    className="w-full bg-white border border-[#e6e5e2] rounded-xl px-3 py-2 text-xs font-bold text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-[#111111]/70">
                    Unit Base Price (₹)
                  </label>
                  <input
                    type="number"
                    value={photo.unitPrice}
                    onChange={(e) => updatePhotoPrice(photo.id, photo.price, Number(e.target.value))}
                    className="w-full bg-white border border-[#e6e5e2] rounded-xl px-3 py-2 text-xs font-bold text-[#111111] outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SURCHARGES & DISCOUNTS */}
      {activeTab === 'surcharges' && (
        <div className="bg-white rounded-2xl border border-[#e6e5e2] shadow-xs p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#111111]">Global Delivery Surcharges & Discount Rules</h3>
            <p className="text-xs text-[#111111]/60">
              Manage rush order surcharges, bulk video duration discounts, and baseline order thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Express Delivery Surcharge */}
            <div className="bg-[#f4f3ef] p-5 rounded-2xl border border-[#e6e5e2] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-base">⚡</span>
                <h4 className="font-bold text-sm text-[#111111]">Express 24h Delivery</h4>
              </div>
              <p className="text-xs text-[#111111]/60">
                Surcharge percentage added for 24-hour priority rush delivery.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={config.surcharges.expressSurchargePercent}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      surcharges: { ...config.surcharges, expressSurchargePercent: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-white border border-[#e6e5e2] rounded-xl px-3.5 py-2 text-sm font-bold text-[#111111] outline-none focus:border-[#111111]"
                />
                <span className="font-bold text-sm">% Surcharge</span>
              </div>
            </div>

            {/* Bulk Duration Discount */}
            <div className="bg-[#f4f3ef] p-5 rounded-2xl border border-[#e6e5e2] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🎁</span>
                <h4 className="font-bold text-sm text-[#111111]">Long-Form Video Discount</h4>
              </div>
              <p className="text-xs text-[#111111]/60">
                Automatic discount percentage applied on orders exceeding 60 seconds.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={config.surcharges.bulkDiscountPercent}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      surcharges: { ...config.surcharges, bulkDiscountPercent: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-white border border-[#e6e5e2] rounded-xl px-3.5 py-2 text-sm font-bold text-[#111111] outline-none focus:border-[#111111]"
                />
                <span className="font-bold text-sm">% Discount</span>
              </div>
            </div>

            {/* Minimum Order Threshold */}
            <div className="bg-[#f4f3ef] p-5 rounded-2xl border border-[#e6e5e2] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🛡</span>
                <h4 className="font-bold text-sm text-[#111111]">Minimum Order Threshold</h4>
              </div>
              <p className="text-xs text-[#111111]/60">
                Minimum order amount (in ₹) required to submit a production request.
              </p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">₹</span>
                <input
                  type="number"
                  value={config.surcharges.minOrderValue}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      surcharges: { ...config.surcharges, minOrderValue: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-white border border-[#e6e5e2] rounded-xl px-3.5 py-2 text-sm font-bold text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LIVE SIMULATOR WIDGET */}
      {activeTab === 'simulator' && (
        <div className="bg-white rounded-2xl border border-[#e6e5e2] shadow-xs p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#111111]">Live Rate Calculation Test Bench</h3>
            <p className="text-xs text-[#111111]/60">
              Test how client quotes are generated in real-time using your active configured rates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Controls */}
            <div className="space-y-5 bg-[#f4f3ef] p-6 rounded-2xl border border-[#e6e5e2]">
              
              {/* Select Tier */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2">Select Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {config.tiers.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSimTierId(t.id)}
                      className={`p-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        simTierId === t.id
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#111111] border-[#e6e5e2] hover:bg-[#e6e5e2]'
                      }`}
                    >
                      <div>{t.name.split(' ')[0]}</div>
                      <div className="text-[10px] opacity-70">₹{t.ratePerSecond}/s</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Duration */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2">
                  Duration: <strong className="text-[#b15f2c]">{simDuration} Seconds</strong>
                </label>
                <div className="flex gap-2">
                  {[15, 30, 45, 60].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setSimDuration(dur)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        simDuration === dur
                          ? 'bg-[#b15f2c] text-white border-[#b15f2c]'
                          : 'bg-white text-[#111111] border-[#e6e5e2]'
                      }`}
                    >
                      {dur}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Add-ons */}
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-2">Toggle Add-Ons</label>
                <div className="space-y-2">
                  {config.addOns.filter((a) => a.enabled).map((a) => {
                    const isChecked = simAddOns.includes(a.id);
                    return (
                      <label
                        key={a.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e5e2] text-xs font-semibold text-[#111111] cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSimAddOns(simAddOns.filter((x) => x !== a.id));
                              } else {
                                setSimAddOns([...simAddOns, a.id]);
                              }
                            }}
                            className="rounded accent-[#b15f2c]"
                          />
                          <span>{a.name}</span>
                        </div>
                        <span className="font-mono text-[#b15f2c]">+₹{a.price}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Express Toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e6e5e2] text-xs font-bold text-[#111111] cursor-pointer">
                <span>⚡ Express 24-Hour Rush Delivery (+{config.surcharges.expressSurchargePercent}%)</span>
                <input
                  type="checkbox"
                  checked={simExpress}
                  onChange={(e) => setSimExpress(e.target.checked)}
                  className="rounded accent-[#b15f2c] w-4 h-4"
                />
              </label>

            </div>

            {/* Right Quote Card Preview */}
            <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#b15f2c]">
                    Live Quote Generator
                  </span>
                  <h4 className="text-xl font-bold">{selectedSimTier.name}</h4>
                </div>
                <span className="bg-white/10 text-white text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/10">
                  {simDuration} Seconds
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs font-medium text-white/80">
                <div className="flex justify-between">
                  <span>Base Rate ({simDuration}s × ₹{selectedSimTier.ratePerSecond}/s):</span>
                  <span className="font-mono text-white">₹{simBasePrice.toLocaleString('en-IN')}</span>
                </div>

                {simAddOns.map((id) => {
                  const item = config.addOns.find((a) => a.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between text-white/70">
                      <span>＋ {item.name}:</span>
                      <span className="font-mono text-white">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}

                {simExpress && (
                  <div className="flex justify-between text-[#b15f2c] font-semibold">
                    <span>⚡ Express 24h Surcharge ({config.surcharges.expressSurchargePercent}%):</span>
                    <span className="font-mono">₹{simExpressSurcharge.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Total Calculation Display */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest block">
                    Calculated Total
                  </span>
                  <div className="text-3xl font-black text-white font-mono mt-0.5">
                    ₹{simFinalTotal.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#10b981] font-bold block">✓ Verified Rate</span>
                  <span className="text-[10px] text-white/50">Turnaround: {selectedSimTier.turnaround}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* CREATE NEW ADD-ON MODAL */}
      {isAddOnModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e6e5e2] space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-[#e6e5e2] pb-3">
              <h3 className="text-base font-bold text-[#111111]">Add New Service Option</h3>
              <button
                onClick={() => setIsAddOnModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f4f3ef] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewAddOn} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#111111] mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={newAddOn.name}
                  onChange={(e) => setNewAddOn({ ...newAddOn, name: e.target.value })}
                  placeholder="e.g. 4K Color Grading Grade"
                  className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#111111] mb-1">Add-On Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={newAddOn.price}
                  onChange={(e) => setNewAddOn({ ...newAddOn, price: Number(e.target.value) })}
                  className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#111111] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newAddOn.description}
                  onChange={(e) => setNewAddOn({ ...newAddOn, description: e.target.value })}
                  placeholder="Short explanation of what this add-on includes..."
                  className="w-full bg-[#f4f3ef] border border-[#e6e5e2] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] outline-none focus:border-[#111111]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e6e5e2]">
                <button
                  type="button"
                  onClick={() => setIsAddOnModalOpen(false)}
                  className="px-4 py-2 bg-[#f4f3ef] text-[#111111] text-xs font-semibold rounded-xl hover:bg-[#e6e5e2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-[#b15f2c]"
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
