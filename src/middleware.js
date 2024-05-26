import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  NextResponse.next();
}
