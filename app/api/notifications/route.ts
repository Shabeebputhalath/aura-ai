import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_NOTIFICATIONS } from '@/components/admin/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_NOTIFICATIONS });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_NOTIFICATIONS });
    }

    const docs = await mongo.db
      .collection('notifications')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    if (docs.length === 0) {
      await mongo.db.collection('notifications').insertMany(INITIAL_NOTIFICATIONS.map((n) => ({ ...n, _id: n.id as any })));
      return NextResponse.json({ source: 'mongodb', data: INITIAL_NOTIFICATIONS });
    }

    return NextResponse.json({
      source: 'mongodb',
      data: docs.map((d) => normalizeDoc(d as any)),
    });
  } catch (error: any) {
    return NextResponse.json({ source: 'fallback', data: INITIAL_NOTIFICATIONS, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.action === 'mark_all_read') {
      if (isMongoConfigured()) {
        const mongo = await getMongoDb();
        if (mongo) {
          await mongo.db.collection('notifications').updateMany({}, { $set: { isRead: true } });
        }
      }
      return NextResponse.json({ success: true, message: 'All marked as read' });
    }

    const newNotif = {
      id: body.id || `notif-${Date.now()}`,
      title: body.title || 'System Notification',
      description: body.description || '',
      type: body.type || 'general',
      category: body.category || 'general',
      timestamp: 'Just now',
      isRead: false,
      linkTab: body.linkTab,
    };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('notifications').insertOne({
          ...newNotif,
          _id: newNotif.id as any,
        });
      }
    }

    return NextResponse.json({ success: true, data: newNotif });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isRead } = body;

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('notifications').updateOne(
          { $or: [{ id }, { _id: id as any }] },
          { $set: { isRead } }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
