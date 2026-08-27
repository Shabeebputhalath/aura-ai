import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_STUDIO_SETTINGS, INITIAL_ADMIN_USER } from '@/components/admin/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({
        source: 'fallback',
        settings: INITIAL_STUDIO_SETTINGS,
        adminUser: INITIAL_ADMIN_USER,
      });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({
        source: 'fallback',
        settings: INITIAL_STUDIO_SETTINGS,
        adminUser: INITIAL_ADMIN_USER,
      });
    }

    const [settingsDoc, adminDoc] = await Promise.all([
      mongo.db.collection('studio_settings').findOne({ _id: 'global_studio_settings' as any }),
      mongo.db.collection('admin_users').findOne({ _id: 'primary_admin' as any }),
    ]);

    if (!settingsDoc) {
      await mongo.db.collection('studio_settings').insertOne({ ...INITIAL_STUDIO_SETTINGS, _id: 'global_studio_settings' as any });
    }
    if (!adminDoc) {
      await mongo.db.collection('admin_users').insertOne({ ...INITIAL_ADMIN_USER, _id: 'primary_admin' as any });
    }

    return NextResponse.json({
      source: 'mongodb',
      settings: settingsDoc ? normalizeDoc(settingsDoc as any) : INITIAL_STUDIO_SETTINGS,
      adminUser: adminDoc ? normalizeDoc(adminDoc as any) : INITIAL_ADMIN_USER,
    });
  } catch (error: any) {
    return NextResponse.json({
      source: 'fallback',
      settings: INITIAL_STUDIO_SETTINGS,
      adminUser: INITIAL_ADMIN_USER,
      error: error?.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (isMongoConfigured()) {
      const mongo = await getMongoDb();
      if (mongo) {
        if (body.settings) {
          await mongo.db.collection('studio_settings').updateOne(
            { _id: 'global_studio_settings' as any },
            { $set: { ...body.settings, _id: 'global_studio_settings' } },
            { upsert: true }
          );
        }
        if (body.adminUser) {
          await mongo.db.collection('admin_users').updateOne(
            { _id: 'primary_admin' as any },
            { $set: { ...body.adminUser, _id: 'primary_admin' } },
            { upsert: true }
          );
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Settings saved to MongoDB' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}
