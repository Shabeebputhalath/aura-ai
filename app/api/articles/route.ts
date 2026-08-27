import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_ARTICLES } from '@/components/admin/mockData';
import { AdminArticle } from '@/components/admin/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_ARTICLES });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_ARTICLES });
    }

    const docs = await mongo.db
      .collection('articles')
      .find({})
      .sort({ publishedAt: -1, publishDate: -1 })
      .toArray();

    if (docs.length === 0) {
      await mongo.db.collection('articles').insertMany(INITIAL_ARTICLES.map((a) => ({ ...a, _id: a.id as any })));
      return NextResponse.json({ source: 'mongodb', data: INITIAL_ARTICLES });
    }

    return NextResponse.json({
      source: 'mongodb',
      data: docs.map((d) => normalizeDoc(d as any)),
    });
  } catch (error: any) {
    return NextResponse.json({ source: 'fallback', data: INITIAL_ARTICLES, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Partial<AdminArticle> = await req.json();

    const newArticle: AdminArticle = {
      id: body.id || `art-${Date.now()}`,
      title: body.title || 'Untitled Article',
      slug: body.slug || (body.title || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: body.category || 'AI Production Insights',
      excerpt: body.excerpt || body.summary || '',
      summary: body.summary || body.excerpt || '',
      content: body.content || '',
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      author: body.author || 'AURA Editorial Team',
      readTime: body.readTime || '4 min read',
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      publishDate: body.publishDate || new Date().toISOString().split('T')[0],
      status: body.status || 'published',
      views: body.views || 0,
      tags: body.tags || ['AI Video', 'Production'],
    };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('articles').insertOne({
          ...newArticle,
          _id: newArticle.id as any,
        });
      }
    }

    return NextResponse.json({ success: true, data: newArticle });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('articles').updateOne(
          { $or: [{ id }, { _id: id as any }] },
          { $set: updates }
        );
      }
    }

    return NextResponse.json({ success: true, id, updates });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
