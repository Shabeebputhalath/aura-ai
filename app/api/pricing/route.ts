import { NextRequest, NextResponse } from 'next/server';
import { getMongoDb, isMongoConfigured, normalizeDoc } from '@/lib/mongodb';
import { INITIAL_PRICING_PLANS } from '@/components/admin/mockData';
import { DEFAULT_PRICING_CONFIG } from '@/components/admin/PricingManager';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({
        source: 'fallback',
        plans: INITIAL_PRICING_PLANS,
        config: DEFAULT_PRICING_CONFIG,
      });
    }

    const mongo = await getMongoDb();
    if (!mongo) {
      return NextResponse.json({
        source: 'fallback',
        plans: INITIAL_PRICING_PLANS,
        config: DEFAULT_PRICING_CONFIG,
      });
    }

    const [plansDocs, configDoc] = await Promise.all([
      mongo.db.collection('pricing_plans').find({}).sort({ displayOrder: 1 }).toArray(),
      mongo.db.collection('pricing_config').findOne({ _id: 'global_pricing_config' as any }),
    ]);

    if (plansDocs.length === 0) {
      await mongo.db.collection('pricing_plans').insertMany(INITIAL_PRICING_PLANS.map((p) => ({ ...p, _id: p.id as any })));
      await mongo.db.collection('pricing_config').insertOne({ ...DEFAULT_PRICING_CONFIG, _id: 'global_pricing_config' as any });
      return NextResponse.json({
        source: 'mongodb',
        plans: INITIAL_PRICING_PLANS,
        config: DEFAULT_PRICING_CONFIG,
      });
    }

    return NextResponse.json({
      source: 'mongodb',
      plans: plansDocs.map((d) => normalizeDoc(d as any)),
      config: configDoc ? normalizeDoc(configDoc as any) : DEFAULT_PRICING_CONFIG,
    });
  } catch (error: any) {
    return NextResponse.json({
      source: 'fallback',
      plans: INITIAL_PRICING_PLANS,
      config: DEFAULT_PRICING_CONFIG,
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
        if (body.type === 'config') {
          // Update global rates config
          await mongo.db.collection('pricing_config').updateOne(
            { _id: 'global_pricing_config' as any },
            { $set: { ...body.config, _id: 'global_pricing_config' } },
            { upsert: true }
          );
        } else if (body.plans && Array.isArray(body.plans)) {
          // Replace all plans
          await mongo.db.collection('pricing_plans').deleteMany({});
          if (body.plans.length > 0) {
            await mongo.db.collection('pricing_plans').insertMany(
              body.plans.map((p: any) => ({ ...p, _id: p.id as any }))
            );
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Pricing saved to MongoDB' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}
