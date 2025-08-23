import { NextResponse } from 'next/server';

const Middleware = (req) => {
  const token = req.cookies.get('petty_cash_access_token');
  
  if (token && req.nextUrl.pathname.toLowerCase() === '/') {
    return NextResponse.redirect(new URL(req.nextUrl.origin + '/dashboard'));
  } else if (token && req.nextUrl.pathname.toLowerCase() === '/petty-cash') {
    return NextResponse.redirect(new URL(req.nextUrl.origin + '/dashboard'));
  } else if (!token && req.nextUrl.pathname.toLowerCase() !== '/petty-cash') {
    return NextResponse.redirect(new URL(req.nextUrl.origin + '/petty-cash'));
  } else if (req.nextUrl.pathname !== req.nextUrl.pathname.toLocaleLowerCase()) {
    return NextResponse.redirect(`${req.nextUrl.origin}${req.nextUrl.pathname.toLocaleLowerCase()}${req.nextUrl.search}`);
  } else {
    return NextResponse.next();
  }
};

export default Middleware;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}