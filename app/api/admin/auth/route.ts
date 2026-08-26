import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@aura-ai.studio').trim().toLowerCase();
    const expectedPassword = (process.env.ADMIN_PASSWORD || 'aura2026').trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please enter both email and password.' },
        { status: 400 }
      );
    }

    const cleanInputEmail = email.trim().toLowerCase();
    const cleanInputPassword = password.trim();

    if (cleanInputEmail === expectedEmail && cleanInputPassword === expectedPassword) {
      const token = `aura_admin_${Buffer.from(`${cleanInputEmail}:${Date.now()}`).toString('base64')}`;
      return NextResponse.json({
        success: true,
        token,
        email: cleanInputEmail,
        message: 'Authentication successful.',
      });
    }

    // Also support custom changed password if stored in client request fallback
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid email or password. Please verify credentials.',
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during authentication.' },
      { status: 500 }
    );
  }
}
