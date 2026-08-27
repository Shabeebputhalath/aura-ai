import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_TESTIMONIALS } from '@/components/admin/mockData';
import { AdminTestimonial } from '@/components/admin/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_TESTIMONIALS });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_TESTIMONIALS });
    }

    const docs = await mongo.db
      .collection('testimonials')
      .find({})
      .sort({ displayOrder: 1 })
      .toArray();

    if (docs.length === 0) {
      await mongo.db.collection('testimonials').insertMany(INITIAL_TESTIMONIALS.map((t) => ({ ...t, _id: t.id as any })));
      return NextResponse.json({ source: 'mongodb', data: INITIAL_TESTIMONIALS });
    }

    return NextResponse.json({
      source: 'mongodb',
      data: docs.map((d) => normalizeDoc(d as any)),
    });
  } catch (error: any) {
    return NextResponse.json({ source: 'fallback', data: INITIAL_TESTIMONIALS, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Partial<AdminTestimonial> = await req.json();

    const newTestimonial: AdminTestimonial = {
      id: body.id || `test-${Date.now()}`,
      clientName: body.clientName || body.name || 'Anonymous Client',
      name: body.name || body.clientName || 'Anonymous Client',
      company: body.company || 'Enterprise Brand',
      position: body.position || body.role || 'Brand Director',
      role: body.role || body.position || 'Brand Director',
      profileImage: body.profileImage || body.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      avatar: body.avatar || body.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      testimonial: body.testimonial || body.quote || '',
      quote: body.quote || body.testimonial || '',
      rating: body.rating || 5,
      projectTag: body.projectTag || body.projectName || '4K Commercial',
      projectName: body.projectName || body.projectTag || '4K Commercial',
      isFeatured: body.isFeatured !== undefined ? body.isFeatured : true,
      displayOrder: body.displayOrder || 1,
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
      isActive: body.isActive !== undefined ? body.isActive : true,
      verified: body.verified !== undefined ? body.verified : true,
      dateAdded: body.dateAdded || new Date().toISOString().split('T')[0],
    };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('testimonials').insertOne({
          ...newTestimonial,
          _id: newTestimonial.id as any,
        });
      }
    }

    return NextResponse.json({ success: true, data: newTestimonial });
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
        await mongo.db.collection('testimonials').updateOne(
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
