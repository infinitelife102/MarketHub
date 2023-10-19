import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub as string | undefined;

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/auth/login?redirect=/admin', request.url));
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/vendor/dashboard')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/auth/login?redirect=/vendor/dashboard', request.url));
    }
    const { data: vendor } = await supabase
      .from('vendors')
      .select('status')
      .eq('owner_id', userId)
      .single();
    if (!vendor || vendor.status !== 'approved') {
      return NextResponse.redirect(new URL('/vendor/register', request.url));
    }
  }

  if (request.nextUrl.pathname === '/checkout') {
    if (!userId) {
      return NextResponse.redirect(new URL('/auth/login?redirect=/checkout', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/orders')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return response;
}
