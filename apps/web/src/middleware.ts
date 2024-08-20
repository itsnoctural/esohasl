import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "./lib/api";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.length > 2) {
    const match = pathname.match(/\/raw\/([^\/]+)/);
    if (match) {
      const { status } = await api.v1.scripts.raw({ id: match[1] }).get();

      if (status === 200)
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_API}/v1/scripts/raw/${match[1]}`,
          { status: 308 },
        );

      return NextResponse.next();
    }

    const { status } = await api.v1.scripts({ id: pathname.slice(1) }).get();

    if (status === 200)
      return NextResponse.redirect(
        new URL(`/script${request.nextUrl.pathname}`, request.url),
        { status: 308 },
      );
  }

  NextResponse.next();
}

export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|signin|tos|privacy|script|upload).*)",
};
