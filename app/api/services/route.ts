import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_SERVICES } from '@/components/admin/mockData';
import { AdminService } from '@/components/admin/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_SERVICES });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_SERVICES });
    }

    const docs = await mongo.db
      .collection('services')
      .find({})
      .sort({ displayOrder: 1 })
      .toArray();

    if (docs.length === 0) {
      await mongo.db.collection('services').insertMany(INITIAL_SERVICES.map((s) => ({ ...s, _id: s.id as any })));
      return NextResponse.json({ source: 'mongodb', data: INITIAL_SERVICES });
    }

    return NextResponse.json({
      source: 'mongodb',
      data: docs.map((d) => normalizeDoc(d as any)),
    });
  } catch (error: any) {
    return NextResponse.json({ source: 'fallback', data: INITIAL_SERVICES, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Partial<AdminService> = await req.json();

    const newService: AdminService = {
      id: body.id || `srv-${Date.now()}`,
      name: body.name || 'New AI Production Service',
      icon: body.icon || 'Film',
      category: body.category || 'Commercials',
      shortDescription: body.shortDescription || '',
      detailedDescription: body.detailedDescription || '',
      features: body.features || [],
      startingPrice: body.startingPrice || '₹999/sec',
      ctaText: body.ctaText || 'Get Started',
      displayOrder: body.displayOrder || 1,
      isFeatured: Boolean(body.isFeatured),
      isActive: body.isActive !== undefined ? body.isActive : true,
      deliverables: body.deliverables || '4K Video Master',
      turnaround: body.turnaround || '3-5 Business Days',
    };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('services').insertOne({
          ...newService,
          _id: newService.id as any,
        });
      }
    }

    return NextResponse.json({ success: true, data: newService });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
