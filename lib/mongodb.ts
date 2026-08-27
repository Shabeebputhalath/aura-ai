import { MongoClient, Db, Collection } from 'mongodb';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_PRICING_PLANS,
  INITIAL_MESSAGES,
  INITIAL_WHATSAPP_CONFIG,
  INITIAL_MEDIA_ASSETS,
  INITIAL_TESTIMONIALS,
  INITIAL_TEAM,
  INITIAL_ARTICLES,
  INITIAL_NOTIFICATIONS,
  INITIAL_STUDIO_SETTINGS,
  INITIAL_ADMIN_USER,
} from '@/components/admin/mockData';

// Global cache for MongoDB Client in Node.js server environment (prevents multiple open pools during dev reloads)
interface MongoGlobalCache {
  conn: { client: MongoClient; db: Db } | null;
  promise: Promise<{ client: MongoClient; db: Db }> | null;
}

declare global {
  var _mongoCache: MongoGlobalCache | undefined;
}

const mongoCache: MongoGlobalCache = global._mongoCache || { conn: null, promise: null };
if (process.env.NODE_ENV !== 'production') {
  global._mongoCache = mongoCache;
}

export const DEFAULT_DB_NAME = process.env.MONGODB_DB || 'aura_studio_db';

/**
 * Checks if the MongoDB URI is configured in process.env
 */
export function isMongoConfigured(): boolean {
  const uri = process.env.MONGODB_URI;
  return Boolean(uri && uri.trim().length > 0 && !uri.includes('<username>'));
}

/**
 * Returns a masked version of the MongoDB URI for safe diagnostic logging
 */
export function getMaskedMongoUri(): string {
  const uri = process.env.MONGODB_URI || '';
  if (!uri) return 'Not Configured (Using Memory/Local Fallback)';
  try {
    return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/i, '$1••••••••$3');
  } catch {
    return 'mongodb://••••:••••@configured-host';
  }
}

/**
 * Connect to MongoDB and return the MongoClient and Db instance.
 * Uses lazy connection and caching.
 */
export async function getMongoDb(): Promise<{ client: MongoClient; db: Db } | null> {
  const uri = process.env.MONGODB_URI;

  if (!uri || !isMongoConfigured()) {
    return null;
  }

  if (mongoCache.conn) {
    return mongoCache.conn;
  }

  if (!mongoCache.promise) {
    const dbName = process.env.MONGODB_DB || DEFAULT_DB_NAME;
    const client = new MongoClient(uri, {
      connectTimeoutMS: 8000,
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10,
    });

    mongoCache.promise = client
      .connect()
      .then((connectedClient) => {
        const db = connectedClient.db(dbName);
        return { client: connectedClient, db };
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        mongoCache.promise = null;
        throw err;
      });
  }

  try {
    mongoCache.conn = await mongoCache.promise;
    return mongoCache.conn;
  } catch (err) {
    mongoCache.promise = null;
    throw err;
  }
}

/**
 * Returns a typed MongoDB Collection. Returns null if MongoDB is not connected.
 */
export async function getCollection<T extends Record<string, any>>(collectionName: string): Promise<Collection<T> | null> {
  const mongo = await getMongoDb();
  if (!mongo) return null;
  return mongo.db.collection<T>(collectionName);
}

/**
 * Initializes and seeds initial collections if they are currently empty.
 */
