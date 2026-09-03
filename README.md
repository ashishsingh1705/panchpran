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
- `app/api/inquiry/` — the one backend route in this repo: sends Contact /
  Volunteer / Partner form submissions by email via Resend.
- `components/` — shared UI: Header (with mobile drawer + "Our Work" disclosure),
  Footer, pillar icons, image placeholders, the donate flow, reveal-on-scroll.
- `lib/` — content dictionaries (`pillars.ts`, `homeContent.ts`, `legal.ts`,
  `orgDetails.ts`) and the locale/nav configuration (`i18n.ts`).

## Environment variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes, for forms to work | From [resend.com](https://resend.com) (free tier is enough) |
| `INQUIRY_TO_EMAIL` | Yes, for forms to work | The inbox that receives Contact/Volunteer/Partner submissions |
| `INQUIRY_FROM_EMAIL` | No | Defaults to Resend's shared sender; set once you verify your own domain in Resend |

Without the first two set, `/api/inquiry` returns an honest "not configured"
response rather than a fake success — the forms are built to fail loudly, not
silently pretend a message was sent.

**Who can see form submissions right now**: nobody has built a database or
admin panel for this yet — submissions arrive as email in the `INQUIRY_TO_EMAIL`
inbox. That inbox *is* the access control, so keep 2FA on it. If you need
submissions logged somewhere queryable (e.g. a CRM or spreadsheet) rather than
just an inbox, that's a bigger addition — ask and it can be built.

## Deploying (Vercel)

1. Push this repo to GitHub (already done if you're reading this from the PR).
2. In Vercel, "Add New Project" → import this repository. It auto-detects
   Next.js — no build configuration needed.
3. Under Project Settings → Environment Variables, add `RESEND_API_KEY` and
   `INQUIRY_TO_EMAIL` (and `INQUIRY_FROM_EMAIL` once you have a verified
   sending domain).
4. Deploy. Add your custom domain under Project Settings → Domains once you've
   purchased one, then update `metadataBase` in
   `app/[locale]/layout.tsx` and the URLs in `app/sitemap.ts` /
   `app/robots.ts` to match the real domain.

## Design-integrity rules carried over from the brief

- No fabricated registration numbers, certifications, partner logos or impact
  statistics anywhere — every figure is an em-dash placeholder with a "why" note.
- The donate flow is a working prototype (validation, steps, directed giving) but
  is explicitly labelled as not connected to a payment gateway.
- Photography slots are placeholders with art-direction labels, not real images.

## Known gaps

- Payment gateway integration (Razorpay/Cashfree/PayU) is not wired up; the
  donate flow is a working prototype and a direct bank-transfer option is
  published as an interim path (see `lib/orgDetails.ts`).
- Trustee names, registered office, phone, IFSC code, 80G/12A status and
  verified impact figures are all pending the trust supplying them.
- No CMS/admin panel — all content is in code; updating it means a code
  change and redeploy.
- Not yet deployed to a live domain.
