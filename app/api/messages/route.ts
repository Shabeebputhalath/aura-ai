import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_MESSAGES } from '@/components/admin/mockData';
import { AdminMessage } from '@/components/admin/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_MESSAGES });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_MESSAGES });
    }

    const docs = await mongo.db
      .collection('messages')
      .find({})
      .sort({ date: -1, time: -1 })
      .toArray();

    if (docs.length === 0) {
      await mongo.db.collection('messages').insertMany(INITIAL_MESSAGES.map((m) => ({ ...m, _id: m.id as any })));
      return NextResponse.json({ source: 'mongodb', data: INITIAL_MESSAGES });
    }

    return NextResponse.json({
      source: 'mongodb',
      data: docs.map((d) => normalizeDoc(d as any)),
    });
  } catch (error: any) {
    return NextResponse.json({ source: 'fallback', data: INITIAL_MESSAGES, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || (!body.email && !body.phone)) {
      return NextResponse.json({ error: 'Name and either email or phone are required.' }, { status: 400 });
    }

    const now = new Date();
    const newMessage: AdminMessage = {
      id: body.id || `msg-${Date.now()}`,
      name: body.name,
      email: body.email || '',
      phone: body.phone || '',
      company: body.company || '',
      subject: body.subject || 'Creative Consultation Inquiry',
      message: body.message || '',
      budget: body.budget,
      timeline: body.timeline,
      serviceCategory: body.serviceCategory,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: body.status || 'new',
      replies: body.replies || [],
    };

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('messages').insertOne({
          ...newMessage,
          _id: newMessage.id as any,
        });

        // Also push a notification into MongoDB notifications collection
        await mongo.db.collection('notifications').insertOne({
          _id: `notif-${Date.now()}` as any,
          id: `notif-${Date.now()}`,
          title: `New Inquiry from ${newMessage.name}`,
          description: `${newMessage.subject || 'Client message'} (${newMessage.email || newMessage.phone})`,
          type: 'inquiry',
          category: 'enquiry',
          timestamp: 'Just now',
          isRead: false,
          linkTab: 'Messages',
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: 'Inquiry received and saved to MongoDB.',
    });
  } catch (error: any) {
    console.error('API /api/messages POST error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to submit message' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('messages').updateOne(
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
