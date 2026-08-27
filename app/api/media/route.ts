import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_MEDIA_ASSETS } from '@/components/admin/mockData';
import { AdminMediaAsset } from '@/components/admin/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (!isMongoConfigured()) {
      let data = INITIAL_MEDIA_ASSETS;
      if (type && type !== 'all') {
        data = data.filter((m) => m.type === type);
      }
      return NextResponse.json({ source: 'fallback', data });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_MEDIA_ASSETS });
    }

    const query: any = {};
    if (type && type !== 'all') {
      query.type = type;
    }

    const docs = await mongo.db
      .collection('media_assets')
      .find(query)
      .sort({ uploadedAt: -1 })
      .toArray();

    if (docs.length === 0 && Object.keys(query).length === 0) {
      await mongo.db.collection('media_assets').insertMany(INITIAL_MEDIA_ASSETS.map((m) => ({ ...m, _id: m.id as any })));
      return NextResponse.json({ source: 'mongodb', data: INITIAL_MEDIA_ASSETS });
    }

    return NextResponse.json({
      source: 'mongodb',
      data: docs.map((d) => normalizeDoc(d as any)),
    });
  } catch (error: any) {
    return NextResponse.json({ source: 'fallback', data: INITIAL_MEDIA_ASSETS, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Partial<AdminMediaAsset> = await req.json();

    if (!body.url) {
      return NextResponse.json({ error: 'Media URL (link format) is required.' }, { status: 400 });
    }

    const newMedia: AdminMediaAsset = {
      id: body.id || `media-${Date.now()}`,
      name: body.name || 'Untitled Media Link',
      type: body.type || (body.url.includes('youtube') || body.url.includes('.mp4') ? 'video' : 'image'),
      category: body.category || 'Portfolio',
      dimensions: body.dimensions || (body.type === 'video' ? '3840x2160' : '1920x1080'),
      url: body.url, // URL/Link format
      thumbnail: body.thumbnail || (body.type === 'image' ? body.url : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80'),
      size: body.size || '4K Stream',
      resolution: body.resolution || '4K UHD',
      duration: body.duration,
      tags: body.tags || ['AI Video', '4K Link'],
      uploadedAt: body.uploadedAt || new Date().toISOString().split('T')[0],
      createdAt: body.createdAt || new Date().toISOString().split('T')[0],
      usedInProjects: body.usedInProjects || [],
    };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('media_assets').insertOne({
          ...newMedia,
          _id: newMedia.id as any,
        });
      }
    }

    return NextResponse.json({ success: true, data: newMedia });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });
    }

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('media_assets').updateOne(
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
