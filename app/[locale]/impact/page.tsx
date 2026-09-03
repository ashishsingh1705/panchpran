import Link from "next/link";
import type { Metadata } from "next";
import styles from "./impact.module.css";
import { pillars } from "@/lib/pillars";
import { impactMetrics } from "@/lib/homeContent";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "प्रभाव" : "Impact" };
}

const years = ["2021", "2022", "2023", "2024", "2025"];

export default function ImpactPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      <div className={styles.hero}>
        <span className="eyebrow">{isHi ? "प्रभाव" : "IMPACT"}</span>
        <h1 className={styles.h1} lang="hi">
          हमारे प्रभाव की कहानी
        </h1>
        <p className={styles.lead}>
          {isHi
            ? "क्या बदला, किसके लिए, और हमें कैसे पता है। इस पृष्ठ पर हर आंकड़ा उस अवधि और रिपोर्ट को साथ लेकर आता है जिससे वह आता है — या उसे अपुष्ट के रूप में चिह्नित किया गया है।"
            : "What changed, for whom, and how we know. Every figure on this page carries the period it covers and the report it comes from — or it is marked as unverified."}
        </p>
        <div className={styles.disclaimerBox}>
          <p className={styles.disclaimerText}>
            {isHi
              ? "अभी तक कोई सत्यापित प्रभाव डेटा उपलब्ध नहीं कराया गया है। नीचे दिया गया हर मीट्रिक वह स्लॉट दिखाता है जिसे वह भरेगा और वह स्रोत जिसे वह साथ लेकर आएगा। इस पृष्ठ पर कुछ भी एक आंकड़ा, अनुमान या उदाहरण नहीं है — यहां उद्धृत करने के लिए कुछ नहीं है।"
              : "No verified impact data has been supplied yet. Every metric below shows the slot it will occupy and the source it will carry. Nothing on this page is a figure, an estimate or an illustration — there is nothing here to quote."}
          </p>
          <span className="mono" style={{ fontSize: 12, color: "var(--color-secondary-on-sand)" }}>
            {isHi ? "रिपोर्टिंग अवधि — निर्धारित की जानी है · स्रोत रिपोर्ट — प्रकाशन की प्रतीक्षा में" : "reporting period — to be defined · source report — awaiting publication"}
          </span>
        </div>

        <div className={`hairline-grid ${styles.metricsGrid}`}>
          {impactMetrics.map((m) => (
            <div className={styles.metricCell} key={m.label.en}>
              <span className={styles.metricNumber}>—</span>
              <span className={styles.metricLabel}>{m.label[locale]}</span>
              <span className="mono" style={{ fontSize: 12, color: "var(--color-text-faint)" }}>
                {isHi ? "अपुष्ट · अवधि निर्धारित नहीं" : "unverified · period t.b.d."}
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.chartSection}>
        <h2 className={styles.chartTitle}>
          {isHi ? "पांच प्रणों में काम कहां स्थित है" : "Where the work sits across the five commitments"}
        </h2>
        <div className={styles.emptyBars}>
          {pillars.map((p) => (
            <div className={styles.barRow} key={p.slug}>
              <span className={styles.barLabel} lang="hi">
                {p.hi}
              </span>
              <div className={styles.barTrack} role="img" aria-label={isHi ? "डेटा लंबित" : "data pending"} />
              <span className={styles.barValue}>—%</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.chartSection}>
        <h2 className={styles.chartTitle}>{isHi ? "प्रति वर्ष पहुंचे लोग" : "People reached, by year"}</h2>
        <div className={styles.yearRow}>
          {years.map((y) => (
            <div className={styles.yearBar} key={y}>
              <div className={styles.yearBarFill} />
              <span className={styles.yearLabel}>{y}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.chartSection}>
        <div className={styles.twoCol}>
          <div>
            <h3 className={styles.chartTitle} style={{ fontSize: 21, color: "var(--color-text-muted)" }}>
              {isHi ? "कौन भाग लेता है" : "Who takes part"}
            </h3>
            <div className={styles.emptyBars}>
              {[isHi ? "पुरुष" : "Men", isHi ? "महिला" : "Women", isHi ? "अन्य" : "Other"].map((g) => (
                <div className={styles.barRow} key={g}>
                  <span className={styles.barLabel}>{g}</span>
                  <div className={styles.barTrack} />
                  <span className={styles.barValue}>—%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className={styles.chartTitle} style={{ fontSize: 21, color: "var(--color-text-muted)" }}>
              {isHi ? "हम कहां काम करते हैं" : "Where we work"}
            </h3>
            <div className={styles.locList}>
              {[1, 2, 3].map((i) => (
                <div className={styles.locItem} key={i}>
                  <span>{isHi ? "स्थान — पुष्टि की जानी है" : "location — to be confirmed"}</span>
                  <span className="mono" style={{ color: "var(--color-text-faint)" }}>
                    —
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.chartSection} style={{ paddingBottom: 0 }}>
        <h3 className={styles.chartTitle} style={{ fontSize: 21, color: "var(--color-text-muted)" }}>
          {isHi ? "परिणाम संकेतक" : "Outcome indicators"}
        </h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--color-text-muted)", marginTop: 12, maxWidth: 720 }}>
          {isHi
            ? "शिक्षा, स्वास्थ्य और पर्यावरण के परिणाम संकेतक एक पूर्ण रिपोर्टिंग चक्र पूरा होने पर यहां दिखाई देंगे — दो और पांच वर्षों में वृक्ष उत्तरजीविता, पूर्ण किए गए रेफरल, सीखने का स्तर, बारह महीने बाद भी सक्रिय समूह।"
            : "Education, health and environment outcome indicators appear here once a full reporting cycle is complete — tree survival at two and five years, completed referrals, learning levels, groups still trading after twelve months."}
        </p>
      </section>

      <div className={styles.methodBand} data-surface="dark">
        <div className={styles.methodInner}>
          <span className="eyebrow eyebrow--on-dark">{isHi ? "पद्धति" : "METHOD"}</span>
          <h2 className={styles.methodTitle} lang="hi">
            आँकड़े कैसे इकट्ठा होते हैं
          </h2>
          <div className={styles.methodSteps}>
            <p className={styles.methodStep}>
              {isHi
                ? "कार्यक्रम टीमें प्रत्येक गतिविधि को दर्ज करती हैं — कौन उपस्थित हुआ, क्या हुआ, कब।"
                : "Programme teams log each activity — who attended, what happened, when."}
            </p>
            <p className={styles.methodStep}>
              {isHi
                ? "डेटा को हर तिमाही में समेकित और समीक्षा की जाती है, कच्चा प्रकाशित नहीं किया जाता।"
                : "Data is consolidated and reviewed each quarter, never published raw."}
            </p>
            <p className={styles.methodStep}>
              {isHi
                ? "वार्षिक रिपोर्ट में केवल सत्यापित आंकड़े ही प्रकाशित होते हैं, स्रोत और अवधि के साथ।"
                : "Only verified figures are published in the annual report, with source and period attached."}
            </p>
          </div>
        </div>
      </div>

      <section className={styles.readDetail}>
        <h2 className={styles.chartTitle}>{isHi ? "विस्तार से पढ़ें" : "Read the detail"}</h2>
        <div className={styles.readGrid}>
          {pillars.map((p) => (
            <Link href={`/${locale}/pillar/${p.slug}`} className={styles.readCard} key={p.slug} lang="hi">
              {p.hi}
            </Link>
          ))}
          <Link href={`/${locale}/transparency`} className={styles.readCard}>
            {isHi ? "पारदर्शिता केंद्र" : "Transparency centre"}
          </Link>
        </div>
      </section>
    </>
  );
}
