import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALE_PREFIXES = ["/de", "/nl", "/fr", "/es", "/it", "/pt"] as const;
type Locale = "de" | "nl" | "fr" | "es" | "it" | "pt";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set("x-pathname", pathname);

  // Detect locale from current path
  const localeFromPath = LOCALE_PREFIXES.find((p) => pathname.startsWith(p))?.slice(1) as Locale | undefined;

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (localeFromPath) {
    // Remember the user's preferred locale for 30 days
    response.cookies.set("preferred-locale", localeFromPath, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
  } else if (pathname === "/") {
    // User explicitly navigated to the English homepage — clear locale preference
    // so the nav/footer render in English, not a previously visited locale
    response.cookies.delete("preferred-locale");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
