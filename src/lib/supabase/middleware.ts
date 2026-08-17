import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Protect admin routes via JWT
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login');

  if (isAdminRoute) {
    const adminToken = request.cookies.get('admin_token')?.value;
    let isAdmin = false;
    
    if (adminToken) {
      try {
        const { jwtVerify } = await import('jose');
        const secretKey = process.env.ADMIN_JWT_SECRET || 'fallback-secret-for-dev-only-change-me';
        const encodedKey = new TextEncoder().encode(secretKey);
        await jwtVerify(adminToken, encodedKey, { algorithms: ['HS256'] });
        isAdmin = true;
      } catch (e) {
        isAdmin = false;
      }
    }

    if (!isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // Admin trying to access admin login while already logged in
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    if (adminToken) {
      try {
        const { jwtVerify } = await import('jose');
        const secretKey = process.env.ADMIN_JWT_SECRET || 'fallback-secret-for-dev-only-change-me';
        const encodedKey = new TextEncoder().encode(secretKey);
        await jwtVerify(adminToken, encodedKey, { algorithms: ['HS256'] });
        
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      } catch (e) {
        // invalid token, let them access login
      }
    }
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect specific routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');


  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user is authenticated and tries to access /login, redirect to dashboard
  if (user && request.nextUrl.pathname.startsWith('/login')) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
  }

  return supabaseResponse
}
