import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login?redirect=/admin', req.url));
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Protect vendor dashboard routes
  if (req.nextUrl.pathname.startsWith('/vendor/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login?redirect=/vendor/dashboard', req.url));
    }

    // Check if user is a vendor
    const { data: vendor } = await supabase
      .from('vendors')
      .select('status')
      .eq('owner_id', session.user.id)
      .single();

    if (!vendor || vendor.status !== 'approved') {
      return NextResponse.redirect(new URL('/vendor/register', req.url));
    }
  }

  // Protect checkout page
  if (req.nextUrl.pathname === '/checkout') {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login?redirect=/checkout', req.url));
    }
  }

  // Protect profile and orders pages
  if (req.nextUrl.pathname.startsWith('/profile') || req.nextUrl.pathname.startsWith('/orders')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/vendor/dashboard/:path*',
    '/checkout',
    '/profile/:path*',
    '/orders/:path*',
  ],
};
