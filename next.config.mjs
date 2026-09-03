/** @type {import('next').NextConfig} */

// A note on this CSP: it allows 'unsafe-inline' for scripts and styles.
// That's a deliberate tradeoff, not an oversight — a stricter nonce-based
// CSP is possible in Next.js, but it requires reading the nonce via
// headers() in the root layout, which forces every page into dynamic
// (per-request) rendering. This site is almost entirely static content and
// the design brief explicitly targets static rendering for performance, so
// this config keeps everything statically generated and accepts a weaker
// script-src in exchange. Revisit if/when a page here genuinely needs
// per-request rendering anyway.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Force a real cache miss on Vercel. Every deploy log for this project has
  // shown "Restored build cache from previous deployment" followed by the
  // exact same 26.6 kB middleware bundle and the exact same
  // "ReferenceError: __dirname is not defined" crash — unchanged across
  // several source-level fixes that each verified clean in a local, fully
  // fresh `next build`. That means Vercel's restored `.next/cache` is
  // handing back a stale, pre-fix compiled middleware artifact that `next
  // build` isn't correctly invalidating on its own. Renaming the output
  // directory means there is nothing under that name for Vercel to restore,
  // so the next deploy is guaranteed to compile from source instead of
  // reusing whatever produced every prior crash.
  distDir: "build",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  // Next.js bundles a few internal deps (ua-parser-js, @opentelemetry/api)
  // into the middleware's Edge bundle that reference `__dirname` at module
  // load time. Webpack normally shims that per-module with an `eval("var
  // __dirname = ...")` wrapper, but that shim doesn't fire reliably inside
  // Vercel's production Edge runtime, crashing every request with
  // "ReferenceError: __dirname is not defined". Telling webpack to mock
  // `__dirname` as a literal string at build time for the edge compilation
  // removes the runtime shim entirely, so there's nothing left to fail.
  webpack: (config, { nextRuntime }) => {
    if (nextRuntime === "edge") {
      config.node = { ...config.node, __dirname: true };
      // Vercel restores Next's persistent webpack cache from the previous
      // deployment before every build. That cache doesn't reliably bust
      // just because this file changed, so a stale edge bundle (built
      // before the __dirname mock above existed) can get reused verbatim.
      // Disabling the cache for the edge compilation forces it to always
      // recompile from source, so this config can never silently stop
      // applying again.
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
