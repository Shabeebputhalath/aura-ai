'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  LayoutGrid,
  Calendar,
  Mail,
  FileText,
  Users,
  Layers,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Info,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Plus,
  Filter,
  MoreHorizontal,
  CreditCard,
  Wifi,
  Wallet,
  Lock,
  Coins,
  CircleDollarSign,
  Smartphone,
  Plane,
  ShoppingBag,
  Sparkles,
  Layers as LayersIcon,
  Check,
  X,
  TrendingUp,
} from 'lucide-react';
import RequestsTable from './RequestsTable';
import CommercialsManager from './CommercialsManager';
import PricingManager from './PricingManager';

interface Transaction {
  id: string;
  orderId: string;
  activity: string;
  category: 'app' | 'hotel' | 'flight' | 'grocery' | 'software' | 'commercial' | 'render';
  price: number;
  status: 'Completed' | 'Pending' | 'In Progress';
  date: string;
  iconBg: string;
  iconColor: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    orderId: 'INV_000076',
    activity: 'Mobile App Purchase',
    category: 'app',
    price: 25500,
    status: 'Completed',
    date: '17 Apr, 2026 03:45 PM',
    iconBg: 'bg-[#007aff]/10',
    iconColor: 'text-[#007aff]',
  },
  {
    id: 'tx-2',
    orderId: 'INV_000075',
    activity: 'Hotel Booking',
    category: 'hotel',
    price: 32750,
    status: 'Pending',
    date: '15 Apr, 2026 11:30 AM',
    iconBg: 'bg-[#229ed9]/10',
    iconColor: 'text-[#229ed9]',
  },
  {
    id: 'tx-3',
    orderId: 'INV_000074',
    activity: 'Flight Ticket Booking',
    category: 'flight',
    price: 40200,
    status: 'Completed',
    date: '15 Apr, 2026 12:00 PM',
    iconBg: 'bg-[#3b82f6]/10',
    iconColor: 'text-[#3b82f6]',
  },
  {
    id: 'tx-4',
    orderId: 'INV_000073',
    activity: 'Grocery Purchase',
    category: 'grocery',
    price: 50200,
    status: 'In Progress',
    date: '14 Apr, 2026 09:15 PM',
    iconBg: 'bg-[#ff5d2a]/10',
    iconColor: 'text-[#ff5d2a]',
  },
  {
    id: 'tx-5',
    orderId: 'INV_000073',
    activity: 'Software License',
    category: 'software',
    price: 15900,
    status: 'Completed',
    date: '10 Apr, 2026 06:00 AM',
    iconBg: 'bg-[#eb1000]/10',
    iconColor: 'text-[#eb1000]',
  },
];

const CHART_DATA = [
  { month: '00', profit: 0, loss: 0 },
  { month: 'Jan', profit: 32, loss: 24 },
  { month: 'Feb', profit: 42, loss: 20 },
  { month: 'Mar', profit: 34, loss: 18 },
  { month: 'Apr', profit: 38, loss: 24 },
  { month: 'May', profit: 44, loss: 28 },
  { month: 'Jun', profit: 48, loss: 30 },
  { month: 'Jul', profit: 40, loss: 26 },
  { month: 'Aug', profit: 32, loss: 22 },
];

interface FinexyAdminDashboardProps {
  initialTab?: 'Overview' | 'Activity' | 'Manage' | 'Program' | 'Account' | 'Reports';
}

