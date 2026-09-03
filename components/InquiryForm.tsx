"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import styles from "./DonateFlow.module.css";
import type { Locale } from "@/lib/i18n";

export type InquiryType = "contact" | "volunteer" | "partner";

const copy = {
  hi: {
    name: "पूरा नाम",
    email: "ईमेल",
    message: "संदेश",
    submit: "भेजें",
    sending: "भेजा जा रहा है…",
    sent: "धन्यवाद। आपका संदेश भेज दिया गया है — हमारी टीम जल्द ही आपसे संपर्क करेगी। पुष्टि के लिए एक ईमेल भी भेजा गया है।",
    consentPrefix: "मैं ",
    consentLink: "गोपनीयता नीति",
    consentSuffix: " पढ़ चुका/चुकी हूं और सहमत हूं।",
    errors: {
      default: "संदेश भेजने में समस्या हुई। कृपया कुछ देर बाद फिर से प्रयास करें।",
      rate_limited: "बहुत सारे प्रयास हो गए हैं। कृपया एक मिनट बाद फिर से प्रयास करें।",
      consent_required: "आगे बढ़ने के लिए कृपया गोपनीयता नीति से सहमति दें।",
      turnstile_failed: "सत्यापन विफल रहा। कृपया पेज रीलोड करके फिर से प्रयास करें।",
      not_configured: "यह फॉर्म अभी सेट अप नहीं हुआ है। कृपया बाद में फिर से प्रयास करें।",
    },
  },
  en: {
    name: "Full name",
    email: "Email",
    message: "Message",
    submit: "Send",
    sending: "Sending…",
    sent: "Thank you. Your message has been sent — our team will get back to you soon. A confirmation email is on its way too.",
    consentPrefix: "I have read and agree to the ",
    consentLink: "Privacy Policy",
    consentSuffix: ".",
    errors: {
      default: "Something went wrong sending your message. Please try again shortly.",
      rate_limited: "Too many attempts. Please try again in a minute.",
      consent_required: "Please agree to the Privacy Policy to continue.",
      turnstile_failed: "Verification failed. Please reload the page and try again.",
      not_configured: "This form isn't set up yet. Please check back later.",
    },
  },
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    onTurnstileVerified?: (token: string) => void;
  }
}

export default function InquiryForm({
  locale,
  type,
  extraFieldLabel,
}: {
  locale: Locale;
  type: InquiryType;
  extraFieldLabel?: { hi: string; en: string };
}) {
  const t = copy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [consented, setConsented] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [renderedAt] = useState(() => Date.now());

  useEffect(() => {
    window.onTurnstileVerified = (token: string) => setTurnstileToken(token);
    return () => {
      delete window.onTurnstileVerified;
    };
  }, []);

  if (status === "sent") {
    return (
      <div className={styles.panel}>
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>{t.sent}</p>
      </div>
    );
  }

  const needsTurnstile = Boolean(TURNSTILE_SITE_KEY);
  const canSubmit = consented && (!needsTurnstile || Boolean(turnstileToken)) && status !== "sending";

  return (
    <form
      className={styles.panel}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        setStatus("sending");
        setErrorCode(null);
        try {
          const res = await fetch("/api/inquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type,
              name: data.get("name"),
              email: data.get("email"),
              extra: data.get("extra") ?? "",
              message: data.get("message"),
              company: data.get("company") ?? "",
              renderedAt,
              consent: consented,
              locale,
              turnstileToken,
            }),
          });
          const json = await res.json().catch(() => ({ ok: false, error: "default" }));
          if (res.ok && json.ok) {
            setStatus("sent");
          } else {
            setStatus("idle");
            setErrorCode(json.error && json.error in t.errors ? json.error : "default");
          }
        } catch {
          setStatus("idle");
          setErrorCode("default");
        }
      }}
    >
      {/* Honeypot field: hidden from real users, bots tend to fill every input */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="inquiry-company">Company</label>
        <input id="inquiry-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.field}>
        <label htmlFor="inquiry-name">{t.name}</label>
        <input id="inquiry-name" name="name" type="text" required maxLength={200} />
      </div>
      <div className={styles.field}>
        <label htmlFor="inquiry-email">{t.email}</label>
        <input id="inquiry-email" name="email" type="email" required maxLength={200} />
      </div>
      {extraFieldLabel && (
        <div className={styles.field}>
          <label htmlFor="inquiry-extra">{extraFieldLabel[locale]}</label>
          <input id="inquiry-extra" name="extra" type="text" maxLength={200} />
        </div>
      )}
      <div className={styles.field}>
        <label htmlFor="inquiry-message">{t.message}</label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          required
          maxLength={5000}
          style={{
            padding: 13,
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-sm)",
            background: "var(--color-bg)",
            font: "inherit",
            fontSize: 15,
          }}
        />
      </div>

      <label className={styles.checkboxRow} style={{ fontSize: 13.5 }}>
        <input type="checkbox" checked={consented} onChange={(e) => setConsented(e.target.checked)} required />
        <span>
          {t.consentPrefix}
          <Link href={`/${locale}/legal/privacy`} className="section-link" target="_blank">
            {t.consentLink}
          </Link>
          {t.consentSuffix}
        </span>
      </label>

      {needsTurnstile && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-callback="onTurnstileVerified" />
        </>
      )}

      <button type="submit" className="btn btn-secondary" disabled={!canSubmit}>
        {status === "sending" ? t.sending : t.submit}
      </button>
      {errorCode && (
        <p role="alert" style={{ fontSize: 13.5, color: "var(--color-error)" }}>
          {t.errors[errorCode as keyof typeof t.errors] ?? t.errors.default}
        </p>
      )}
    </form>
  );
}
