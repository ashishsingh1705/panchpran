import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rateLimit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { notifyOpsOfFailure } from "@/lib/opsAlert";

export const runtime = "nodejs";

const INQUIRY_TYPES = ["contact", "volunteer", "partner"] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

const TYPE_LABEL: Record<InquiryType, string> = {
  contact: "Contact",
  volunteer: "Volunteer",
  partner: "Partner / CSR",
};

const MIN_FILL_TIME_MS = 2000;
const MAX_FIELD_LENGTH = 5000;

const CONFIRMATION_COPY = {
  hi: {
    subject: "हमें आपका संदेश मिल गया है — पंच प्रण विकास ट्रस्ट",
    body: (name: string) =>
      `<p>नमस्ते ${name},</p><p>धन्यवाद, हमें आपका संदेश मिल गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।</p><p>पंच प्रण विकास ट्रस्ट</p>`,
  },
  en: {
    subject: "We've received your message — Panch Pran Vikas Trust",
    body: (name: string) =>
      `<p>Hi ${name},</p><p>Thank you — we've received your message and our team will get back to you soon.</p><p>Panch Pran Vikas Trust</p>`,
  },
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeForHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed, retryAfterSeconds } = checkRateLimit(`inquiry:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const type = body.type;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const extra = typeof body.extra === "string" ? body.extra.trim() : "";
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";
  const renderedAt = typeof body.renderedAt === "number" ? body.renderedAt : 0;
  const consent = body.consent === true;
  const locale = body.locale === "en" ? "en" : "hi";
  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";

  if (typeof type !== "string" || !INQUIRY_TYPES.includes(type as InquiryType)) {
    return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 });
  }
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || message.length > MAX_FIELD_LENGTH || extra.length > 200) {
    return NextResponse.json({ ok: false, error: "field_too_long" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });
  }

  // Bot defenses that need no external service: a hidden field real users
  // never fill, and a minimum time between the form rendering and submitting.
  // Both report success to the caller so a bot doesn't learn to adapt.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }
  if (renderedAt && Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  const turnstileOk = await verifyTurnstileToken(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ ok: false, error: "turnstile_failed" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inquiryType = type as InquiryType;
  const toEmail = process.env[`INQUIRY_TO_EMAIL_${inquiryType.toUpperCase()}`] || process.env.INQUIRY_TO_EMAIL;
  const fromEmail = process.env.INQUIRY_FROM_EMAIL || "Panch Pran Vikas Trust Website <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.error("Inquiry form submitted but RESEND_API_KEY / INQUIRY_TO_EMAIL is not configured.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const safeName = sanitizeForHeader(name);
  const consentedAt = new Date().toISOString();

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[${TYPE_LABEL[inquiryType]}] New submission from ${safeName}`,
      html: `
        <p><strong>Form:</strong> ${TYPE_LABEL[inquiryType]}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${extra ? `<p><strong>Additional field:</strong> ${escapeHtml(extra)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="font-size:12px;color:#667370">Consent to Privacy Policy given at ${consentedAt} · IP ${escapeHtml(ip)}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      notifyOpsOfFailure(`[PPVT website] Inquiry email failed to send (${inquiryType}): ${error.message ?? "unknown error"}`);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Inquiry send failed:", err);
    notifyOpsOfFailure(`[PPVT website] Inquiry email threw an exception (${inquiryType}): ${String(err)}`);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // Best-effort confirmation copy to the submitter. Its failure must not
  // fail the request — the trust has already received the message.
  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: CONFIRMATION_COPY[locale].subject,
      html: CONFIRMATION_COPY[locale].body(escapeHtml(name)),
    });
  } catch (err) {
    console.error("Confirmation email failed (non-fatal):", err);
  }

  return NextResponse.json({ ok: true });
}
