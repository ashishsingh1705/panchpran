# Panch Pran Vikas Trust — Website

Bilingual (Hindi-led, English-supported) marketing and trust-building website for
पंच प्रण विकास ट्रस्ट, built with Next.js (App Router) from the design handoff in
`Screens and language details_v1.zip`.

## Stack

- Next.js 14 (App Router, TypeScript), statically generated
- CSS Modules for styling, design tokens as CSS custom properties in `app/globals.css`
- next/font for self-hosted Plus Jakarta Sans, Noto Sans Devanagari and IBM Plex Mono
- No external UI libraries

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/hi` (Hindi). Switch locale with the
header language switcher or by visiting `/en`.

```bash
npm run build   # production build (static export of all locale routes)
npm run start   # serve the production build
```

## Structure

- `app/[locale]/` — all routes, duplicated per locale (`hi`, `en`) via a dynamic
  segment; `middleware.ts` redirects locale-less paths to the default locale.
- `components/` — shared UI: Header (with mobile drawer + "Our Work" disclosure),
  Footer, pillar icons, image placeholders, the donate flow, reveal-on-scroll.
- `lib/` — content dictionaries (`pillars.ts`, `homeContent.ts`, `legal.ts`) and the
  locale/nav configuration (`i18n.ts`).

## Design-integrity rules carried over from the brief

- No fabricated registration numbers, certifications, partner logos or impact
  statistics anywhere — every figure is an em-dash placeholder with a "why" note.
- The donate flow is a working prototype (validation, steps, directed giving) but
  is explicitly labelled as not connected to a payment gateway.
- Photography slots are placeholders with art-direction labels, not real images.

## Known gaps (tracked from the design handoff)

- Payment gateway integration (Razorpay/Cashfree/PayU) is not wired up.
- Trustee names, registration details, verified impact figures and real
  photography are all pending the trust supplying them.
- Contact/volunteer/partner forms are UI-only; they need a form-handling backend.
