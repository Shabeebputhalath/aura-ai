import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('testimonials').deleteOne({
          $or: [{ id }, { _id: id as any }],
        });
      }
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
