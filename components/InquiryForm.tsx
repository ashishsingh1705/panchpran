"use client";

import { useState } from "react";
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
    sent: "धन्यवाद। आपका संदेश भेज दिया गया है — हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    error: "संदेश भेजने में समस्या हुई। कृपया कुछ देर बाद फिर से प्रयास करें।",
    notConfigured: "यह फॉर्म अभी सेट अप नहीं हुआ है। कृपया बाद में फिर से प्रयास करें।",
  },
  en: {
    name: "Full name",
    email: "Email",
    message: "Message",
    submit: "Send",
    sending: "Sending…",
    sent: "Thank you. Your message has been sent — our team will get back to you soon.",
    error: "Something went wrong sending your message. Please try again shortly.",
    notConfigured: "This form isn't set up yet. Please check back later.",
  },
};

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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "not_configured">("idle");
  const [renderedAt] = useState(() => Date.now());

  if (status === "sent") {
    return (
      <div className={styles.panel}>
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>{t.sent}</p>
      </div>
    );
  }

  return (
    <form
      className={styles.panel}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        setStatus("sending");
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
            }),
          });
          const json = await res.json().catch(() => ({ ok: false }));
          if (res.ok && json.ok) {
            setStatus("sent");
          } else if (res.status === 503) {
            setStatus("not_configured");
          } else {
            setStatus("error");
          }
        } catch {
          setStatus("error");
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
      <button type="submit" className="btn btn-secondary" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </button>
      {status === "error" && (
        <p role="alert" style={{ fontSize: 13.5, color: "var(--color-error)" }}>
          {t.error}
        </p>
      )}
      {status === "not_configured" && (
        <p role="alert" className="mono" style={{ fontSize: 11.5, color: "var(--color-text-faint)", lineHeight: 1.7 }}>
          {t.notConfigured}
        </p>
      )}
    </form>
  );
}
