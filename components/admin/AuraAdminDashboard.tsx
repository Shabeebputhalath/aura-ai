'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Film,
  Layers,
  SlidersHorizontal,
  MessageSquare,
  Phone,
  Image as ImageIcon,
  Star,
  Users,
  FileText,
  Bell,
  Settings,
  LogOut,
  ExternalLink,
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Command,
  Download,
  Plus,
  TrendingUp,
} from 'lucide-react';

import AdminAuthModal from './AdminAuthModal';
import DashboardOverview from './sections/DashboardOverview';
import ProjectsCMS from './sections/ProjectsCMS';
import ServicesCMS from './sections/ServicesCMS';
import PricingCMS from './sections/PricingCMS';
import MessagesCMS from './sections/MessagesCMS';
import WhatsAppCMS from './sections/WhatsAppCMS';
import MediaLibraryCMS from './sections/MediaLibraryCMS';
import TestimonialsCMS from './sections/TestimonialsCMS';
import TeamCMS from './sections/TeamCMS';
import ArticlesCMS from './sections/ArticlesCMS';
import NotificationsCMS from './sections/NotificationsCMS';
import SettingsCMS from './sections/SettingsCMS';

import {
  AdminProject,
  AdminService,
  AdminPricingPlan,
  AdminMessage,
  AdminWhatsAppConfig,
  AdminMediaAsset,
  AdminTestimonial,
  AdminTeamMember,
  AdminArticle,
  AdminNotification,
  AdminStudioSettings,
  AdminUser,
} from './types';

import {
  initialMockProjects,
  initialMockServices,
  initialMockPricingPlans,
  initialMockMessages,
  initialMockWhatsAppConfig,
  initialMockMediaAssets,
  initialMockTestimonials,
  initialMockTeam,
  initialMockArticles,
  initialMockNotifications,
  initialMockStudioSettings,
  initialMockAdminUser,
} from './mockData';

