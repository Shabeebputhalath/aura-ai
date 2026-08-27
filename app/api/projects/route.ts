import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_PROJECTS } from '@/components/admin/mockData';
import { AdminProject } from '@/components/admin/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');

    if (!isMongoConfigured()) {
      let filtered = [...INITIAL_PROJECTS];
      if (category && category !== 'All') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (featured === 'true') {
        filtered = filtered.filter((p) => p.isFeatured);
      }
      if (status) {
        filtered = filtered.filter((p) => p.status === status);
      }
      return NextResponse.json({
        source: 'fallback',
        data: filtered,
      });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_PROJECTS });
    }

    const query: any = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }
    if (status) {
      query.status = status;
    }

    const docs = await mongo.db
      .collection('projects')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // If database is empty, seed defaults
    if (docs.length === 0 && Object.keys(query).length === 0) {
      await mongo.db.collection('projects').insertMany(INITIAL_PROJECTS.map((p) => ({ ...p, _id: p.id as any })));
      return NextResponse.json({
        source: 'mongodb',
        data: INITIAL_PROJECTS,
      });
    }

    return NextResponse.json({
      source: 'mongodb',
      data: docs.map((d) => normalizeDoc(d as any)),
    });
  } catch (error: any) {
    console.error('API /api/projects GET error:', error);
    return NextResponse.json({ source: 'fallback', data: INITIAL_PROJECTS, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Partial<AdminProject> = await req.json();

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newProject: AdminProject = {
      id: body.id || `proj-${Date.now()}`,
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      client: body.client || 'AURA Studio Production',
      category: (body.category as any) || 'Product Commercial',
      status: body.status || 'published',
      isFeatured: Boolean(body.isFeatured),
      thumbnail: body.thumbnail || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
      videoUrl: body.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: body.duration || '30s',
      resolution: body.resolution || '4K Cinema 60fps',
      year: body.year || '2026',
      views: body.views || 0,
      likes: body.likes || 0,
      shortDescription: body.shortDescription || '',
      fullDescription: body.fullDescription || '',
      toolsUsed: body.toolsUsed || ['Midjourney v6', 'Runway Gen-3'],
      results: body.results || '',
      clientTestimonial: body.clientTestimonial,
      seoTitle: body.seoTitle || `${body.title} | AURA AI Production`,
      seoDescription: body.seoDescription || body.shortDescription || '',
      socialShareImage: body.socialShareImage,
      createdAt: body.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('projects').insertOne({
          ...newProject,
          _id: newProject.id as any,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: newProject,
      source: isMongoConfigured() ? 'mongodb' : 'memory',
    });
  } catch (error: any) {
    console.error('API /api/projects POST error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to save project' }, { status: 500 });
  }
}
