import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });

  const pathname = req.nextUrl.pathname;
  const protectedPath = pathname === "/admin";

  // if (token && pathname === protectedPath)
  //   return NextResponse.redirect(new URL("/", req.url));
  if (!token && protectedPath)
    return NextResponse.redirect(new URL("/login", req.url));

  NextResponse.next();
}

export const matcher = ["/", "/admin", "/login"];
