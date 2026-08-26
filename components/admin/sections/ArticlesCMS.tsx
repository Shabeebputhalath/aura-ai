'use client';

import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Tag,
  X,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { AdminArticle } from '../types';

interface ArticlesCMSProps {
  articles: AdminArticle[];
  onSaveArticle: (article: AdminArticle) => void;
  onDeleteArticle: (id: string) => void;
  onToggleStatus: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function ArticlesCMS({
  articles,
  onSaveArticle,
  onDeleteArticle,
  onToggleStatus,
  showToast,
}: ArticlesCMSProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null);

  const [formData, setFormData] = useState<Partial<AdminArticle>>({
    title: '',
    slug: '',
    category: 'Production Insights',
    author: 'Marcus Vance',
    readTime: '4 min read',
    publishDate: new Date().toISOString().split('T')[0],
    status: 'published',
    summary: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    tags: ['AI Cinema', 'Commercials'],
  });

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Production Insights',
      author: 'Marcus Vance',
      readTime: '4 min read',
      publishDate: new Date().toISOString().split('T')[0],
      status: 'published',
      summary: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      tags: ['AI Cinema', 'Commercials'],
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (art: AdminArticle) => {
    setEditingArticle(art);
    setFormData({ ...art });
    setIsEditorOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Please enter article title');
      return;
    }

    const generatedSlug =
      formData.slug?.trim() ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const articleToSave: AdminArticle = {
      id: editingArticle ? editingArticle.id : 'art-' + Date.now(),
      title: formData.title || 'Untitled Article',
      slug: generatedSlug,
      category: formData.category || 'Production Insights',
      author: formData.author || 'AURA Studio Lead',
      readTime: formData.readTime || '3 min read',
      publishDate: formData.publishDate || new Date().toISOString().split('T')[0],
      status: formData.status || 'published',
      summary: formData.summary || '',
      content: formData.content || '',
      coverImage:
        formData.coverImage ||
        'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      tags: Array.isArray(formData.tags)
        ? formData.tags
        : typeof formData.tags === 'string'
        ? (formData.tags as string).split(',').map((t: string) => t.trim())
        : ['AI Cinema'],
    };

    onSaveArticle(articleToSave);
    setIsEditorOpen(false);
    showToast(editingArticle ? 'Article updated' : 'New article published');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Studio Journal, Insights & Case Studies
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-bold">
              {articles.length} Articles
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish technical whitepapers, behind-the-scenes diffusion breakdowns, and creative agency case studies.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#b15f2c] hover:bg-[#97501f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#b15f2c]/50 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
              <img
                src={art.coverImage}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase font-bold bg-[#b15f2c] text-white rounded">
                  {art.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span>{art.publishDate}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-[#b15f2c] transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onToggleStatus(art.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                    art.status === 'published'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {art.status}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(art)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteArticle(art.id)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  {editingArticle ? 'Edit Article' : 'Write Journal Article'}
                </h2>
                <p className="text-xs text-slate-500">
                  Publish production case studies and AI cinematography articles.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Article Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Achieving 100% Brand Consistency in AI Video Renders"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Production Insights"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="4 min read"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Short Abstract / Summary
                </label>
                <input
                  type="text"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="A deep dive into custom LoRA weights and temporal consistency pipelines..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-semibold">
                  Article Markdown Body
                </label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="## The Challenge in Luxury Commercials&#10;&#10;When luxury brands commission high-end video spots, lighting and physics accuracy are non-negotiable..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#b15f2c] font-mono resize-none"
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
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
