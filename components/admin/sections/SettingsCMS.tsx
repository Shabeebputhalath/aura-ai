'use client';

import React, { useState } from 'react';
import {
  Settings,
  Shield,
  KeyRound,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { AdminStudioSettings } from '../types';

interface SettingsCMSProps {
  settings: AdminStudioSettings;
  onSaveSettings: (updated: AdminStudioSettings) => void;
  onExportAllData: () => void;
  onResetAllData: () => void;
  showToast: (msg: string) => void;
}

export default function SettingsCMS({
  settings,
  onSaveSettings,
  onExportAllData,
  onResetAllData,
  showToast,
}: SettingsCMSProps) {
  const [formData, setFormData] = useState<AdminStudioSettings>({ ...settings });
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'seo' | 'security' | 'backup'>('general');

  // Security password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    showToast('Studio settings saved successfully');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    const savedPassword =
      typeof window !== 'undefined' ? localStorage.getItem('aura_admin_password') : null;
    const expectedPassword = savedPassword || 'aura2026';

    if (currentPassword !== expectedPassword) {
      setPasswordError('Current password does not match.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_password', newPassword);
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Admin password updated successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Studio Settings & Security
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure AURA AI production branding, global SEO meta, administrator credentials, and CMS snapshots.
          </p>
        </div>
      </div>

      {/* Sub navigation pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'general', label: 'Studio Profile', icon: Globe },
          { id: 'seo', label: 'SEO & Social Meta', icon: Sparkles },
          { id: 'security', label: 'Admin Security', icon: Shield },
          { id: 'backup', label: 'Data & Backup', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-[#b15f2c] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GENERAL */}
      {activeSubTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="space-y-5 max-w-3xl">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              AURA AI Studio Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Studio Name
                </label>
                <input
                  type="text"
                  value={formData.studioName}
                  onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Studio Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Primary Studio Email
                </label>
                <input
                  type="email"
                  value={formData.primaryEmail}
                  onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Studio Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.primaryPhone}
                  onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                Studio Location / HQ
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Studio Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SEO */}
      {activeSubTab === 'seo' && (
        <form onSubmit={handleSaveGeneral} className="space-y-5 max-w-3xl">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Search Engine & Social OpenGraph Meta
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                Global Meta Title
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                Global Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                OpenGraph Social Share Image URL
              </label>
              <input
                type="url"
                value={formData.ogImageUrl}
                onChange={(e) => setFormData({ ...formData, ogImageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save SEO Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: SECURITY */}
      {activeSubTab === 'security' && (
        <form onSubmit={handlePasswordChange} className="space-y-5 max-w-xl">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#b15f2c]" />
              <span>Change Admin Portal Password</span>
            </h3>

            {passwordError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Password updated successfully.</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                Current Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Default: aura2026"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] font-mono"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1.5 font-mono cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>Update Password</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: BACKUP & RESTORE */}
      {activeSubTab === 'backup' && (
        <div className="space-y-5 max-w-2xl">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Export & Database Snapshots
            </h3>
            <p className="text-xs text-slate-500">
              Download a complete JSON export of all projects, services, pricing plans, testimonials, team members, articles, and WhatsApp settings.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExportAllData}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>Export Full CMS Snapshot (JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all CMS content back to factory default?')) {
                    onResetAllData();
                    showToast('Factory demo data restored');
                  }
                }}
                className="px-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset to Factory Demo Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
