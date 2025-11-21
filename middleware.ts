import { auth } from "@/auth"

const publicRoutes = ['/', '/login', '/register'];

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  if (req.auth?.error === 'RefreshAccessTokenError') {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
  
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
