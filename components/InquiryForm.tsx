"use client";

import { useState } from "react";
import styles from "./DonateFlow.module.css";
import type { Locale } from "@/lib/i18n";

const copy = {
  hi: {
    name: "पूरा नाम",
    email: "ईमेल",
    message: "संदेश",
    submit: "भेजें",
    note: "यह फॉर्म अभी बैकएंड से जुड़ा नहीं है — इसे प्रोडक्शन में एक फॉर्म-हैंडलिंग सेवा से जोड़ा जाना है।",
    sent: "धन्यवाद। जब यह फॉर्म बैकएंड से जुड़ेगा, तब आपका संदेश यहां भेजा जाएगा।",
  },
  en: {
    name: "Full name",
    email: "Email",
    message: "Message",
    submit: "Send",
    note: "This form is not yet connected to a backend — it needs a form-handling service wired up in production.",
    sent: "Thank you. Once this form is connected to a backend, your message will be sent from here.",
  },
};

export default function InquiryForm({ locale, extraFieldLabel }: { locale: Locale; extraFieldLabel?: { hi: string; en: string } }) {
  const t = copy[locale];
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.panel}>
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>{t.sent}</p>
      </div>
    );
  }

  return (
    <form
      className={styles.panel}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className={styles.field}>
        <label htmlFor="inquiry-name">{t.name}</label>
        <input id="inquiry-name" type="text" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="inquiry-email">{t.email}</label>
        <input id="inquiry-email" type="email" required />
      </div>
      {extraFieldLabel && (
        <div className={styles.field}>
          <label htmlFor="inquiry-extra">{extraFieldLabel[locale]}</label>
          <input id="inquiry-extra" type="text" />
        </div>
      )}
      <div className={styles.field}>
        <label htmlFor="inquiry-message">{t.message}</label>
        <textarea id="inquiry-message" rows={4} required style={{ padding: 13, border: "1px solid var(--color-border-strong)", borderRadius: "var(--radius-sm)", background: "var(--color-bg)", font: "inherit", fontSize: 15 }} />
      </div>
      <button type="submit" className="btn btn-secondary">
        {t.submit}
      </button>
      <p className="mono" style={{ fontSize: 11.5, color: "var(--color-text-faint)", lineHeight: 1.7 }}>
        {t.note}
      </p>
    </form>
  );
}
