import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createAdminToken } from '@/lib/auth/jwt';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { checkRateLimit } from '@/lib/auth/rateLimit';

export async function POST(request: Request) {
  try {
    // H1: Rate limiting by IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
    const { allowed, retryAfterSec } = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
      );
    }

    // H5: Input validation
    const body = await request.json();
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    if (username.length > 100 || password.length > 200) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch the admin record
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, username, password_hash')
      .eq('username', username)
      .single();

    if (error || !admin) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Update last_login
    await supabase.from('admins').update({ last_login: new Date().toISOString() }).eq('id', admin.id);

    // Create JWT
    const token = await createAdminToken({ id: admin.id, username: admin.username });

    // H2: Hardened cookie settings
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // H2: Changed from 'lax' to 'strict' to prevent CSRF
      path: '/',
      maxAge: 60 * 60 * 2, // H2: Reduced from 24 hours to 2 hours
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
