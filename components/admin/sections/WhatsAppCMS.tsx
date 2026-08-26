'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Save,
  CheckCircle2,
  Clock,
  Smartphone,
  Monitor,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
} from 'lucide-react';
import { AdminWhatsAppConfig } from '../types';

interface WhatsAppCMSProps {
  config: AdminWhatsAppConfig;
  onSaveConfig: (updated: AdminWhatsAppConfig) => void;
  showToast: (msg: string) => void;
}

export default function WhatsAppCMS({ config, onSaveConfig, showToast }: WhatsAppCMSProps) {
  const [formData, setFormData] = useState<AdminWhatsAppConfig>({ ...config });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSaveConfig(formData);
      setIsSaving(false);
      showToast('WhatsApp integration settings updated');
    }, 400);
  };

  const handleTestWhatsApp = () => {
    const cleanNumber = formData.phoneNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(formData.prefilledMessage || formData.preFilledPrompt || '');
    const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              WhatsApp Integration & Direct Chat CMS
            </h1>
            <span
              className={`px-2.5 py-0.5 text-xs font-mono rounded-md font-bold ${
                formData.isEnabled
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}
            >
              {formData.isEnabled ? 'Active Integration' : 'Disabled'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure direct client video inquiries via WhatsApp, floating trigger buttons, business hours, and automated greeting messages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTestWhatsApp}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Test WhatsApp Trigger</span>
          </button>
        </div>
      </div>

      {/* Main Settings Form Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Core Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Connection & Number */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Studio WhatsApp Connection</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Studio WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Button CTA Label
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="Chat with Director on WhatsApp"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                Default Client Pre-filled Message
              </label>
              <textarea
                rows={3}
                value={formData.prefilledMessage}
                onChange={(e) => setFormData({ ...formData, prefilledMessage: e.target.value })}
                placeholder="Hi AURA AI, I'd like to discuss a 4K commercial video production project for my brand..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] resize-none"
              />
              <span className="text-[11px] text-slate-400">
                This text will be automatically typed in the client&apos;s WhatsApp chat when they click the button.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                Automated Greeting Popup Message
              </label>
              <input
                type="text"
                value={formData.defaultGreeting}
                onChange={(e) => setFormData({ ...formData, defaultGreeting: e.target.value })}
                placeholder="Hi there! Need a fast 4K video spot quote? Chat with our production director now."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
              />
            </div>
          </div>

          {/* Card 2: Operating Hours & Visibility */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#b15f2c]" />
              <span>Availability & Display Rules</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Production Studio Hours
                </label>
                <input
                  type="text"
                  value={
                    typeof formData.businessHours === 'string'
                      ? formData.businessHours
                      : 'Mon – Sat: 9:00 AM – 9:00 PM IST'
                  }
                  onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                  placeholder="Mon – Sat: 9:00 AM – 9:00 PM IST"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Availability Status Tag
                </label>
                <select
                  value={formData.availabilityStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, availabilityStatus: e.target.value as any })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                >
                  <option value="Online • Available Now">Online • Available Now</option>
                  <option value="Away • Responds in 1 hr">Away • Responds in 1 hr</option>
                  <option value="Off-hours • Leave message">Off-hours • Leave message</option>
                </select>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <label className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isEnabled}
                  onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-[#b15f2c] border-slate-300"
                />
                <span className="text-xs text-slate-800 font-medium">Integration Active</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showOnMobile}
                  onChange={(e) => setFormData({ ...formData, showOnMobile: e.target.checked })}
                  className="w-4 h-4 rounded text-[#b15f2c] border-slate-300"
                />
                <span className="text-xs text-slate-800 font-medium">Show on Mobile</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showOnDesktop}
                  onChange={(e) => setFormData({ ...formData, showOnDesktop: e.target.checked })}
                  className="w-4 h-4 rounded text-[#b15f2c] border-slate-300"
                />
                <span className="text-xs text-slate-800 font-medium">Show on Desktop</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save WhatsApp Configuration'}</span>
            </button>
          </div>
        </div>

        {/* Right Column (1 Col): Live Widget Preview & Engagement Logs */}
        <div className="space-y-6">
          {/* Live Preview Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Live Website Floating Widget Preview</span>
            </h2>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative overflow-hidden">
              {/* Simulated Floating Pill */}
              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                      {formData.availabilityStatus}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">AURA AI Studio</span>
                </div>
                <p className="text-xs text-slate-800">{formData.defaultGreeting}</p>
              </div>

              {/* Simulated Floating Action Button */}
              <div className="flex justify-end">
                <div className="px-4 py-2.5 bg-[#22c55e] hover:bg-[#1ea850] text-white font-semibold text-xs rounded-full flex items-center gap-2 shadow-md">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{formData.ctaText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Inquiries Log */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#b15f2c]" />
              <span>Recent WhatsApp Click Logs</span>
            </h2>

            <div className="space-y-2">
              {formData.inquiryLogs?.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      {log.sender || log.name || log.phone || 'Direct Lead'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">
                    {log.message || log.topic || (log.sourcePage ? `Triggered from ${log.sourcePage}` : 'WhatsApp conversion')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
