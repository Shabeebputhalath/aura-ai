'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  Archive,
  Trash2,
  Send,
  Download,
  Eye,
  Reply,
  CheckCheck,
  Building,
  DollarSign,
  X,
} from 'lucide-react';
import { AdminMessage } from '../types';

interface MessagesCMSProps {
  messages: AdminMessage[];
  onUpdateStatus: (messageId: string, status: AdminMessage['status']) => void;
  onAddReply: (messageId: string, replyText: string) => void;
  onDeleteMessage: (messageId: string) => void;
  showToast: (msg: string) => void;
  selectedMessageDirect?: AdminMessage | null;
  onClearSelectedDirect?: () => void;
}

export default function MessagesCMS({
  messages,
  onUpdateStatus,
  onAddReply,
  onDeleteMessage,
  showToast,
  selectedMessageDirect,
  onClearSelectedDirect,
}: MessagesCMSProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [activeMessageId, setActiveMessageId] = useState<string | null>(
    selectedMessageDirect ? selectedMessageDirect.id : null
  );
  const [replyInput, setReplyInput] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Update active message when prop changes
  const prevDirectIdRef = React.useRef(selectedMessageDirect?.id);
  React.useEffect(() => {
    if (selectedMessageDirect && selectedMessageDirect.id !== prevDirectIdRef.current) {
      prevDirectIdRef.current = selectedMessageDirect.id;
      // Using queueMicrotask or timer to avoid synchronous cascading render in effect
      const t = setTimeout(() => {
        setActiveMessageId(selectedMessageDirect.id);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [selectedMessageDirect]);

  const selectedMessage = messages.find((m) => m.id === activeMessageId) || null;
  const setSelectedMessage = (msg: AdminMessage | null) => {
    setActiveMessageId(msg ? msg.id : null);
  };

  // Filtering
  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.company && m.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredMessages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMessages.map((m) => m.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkStatus = (status: AdminMessage['status']) => {
    selectedIds.forEach((id) => onUpdateStatus(id, status));
    setSelectedIds([]);
    showToast(`Updated ${selectedIds.length} message(s) to ${status}`);
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => onDeleteMessage(id));
    setSelectedIds([]);
    showToast(`Deleted ${selectedIds.length} message(s)`);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyInput.trim()) return;

    onAddReply(selectedMessage.id, replyInput.trim());
    setReplyInput('');
    showToast('Reply logged and dispatched to client email');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Subject', 'Budget', 'Date', 'Status'];
    const rows = filteredMessages.map((m) => [
      m.id,
      `"${m.name}"`,
      m.email,
      m.phone,
      `"${m.company || ''}"`,
      `"${m.subject.replace(/"/g, '""')}"`,
      `"${m.budget || ''}"`,
      m.date,
      m.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aura_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported inquiries to CSV');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Commercial Inquiries & Contact CMS
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-orange-50 text-orange-700 border border-orange-200 rounded-md font-bold">
              {messages.length} Total Briefs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming project requests, client budgets, timelines, and email correspondences.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Inquiries CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries by client name, email, company, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#b15f2c]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'new', 'read', 'replied', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#b15f2c] text-white font-bold shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions Bar if selected */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between gap-3 animate-fadeIn">
          <span className="text-xs font-mono text-orange-900 font-medium">
            {selectedIds.length} item(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatus('read')}
              className="px-2.5 py-1 text-xs bg-white text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
            >
              Mark Read
            </button>
            <button
              onClick={() => handleBulkStatus('replied')}
              className="px-2.5 py-1 text-xs bg-white text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
            >
              Mark Replied
            </button>
            <button
              onClick={() => handleBulkStatus('archived')}
              className="px-2.5 py-1 text-xs bg-white text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
            >
              Archive
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-2.5 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 rounded-lg border border-red-200 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Main Split: Messages List and Selected Conversation Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List Column */}
        <div
          className={`${
            selectedMessage ? 'lg:col-span-6 xl:col-span-5' : 'lg:col-span-12'
          } bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm`}
        >
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={
                  filteredMessages.length > 0 &&
                  selectedIds.length === filteredMessages.length
                }
                onChange={handleSelectAll}
                className="w-4 h-4 rounded text-[#b15f2c] border-slate-300"
              />
              <span className="font-mono text-[11px] font-medium">Select All</span>
            </label>
            <span className="font-mono text-[11px]">
              Showing {filteredMessages.length} inquiries
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400">
                No messages found matching your criteria.
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 transition-colors cursor-pointer flex items-start gap-3 ${
                    selectedMessage?.id === msg.id
                      ? 'bg-amber-50/50 border-l-4 border-l-[#b15f2c]'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(msg.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleToggleSelect(msg.id)}
                    className="w-4 h-4 rounded text-[#b15f2c] border-slate-300 mt-1 shrink-0"
                  />

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900 truncate">
                        {msg.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {msg.date}
                      </span>
                    </div>

                    <p className="text-xs text-[#b15f2c] font-medium truncate">{msg.subject}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400 truncate">{msg.email}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold ${
                          msg.status === 'new'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : msg.status === 'replied'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : msg.status === 'read'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Conversation Detail Column */}
        {selectedMessage && (
          <div className="lg:col-span-6 xl:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-md">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    {selectedMessage.name}
                  </h2>
                  {selectedMessage.company && (
                    <span className="px-2 py-0.5 text-xs bg-slate-200 text-slate-800 rounded-md font-mono">
                      {selectedMessage.company}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {selectedMessage.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {selectedMessage.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedMessage(null);
                    if (onClearSelectedDirect) onClearSelectedDirect();
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Close Brief"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Body */}
            <div className="p-5 space-y-5 overflow-y-auto max-h-[450px]">
              {/* Metadata Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Subject</span>
                  <span className="text-slate-900 font-medium truncate block">
                    {selectedMessage.subject}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Budget</span>
                  <span className="text-[#b15f2c] font-semibold block">
                    {selectedMessage.budget || 'Not specified'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Timeline</span>
                  <span className="text-slate-900 font-medium block">
                    {selectedMessage.timeline || 'Flexible'}
                  </span>
                </div>
              </div>

              {/* Client Original Message Bubble */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">{selectedMessage.name}</span>
                  <span className="font-mono text-[11px]">
                    {selectedMessage.date} at {selectedMessage.time}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Existing Replies */}
              {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                    Dispatched Responses ({selectedMessage.replies.length})
                  </span>
                  {selectedMessage.replies.map((r) => (
                    <div key={r.id} className="space-y-1 pl-4 border-l-2 border-[#b15f2c]">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span className="text-[#b15f2c] font-semibold">AURA AI Studio Lead</span>
                        <span>{r.timestamp}</span>
                      </div>
                      <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl text-xs text-slate-800">
                        {r.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Reply Form */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                  Reply to Client Brief
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(selectedMessage.id, 'read')}
                    className="text-[11px] font-mono text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded bg-white border border-slate-200 cursor-pointer"
                  >
                    Set Read
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(selectedMessage.id, 'archived')}
                    className="text-[11px] font-mono text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded bg-white border border-slate-200 cursor-pointer"
                  >
                    Archive
                  </button>
                </div>
              </div>

              <form onSubmit={handleSendReply} className="space-y-2">
                <textarea
                  rows={3}
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder={`Write a proposal response to ${selectedMessage.name} (${selectedMessage.email})...`}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#b15f2c] resize-none"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Dispatches from studio email: contact@aura-ai.studio
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
