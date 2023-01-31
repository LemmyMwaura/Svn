// middleware.ts
// This function can be marked `async` if using `await` inside
import { withAuth } from 'next-auth/middleware'
export const config = {
  matcher: [
    /*
     * All routes including the APIs are protected
     * Match all request paths except for the ones starting with:
     * - index (landingpage)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!/|_next/static|_next/image|favicon.ico).*)',
  ],
}

export default withAuth({
  pages: {
    signIn: '/login',
  },
})
