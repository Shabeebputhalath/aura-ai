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
  Database,
  Check,
  Server,
  Activity,
} from 'lucide-react';
import { AdminStudioSettings } from '../types';

interface SettingsCMSProps {
  settings: AdminStudioSettings;
  onSaveSettings: (updated: AdminStudioSettings) => void;
  onExportAllData: () => void;
  onResetAllData: () => void;
  showToast: (msg: string) => void;
  mongoStatus?: {
    connected: boolean;
    configured: boolean;
    database: string;
    maskedUri: string;
    pingMs?: number;
    message?: string;
    counts?: Record<string, number>;
  };
  onSyncMongo?: (reset?: boolean) => void;
  isSyncingMongo?: boolean;
}

export default function SettingsCMS({
  settings,
  onSaveSettings,
  onExportAllData,
  onResetAllData,
  showToast,
  mongoStatus = {
    connected: false,
    configured: false,
    database: 'aura_studio_db',
    maskedUri: '',
  },
  onSyncMongo,
  isSyncingMongo = false,
}: SettingsCMSProps) {
  const [formData, setFormData] = useState<AdminStudioSettings>({ ...settings });
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'seo' | 'security' | 'database' | 'backup'>('general');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const handleTestMongo = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/db-status');
      const data = await res.json();
      if (data.connected) {
        setTestResult(`Connected successfully to MongoDB Atlas database "${data.database}" in ${data.pingMs}ms`);
      } else {
        setTestResult(data.message || 'Connection check failed.');
      }
    } catch (err: any) {
      setTestResult('Network error while querying database status.');
    } finally {
      setIsTesting(false);
    }
  };

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
          { id: 'database', label: 'MongoDB Database', icon: Database },
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

      {/* TAB 3: MONGODB DATABASE */}
      {activeSubTab === 'database' && (
        <div className="space-y-6 max-w-3xl">
          {/* Status Overview Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    mongoStatus.connected
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : mongoStatus.configured
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    MongoDB Database Connection
                  </h3>
                  <p className="text-xs text-slate-500">
                    Active cloud persistence for commercials, media links, and studio records
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono inline-flex items-center gap-1.5 border ${
                    mongoStatus.connected
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : mongoStatus.configured
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      mongoStatus.connected
                        ? 'bg-emerald-500 animate-pulse'
                        : mongoStatus.configured
                        ? 'bg-amber-500'
                        : 'bg-slate-400'
                    }`}
                  />
                  <span>
                    {mongoStatus.connected
                      ? 'Connected & Synced'
                      : mongoStatus.configured
                      ? 'Connecting...'
                      : 'Awaiting MONGODB_URI'}
                  </span>
                </span>
              </div>
            </div>

            {/* Connection Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Database Name</span>
                <p className="font-semibold text-slate-800 font-mono">{mongoStatus.database || 'aura_studio_db'}</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Connection URI</span>
                <p className="font-mono text-slate-700 truncate" title={mongoStatus.maskedUri || 'mongodb+srv://...'}>
                  {mongoStatus.maskedUri || 'Configured via .env (MONGODB_URI)'}
                </p>
              </div>

              {mongoStatus.pingMs !== undefined && (
                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Ping Latency</span>
                  <p className="font-semibold text-emerald-600 font-mono flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>{mongoStatus.pingMs} ms</span>
                  </p>
                </div>
              )}

              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Storage Format</span>
                <p className="font-semibold text-slate-800">Direct Link Format (Images & 4K Video URLs)</p>
              </div>
            </div>

            {/* Live Collection Counts */}
            {mongoStatus.counts && (
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase text-slate-500 font-bold mb-2.5">
                  Collection Records in MongoDB
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {Object.entries(mongoStatus.counts).map(([colName, count]) => (
                    <div key={colName} className="p-2.5 bg-white border border-slate-200 rounded-lg text-center shadow-2xs">
                      <span className="block font-bold text-slate-900 font-display text-sm">{count}</span>
                      <span className="text-[10px] text-slate-500 font-mono capitalize">{colName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions & Diagnostics */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleTestMongo}
                disabled={isTesting}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Server className="w-4 h-4 text-[#b15f2c]" />
                <span>{isTesting ? 'Testing Ping...' : 'Test Connection'}</span>
              </button>

              {onSyncMongo && (
                <button
                  type="button"
                  onClick={() => onSyncMongo(false)}
                  disabled={isSyncingMongo}
                  className="px-4 py-2 bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncingMongo ? 'animate-spin' : ''}`} />
                  <span>{isSyncingMongo ? 'Syncing...' : 'Sync & Seed MongoDB'}</span>
                </button>
              )}
            </div>

            {testResult && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700">
                {testResult}
              </div>
            )}
          </div>

          {/* Configuration Instructions */}
          <div className="p-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-amber-900 uppercase font-mono tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-700" />
              <span>MongoDB Environment Key Setup (.env)</span>
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              Your MongoDB connection string is safely kept on the secure server via environment variables. Add your key to <code className="px-1.5 py-0.5 bg-white border border-amber-300 rounded text-amber-950 font-mono font-bold">.env</code>:
            </p>
            <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto selection:bg-emerald-800">
{`# .env configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=aura_studio_db`}
            </pre>
          </div>
        </div>
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