export default function FinexyAdminDashboard({ initialTab = 'Overview' }: FinexyAdminDashboardProps) {
  // Navigation tabs
  const [activeNav, setActiveNav] = useState<'Overview' | 'Activity' | 'Manage' | 'Program' | 'Account' | 'Reports'>(initialTab);
  const [activeSideIcon, setActiveSideIcon] = useState<'grid' | 'calendar' | 'mail' | 'docs' | 'users' | 'layers' | 'settings'>('grid');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Currency selection
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  // Table state
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTxIds, setSelectedTxIds] = useState<string[]>(['tx-4']);
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Pending' | 'In Progress'>('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Modals & Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState('2500');
  const [transferRecipient, setTransferRecipient] = useState('');

  // Cards
  const [cards, setCards] = useState([
    {
      id: 'c1',
      number: '•••• •••• 6782',
      exp: '09/29',
      cvv: '611',
      type: 'mastercard',
      theme: 'dark',
      active: true,
    },
    {
      id: 'c2',
      number: '•••• 4356',
      exp: '11/30',
      cvv: '942',
      type: 'visa',
      theme: 'orange',
      active: true,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectAll = () => {
    if (selectedTxIds.length === filteredTransactions.length) {
      setSelectedTxIds([]);
    } else {
      setSelectedTxIds(filteredTransactions.map((t) => t.id));
    }
  };

  const toggleSelectTx = (id: string) => {
    setSelectedTxIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.orderId.toLowerCase().includes(tableSearch.toLowerCase()) ||
      tx.activity.toLowerCase().includes(tableSearch.toLowerCase());
    const matchesFilter = statusFilter === 'All' ? true : tx.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  return (
    <div
      className={`min-h-screen font-sans p-2.5 sm:p-4 md:p-6 lg:p-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-[#121216] text-white' : 'bg-[#e9e8ee] text-[#1a1a1f]'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-[#18181b] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-3 animate-fade-in border border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5d2a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          MASTER DASHBOARD CONTAINER (Ultra-Clean Super-Card matching reference)
      ========================================================================== */}
      <div
        className={`w-full max-w-[1520px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.06)] border transition-colors duration-300 flex flex-col lg:flex-row ${
          isDarkMode
            ? 'bg-[#1a1a22] border-[#2a2a36]'
            : 'bg-[#fcfbfe] border-[#e4e3ea]'
        }`}
      >
        {/* =====================================================================
            1. LEFT SLIM ICON RAIL / DOCK
        ====================================================================== */}
        <aside
          className={`w-full lg:w-[76px] flex flex-row lg:flex-col items-center justify-between p-3.5 lg:py-6 lg:px-3 border-b lg:border-b-0 lg:border-r transition-colors duration-300 flex-shrink-0 ${
            isDarkMode ? 'border-[#2a2a36] bg-[#17171e]' : 'border-[#eeedf3] bg-[#f8f7fb]'
          }`}
        >
          {/* Top: Light/Dark Theme Switcher Pill */}
          <div
            className={`p-1 rounded-full flex flex-row lg:flex-col items-center gap-1 border ${
              isDarkMode ? 'bg-[#22222d] border-[#313140]' : 'bg-[#eeedf3] border-[#e2e1e9]'
            }`}
          >
            <button
              onClick={() => setIsDarkMode(false)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                !isDarkMode
                  ? 'bg-white text-[#1a1a1f] shadow-xs font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Light Mode"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsDarkMode(true)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#ff5d2a] text-white shadow-xs font-bold'
                  : 'text-gray-400 hover:text-black'
              }`}
              title="Dark Mode"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Vertical Icon Dock */}
          <div
            className={`flex flex-row lg:flex-col items-center gap-1.5 p-1.5 rounded-2xl border ${
              isDarkMode ? 'bg-[#22222d] border-[#313140]' : 'bg-white border-[#eeedf3] shadow-xs'
            }`}
          >
            {[
              { id: 'grid', icon: LayoutGrid, label: 'Overview', tab: 'Overview' },
              { id: 'calendar', icon: Calendar, label: 'Activity', tab: 'Activity' },
              { id: 'mail', icon: Mail, label: 'Requests', tab: 'Activity' },
              { id: 'docs', icon: FileText, label: 'Manage', tab: 'Manage' },
              { id: 'users', icon: Users, label: 'Program', tab: 'Program' },
              { id: 'layers', icon: Layers, label: 'Account', tab: 'Account' },
              { id: 'settings', icon: Settings, label: 'Settings', tab: 'Reports' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSideIcon === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSideIcon(item.id as any);
                    setActiveNav(item.tab as any);
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? isDarkMode
                        ? 'bg-[#ff5d2a] text-white shadow-sm'
                        : 'bg-[#18181b] text-white shadow-sm'
                      : isDarkMode
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-500 hover:text-black hover:bg-gray-100'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          {/* Bottom: Help & Exit to Main Site */}
          <div className="flex flex-row lg:flex-col items-center gap-2">
            <button
              onClick={() => showToast('Finexy Support & Docs: Version 3.4.2')}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-[#313140] text-gray-400 hover:text-white hover:bg-white/5'
                  : 'border-[#e5e4ec] text-gray-500 hover:text-black hover:bg-white'
              }`}
              title="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-[#313140] text-gray-400 hover:text-[#ff5d2a] hover:bg-white/5'
                  : 'border-[#e5e4ec] text-gray-500 hover:text-[#ff5d2a] hover:bg-white'
              }`}
              title="Back to Landing Page"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </aside>

        {/* =====================================================================
            2. MAIN DASHBOARD CONTENT AREA
        ====================================================================== */}
        <div className="flex-1 flex flex-col min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* -------------------------------------------------------------
              TOP HEADER BAR (Finexy Logo + Segmented Nav + User Profile)
          -------------------------------------------------------------- */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff5d2a] to-[#ff7d45] flex items-center justify-center text-white font-black shadow-md shadow-[#ff5d2a]/20">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight font-display">
                Finexy
              </span>
            </div>

            {/* Center Floating Segmented Nav Pills */}
            <nav
              className={`p-1 rounded-full flex items-center gap-1 border overflow-x-auto max-w-full no-scrollbar ${
                isDarkMode ? 'bg-[#22222d] border-[#313140]' : 'bg-[#f1f0f6] border-[#e5e4ec]'
              }`}
            >
              {(['Overview', 'Activity', 'Manage', 'Program', 'Account', 'Reports'] as const).map(
                (tab) => {
                  const isActive = activeNav === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveNav(tab)}
                      className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        isActive
                          ? isDarkMode
                            ? 'bg-[#ff5d2a] text-white shadow-sm font-bold'
                            : 'bg-[#1a1a1f] text-white shadow-xs font-bold'
                          : isDarkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-[#6b6a75] hover:text-[#1a1a1f]'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                }
              )}
            </nav>

            {/* Right Action Icons & User Dropdown */}
            <div className="flex items-center gap-2 sm:gap-2.5 self-end md:self-auto">
              <button
                onClick={() => showToast('Search activated: Type to filter dashboard')}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-[#313140] bg-[#22222d] text-gray-300 hover:text-white'
                    : 'border-[#e6e5ed] bg-[#f4f4f8] text-gray-700 hover:bg-gray-200'
                }`}
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => showToast('3 New Studio notifications')}
                className={`w-9 h-9 rounded-full relative flex items-center justify-center border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-[#313140] bg-[#22222d] text-gray-300 hover:text-white'
                    : 'border-[#e6e5ed] bg-[#f4f4f8] text-gray-700 hover:bg-gray-200'
                }`}
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff5d2a]" />
              </button>

              <button
                onClick={() => showToast('System status: All AI production nodes operating normal')}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-[#313140] bg-[#22222d] text-gray-300 hover:text-white'
                    : 'border-[#e6e5ed] bg-[#f4f4f8] text-gray-700 hover:bg-gray-200'
                }`}
                title="Info"
              >
                <Info className="w-4 h-4" />
              </button>

              {/* User Profile Pill */}
              <div
                onClick={() => showToast('User: Sajibur Rahman (Super Admin)')}
                className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border cursor-pointer transition-all hover:scale-[1.02] ${
                  isDarkMode
                    ? 'bg-[#22222d] border-[#313140] text-white'
                    : 'bg-white border-[#e5e4ec] text-[#1a1a1f] shadow-xs'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Sajibur Rahman"
                  className="w-7 h-7 rounded-full object-cover border border-white"
                />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold truncate max-w-[90px] sm:max-w-[110px]">
                    Sajibur Rahman
                  </span>
                  <span className="text-[9px] text-gray-400 truncate max-w-[90px] sm:max-w-[110px]">
                    sajibur.rahman@gm...
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </header>

          {/* -------------------------------------------------------------
              VIEW SWITCHER: OVERVIEW (CLONE) vs ACTIVITY / MANAGE / ETC.
          -------------------------------------------------------------- */}
          {activeNav === 'Activity' ? (
            <div className="mt-4">
              <RequestsTable />
            </div>
          ) : activeNav === 'Manage' ? (
            <div className="mt-4">
              <CommercialsManager />
            </div>
          ) : activeNav === 'Account' || activeNav === 'Reports' ? (
            <div className="mt-4">
              <PricingManager />
            </div>
          ) : activeNav === 'Program' ? (
            /* Program & Model Cluster view */
            <div className="space-y-6 mt-4">
              <div
                className={`p-6 sm:p-8 rounded-3xl border ${
                  isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Generative AI Production Models</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Real-time GPU worker fleet & rendering pipeline latency.
                    </p>
                  </div>
                  <button
                    onClick={() => showToast('Syncing model weights and LoRA checkpoints...')}
                    className="px-4 py-2 bg-[#ff5d2a] text-white rounded-xl text-xs font-bold hover:bg-[#e04c1c] transition-colors cursor-pointer"
                  >
                    + Deploy New Checkpoint
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Runway Gen-3 Alpha', speed: '24 fps', load: '85%', status: 'Active' },
                    { name: 'Sora 4K Ultra', speed: '30 fps', load: '78%', status: 'Active' },
                    { name: 'Kling 1.5 HD Pro', speed: '60 fps', load: '92%', status: 'Active' },
                    { name: 'Flux Fluid Dynamics', speed: '120 fps', load: '64%', status: 'Active' },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border ${
                        isDarkMode ? 'bg-[#181820] border-[#2a2a36]' : 'bg-[#f9f8fc] border-[#e8e7ef]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{m.name}</span>
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                      </div>
                      <div className="mt-3 text-2xl font-black">{m.load}</div>
                      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                        <span>Speed: {m.speed}</span>
                        <span className="text-[#10b981] font-semibold">{m.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ===================================================================
                EXACT CLONE OF REFERENCE DASHBOARD (OVERVIEW)
            ==================================================================== */
            <div className="space-y-6">
              
              {/* Greetings Header */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Good morning, Sajibur
                </h1>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#7a7985]'}`}>
                  Stay on top of your tasks, monitor progress, and track status.
                </p>
              </div>

              {/* Top 3-Columns Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* -------------------------------------------------------------
                    COLUMN 1 (Left 4 cols): Total Balance, Wallets, Limit, Cards
                -------------------------------------------------------------- */}
                <div className="lg:col-span-4 space-y-5 flex flex-col">
                  
                  {/* Card: Total Balance */}
                  <div
                    className={`p-6 rounded-[28px] border transition-colors ${
                      isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-[#7a7985]'}`}>
                        Total Balance
                      </span>

                      {/* Currency Selector Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                            isDarkMode
                              ? 'bg-[#181820] border-[#313140] text-gray-200'
                              : 'bg-[#f4f4f8] border-[#e5e4ec] text-[#1a1a1f]'
                          }`}
                        >
                          <span>{currency === 'USD' ? '🇺🇸 USD' : currency === 'EUR' ? '🇪🇺 EUR' : '🇬🇧 GBP'}</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </button>

                        {isCurrencyOpen && (
                          <div
                            className={`absolute right-0 mt-1 w-28 rounded-xl border p-1 z-30 shadow-xl ${
                              isDarkMode ? 'bg-[#20202a] border-[#313140]' : 'bg-white border-gray-200'
                            }`}
                          >
                            {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                              <button
                                key={curr}
                                onClick={() => {
                                  setCurrency(curr);
                                  setIsCurrencyOpen(false);
                                  showToast(`Currency switched to ${curr}`);
                                }}
                                className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center gap-2 cursor-pointer ${
                                  currency === curr
                                    ? 'bg-[#ff5d2a] text-white font-bold'
                                    : 'hover:bg-gray-100 dark:hover:bg-white/10'
                                }`}
                              >
                                <span>{curr === 'USD' ? '🇺🇸' : curr === 'EUR' ? '🇪🇺' : '🇬🇧'}</span>
                                <span>{curr}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Big Balance Number */}
                    <div className="mt-3">
                      <div className="text-3xl sm:text-[34px] font-black tracking-tight font-display">
                        {currencySymbols[currency]}689,372.00
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-[#10b981]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>5% than last month</span>
                      </div>
                    </div>

                    {/* Action Buttons: Transfer & Request */}
                    <div className="grid grid-cols-2 gap-2.5 mt-5">
                      <button
                        onClick={() => setIsTransferOpen(true)}
                        className="py-2.5 px-4 rounded-full bg-[#18181b] text-white text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        <span>Transfer</span>
                      </button>

                      <button
                        onClick={() => setIsRequestOpen(true)}
                        className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isDarkMode
                            ? 'bg-[#2a2a38] text-white hover:bg-[#343444]'
                            : 'bg-[#f4f4f8] text-[#18181b] hover:bg-[#e8e7ef]'
                        }`}
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5 rotate-90" />
                        <span>Request</span>
                      </button>
                    </div>

                    {/* Wallets | Total 6 wallets */}
                    <div className="mt-6 pt-5 border-t border-dashed border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-3">
                        <span>Wallets</span>
                        <span className="font-normal text-gray-400">Total 6 wallets</span>
                      </div>

                      {/* Mini Wallets List */}
                      <div className="space-y-2">
                        {[
                          { flag: '🇺🇸', code: 'USD', amount: '$22,678.00', limit: 'Limit is $10k a month', status: 'Active' },
                          { flag: '🇪🇺', code: 'EUR', amount: '€18,345.00', limit: 'Limit is €8k a month', status: 'Active' },
                          { flag: '🇬🇧', code: 'GBP', amount: '£15,000.00', limit: 'Limit is £7.5k a month', status: 'Inactive' },
                        ].map((w, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-2xl border flex items-center justify-between transition-colors ${
                              isDarkMode
                                ? 'bg-[#181820] border-[#2b2b38]'
                                : 'bg-[#faf9fd] border-[#eeedf4]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{w.flag}</span>
                              <div className="flex flex-col leading-tight">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-extrabold">{w.code}</span>
                                  <span className="text-xs font-bold text-[#ff5d2a]">{w.amount}</span>
                                </div>
                                <span className="text-[10px] text-gray-400">{w.limit}</span>
                              </div>
                            </div>

                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                w.status === 'Active'
                                  ? 'bg-[#10b981]/15 text-[#10b981]'
                                  : 'bg-[#ff5d2a]/15 text-[#ff5d2a]'
                              }`}
                            >
                              {w.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card: Monthly Spending Limit */}
                  <div
                    className={`p-6 rounded-[28px] border transition-colors ${
                      isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                    }`}
                  >
                    <h3 className="text-xs font-bold text-gray-500 mb-3">
                      Monthly Spending Limit
                    </h3>

                    {/* Dual segmented progress bar with orange solid and diagonal stripe */}
                    <div className="w-full h-3 rounded-full overflow-hidden flex bg-gray-200 dark:bg-gray-800 p-0.5">
                      <div
                        className="bg-[#ff5d2a] h-full rounded-full transition-all duration-700"
                        style={{ width: '28%' }}
                      />
                      <div
                        className="h-full flex-1 ml-1 rounded-full opacity-60"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(45deg, #ff5d2a, #ff5d2a 4px, transparent 4px, transparent 8px)',
                        }}
                      />
                    </div>

                    {/* Spending limits label */}
                    <div className="flex items-center justify-between text-xs mt-3">
                      <span className="text-gray-400">
                        <strong className="text-[#1a1a1f] dark:text-white font-bold">$1,400.00</strong> spent out of
                      </span>
                      <span className="font-extrabold text-[#1a1a1f] dark:text-white">$5,500.00</span>
                    </div>
                  </div>

                  {/* Card: My Cards */}
                  <div
                    className={`p-6 rounded-[28px] border transition-colors ${
                      isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-bold text-gray-500">My Cards</span>
                      </div>
                      <button
                        onClick={() => setIsAddCardOpen(true)}
                        className="text-xs font-bold text-[#ff5d2a] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        + Add new
                      </button>
                    </div>

                    {/* Credit Cards Horizontal Stack with Peek */}
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                      {/* Card 1: Matte Charcoal Black */}
                      <div className="w-[210px] sm:w-[225px] h-[130px] rounded-2xl bg-[#1a1a1e] text-white p-3.5 flex flex-col justify-between flex-shrink-0 shadow-lg relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

                        {/* Top row */}
                        <div className="flex items-center justify-between z-10">
                          <div className="flex items-center gap-2">
                            <Wifi className="w-3.5 h-3.5 text-white/70 rotate-90" />
                            <span className="text-[9px] font-bold bg-white text-black px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          </div>
                          {/* Mastercard Circles Logo */}
                          <div className="flex items-center -space-x-1.5">
                            <div className="w-4 h-4 rounded-full bg-[#eb001b]" />
                            <div className="w-4 h-4 rounded-full bg-[#f79e1b] opacity-80" />
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="z-10">
                          <div className="text-[10px] text-white/50">Card Number</div>
                          <div className="text-xs font-bold tracking-wider">•••• •••• 6782</div>
                          <div className="flex justify-between text-[9px] text-white/60 mt-1">
                            <span>EXP 09/29</span>
                            <span>CVV 611</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Vibrant Coral Orange */}
                      <div className="w-[120px] sm:w-[130px] h-[130px] rounded-2xl bg-gradient-to-br from-[#ff5d2a] to-[#ff4714] text-white p-3.5 flex flex-col justify-between flex-shrink-0 shadow-lg relative overflow-hidden">
                        <div className="flex items-center justify-between">
                          <Wifi className="w-3.5 h-3.5 text-white/90 rotate-90" />
                          <span className="text-[9px] font-bold bg-white text-[#ff5d2a] px-1.5 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        <div>
                          <div className="text-[9px] text-white/70">Card Number</div>
                          <div className="text-[11px] font-bold tracking-wider">•••• 4356</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* -------------------------------------------------------------
                    COLUMN 2 & 3 (Center & Right 8 cols): 2x2 Stats & Profit Chart
                -------------------------------------------------------------- */}
                <div className="lg:col-span-8 space-y-5 flex flex-col">
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    
                    {/* Center 2x2 Metric Cards (5 cols) */}
                    <div className="md:col-span-5 grid grid-cols-2 gap-3.5">
                      
                      {/* Metric 1: Total Earnings (Solid Vibrant Orange Card!) */}
                      <div className="rounded-[26px] bg-gradient-to-br from-[#ff5d2a] to-[#ff440f] text-white p-4 sm:p-5 flex flex-col justify-between shadow-md shadow-[#ff5d2a]/20">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white/90">Total Earnings</span>
                          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                            <Wallet className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                        <div className="my-2">
                          <span className="text-2xl sm:text-3xl font-black font-display">$950</span>
                        </div>
                        <div className="text-[10px] font-bold text-white/90 flex items-center gap-1">
                          <span>↑ 7%</span>
                          <span className="font-normal text-white/75">This month</span>
                        </div>
                      </div>

                      {/* Metric 2: Total Spending (White Card) */}
                      <div
                        className={`rounded-[26px] p-4 sm:p-5 flex flex-col justify-between border ${
                          isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-500">Total Spending</span>
                          <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                            <Lock className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                          </div>
                        </div>
                        <div className="my-2">
                          <span className="text-2xl sm:text-3xl font-black font-display">$700</span>
                        </div>
                        <div className="text-[10px] font-bold text-[#ef4444] flex items-center gap-1">
                          <span>↓ 5%</span>
                          <span className="font-normal text-gray-400">This month</span>
                        </div>
                      </div>

                      {/* Metric 3: Total Income (White Card) */}
                      <div
                        className={`rounded-[26px] p-4 sm:p-5 flex flex-col justify-between border ${
                          isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-500">Total Income</span>
                          <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                            <Coins className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                          </div>
                        </div>
                        <div className="my-2">
                          <span className="text-2xl sm:text-3xl font-black font-display">$1,050</span>
                        </div>
                        <div className="text-[10px] font-bold text-[#10b981] flex items-center gap-1">
                          <span>↑ 8%</span>
                          <span className="font-normal text-gray-400">This month</span>
                        </div>
                      </div>

                      {/* Metric 4: Total Revenue (White Card) */}
                      <div
                        className={`rounded-[26px] p-4 sm:p-5 flex flex-col justify-between border ${
                          isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-500">Total Revenue</span>
                          <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                            <CircleDollarSign className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                          </div>
                        </div>
                        <div className="my-2">
                          <span className="text-2xl sm:text-3xl font-black font-display">$850</span>
                        </div>
                        <div className="text-[10px] font-bold text-[#10b981] flex items-center gap-1">
                          <span>↑ 4%</span>
                          <span className="font-normal text-gray-400">This month</span>
                        </div>
                      </div>

                    </div>

                    {/* Right Profit & Loss Chart Card (7 cols) */}
                    <div
                      className={`md:col-span-7 p-6 rounded-[28px] border flex flex-col justify-between ${
                        isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-bold">Total Income</h3>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              View your income in a certain period of time
                            </p>
                          </div>
                        </div>

                        {/* Subheader & Legend */}
                        <div className="flex items-center justify-between mt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                          <span className="text-xs font-bold text-gray-500">Profit and Loss</span>
                          <div className="flex items-center gap-3 text-[10px] font-semibold">
                            <div className="flex items-center gap-1">
                              <span className="w-2.5 h-2.5 rounded-xs bg-[#ff5d2a]" />
                              <span className="text-gray-500">Profit</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2.5 h-2.5 rounded-xs bg-[#18181b] dark:bg-white" />
                              <span className="text-gray-500">Loss</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* SVG Bar Chart with Patterned Orange & Matte Black Base */}
                      <div className="mt-4 relative h-[180px] w-full flex items-end justify-between px-2 pt-4">
                        
                        {/* Dotted Grid Horizontal Lines */}
                        <div className="absolute inset-x-0 top-2 border-b border-dashed border-gray-200 dark:border-gray-800" />
                        <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-gray-200 dark:border-gray-800" />
                        <div className="absolute inset-x-0 bottom-6 border-b border-gray-200 dark:border-gray-800" />

                        {/* Y-Axis scale numbers on left */}
                        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[9px] text-gray-400 font-mono pointer-events-none">
                          <span>50k</span>
                          <span>40k</span>
                          <span>30k</span>
                          <span>20k</span>
                          <span>10k</span>
                          <span>00</span>
                        </div>

                        {/* Bars for Each Month */}
                        <div className="flex-1 ml-6 flex items-end justify-between h-full pb-6">
                          {CHART_DATA.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center gap-1 group cursor-pointer"
                              onClick={() =>
                                showToast(`${item.month}: Profit $${item.profit}k, Loss $${item.loss}k`)
                              }
                            >
                              {/* Stacked Bar */}
                              <div className="w-5 sm:w-6 h-[130px] flex flex-col justify-end gap-1">
                                
                                {/* Top Profit Bar (Patterned Orange) */}
                                {item.profit > 0 && (
                                  <div
                                    className="w-full rounded-md transition-all duration-300 group-hover:brightness-110"
                                    style={{
                                      height: `${item.profit * 1.5}px`,
                                      backgroundImage:
                                        'repeating-linear-gradient(45deg, #ff5d2a, #ff5d2a 2px, #ff7e54 2px, #ff7e54 4px)',
                                    }}
                                    title={`Profit: $${item.profit}k`}
                                  />
                                )}

                                {/* Bottom Loss Bar (Matte Black) */}
                                {item.loss > 0 && (
                                  <div
                                    className={`w-full rounded-md transition-all duration-300 group-hover:opacity-80 ${
                                      isDarkMode ? 'bg-white' : 'bg-[#18181b]'
                                    }`}
                                    style={{ height: `${item.loss * 1.5}px` }}
                                    title={`Loss: $${item.loss}k`}
                                  />
                                )}
                              </div>

                              {/* Month Label */}
                              <span className="text-[10px] text-gray-400 font-semibold group-hover:text-[#ff5d2a]">
                                {item.month}
                              </span>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* -------------------------------------------------------------
                      RECENT ACTIVITIES TABLE (Wide span under 2x2 & Chart)
                  -------------------------------------------------------------- */}
                  <div
                    className={`p-6 rounded-[28px] border transition-colors ${
                      isDarkMode ? 'bg-[#20202a] border-[#2e2e3c]' : 'bg-white border-[#e8e7ef] shadow-xs'
                    }`}
                  >
                    {/* Table Header Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <h3 className="text-sm font-bold">Recent Activities</h3>

                      <div className="flex items-center gap-2">
                        {/* Search Input Box */}
                        <div className="relative">
                          <input
                            type="text"
                            value={tableSearch}
                            onChange={(e) => setTableSearch(e.target.value)}
                            placeholder="Search"
                            className={`w-36 sm:w-44 pl-8 pr-3 py-1.5 text-xs rounded-xl border outline-none transition-colors ${
                              isDarkMode
                                ? 'bg-[#181820] border-[#313140] text-white placeholder:text-gray-500 focus:border-[#ff5d2a]'
                                : 'bg-[#f4f4f8] border-[#e5e4ec] text-[#1a1a1f] placeholder:text-gray-400 focus:border-black'
                            }`}
                          />
                          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                        </div>

                        {/* Filter Button */}
                        <div className="relative">
                          <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border cursor-pointer ${
                              isDarkMode
                                ? 'bg-[#181820] border-[#313140] text-gray-300'
                                : 'bg-[#f4f4f8] border-[#e5e4ec] text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span>Filter</span>
                            <Filter className="w-3 h-3 text-gray-500" />
                          </button>

                          {showFilterDropdown && (
                            <div
                              className={`absolute right-0 mt-1 w-32 rounded-xl border p-1 z-30 shadow-xl ${
                                isDarkMode ? 'bg-[#20202a] border-[#313140]' : 'bg-white border-gray-200'
                              }`}
                            >
                              {(['All', 'Completed', 'Pending', 'In Progress'] as const).map((st) => (
                                <button
                                  key={st}
                                  onClick={() => {
                                    setStatusFilter(st);
                                    setShowFilterDropdown(false);
                                  }}
                                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg cursor-pointer ${
                                    statusFilter === st
                                      ? 'bg-[#ff5d2a] text-white font-bold'
                                      : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left border-collapse min-w-[620px]">
                        <thead>
                          <tr className="border-b border-gray-100 dark:border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                            <th className="py-2.5 px-2 w-8">
                              <input
                                type="checkbox"
                                checked={
                                  selectedTxIds.length === filteredTransactions.length &&
                                  filteredTransactions.length > 0
                                }
                                onChange={handleSelectAll}
                                className="w-3.5 h-3.5 rounded-sm accent-[#ff5d2a] cursor-pointer"
                              />
                            </th>
                            <th className="py-2.5 px-2">Order ID</th>
                            <th className="py-2.5 px-2">Activity</th>
                            <th className="py-2.5 px-2">Price</th>
                            <th className="py-2.5 px-2">Status</th>
                            <th className="py-2.5 px-2">Date</th>
                            <th className="py-2.5 px-2 text-right"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60 text-xs">
                          {filteredTransactions.map((tx) => {
                            const isSelected = selectedTxIds.includes(tx.id);
                            return (
                              <tr
                                key={tx.id}
                                className={`transition-colors hover:bg-gray-50/70 dark:hover:bg-white/5 ${
                                  isSelected ? 'bg-[#ff5d2a]/5 dark:bg-[#ff5d2a]/10' : ''
                                }`}
                              >
                                {/* Checkbox */}
                                <td className="py-3 px-2">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleSelectTx(tx.id)}
                                    className="w-3.5 h-3.5 rounded-sm accent-[#ff5d2a] cursor-pointer"
                                  />
                                </td>

                                {/* Order ID */}
                                <td className="py-3 px-2 font-mono font-semibold text-gray-500 dark:text-gray-400">
                                  {tx.orderId}
                                </td>

                                {/* Activity with Brand Icon */}
                                <td className="py-3 px-2">
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${tx.iconBg}`}
                                    >
                                      {tx.category === 'app' ? (
                                        <Smartphone className={`w-3.5 h-3.5 ${tx.iconColor}`} />
                                      ) : tx.category === 'hotel' ? (
                                        <Plane className={`w-3.5 h-3.5 ${tx.iconColor}`} />
                                      ) : tx.category === 'flight' ? (
                                        <Plane className={`w-3.5 h-3.5 ${tx.iconColor} rotate-45`} />
                                      ) : tx.category === 'grocery' ? (
                                        <Sparkles className={`w-3.5 h-3.5 ${tx.iconColor}`} />
                                      ) : (
                                        <LayersIcon className={`w-3.5 h-3.5 ${tx.iconColor}`} />
                                      )}
                                    </div>
                                    <span className="font-bold text-[#1a1a1f] dark:text-white">
                                      {tx.activity}
                                    </span>
                                  </div>
                                </td>

                                {/* Price */}
                                <td className="py-3 px-2 font-bold font-mono">
                                  ${tx.price.toLocaleString()}
                                </td>

                                {/* Status with Color Dot */}
                                <td className="py-3 px-2">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        tx.status === 'Completed'
                                          ? 'bg-[#10b981]'
                                          : tx.status === 'Pending'
                                          ? 'bg-[#ef4444]'
                                          : 'bg-[#f59e0b]'
                                      }`}
                                    />
                                    <span
                                      className={`font-semibold ${
                                        tx.status === 'Completed'
                                          ? 'text-[#10b981]'
                                          : tx.status === 'Pending'
                                          ? 'text-[#ef4444]'
                                          : 'text-[#f59e0b]'
                                      }`}
                                    >
                                      {tx.status}
                                    </span>
                                  </div>
                                </td>

                                {/* Date */}
                                <td className="py-3 px-2 text-gray-400 text-[11px] whitespace-nowrap">
                                  {tx.date}
                                </td>

                                {/* More Action Menu */}
                                <td className="py-3 px-2 text-right">
                                  <button
                                    onClick={() =>
                                      showToast(`Action menu for ${tx.orderId} (${tx.activity})`)
                                    }
                                    className="p-1 rounded-md text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* =========================================================================
          MODALS: TRANSFER, REQUEST & ADD CARD
      ========================================================================== */}
      
      {/* Transfer Modal */}
      {isTransferOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl space-y-4 ${
              isDarkMode ? 'bg-[#1a1a22] border-[#2e2e3c] text-white' : 'bg-white border-gray-200 text-[#1a1a1f]'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold">Transfer Funds</h3>
              <button
                onClick={() => setIsTransferOpen(false)}
                className="text-gray-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Recipient Account or IBAN</label>
                <input
                  type="text"
                  placeholder="e.g. US93 0000 8392 1192"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border outline-none ${
                    isDarkMode ? 'bg-[#121218] border-[#313140]' : 'bg-[#f4f4f8] border-[#e5e4ec]'
                  }`}
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Transfer Amount ({currency})</label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border outline-none font-mono text-sm font-bold ${
                    isDarkMode ? 'bg-[#121218] border-[#313140]' : 'bg-[#f4f4f8] border-[#e5e4ec]'
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setIsTransferOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast(`Successfully transferred ${currencySymbols[currency]}${transferAmount} to ${transferRecipient || 'Account'}`);
                  setIsTransferOpen(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#ff5d2a] text-white hover:bg-[#e64c1b] transition-colors"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {isRequestOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl space-y-4 ${
              isDarkMode ? 'bg-[#1a1a22] border-[#2e2e3c] text-white' : 'bg-white border-gray-200 text-[#1a1a1f]'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold">Request Payment</h3>
              <button
                onClick={() => setIsRequestOpen(false)}
                className="text-gray-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Client Email or Identifier</label>
                <input
                  type="email"
                  placeholder="client@luxurywatches.com"
                  className={`w-full p-2.5 rounded-xl border outline-none ${
                    isDarkMode ? 'bg-[#121218] border-[#313140]' : 'bg-[#f4f4f8] border-[#e5e4ec]'
                  }`}
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Requested Amount ($)</label>
                <input
                  type="number"
                  placeholder="5000"
                  className={`w-full p-2.5 rounded-xl border outline-none font-mono text-sm font-bold ${
                    isDarkMode ? 'bg-[#121218] border-[#313140]' : 'bg-[#f4f4f8] border-[#e5e4ec]'
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setIsRequestOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Payment request link generated and sent to client!');
                  setIsRequestOpen(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#18181b] text-white hover:bg-black transition-colors"
              >
                Send Request Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {isAddCardOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl space-y-4 ${
              isDarkMode ? 'bg-[#1a1a22] border-[#2e2e3c] text-white' : 'bg-white border-gray-200 text-[#1a1a1f]'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold">Add New Corporate Card</h3>
              <button
                onClick={() => setIsAddCardOpen(false)}
                className="text-gray-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Sajibur Rahman"
                  className={`w-full p-2.5 rounded-xl border outline-none ${
                    isDarkMode ? 'bg-[#121218] border-[#313140]' : 'bg-[#f4f4f8] border-[#e5e4ec]'
                  }`}
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8821"
                  className={`w-full p-2.5 rounded-xl border outline-none font-mono ${
                    isDarkMode ? 'bg-[#121218] border-[#313140]' : 'bg-[#f4f4f8] border-[#e5e4ec]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="08/29"
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      isDarkMode ? 'bg-[#121218] border-[#313140]' : 'bg-[#f4f4f8] border-[#e5e4ec]'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      isDarkMode ? 'bg-[#121218] border-[#313140]' : 'bg-[#f4f4f8] border-[#e5e4ec]'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setIsAddCardOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('New card authorized and added to Finexy wallet!');
                  setIsAddCardOpen(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#ff5d2a] text-white hover:bg-[#e64c1b] transition-colors"
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
