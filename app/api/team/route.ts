import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_TEAM } from '@/components/admin/mockData';
import { AdminTeamMember } from '@/components/admin/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_TEAM });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_TEAM });
    }

    const docs = await mongo.db
      .collection('team')
      .find({})
      .sort({ displayOrder: 1 })
      .toArray();

    if (docs.length === 0) {
      await mongo.db.collection('team').insertMany(INITIAL_TEAM.map((t) => ({ ...t, _id: t.id as any })));
      return NextResponse.json({ source: 'mongodb', data: INITIAL_TEAM });
    }

    return NextResponse.json({
      source: 'mongodb',
      data: docs.map((d) => normalizeDoc(d as any)),
    });
  } catch (error: any) {
    return NextResponse.json({ source: 'fallback', data: INITIAL_TEAM, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Partial<AdminTeamMember> = await req.json();

    const newMember: AdminTeamMember = {
      id: body.id || `team-${Date.now()}`,
      name: body.name || 'Creative Specialist',
      role: body.role || 'AI Director',
      department: body.department || 'Production',
      avatar: body.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: body.bio || '',
      socials: body.socials,
      socialHandle: body.socialHandle || '@auracreative',
      specialties: body.specialties || ['4K AI Direction', 'Color Timing'],
      displayOrder: body.displayOrder || 1,
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('team').insertOne({
          ...newMember,
          _id: newMember.id as any,
        });
      }
    }

    return NextResponse.json({ success: true, data: newMember });
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
        await mongo.db.collection('team').updateOne(
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
