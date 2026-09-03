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
    }
    return config;
  },
};

export default nextConfig;
