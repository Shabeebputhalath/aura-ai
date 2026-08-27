import { NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, getMaskedMongoUri, DEFAULT_DB_NAME } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isConfigured = isMongoConfigured();
  const maskedUri = getMaskedMongoUri();
  const dbName = process.env.MONGODB_DB || DEFAULT_DB_NAME;

  if (!isConfigured) {
    return NextResponse.json({
      connected: false,
      configured: false,
      database: dbName,
      maskedUri,
      message: 'MONGODB_URI is not configured in .env yet. The studio is running with in-memory/mock state until MONGODB_URI is provided.',
      counts: {},
      timestamp: new Date().toISOString(),
    });
  }

  const startTime = Date.now();
  try {
    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({
        connected: false,
        configured: true,
        database: dbName,
        maskedUri,
        message: 'Could not connect to MongoDB server. Please verify your connection string.',
        counts: {},
        timestamp: new Date().toISOString(),
      });
    }

    const { db } = mongo;
    // Ping the database
    await db.command({ ping: 1 });
    const pingMs = Date.now() - startTime;

    // Fetch counts from key collections
    const [
      projects,
      services,
      pricing_plans,
      messages,
      media_assets,
      testimonials,
      team,
      articles,
      notifications,
    ] = await Promise.all([
      db.collection('projects').countDocuments().catch(() => 0),
      db.collection('services').countDocuments().catch(() => 0),
      db.collection('pricing_plans').countDocuments().catch(() => 0),
      db.collection('messages').countDocuments().catch(() => 0),
      db.collection('media_assets').countDocuments().catch(() => 0),
      db.collection('testimonials').countDocuments().catch(() => 0),
      db.collection('team').countDocuments().catch(() => 0),
      db.collection('articles').countDocuments().catch(() => 0),
      db.collection('notifications').countDocuments().catch(() => 0),
    ]);

    return NextResponse.json({
      connected: true,
      configured: true,
      database: db.databaseName,
      maskedUri,
      pingMs,
      message: 'Connected to MongoDB successfully.',
      counts: {
        projects,
        services,
        pricing_plans,
        messages,
        media_assets,
        testimonials,
        team,
        articles,
        notifications,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({
      connected: false,
      configured: true,
      database: dbName,
      maskedUri,
      error: error?.message || 'MongoDB connection error',
      message: 'Failed to connect to MongoDB cluster.',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
