"use client";

import { useState } from "react";
import styles from "./DonateFlow.module.css";
import { pillars } from "@/lib/pillars";
import type { Locale } from "@/lib/i18n";

const AMOUNTS = [500, 1000, 2500];
const MIN_AMOUNT = 100;

const copy = {
  hi: {
    steps: ["राशि", "विवरण", "पुष्टि", "धन्यवाद"],
    once: "एकबार",
    monthly: "मासिक",
    chooseAmount: "राशि चुनें",
    orEnter: "या अन्य राशि दर्ज करें",
    amountError: `कृपया कम से कम ₹${MIN_AMOUNT} की राशि चुनें या दर्ज करें।`,
    directed: "अपना योगदान निर्देशित करें (वैकल्पिक)",
    continue: "आगे बढ़ें",
    back: "वापस",
    name: "पूरा नाम",
    email: "ईमेल",
    anon: "मेरा नाम गुमनाम रखें",
    updates: "मुझे कार्यक्रम अपडेट भेजें",
    review: "समीक्षा करें",
    amount: "राशि",
    frequency: "आवृत्ति",
    submit: "सहयोग करें",
    gatewayNote:
      "इस प्रोटोटाइप में भुगतान गेटवे कनेक्ट नहीं है। उत्पादन में भुगतान चरण एक PCI-अनुपालक प्रदाता को सौंपा जाता है; ट्रस्ट के अपने सिस्टम में कोई कार्ड डेटा नहीं आता।",
    reassurance: "सुरक्षित भुगतान · ईमेल द्वारा रसीद · दानदाता विवरण कभी प्रकाशित नहीं होते",
    thankYouTitle: "धन्यवाद।",
    thankYouBody: (amount: string, freq: string, email: string) =>
      `उत्पादन में, ${amount} (${freq}) का योगदान यहां पुष्टि किया जाएगा और ${email} पर एक रसीद भेजी जाएगी।`,
    noPayment: "ध्यान दें: यह एक डिज़ाइन प्रोटोटाइप है। कोई भुगतान नहीं लिया गया है।",
    startOver: "फिर से शुरू करें",
    nameRequired: "जारी रखने के लिए नाम और ईमेल आवश्यक हैं।",
  },
  en: {
    steps: ["Amount", "Details", "Confirm", "Thank you"],
    once: "One-time",
    monthly: "Monthly",
    chooseAmount: "Choose an amount",
    orEnter: "Or enter another amount",
    amountError: `Please choose or enter an amount of at least ₹${MIN_AMOUNT}.`,
    directed: "Direct your contribution (optional)",
    continue: "Continue",
    back: "Back",
    name: "Full name",
    email: "Email",
    anon: "Keep my name anonymous",
    updates: "Send me programme updates",
    review: "Review",
    amount: "Amount",
    frequency: "Frequency",
    submit: "Contribute",
    gatewayNote:
      "Gateway not connected in this prototype. In production the payment step is handed to a PCI-compliant provider; no card data touches the trust's own systems.",
    reassurance: "Secure payment · Receipt by email · Donor details never published",
    thankYouTitle: "Thank you.",
    thankYouBody: (amount: string, freq: string, email: string) =>
      `In production, a contribution of ${amount} (${freq}) would be confirmed here and a receipt sent to ${email}.`,
    noPayment: "Note: this is a design prototype. No payment has been taken.",
    startOver: "Start over",
    nameRequired: "Name and email are required to continue.",
  },
};

