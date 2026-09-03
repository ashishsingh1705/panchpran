import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./lib/i18n";

// Next.js lazily pulls in internal deps (ua-parser-js, @opentelemetry/api)
// the first time a request touches things like request.ua/geo or tracing,
// and their bundled code references the bare Node global `__dirname`.
// Vercel's Edge runtime has no such global, and webpack's usual per-module
// shim for it isn't surviving Vercel's build pipeline for this project
// (see next.config.mjs), so requests were crashing with
// "ReferenceError: __dirname is not defined" before this function ever ran.
// Defining it as a global here, once per cold start, is a bundler-agnostic
// fallback: any later bare reference to `__dirname` resolves to this
// instead of throwing.
if (typeof (globalThis as { __dirname?: string }).__dirname === "undefined") {
  (globalThis as { __dirname?: string }).__dirname = "/";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
