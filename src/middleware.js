
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('authToken')?.value;
  const url = req.nextUrl.clone();
  url.pathname = '/auth/login';

  if (!token) {
    return NextResponse.redirect(url);
  }


     return NextResponse.next();

}

// Specify the routes that should be protected
export const config = {
  matcher: ['/admin/post', '/admin/write'], // Protect routes starting with /protected/
};