export default function DonateFlow({
  locale,
  initialAmount,
  initialFreq,
  initialPillars,
}: {
  locale: Locale;
  initialAmount: number;
  initialFreq: "once" | "monthly";
  initialPillars: string[];
}) {
  const t = copy[locale];
  const [step, setStep] = useState(1);
  const [freq, setFreq] = useState<"once" | "monthly">(initialFreq);
  const [amount, setAmount] = useState(initialAmount);
  const [custom, setCustom] = useState("");
  const [directed, setDirected] = useState<string[]>(initialPillars);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anon, setAnon] = useState(false);
  const [updates, setUpdates] = useState(true);
  const [amountError, setAmountError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const effectiveAmount = custom !== "" ? parseInt(custom, 10) || 0 : amount;
  const amountLabel = effectiveAmount > 0 ? `₹${effectiveAmount.toLocaleString("en-IN")}` : "₹—";
  const freqLabel = freq === "once" ? t.once : t.monthly;

  const pick = (v: number) => {
    setAmount(v);
    setCustom("");
    setAmountError(false);
  };

  const onCustomChange = (v: string) => {
    setCustom(v.replace(/[^0-9]/g, ""));
    setAmountError(false);
  };

  const toggleDirected = (slug: string) => {
    setDirected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const goNext = () => {
    if (step === 1) {
      if (effectiveAmount < MIN_AMOUNT) {
        setAmountError(true);
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!anon && (!name.trim() || !email.trim())) {
        setDetailsError(true);
        return;
      }
      setDetailsError(false);
      setStep(3);
      return;
    }
    setStep(4);
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const reset = () => {
    setStep(1);
    setAmountError(false);
    setDetailsError(false);
    setCustom("");
  };

  if (step === 4) {
    return (
      <div className={styles.thankYou}>
        <h2 lang={locale} style={{ fontFamily: "var(--font-deva)", fontSize: 32, fontWeight: 600 }}>
          {t.thankYouTitle}
        </h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.8, opacity: 0.85 }}>
          {t.thankYouBody(amountLabel, freqLabel, anon ? (locale === "hi" ? "आपका ईमेल" : "your email") : email || "you@example.com")}
        </p>
        <p className="mono" style={{ fontSize: 12, opacity: 0.7 }}>
          {t.noPayment}
        </p>
        <button type="button" className="btn btn-light-on-dark" onClick={reset}>
          {t.startOver}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.stepper} aria-hidden="true">
          {t.steps.slice(0, 3).map((label, i) => {
            const n = i + 1;
            const active = step >= n;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, flex: n < 3 ? 1 : undefined }}>
                <span
                  className={styles.stepDot}
                  style={{
                    background: active ? "var(--color-primary)" : "var(--color-border-strong)",
                    color: active ? "var(--color-on-dark)" : "var(--color-text-muted)",
                  }}
                >
                  {n}
                </span>
                <span className={styles.stepLabel} style={{ color: active ? "var(--color-text)" : "var(--color-text-muted)" }}>
                  {label}
                </span>
                {n < 3 && <span className={styles.stepLine} />}
              </div>
            );
          })}
        </div>

        <div className={styles.panel}>
          {step === 1 && (
            <>
              <div className={styles.toggleTrack} role="radiogroup" aria-label={t.frequency}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={freq === "once"}
                  className={`${styles.toggleBtn} ${freq === "once" ? styles.toggleBtnActive : ""}`}
                  onClick={() => setFreq("once")}
                >
                  {t.once}
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={freq === "monthly"}
                  className={`${styles.toggleBtn} ${freq === "monthly" ? styles.toggleBtnActive : ""}`}
                  onClick={() => setFreq("monthly")}
                >
                  {t.monthly}
                </button>
              </div>

              <div>
                <span style={{ fontSize: 15, fontWeight: 600, display: "block", marginBottom: 12 }}>{t.chooseAmount}</span>
                <div className={styles.amountRow}>
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`${styles.amountChip} ${custom === "" && amount === a ? styles.amountChipActive : ""}`}
                      aria-pressed={custom === "" && amount === a}
                      onClick={() => pick(a)}
                    >
                      ₹{a.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-muted)", display: "block", marginBottom: 8 }}>
                  {t.orEnter}
                </span>
                <div className={styles.customRow}>
                  <span>₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={custom}
                    onChange={(e) => onCustomChange(e.target.value)}
                    aria-label={locale === "hi" ? "रुपये में राशि" : "Amount in rupees"}
                    aria-invalid={amountError}
                    aria-describedby="donate-amount-error"
                    className={styles.customInput}
                  />
                </div>
                {amountError && (
                  <p id="donate-amount-error" role="alert" className={styles.errorText} style={{ marginTop: 8 }}>
                    <span className="status-dot" style={{ background: "var(--color-error)" }} aria-hidden="true" />
                    {t.amountError}
                  </p>
                )}
              </div>

              <div>
                <span className={styles.field} style={{ marginBottom: 10 }}>
                  <label>{t.directed}</label>
                </span>
                <div className={styles.directedRow}>
                  {pillars.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      lang="hi"
                      className={`${styles.pillarChip} ${directed.includes(p.slug) ? styles.pillarChipActive : ""}`}
                      aria-pressed={directed.includes(p.slug)}
                      onClick={() => toggleDirected(p.slug)}
                    >
                      {p.hi}
                    </button>
                  ))}
                </div>
              </div>

              <button type="button" className="btn btn-secondary" onClick={goNext}>
                {t.continue}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className={styles.field}>
                <label htmlFor="donor-name">{t.name}</label>
                <input id="donor-name" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={anon} />
              </div>
              <div className={styles.field}>
                <label htmlFor="donor-email">{t.email}</label>
                <input id="donor-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={anon} />
              </div>
              {detailsError && (
                <p role="alert" className={styles.errorText}>
                  <span className="status-dot" style={{ background: "var(--color-error)" }} aria-hidden="true" />
                  {t.nameRequired}
                </p>
              )}
              <label className={styles.checkboxRow}>
                <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
                {t.anon}
              </label>
              <label className={styles.checkboxRow}>
                <input type="checkbox" checked={updates} onChange={(e) => setUpdates(e.target.checked)} />
                {t.updates}
              </label>
              <div className={styles.actions}>
                <button type="button" className="btn btn-outline" onClick={goBack}>
                  {t.back}
                </button>
                <button type="button" className="btn btn-secondary" onClick={goNext}>
                  {t.continue}
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className={styles.summaryRow}>
                <span>{t.amount}</span>
                <span style={{ fontWeight: 600 }}>{amountLabel}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>{t.frequency}</span>
                <span style={{ fontWeight: 600 }}>{freqLabel}</span>
              </div>
              {directed.length > 0 && (
                <div className={styles.summaryRow}>
                  <span>{t.directed}</span>
                  <span style={{ fontWeight: 600 }} lang="hi">
                    {pillars.filter((p) => directed.includes(p.slug)).map((p) => p.hi).join(", ")}
                  </span>
                </div>
              )}
              <p className="mono" style={{ fontSize: 12, lineHeight: 1.8, color: "var(--color-text-faint)" }}>
                {t.gatewayNote}
              </p>
              <div className={styles.actions}>
                <button type="button" className="btn btn-outline" onClick={goBack}>
                  {t.back}
                </button>
                <button type="button" className="btn btn-secondary" onClick={goNext}>
                  {t.submit}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <aside className={styles.summary}>
        <span className={styles.summaryAmount}>{amountLabel}</span>
        <span style={{ fontSize: 14, color: "var(--color-text-muted-dark)" }}>
          {freqLabel} · {directed.length > 0 ? `${directed.length} ${locale === "hi" ? "प्रण चुने गए" : "pledges directed"}` : locale === "hi" ? "सामान्य कोष" : "General fund"}
        </span>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--color-text-muted-dark)" }}>{t.reassurance}</p>
        <span className={styles.honestyNote}>{t.gatewayNote}</span>
      </aside>
    </div>
  );
}
