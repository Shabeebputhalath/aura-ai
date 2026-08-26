'use client';

import React from 'react';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Trash2,
  ExternalLink,
  Phone,
  MessageSquare,
  Server,
  Layers,
} from 'lucide-react';
import { AdminNotification } from '../types';

interface NotificationsCMSProps {
  notifications: AdminNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  showToast: (msg: string) => void;
}

export default function NotificationsCMS({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onNavigateTab,
  showToast,
}: NotificationsCMSProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Studio Alerts & Production Activity Logs
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-bold">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time feed of client commercial inquiries, WhatsApp triggers, CDN render completions, and rate card modifications.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={() => {
              onMarkAllAsRead();
              showToast('All alerts marked as read');
            }}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl transition-all cursor-pointer shrink-0"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              No alerts currently recorded.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 sm:p-5 transition-colors flex items-start justify-between gap-4 ${
                  !n.isRead ? 'bg-amber-50/40' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Icon Badge */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      n.type === 'inquiry'
                        ? 'bg-amber-50 text-[#b15f2c] border-amber-200'
                        : n.type === 'whatsapp'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : n.type === 'system'
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {n.type === 'inquiry' ? (
                      <MessageSquare className="w-4 h-4" />
                    ) : n.type === 'whatsapp' ? (
                      <Phone className="w-4 h-4" />
                    ) : n.type === 'system' ? (
                      <Server className="w-4 h-4" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                  </div>

                  {/* Body */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">{n.title}</h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#b15f2c]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.description}</p>
                    <span className="text-[10px] text-slate-400 font-mono block pt-0.5">
                      {n.timestamp}
                    </span>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {n.linkTab && (
                    <button
                      onClick={() => onNavigateTab(n.linkTab!)}
                      className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  )}
                  {!n.isRead && (
                    <button
                      onClick={() => onMarkAsRead(n.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                      title="Mark as Read"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteNotification(n.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                    title="Delete Alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