// -------------------------------------------------------------
// HELPER: Studio Menu Glyph Icon (3 stylized bars matching uploaded image)
// -------------------------------------------------------------
function StudioMenuGlyph({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M4.5 7.5h15M6.5 12h11M4.5 16.5h15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface AuraAdminDashboardProps {
  initialTab?: string;
}

export default function AuraAdminDashboard({ initialTab = 'Dashboard' }: AuraAdminDashboardProps) {
  // -------------------------------------------------------------
  // AUTHENTICATION BARRIER STATE
  // -------------------------------------------------------------
  const isHydrated = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return Boolean(localStorage.getItem('aura_admin_auth_token'));
    }
    return false;
  });
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aura_admin_email') || 'admin@aura-ai.studio';
    }
    return 'admin@aura-ai.studio';
  });

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aura_admin_auth_token');
    }
    setIsAuthenticated(false);
  };

  // -------------------------------------------------------------
  // NAVIGATION & UI STATE
  // -------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [selectedDirectMessage, setSelectedDirectMessage] = useState<AdminMessage | null>(null);

  const showToast = (_msg?: string) => {
    // Toast notification removed per user request
  };

  // -------------------------------------------------------------
  // DATA STORAGE STATES (LOCALSTORAGE BACKED)
  // -------------------------------------------------------------
  const [projects, setProjects] = useState<AdminProject[]>(() => {
    if (typeof window === 'undefined') return initialMockProjects;
    try {
      const saved = localStorage.getItem('aura_admin_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockProjects;
  });

  const [services, setServices] = useState<AdminService[]>(() => {
    if (typeof window === 'undefined') return initialMockServices;
    try {
      const saved = localStorage.getItem('aura_admin_services');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockServices;
  });

  const [pricingPlans, setPricingPlans] = useState<AdminPricingPlan[]>(() => {
    if (typeof window === 'undefined') return initialMockPricingPlans;
    try {
      const saved = localStorage.getItem('aura_admin_pricing_plans');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockPricingPlans;
  });

  const [messages, setMessages] = useState<AdminMessage[]>(() => {
    if (typeof window === 'undefined') return initialMockMessages;
    try {
      const saved = localStorage.getItem('aura_admin_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockMessages;
  });

  const [whatsappConfig, setWhatsappConfig] = useState<AdminWhatsAppConfig>(() => {
    if (typeof window === 'undefined') return initialMockWhatsAppConfig;
    try {
      const saved = localStorage.getItem('aura_admin_whatsapp');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockWhatsAppConfig;
  });

  const [mediaAssets, setMediaAssets] = useState<AdminMediaAsset[]>(() => {
    if (typeof window === 'undefined') return initialMockMediaAssets;
    try {
      const saved = localStorage.getItem('aura_admin_media');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockMediaAssets;
  });

  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>(() => {
    if (typeof window === 'undefined') return initialMockTestimonials;
    try {
      const saved = localStorage.getItem('aura_admin_testimonials');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockTestimonials;
  });

  const [team, setTeam] = useState<AdminTeamMember[]>(() => {
    if (typeof window === 'undefined') return initialMockTeam;
    try {
      const saved = localStorage.getItem('aura_admin_team');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockTeam;
  });

  const [articles, setArticles] = useState<AdminArticle[]>(() => {
    if (typeof window === 'undefined') return initialMockArticles;
    try {
      const saved = localStorage.getItem('aura_admin_articles');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockArticles;
  });

  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    if (typeof window === 'undefined') return initialMockNotifications;
    try {
      const saved = localStorage.getItem('aura_admin_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockNotifications;
  });

  const [studioSettings, setStudioSettings] = useState<AdminStudioSettings>(() => {
    if (typeof window === 'undefined') return initialMockStudioSettings;
    try {
      const saved = localStorage.getItem('aura_admin_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialMockStudioSettings;
  });

  // Save states to LocalStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_projects', JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_services', JSON.stringify(services));
    }
  }, [services]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_pricing_plans', JSON.stringify(pricingPlans));
      // Trigger update for public pricing component
      window.dispatchEvent(new Event('aura_pricing_updated'));
    }
  }, [pricingPlans]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_whatsapp', JSON.stringify(whatsappConfig));
    }
  }, [whatsappConfig]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_media', JSON.stringify(mediaAssets));
    }
  }, [mediaAssets]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_testimonials', JSON.stringify(testimonials));
    }
  }, [testimonials]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_team', JSON.stringify(team));
    }
  }, [team]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_articles', JSON.stringify(articles));
    }
  }, [articles]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_admin_settings', JSON.stringify(studioSettings));
    }
  }, [studioSettings]);

  // -------------------------------------------------------------
  // GLOBAL SEARCH & COMMAND PALETTE
  // -------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // -------------------------------------------------------------
  // ACTION HANDLERS
  // -------------------------------------------------------------
  // Projects
  const handleSaveProject = (project: AdminProject) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === project.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = project;
        return next;
      }
      return [project, ...prev];
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleProjectPublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
      )
    );
    showToast('Project status updated');
  };

  const handleToggleProjectFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    showToast('Project featured state updated');
  };

  const handleDuplicateProject = (project: AdminProject) => {
    const duplicated: AdminProject = {
      ...project,
      id: 'proj-' + Date.now(),
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy`,
      status: 'draft',
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setProjects((prev) => [duplicated, ...prev]);
    showToast('Duplicated project created as draft');
  };

  // Services
  const handleSaveService = (service: AdminService) => {
    setServices((prev) => {
      const idx = prev.findIndex((s) => s.id === service.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = service;
        return next;
      }
      return [...prev, service];
    });
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service removed');
  };

  const handleToggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
    showToast('Service availability updated');
  };

  const handleDuplicateService = (service: AdminService) => {
    const dup: AdminService = {
      ...service,
      id: 'serv-' + Date.now(),
      name: `${service.name} (Copy)`,
      displayOrder: services.length + 1,
    };
    setServices((prev) => [...prev, dup]);
    showToast('Service duplicated');
  };

  // Pricing Plans
  const handleSavePlan = (plan: AdminPricingPlan) => {
    setPricingPlans((prev) => {
      const idx = prev.findIndex((p) => p.id === plan.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = plan;
        return next;
      }
      return [...prev, plan];
    });
  };

  const handleDeletePlan = (id: string) => {
    setPricingPlans((prev) => prev.filter((p) => p.id !== id));
    showToast('Pricing plan deleted');
  };

  const handleTogglePlanActive = (id: string) => {
    setPricingPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    showToast('Pricing plan visibility updated');
  };

  const handleTogglePlanFeatured = (id: string) => {
    setPricingPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    showToast('Featured plan updated');
  };

  const handleDuplicatePlan = (plan: AdminPricingPlan) => {
    const dup: AdminPricingPlan = {
      ...plan,
      id: 'tier-' + Date.now(),
      name: `${plan.name} (Copy)`,
      displayOrder: pricingPlans.length + 1,
    };
    setPricingPlans((prev) => [...prev, dup]);
    showToast('Pricing tier duplicated');
  };

  // Messages
  const handleUpdateMessageStatus = (id: string, status: AdminMessage['status']) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const handleAddMessageReply = (id: string, replyText: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const newReply = {
          id: 'rep-' + Date.now(),
          sender: 'admin' as const,
          message: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return {
          ...m,
          status: 'replied' as const,
          replies: [...(m.replies || []), newReply],
        };
      })
    );
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedDirectMessage?.id === id) {
      setSelectedDirectMessage(null);
    }
  };

  // Notifications
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Export / Backup Full Snapshot
  const handleExportFullSnapshot = () => {
    const fullSnapshot = {
      exportedAt: new Date().toISOString(),
      studioSettings,
      projects,
      services,
      pricingPlans,
      messages,
      whatsappConfig,
      mediaAssets,
      testimonials,
      team,
      articles,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullSnapshot, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `aura_ai_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    showToast('Full CMS backup snapshot downloaded');
  };

  const handleResetFullData = () => {
    setProjects(initialMockProjects);
    setServices(initialMockServices);
    setPricingPlans(initialMockPricingPlans);
    setMessages(initialMockMessages);
    setWhatsappConfig(initialMockWhatsAppConfig);
    setMediaAssets(initialMockMediaAssets);
    setTestimonials(initialMockTestimonials);
    setTeam(initialMockTeam);
    setArticles(initialMockArticles);
    setNotifications(initialMockNotifications);
    setStudioSettings(initialMockStudioSettings);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aura_admin_projects');
      localStorage.removeItem('aura_admin_services');
      localStorage.removeItem('aura_admin_pricing_plans');
      localStorage.removeItem('aura_admin_messages');
      localStorage.removeItem('aura_admin_whatsapp');
      localStorage.removeItem('aura_admin_media');
      localStorage.removeItem('aura_admin_testimonials');
      localStorage.removeItem('aura_admin_team');
      localStorage.removeItem('aura_admin_articles');
      localStorage.removeItem('aura_admin_notifications');
      localStorage.removeItem('aura_admin_settings');
    }
  };

  // -------------------------------------------------------------
  // NAVIGATION MENU ITEMS
  // -------------------------------------------------------------
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'Projects', label: 'Commercial Projects', icon: Film, badge: projects.length },
    { id: 'Services', label: 'Services & Capabilities', icon: Layers, badge: services.length },
    { id: 'Pricing', label: 'Website Pricing Rates', icon: SlidersHorizontal, badge: pricingPlans.length },
    {
      id: 'Messages',
      label: 'Client Inquiries',
      icon: MessageSquare,
      badge: messages.filter((m) => m.status === 'new').length || null,
      badgeHighlight: true,
    },
    { id: 'WhatsApp', label: 'WhatsApp Integration', icon: Phone, badge: 'Live' },
    { id: 'Media', label: 'Media & 4K Renders', icon: ImageIcon, badge: mediaAssets.length },
    { id: 'Testimonials', label: 'Client Reviews', icon: Star, badge: testimonials.length },
    { id: 'Team', label: 'Studio Team', icon: Users, badge: team.length },
    { id: 'Articles', label: 'Insights & Journal', icon: FileText, badge: articles.length },
    {
      id: 'Notifications',
      label: 'Studio Alerts',
      icon: Bell,
      badge: notifications.filter((n) => !n.isRead).length || null,
      badgeHighlight: true,
    },
    { id: 'Settings', label: 'Settings & Security', icon: Settings, badge: null },
  ];

  // If still checking auth or not authenticated
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#090a0d] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#b15f2c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminAuthModal
        onAuthenticated={(email) => {
          setAdminEmail(email);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  const unreadAlertsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#f1f3f7] text-[#1e2025] flex font-sans antialiased selection:bg-[#b15f2c] selection:text-white">
      {/* -------------------------------------------------------------
          1. MOBILE MENU DRAWER (OPENS ON CLICK - SHOWS ICONS + NAMES)
      -------------------------------------------------------------- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[80vw] bg-[#0c0d12] text-white h-full shadow-2xl flex flex-col justify-between p-5 z-50 overflow-y-auto border-r border-white/10">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#faefe0] text-[#181a20] flex items-center justify-center shadow-xs">
                    <StudioMenuGlyph className="w-5 h-5 text-[#181a20]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">AURA AI</h2>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wider">STUDIO CMS</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items with Names */}
              <nav className="space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">
                  Menu Sections
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                        showToast(`Opened ${item.label}`);
                      }}
                      className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#181c24] text-white shadow-xs ring-1 ring-white/10'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-[#faeedd] text-[#854d0e]'
                              : 'bg-[#faeedd] text-[#854d0e]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Logout */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          3. EXPANDABLE DESKTOP SIDEBAR (EXPANDS ON CLICK OF CREAM ICON)
      -------------------------------------------------------------- */}
      <aside
        className={`hidden lg:flex sticky top-0 left-0 z-40 h-screen bg-[#0c0d12] text-white border-r border-[#1e2029] flex-col justify-between py-6 transition-all duration-300 ${
          isSidebarExpanded ? 'w-64 px-4' : 'w-20 px-3 items-center'
        }`}
      >
        {/* Top Header: Cream Icon Toggle Button */}
        <div className="flex flex-col gap-6 w-full">
          <div className={`flex items-center ${isSidebarExpanded ? 'justify-start gap-3' : 'justify-center'} w-full`}>
            <button
              onClick={() => {
                const next = !isSidebarExpanded;
                setIsSidebarExpanded(next);
                showToast(next ? 'Expanded sidebar with icon names' : 'Collapsed sidebar');
              }}
              className="w-11 h-11 rounded-2xl bg-[#faefe0] text-[#181a20] flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer group"
              title={isSidebarExpanded ? 'Collapse Menu' : 'Expand Menu (Show Icon Names)'}
            >
              <StudioMenuGlyph className="w-5 h-5 text-[#181a20] group-hover:scale-105 transition-transform" />
            </button>

            {isSidebarExpanded && (
              <div
                onClick={() => {
                  setActiveTab('Dashboard');
                  showToast('Opened Dashboard');
                }}
                className="cursor-pointer min-w-0"
              >
                <h2 className="text-sm font-bold text-white tracking-tight truncate">AURA AI</h2>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider">STUDIO CMS</p>
              </div>
            )}
          </div>

          {/* Navigation Items Column */}
          <nav className="flex flex-col gap-1.5 w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    showToast(`Active: ${item.label}`);
                  }}
                  className={`rounded-2xl transition-all cursor-pointer relative group flex items-center ${
                    isSidebarExpanded
                      ? `w-full px-3.5 py-2.5 justify-between ${
                          isActive
                            ? 'bg-[#181c24] text-white font-bold shadow-xs ring-1 ring-white/10'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`
                      : `w-12 h-12 justify-center mx-auto ${
                          isActive
                            ? 'bg-[#181c24] text-white font-bold shadow-xs ring-1 ring-white/10'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-white'}`} />
                    {isSidebarExpanded && (
                      <span className="text-xs font-semibold truncate tracking-tight">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {/* Badge */}
                  {item.badge !== null && isSidebarExpanded && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 bg-[#faeedd] text-[#854d0e]"
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Indicator Dot in collapsed mode */}
                  {!isSidebarExpanded && isActive && (
                    <span className="absolute right-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                  {!isSidebarExpanded && item.badge !== null && !isActive && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
                  )}

                  {/* Tooltip on Hover in Collapsed Mode */}
                  {!isSidebarExpanded && (
                    <div className="absolute left-16 px-3 py-1.5 bg-[#181c24] border border-white/10 text-white text-xs font-medium rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge !== null && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#faeedd] text-[#854d0e] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sign Out */}
        <div className="flex flex-col w-full pt-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`rounded-2xl transition-colors cursor-pointer group flex items-center ${
              isSidebarExpanded
                ? 'w-full px-3.5 py-2.5 gap-3 text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10'
                : 'w-12 h-12 justify-center mx-auto text-slate-400 hover:text-red-400 hover:bg-red-500/10'
            }`}
            title="Sign Out"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarExpanded && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------------------
          4. MAIN CANVAS CONTAINER (ROUNDED PANEL)
      -------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 p-3 sm:p-4 lg:p-5">
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-sm p-5 sm:p-7 lg:p-9 flex-1 flex flex-col justify-start min-h-[calc(100vh-32px)] border border-slate-200/80 overflow-y-auto">
          {/* Top Header inside Canvas */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              {/* Mobile-Only Menu Button using the Cream Icon */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 rounded-xl bg-[#faefe0] text-[#181a20] flex items-center justify-center shadow-xs lg:hidden cursor-pointer shrink-0 hover:scale-105 transition-transform"
                title="Open Navigation Menu"
              >
                <StudioMenuGlyph className="w-4 h-4 text-[#181a20]" />
              </button>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {activeTab === 'Dashboard' ? 'Overview' : activeTab}
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  {navItems.find((n) => n.id === activeTab)?.label || activeTab}
                </p>
              </div>
            </div>

            {/* Top Right Header Controls: Search, Bell, Profile Pill */}
            <div className="flex items-center gap-3">
              {/* Search Circle Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
                title="Search (⌘K)"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Notification Bell Circle Button */}
              <button
                onClick={() => {
                  setActiveTab('Notifications');
                  showToast('Opened Studio Alerts');
                }}
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </button>

              {/* User Profile Pill Container (Zoia M.) */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3.5 py-1.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer shadow-2xs"
                >
                  {/* Portrait Avatar */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-white"
                  />
                  <span className="text-xs font-bold text-slate-900">Zoia M.</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-50 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">Zoia M.</p>
                      <p className="text-[10px] text-slate-500 truncate">{adminEmail}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('Settings');
                        setIsUserMenuOpen(false);
                        showToast('Opened Studio Settings');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-500" />
                      <span>Studio Settings</span>
                    </button>
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span>Live Website</span>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Body Section Content */}
          <div className="flex-1">
            {activeTab === 'Dashboard' && (
              <DashboardOverview
                projects={projects}
                services={services}
                pricingPlans={pricingPlans}
                messages={messages}
                whatsappConfig={whatsappConfig}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenNewProject={() => setActiveTab('Projects')}
                onSelectMessage={(msg) => {
                  setSelectedDirectMessage(msg);
                  setActiveTab('Messages');
                }}
              />
            )}

          {activeTab === 'Projects' && (
            <ProjectsCMS
              projects={projects}
              onSaveProject={handleSaveProject}
              onDeleteProject={handleDeleteProject}
              onTogglePublish={handleToggleProjectPublish}
              onToggleFeatured={handleToggleProjectFeatured}
              onDuplicateProject={handleDuplicateProject}
              showToast={showToast}
            />
          )}

          {activeTab === 'Services' && (
            <ServicesCMS
              services={services}
              onSaveService={handleSaveService}
              onDeleteService={handleDeleteService}
              onToggleActive={handleToggleServiceActive}
              onDuplicateService={handleDuplicateService}
              showToast={showToast}
            />
          )}

          {activeTab === 'Pricing' && (
            <PricingCMS
              pricingPlans={pricingPlans}
              onSavePlan={handleSavePlan}
              onDeletePlan={handleDeletePlan}
              onToggleActive={handleTogglePlanActive}
              onToggleFeatured={handleTogglePlanFeatured}
              onDuplicatePlan={handleDuplicatePlan}
              showToast={showToast}
            />
          )}

          {activeTab === 'Messages' && (
            <MessagesCMS
              messages={messages}
              onUpdateStatus={handleUpdateMessageStatus}
              onAddReply={handleAddMessageReply}
              onDeleteMessage={handleDeleteMessage}
              showToast={showToast}
              selectedMessageDirect={selectedDirectMessage}
              onClearSelectedDirect={() => setSelectedDirectMessage(null)}
            />
          )}

          {activeTab === 'WhatsApp' && (
            <WhatsAppCMS
              config={whatsappConfig}
              onSaveConfig={(updated) => setWhatsappConfig(updated)}
              showToast={showToast}
            />
          )}

          {activeTab === 'Media' && (
            <MediaLibraryCMS
              mediaAssets={mediaAssets}
              onAddMediaAsset={(asset) => setMediaAssets([asset, ...mediaAssets])}
              onDeleteMediaAsset={(id) => {
                setMediaAssets((prev) => prev.filter((m) => m.id !== id));
                showToast('Media asset removed');
              }}
              showToast={showToast}
            />
          )}

          {activeTab === 'Testimonials' && (
            <TestimonialsCMS
              testimonials={testimonials}
              onSaveTestimonial={(item) => {
                setTestimonials((prev) => {
                  const idx = prev.findIndex((t) => t.id === item.id);
                  if (idx >= 0) {
                    const next = [...prev];
                    next[idx] = item;
                    return next;
                  }
                  return [...prev, item];
                });
              }}
              onDeleteTestimonial={(id) => {
                setTestimonials((prev) => prev.filter((t) => t.id !== id));
                showToast('Testimonial deleted');
              }}
              onToggleActive={(id) => {
                setTestimonials((prev) =>
                  prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
                );
                showToast('Testimonial status updated');
              }}
              showToast={showToast}
            />
          )}

          {activeTab === 'Team' && (
            <TeamCMS
              team={team}
              onSaveMember={(member) => {
                setTeam((prev) => {
                  const idx = prev.findIndex((t) => t.id === member.id);
                  if (idx >= 0) {
                    const next = [...prev];
                    next[idx] = member;
                    return next;
                  }
                  return [...prev, member];
                });
              }}
              onDeleteMember={(id) => {
                setTeam((prev) => prev.filter((t) => t.id !== id));
                showToast('Team member removed');
              }}
              onToggleActive={(id) => {
                setTeam((prev) =>
                  prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
                );
                showToast('Team member visibility updated');
              }}
              showToast={showToast}
            />
          )}

          {activeTab === 'Articles' && (
            <ArticlesCMS
              articles={articles}
              onSaveArticle={(art) => {
                setArticles((prev) => {
                  const idx = prev.findIndex((a) => a.id === art.id);
                  if (idx >= 0) {
                    const next = [...prev];
                    next[idx] = art;
                    return next;
                  }
                  return [art, ...prev];
                });
              }}
              onDeleteArticle={(id) => {
                setArticles((prev) => prev.filter((a) => a.id !== id));
                showToast('Article deleted');
              }}
              onToggleStatus={(id) => {
                setArticles((prev) =>
                  prev.map((a) =>
                    a.id === id
                      ? { ...a, status: a.status === 'published' ? 'draft' : 'published' }
                      : a
                  )
                );
                showToast('Article status toggled');
              }}
              showToast={showToast}
            />
          )}

          {activeTab === 'Notifications' && (
            <NotificationsCMS
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationRead}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
              onDeleteNotification={handleDeleteNotification}
              onNavigateTab={(tab) => setActiveTab(tab)}
              showToast={showToast}
            />
          )}

          {activeTab === 'Settings' && (
            <SettingsCMS
              settings={studioSettings}
              onSaveSettings={(updated) => setStudioSettings(updated)}
              onExportAllData={handleExportFullSnapshot}
              onResetAllData={handleResetFullData}
              showToast={showToast}
            />
          )}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          4. COMMAND PALETTE MODAL (CMD+K)
      -------------------------------------------------------------- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a section name, project title, or command..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-2 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-500 border border-slate-200 rounded hover:bg-slate-200 cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              {navItems
                .filter((item) =>
                  item.label.toLowerCase().includes(globalSearch.toLowerCase())
                )
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSearchOpen(false);
                        setGlobalSearch('');
                        showToast(`Navigated to ${item.label}`);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 text-left text-xs text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#b15f2c]" />
                        <span className="font-medium">Navigate to {item.label}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
