// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.cookies.get('signed-in')?.value !== 'true') {
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|uploads|images|SVG|signin|_next/static|_next/image|favicon.ico).*)',
    ],
}