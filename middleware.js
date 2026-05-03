import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = pathname.startsWith('/my-profile') || pathname.startsWith('/tile/');

  if (!isPrivateRoute) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    const session = await response.json();

    if (!session || Object.keys(session).length === 0) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-profile/:path*', '/tile/:path*'],
};