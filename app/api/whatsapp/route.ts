import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_WHATSAPP_CONFIG } from '@/components/admin/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_WHATSAPP_CONFIG });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({ source: 'fallback', data: INITIAL_WHATSAPP_CONFIG });
    }

    const doc = await mongo.db.collection('whatsapp_config').findOne({ _id: 'global_whatsapp_config' as any });

    if (!doc) {
      await mongo.db.collection('whatsapp_config').insertOne({
        ...INITIAL_WHATSAPP_CONFIG,
        _id: 'global_whatsapp_config' as any,
      });
      return NextResponse.json({ source: 'mongodb', data: INITIAL_WHATSAPP_CONFIG });
    }

    return NextResponse.json({ source: 'mongodb', data: normalizeDoc(doc as any) });
  } catch (error: any) {
    return NextResponse.json({ source: 'fallback', data: INITIAL_WHATSAPP_CONFIG, error: error?.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type === 'log_inquiry') {
      // Log an inquiry generated from WhatsApp CTA click
      const logEntry = {
        id: `wa-log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        sender: body.sender || 'Direct WhatsApp Visitor',
        phone: body.phone,
        message: body.message,
        topic: body.topic || 'General Inquiry',
        sourcePage: body.sourcePage || '/',
      };

      if (isMongoConfigured()) {
        const mongo = await getMongoDb();
        if (mongo) {
          await mongo.db.collection('whatsapp_config').updateOne(
            { _id: 'global_whatsapp_config' as any },
            { $push: { inquiryLogs: logEntry } as any },
            { upsert: true }
          );
        }
      }

      return NextResponse.json({ success: true, data: logEntry });
    }

    // Save entire config
    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.db.collection('whatsapp_config').updateOne(
          { _id: 'global_whatsapp_config' as any },
          { $set: { ...body, _id: 'global_whatsapp_config' } },
          { upsert: true }
        );
      }
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}