export async function seedMongoDbIfNeeded(): Promise<{
  seeded: boolean;
  counts: Record<string, number>;
  message: string;
}> {
  const mongo = await getMongoDb();
  if (!mongo) {
    return {
      seeded: false,
      counts: {},
      message: 'MongoDB URI is not configured yet.',
    };
  }

  const { db } = mongo;
  const counts: Record<string, number> = {};

  // 1. Projects
  const projectsColl = db.collection('projects');
  counts.projects = await projectsColl.countDocuments();
  if (counts.projects === 0) {
    await projectsColl.insertMany(INITIAL_PROJECTS.map((p) => ({ ...p, _id: p.id as any })));
    counts.projects = INITIAL_PROJECTS.length;
  }

  // 2. Services
  const servicesColl = db.collection('services');
  counts.services = await servicesColl.countDocuments();
  if (counts.services === 0) {
    await servicesColl.insertMany(INITIAL_SERVICES.map((s) => ({ ...s, _id: s.id as any })));
    counts.services = INITIAL_SERVICES.length;
  }

  // 3. Pricing Plans
  const pricingColl = db.collection('pricing_plans');
  counts.pricing_plans = await pricingColl.countDocuments();
  if (counts.pricing_plans === 0) {
    await pricingColl.insertMany(INITIAL_PRICING_PLANS.map((p) => ({ ...p, _id: p.id as any })));
    counts.pricing_plans = INITIAL_PRICING_PLANS.length;
  }

  // 4. Messages / Inquiries
  const messagesColl = db.collection('messages');
  counts.messages = await messagesColl.countDocuments();
  if (counts.messages === 0) {
    await messagesColl.insertMany(INITIAL_MESSAGES.map((m) => ({ ...m, _id: m.id as any })));
    counts.messages = INITIAL_MESSAGES.length;
  }

  // 5. WhatsApp Config
  const whatsappColl = db.collection('whatsapp_config');
  counts.whatsapp_config = await whatsappColl.countDocuments();
  if (counts.whatsapp_config === 0) {
    await whatsappColl.insertOne({ ...INITIAL_WHATSAPP_CONFIG, _id: 'global_whatsapp_config' as any });
    counts.whatsapp_config = 1;
  }

  // 6. Media Assets (Images and Videos as Link format)
  const mediaColl = db.collection('media_assets');
  counts.media_assets = await mediaColl.countDocuments();
  if (counts.media_assets === 0) {
    await mediaColl.insertMany(INITIAL_MEDIA_ASSETS.map((m) => ({ ...m, _id: m.id as any })));
    counts.media_assets = INITIAL_MEDIA_ASSETS.length;
  }

  // 7. Testimonials
  const testimonialsColl = db.collection('testimonials');
  counts.testimonials = await testimonialsColl.countDocuments();
  if (counts.testimonials === 0) {
    await testimonialsColl.insertMany(INITIAL_TESTIMONIALS.map((t) => ({ ...t, _id: t.id as any })));
    counts.testimonials = INITIAL_TESTIMONIALS.length;
  }

  // 8. Team Members
  const teamColl = db.collection('team');
  counts.team = await teamColl.countDocuments();
  if (counts.team === 0) {
    await teamColl.insertMany(INITIAL_TEAM.map((tm) => ({ ...tm, _id: tm.id as any })));
    counts.team = INITIAL_TEAM.length;
  }

  // 9. Articles
  const articlesColl = db.collection('articles');
  counts.articles = await articlesColl.countDocuments();
  if (counts.articles === 0) {
    await articlesColl.insertMany(INITIAL_ARTICLES.map((a) => ({ ...a, _id: a.id as any })));
    counts.articles = INITIAL_ARTICLES.length;
  }

  // 10. Notifications
  const notifColl = db.collection('notifications');
  counts.notifications = await notifColl.countDocuments();
  if (counts.notifications === 0) {
    await notifColl.insertMany(INITIAL_NOTIFICATIONS.map((n) => ({ ...n, _id: n.id as any })));
    counts.notifications = INITIAL_NOTIFICATIONS.length;
  }

  // 11. Studio Settings
  const settingsColl = db.collection('studio_settings');
  counts.studio_settings = await settingsColl.countDocuments();
  if (counts.studio_settings === 0) {
    await settingsColl.insertOne({ ...INITIAL_STUDIO_SETTINGS, _id: 'global_studio_settings' as any });
    counts.studio_settings = 1;
  }

  // 12. Admin User
  const adminColl = db.collection('admin_users');
  counts.admin_users = await adminColl.countDocuments();
  if (counts.admin_users === 0) {
    await adminColl.insertOne({ ...INITIAL_ADMIN_USER, _id: 'primary_admin' as any });
    counts.admin_users = 1;
  }

  return {
    seeded: true,
    counts,
    message: 'MongoDB database successfully initialized and synchronized.',
  };
}

/**
 * Normalizes a MongoDB document so that _id is represented as string id
 */
export function normalizeDoc<T extends { id?: string; _id?: any }>(doc: T): T & { id: string } {
  if (!doc) return doc as any;
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: (rest as any).id || (_id ? _id.toString() : String(Date.now())),
  } as T & { id: string };
}
