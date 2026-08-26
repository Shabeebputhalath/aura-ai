'use client';

import React, { useState } from 'react';
import {
  Film,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Star,
  ExternalLink,
  CheckCircle2,
  Clock,
  X,
  Sparkles,
  Upload,
  Layers,
  Globe,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import { AdminProject } from '../types';

interface ProjectsCMSProps {
  projects: AdminProject[];
  onSaveProject: (project: AdminProject) => void;
  onDeleteProject: (projectId: string) => void;
  onTogglePublish: (projectId: string) => void;
  onToggleFeatured: (projectId: string) => void;
  onDuplicateProject: (project: AdminProject) => void;
  showToast: (msg: string) => void;
}

export default function ProjectsCMS({
  projects,
  onSaveProject,
  onDeleteProject,
  onTogglePublish,
  onToggleFeatured,
  onDuplicateProject,
  showToast,
}: ProjectsCMSProps) {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Edit/Create Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<AdminProject>>({
    title: '',
    slug: '',
    client: '',
    category: 'Product Commercial',
    status: 'published',
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '30s',
    resolution: '4K Cinema 60fps',
    year: '2026',
    views: 1200,
    likes: 150,
    shortDescription: '',
    fullDescription: '',
    toolsUsed: ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'DaVinci Resolve Studio'],
    results: '',
    clientTestimonial: {
      quote: '',
      author: '',
      role: '',
    },
    seoTitle: '',
    seoDescription: '',
  });

  const categories = [
    'All',
    'Product Commercial',
    'Cinematic Storytelling',
    'VFX & 3D Motion',
    'Fashion & Luxury',
    'Automotive',
  ];

  // Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      client: '',
      category: 'Product Commercial',
      status: 'published',
      isFeatured: false,
      thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '30s',
      resolution: '4K Cinema 60fps',
      year: '2026',
      views: 0,
      likes: 0,
      shortDescription: '',
      fullDescription: '',
      toolsUsed: ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'DaVinci Resolve Studio'],
      results: '',
      clientTestimonial: {
        quote: '',
        author: '',
        role: '',
      },
      seoTitle: '',
      seoDescription: '',
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (project: AdminProject) => {
    setEditingProject(project);
    setFormData({ ...project });
    setIsEditorOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.client?.trim()) {
      showToast('Please enter both Project Title and Client Name');
      return;
    }

    const generatedSlug =
      formData.slug?.trim() ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const projectToSave: AdminProject = {
      id: editingProject ? editingProject.id : 'proj-' + Date.now(),
      title: formData.title || 'Untitled Commercial',
      slug: generatedSlug,
      client: formData.client || 'AURA Client',
      category: formData.category || 'Product Commercial',
      status: formData.status || 'published',
      isFeatured: !!formData.isFeatured,
      thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      videoUrl: formData.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: formData.duration || '30s',
      resolution: formData.resolution || '4K UHD',
      year: formData.year || '2026',
      views: editingProject ? editingProject.views : 500,
      likes: editingProject ? editingProject.likes : 45,
      shortDescription: formData.shortDescription || '',
      fullDescription: formData.fullDescription || '',
      toolsUsed: Array.isArray(formData.toolsUsed)
        ? formData.toolsUsed
        : typeof formData.toolsUsed === 'string'
        ? (formData.toolsUsed as string).split(',').map((t: string) => t.trim())
        : [],
      results: formData.results || '',
      clientTestimonial: formData.clientTestimonial,
      seoTitle: formData.seoTitle || `${formData.title} | AURA AI Video Commercials`,
      seoDescription: formData.seoDescription || formData.shortDescription || '',
      createdAt: editingProject ? editingProject.createdAt : new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSaveProject(projectToSave);
    setIsEditorOpen(false);
    showToast(editingProject ? 'Project updated successfully' : 'New project created successfully');
  };

  return (
    <div className="space-y-6">
      {/* -------------------------------------------------------------
          1. TOP CONTROLS & STATS BAR
      -------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Commercials & Projects CMS
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-[#b15f2c]/10 text-[#b15f2c] border border-[#b15f2c]/20 rounded-md font-bold">
              {projects.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage public portfolio pieces, 4K video embeds, technical specs, and case studies.
          </p>
        </div>

        {/* Add Project CTA */}
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Commercial Project</span>
        </button>
      </div>

      {/* -------------------------------------------------------------
          2. FILTERS & SEARCH ROW
      -------------------------------------------------------------- */}
      <div className="p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, client, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#b15f2c] focus:ring-1 focus:ring-[#b15f2c]"
          />
        </div>

        {/* Filter Dropdowns & View Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#b15f2c] cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#b15f2c] cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="published">Published Live</option>
            <option value="draft">Draft / Internal</option>
          </select>

          {/* Grid / Table Toggle */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid Cards View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          3. PROJECTS DISPLAY (TABLE OR GRID)
      -------------------------------------------------------------- */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <Film className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-900">No projects found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or filter settings, or add a new commercial project.
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            Create New Commercial
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/90 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Project / Thumbnail</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Duration & Res</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Thumbnail & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-9 rounded-lg overflow-hidden bg-slate-100 shrink-0 relative border border-slate-200">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-0.5 max-w-xs">
                          <p className="font-semibold text-slate-900 group-hover:text-[#b15f2c] transition-colors truncate">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono truncate">
                            /{p.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="py-3.5 px-4 text-slate-800 font-medium truncate">
                      {p.client}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                        {p.category}
                      </span>
                    </td>

                    {/* Specs */}
                    <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">
                      <span className="font-semibold text-slate-800">{p.duration}</span> • <span className="text-slate-500">{p.resolution}</span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onToggleFeatured(p.id)}
                        className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                          p.isFeatured
                            ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                            : 'text-slate-300 hover:text-slate-600'
                        }`}
                        title={p.isFeatured ? 'Featured on Homepage' : 'Not Featured'}
                      >
                        <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onTogglePublish(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                          p.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>

                    {/* Views */}
                    <td className="py-3.5 px-4 font-mono text-slate-700 font-medium">
                      {p.views.toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDuplicateProject(p)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                          title="Duplicate Project"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#b15f2c]/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Media Preview */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase font-bold bg-black/70 backdrop-blur-md text-white rounded">
                    {p.duration}
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase font-bold bg-[#b15f2c] text-white rounded">
                    {p.resolution}
                  </span>
                </div>
                {p.isFeatured && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="p-1.5 bg-amber-500 text-white rounded-lg block shadow-md">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </span>
                  </div>
                )}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white truncate">{p.client}</span>
                  <span className="text-[10px] font-mono text-slate-300">{p.year}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#b15f2c]">
                    {p.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{p.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onTogglePublish(p.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                      p.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {p.status}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDuplicateProject(p)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------------------------------------------------------------
          4. ADD / EDIT PROJECT DRAWER / MODAL
      -------------------------------------------------------------- */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  {editingProject ? 'Edit Commercial Spot' : 'Create New AI Video Commercial'}
                </h2>
                <p className="text-xs text-slate-500">
                  Configure production details, 4K media renders, video embeds, and SEO meta.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800">
              {/* Row 1: Title & Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Kira Luxe Fragrance — Liquid Gold"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Client / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Kira Parfums Paris"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              {/* Row 2: Category, Status, Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] cursor-pointer"
                  >
                    <option value="Product Commercial">Product Commercial</option>
                    <option value="Cinematic Storytelling">Cinematic Storytelling</option>
                    <option value="VFX & 3D Motion">VFX & 3D Motion</option>
                    <option value="Fashion & Luxury">Fashion & Luxury</option>
                    <option value="Automotive">Automotive</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Publish Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] cursor-pointer"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Private)</option>
                  </select>
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <label className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#b15f2c] border-slate-300 focus:ring-0"
                    />
                    <span className="text-xs text-slate-800 font-medium">Feature on Homepage</span>
                  </label>
                </div>
              </div>

              {/* Row 3: Thumbnail URL & Video Embed URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Video Embed URL
                  </label>
                  <input
                    type="text"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              {/* Row 4: Duration, Resolution & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Spot Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 30s / 60s"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Master Resolution
                  </label>
                  <input
                    type="text"
                    value={formData.resolution}
                    onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                    placeholder="e.g. 4K Cinema 60fps"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Release Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              {/* Row 5: Short & Full Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Short Synopsis / Hook
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Cinema-grade AI product commercial featuring studio liquid physics..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Technical Breakdown & Full Description
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed multi-prompt diffusion pipeline breakdown, color grading details..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] resize-none"
                />
              </div>

              {/* Row 6: Tools & Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    AI Engines & Production Tools (comma separated)
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(formData.toolsUsed)
                        ? formData.toolsUsed.join(', ')
                        : formData.toolsUsed
                    }
                    onChange={(e) => setFormData({ ...formData, toolsUsed: e.target.value as any })}
                    placeholder="Runway Gen-3, Midjourney v6.1, DaVinci Resolve"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Campaign Results / Performance
                  </label>
                  <input
                    type="text"
                    value={formData.results}
                    onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                    placeholder="e.g. +340% social engagement, 1.2M views"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  {editingProject ? 'Save Changes' : 'Publish Commercial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          5. DELETE CONFIRMATION MODAL
      -------------------------------------------------------------- */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Delete Commercial Project?</h3>
              <p className="text-xs text-slate-500">
                This will remove the project from the public showcase and CMS database. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteProject(deleteConfirmId);
                  setDeleteConfirmId(null);
                  showToast('Project deleted');
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-xs font-semibold text-white rounded-xl transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
