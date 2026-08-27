import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_SERVICES } from '@/components/admin/mockData';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isMongoConfigured()) {
      const found = INITIAL_SERVICES.find((s) => s.id === id);
      return NextResponse.json({ data: found || null });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      const found = INITIAL_SERVICES.find((s) => s.id === id);
      return NextResponse.json({ data: found || null });
    }

    const doc = await mongo.db.collection('services').findOne({
      $or: [{ id }, { _id: id as any }],
    });

    return NextResponse.json({ data: doc ? normalizeDoc(doc as any) : null });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatePayload = { ...body, id };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('services').updateOne(
          { $or: [{ id }, { _id: id as any }] },
          { $set: updatePayload },
          { upsert: true }
        );
      }
    }

    return NextResponse.json({ success: true, data: updatePayload });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('services').deleteOne({
          $or: [{ id }, { _id: id as any }],
        });
      }
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
