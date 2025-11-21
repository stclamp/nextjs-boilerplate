import { auth } from "@/auth"
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const publicRoutes = ['/', '/login', '/register'];
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname;
  
  // Remove locale prefix to check public routes (supports any locale from routing config)
  const localePattern = new RegExp(`^/(${routing.locales.join('|')})`);
  const pathnameWithoutLocale = pathname.replace(localePattern, '') || '/';
  
  const isPublicRoute = publicRoutes.includes(pathnameWithoutLocale);

  if (req.auth?.error === 'RefreshAccessTokenError') {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
  
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }

  return intlMiddleware(req);
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
