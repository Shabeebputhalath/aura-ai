import { NextResponse } from 'next/server';
import { seedMongoDbIfNeeded, isMongoConfigured, getMongoDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'MONGODB_URI is not set in environment variables.',
      }, { status: 400 });
    }

    const { reset } = await req.json().catch(() => ({ reset: false }));

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({
        success: false,
        message: 'Could not connect to MongoDB database.',
      }, { status: 500 });
    }

    // If reset requested, drop or clean collections first
    if (reset) {
      const { db } = mongo;
      const collections = [
        'projects',
        'services',
        'pricing_plans',
        'messages',
        'whatsapp_config',
        'media_assets',
        'testimonials',
        'team',
        'articles',
        'notifications',
        'studio_settings',
        'admin_users',
      ];
      for (const colName of collections) {
        await db.collection(colName).deleteMany({}).catch(() => {});
      }
    }

    const result = await seedMongoDbIfNeeded();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Error during seeding MongoDB',
    }, { status: 500 });
  }
}
