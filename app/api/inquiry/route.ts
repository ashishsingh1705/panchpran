import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
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

  // Bot defenses that need no external service: a hidden field real users
  // never fill, and a minimum time between the form rendering and submitting.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }
  if (renderedAt && Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL;
  const fromEmail = process.env.INQUIRY_FROM_EMAIL || "Panch Pran Vikas Trust Website <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.error("Inquiry form submitted but RESEND_API_KEY / INQUIRY_TO_EMAIL is not configured.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const inquiryType = type as InquiryType;
  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[${TYPE_LABEL[inquiryType]}] New submission from ${name}`,
      html: `
        <p><strong>Form:</strong> ${TYPE_LABEL[inquiryType]}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${extra ? `<p><strong>Additional field:</strong> ${escapeHtml(extra)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Inquiry send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
