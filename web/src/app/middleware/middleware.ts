import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return secret;
}

async function verifyJwtToken(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Your token is expired or not valid");
    }
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value; // Get the token value

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const verifiedToken = await verifyJwtToken(token);

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const role = verifiedToken.role as string;
  const emailConfirmed = verifiedToken.emailConfirmed as boolean;

  if (pathname.startsWith("/email-confirmation") && emailConfirmed) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (role) {
    if (pathname.startsWith("/dashboard/customer") && role === "CUSTOMER") {
      return NextResponse.next();
    } else if (
      pathname.startsWith("/dashboard/organizer") &&
      role === "ORGANIZER"
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/payment/:path",
    "/email-confirmation/:path*",
  ],
};
