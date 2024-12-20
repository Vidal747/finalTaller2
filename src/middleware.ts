import { NextRequest, NextResponse } from 'next/server';
// Sources
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path.startsWith('/api/') && !path.startsWith('/api/auth')) {
        return NextResponse.next();
    } else if (path.startsWith('/dashboard/admin')) {
        const token = await getToken({req: req as any});
        
        if (!token?.user.role.name || token.user.role.name !== 'Administrador') {
            return NextResponse.redirect(new URL('/auth/signin', req.url));
        }

        return await withAuth(req as NextRequestWithAuth);
    } else if (path.startsWith('/dashboard')) {
        return await withAuth(req as NextRequestWithAuth);
    }
}

export const config = { 
    matcher: [
        '/dashboard/:path*',
        '/api/:path*'
    ] 
}