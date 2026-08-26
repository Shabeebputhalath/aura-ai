'use client';

import React, { useState } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Linkedin,
  Twitter,
  Github,
  Globe,
  X,
  Sparkles,
} from 'lucide-react';
import { AdminTeamMember } from '../types';

interface TeamCMSProps {
  team: AdminTeamMember[];
  onSaveMember: (member: AdminTeamMember) => void;
  onDeleteMember: (id: string) => void;
  onToggleActive: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function TeamCMS({
  team,
  onSaveMember,
  onDeleteMember,
  onToggleActive,
  showToast,
}: TeamCMSProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdminTeamMember | null>(null);

  const [formData, setFormData] = useState<Partial<AdminTeamMember>>({
    name: '',
    role: '',
    department: 'Direction & Vision',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    displayOrder: 1,
    isActive: true,
  });

  const handleOpenCreate = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      department: 'Direction & Vision',
      bio: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      displayOrder: team.length + 1,
      isActive: true,
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (member: AdminTeamMember) => {
    setEditingMember(member);
    setFormData({ ...member });
    setIsEditorOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.role?.trim()) {
      showToast('Please enter name and role');
      return;
    }

    const memberToSave: AdminTeamMember = {
      id: editingMember ? editingMember.id : 'team-' + Date.now(),
      name: formData.name || 'Team Member',
      role: formData.role || 'Production Artist',
      department: formData.department || 'Production',
      bio: formData.bio || '',
      avatar:
        formData.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      displayOrder: Number(formData.displayOrder) || 1,
      isActive: formData.isActive !== false,
      socials: formData.socials || {},
    };

    onSaveMember(memberToSave);
    setIsEditorOpen(false);
    showToast(editingMember ? 'Team member updated' : 'New team member added');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Studio Team & Creative Directors
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-bold">
              {team.length} Members
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage creative directors, diffusion engineers, 3D supervisors, and public studio roster profiles.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...team]
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .map((member) => (
            <div
              key={member.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                member.isActive
                  ? 'bg-white border-slate-200 hover:border-[#b15f2c]/50 hover:shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-3 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner bg-slate-100">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-[#b15f2c] font-mono font-medium">{member.role}</p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {member.department}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onToggleActive(member.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                    member.isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {member.isActive ? 'Active' : 'Hidden'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(member)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Edit Member"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteMember(member.id)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add / Edit Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Creative Director & Founder"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Direction & Vision"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Avatar Photo URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Biography & Background
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Former cinema cinematographer bridging traditional lighting principles with state-of-the-art diffusion models..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#b15f2c] hover:bg-[#97501f] text-xs font-semibold text-white rounded-xl shadow-sm cursor-pointer transition-all"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
