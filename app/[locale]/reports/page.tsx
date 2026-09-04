import Link from "next/link";
import type { Metadata } from "next";
import styles from "./reports.module.css";
import ReportPrintButton from "@/components/ReportPrintButton";
import { pillars } from "@/lib/pillars";
import {
  reportMeta,
  snapshotStats,
  leadershipQuote,
  programmeSample,
  overheadSample,
  incomeSources,
  expenditureLines,
  balanceSheet,
  governanceSample,
} from "@/lib/reportsContent";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "नमूना वार्षिक रिपोर्ट" : "Sample Annual Report" };
}

function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function ReportsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  const totalIncome = incomeSources.reduce((s, r) => s + r.amount, 0);
  const totalExpenditure = expenditureLines.reduce((s, r) => s + r.amount, 0);
  const surplus = totalIncome - totalExpenditure;
  const totalAssets = balanceSheet.assets.reduce((s, r) => s + r.amount, 0);
  const totalLiabilities = balanceSheet.liabilities.reduce((s, r) => s + r.amount, 0);

  const sampleTagText = isHi ? "नमूना" : "SAMPLE";

  return (
    <>
      <div className={styles.hero}>
        <span className="eyebrow">{isHi ? "रिपोर्ट" : "REPORTS"}</span>
        <h1 className={styles.h1} lang="hi">
          नमूना वार्षिक रिपोर्ट
        </h1>
        <p className={styles.lead}>
          {isHi
            ? "अंतरराष्ट्रीय गैर-लाभकारी संगठनों की वार्षिक रिपोर्टिंग शैली में तैयार एक प्रारूप — कार्यक्रम प्रदर्शन, वित्तीय विवरण और शासन को एक ही पृष्ठ पर एक साथ लाते हुए।"
            : "A format modelled on how international nonprofits publish their annual reports — programme performance, financial statements and governance brought together on one page."}
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaChip}>{reportMeta.fyLabel[locale]}</span>
          <span className={styles.metaChip}>{reportMeta.period[locale]}</span>
          <ReportPrintButton label={isHi ? "प्रिंट / PDF के रूप में सहेजें" : "Print / Save as PDF"} />
        </div>

        <div className={styles.sampleBanner}>
          <span className={styles.sampleBannerTitle}>{isHi ? "नमूना रिपोर्ट — केवल प्रारूप संदर्भ" : "Sample report — format reference only"}</span>
          <p className={styles.sampleBannerText}>
            {isHi
              ? "इस पृष्ठ पर दिखाया गया हर आंकड़ा, नाम और उद्धरण उदाहरण के लिए है और पंच प्रण विकास ट्रस्ट का वास्तविक डेटा नहीं है। इसका उद्देश्य केवल यह दिखाना है कि सत्यापित आंकड़े उपलब्ध होने पर असली वार्षिक रिपोर्ट किस प्रारूप में प्रकाशित होगी। वास्तविक, लेखा-परीक्षित रिपोर्ट प्रकाशित होते ही यह पृष्ठ उससे बदल दिया जाएगा — देखें"
              : "Every figure, name and quote on this page is illustrative and is not actual data from Panch Pran Vikas Trust. Its only purpose is to show the format the real annual report will follow once verified figures exist. This page will be replaced by the real, audited report once one is published — see the"}{" "}
            <Link href={`/${locale}/transparency`} className="section-link">
              {isHi ? "पारदर्शिता केंद्र।" : "Transparency centre."}
            </Link>
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{isHi ? "एक नज़र में" : "At a glance"}</h2>
          <span className={styles.sampleTag}>{sampleTagText}</span>
        </div>
        <div className={`hairline-grid ${styles.snapshotGrid}`}>
          {snapshotStats.map((s) => (
            <div className={styles.snapshotCell} key={s.label.en}>
              <span className={styles.snapshotValue}>{s.value}</span>
              <span className={styles.snapshotLabel}>{s.label[locale]}</span>
            </div>
          ))}
        </div>
        <span className="mono" style={{ display: "block", marginTop: 10, fontSize: 11, color: "var(--color-text-faint)" }}>
          {isHi ? "L = लाख (₹1,00,000)" : "L = lakh (₹100,000)"}
        </span>

        <div className={styles.quoteBlock}>
          <p className={styles.quoteText} lang={locale}>
            “{leadershipQuote.quote[locale]}”
          </p>
          <span className={styles.quoteRole}>{leadershipQuote.role[locale]}</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{isHi ? "कार्यक्रम प्रदर्शन" : "Programme performance"}</h2>
          <span className={styles.sampleTag}>{sampleTagText}</span>
        </div>
        <div className={styles.progTable}>
          <div className={styles.progHeadRow}>
            <span>{isHi ? "कार्यक्रम" : "Programme"}</span>
            <span>{isHi ? "मुख्य परिणाम (नमूना)" : "Key output (sample)"}</span>
            <span>{isHi ? "पहुंच" : "Reach"}</span>
            <span style={{ textAlign: "right" }}>{isHi ? "निधि का %" : "% of funds"}</span>
          </div>
          {pillars.map((p) => {
            const s = programmeSample[p.slug];
            return (
              <div className={styles.progRow} key={p.slug}>
                <span className={styles.progName} lang="hi">
                  {p.hi}
                </span>
                <span>{s.output[locale]}</span>
                <span className={styles.progReach}>{s.reach}</span>
                <span className={styles.progFund}>{s.fundPercent}%</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{isHi ? "वित्तीय विवरण" : "Statement of income & expenditure"}</h2>
          <span className={styles.sampleTag}>{sampleTagText}</span>
        </div>
        <div className={styles.financeGrid}>
          <div className={styles.financeCard}>
            <div className={styles.financeCardTitle}>{isHi ? "आय के स्रोत" : "Sources of income"}</div>
            {incomeSources.map((r) => (
              <div className={styles.financeRow} key={r.en}>
                <span>{r[locale]}</span>
                <span>{inr(r.amount)}</span>
              </div>
            ))}
            <div className={styles.financeTotalRow}>
              <span>{isHi ? "कुल आय" : "Total income"}</span>
              <span>{inr(totalIncome)}</span>
            </div>
          </div>

          <div className={styles.financeCard}>
            <div className={styles.financeCardTitle}>{isHi ? "निधि का उपयोग" : "Application of funds"}</div>
            {expenditureLines.map((r) => (
              <div className={styles.financeRow} key={r.en}>
                <span>{r[locale]}</span>
                <span>{inr(r.amount)}</span>
              </div>
            ))}
            <div className={styles.financeTotalRow}>
              <span>{isHi ? "कुल व्यय" : "Total expenditure"}</span>
              <span>{inr(totalExpenditure)}</span>
            </div>
            <div className={styles.financeRow}>
              <span>{isHi ? "अधिशेष (आरक्षित निधि में स्थानांतरित)" : "Surplus (transferred to reserves)"}</span>
              <span>{inr(surplus)}</span>
            </div>
          </div>
        </div>

        <h3 className={styles.sectionTitle} style={{ fontSize: 19, marginTop: 48 }}>
          {isHi ? "निधि उपयोग अनुपात" : "Fund utilisation ratio"}
        </h3>
        <div className={styles.utilBars}>
          {pillars.map((p) => {
            const s = programmeSample[p.slug];
            return (
              <div className={styles.utilBar} key={p.slug}>
                <span className={styles.utilPercent}>{s.fundPercent}%</span>
                <div className={styles.utilFill} style={{ height: `${s.fundPercent * 3.2}px` }} />
                <span className={styles.utilLabel} lang="hi">
                  {p.hi}
                </span>
              </div>
            );
          })}
          {overheadSample.map((o) => (
            <div className={styles.utilBar} key={o.en}>
              <span className={styles.utilPercent}>{o.fundPercent}%</span>
              <div className={styles.utilFill} data-kind="overhead" style={{ height: `${o.fundPercent * 3.2}px` }} />
              <span className={styles.utilLabel}>{o[locale]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{isHi ? "वित्तीय स्थिति विवरण" : "Statement of financial position"}</h2>
          <span className={styles.sampleTag}>{sampleTagText}</span>
        </div>
        <div className={styles.financeGrid}>
          <div className={styles.financeCard}>
            <div className={styles.financeCardTitle}>{isHi ? "संपत्तियां" : "Assets"}</div>
            {balanceSheet.assets.map((r) => (
              <div className={styles.financeRow} key={r.en}>
                <span>{r[locale]}</span>
                <span>{inr(r.amount)}</span>
              </div>
            ))}
            <div className={styles.financeTotalRow}>
              <span>{isHi ? "कुल संपत्तियां" : "Total assets"}</span>
              <span>{inr(totalAssets)}</span>
            </div>
          </div>

          <div className={styles.financeCard}>
            <div className={styles.financeCardTitle}>{isHi ? "देनदारियां और निधियां" : "Liabilities & funds"}</div>
            {balanceSheet.liabilities.map((r) => (
              <div className={styles.financeRow} key={r.en}>
                <span>{r[locale]}</span>
                <span>{inr(r.amount)}</span>
              </div>
            ))}
            <div className={styles.financeTotalRow}>
              <span>{isHi ? "कुल देनदारियां और निधियां" : "Total liabilities & funds"}</span>
              <span>{inr(totalLiabilities)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ paddingBottom: 0 }}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{isHi ? "शासन" : "Governance"}</h2>
          <span className={styles.sampleTag}>{sampleTagText}</span>
        </div>
        <div className={styles.govGrid}>
          <div className={styles.govCell}>
            <span className={styles.govValue}>{governanceSample.boardSize}</span>
            <span className={styles.govLabel}>{isHi ? "न्यासी बोर्ड सदस्य (नमूना)" : "Trustees on the board (sample)"}</span>
          </div>
          <div className={styles.govCell}>
            <span className={styles.govValue}>{governanceSample.meetingsHeld}</span>
            <span className={styles.govLabel}>{isHi ? "बोर्ड बैठकें आयोजित (नमूना)" : "Board meetings held (sample)"}</span>
          </div>
        </div>
        <div className={styles.policyList}>
          {governanceSample.policies.map((p) => (
            <div className={styles.policyItem} key={p.en}>
              {p[locale]} — {isHi ? "नमूना नीति नाम" : "sample policy name"}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.auditorNote}>
        <div className={styles.auditorInner}>
          <h3>{isHi ? "लेखा परीक्षक का नोट" : "Auditor's note"}</h3>
          <p>
            {isHi
              ? "यह एक नमूना प्रस्तुति है, वास्तविक लेखा-परीक्षित वित्तीय विवरण नहीं। जब ट्रस्ट का वास्तविक वित्तीय विवरण तैयार होगा, तो उसकी सांविधिक लेखा परीक्षक द्वारा स्वतंत्र रूप से जांच और हस्ताक्षर किए जाएंगे, और वह इस पृष्ठ की जगह लेगा। तब तक इस पृष्ठ पर दिए गए किसी भी आंकड़े को दान, अनुदान या साझेदारी के निर्णय के आधार के रूप में उपयोग न करें।"
              : "This is a sample presentation, not an actual audited financial statement. When the trust's real financial statement is ready, it will be independently reviewed and signed by the statutory auditor, and will replace this page. Until then, no figure on this page should be relied on for a donation, grant or partnership decision."}
          </p>
        </div>
      </div>

      <div className={styles.ctaBand}>
        <p style={{ fontSize: 14, color: "var(--color-text-muted)", maxWidth: 480 }}>
          {isHi
            ? "वास्तविक पंजीकरण विवरण, प्रकटीकरण और बैंक जानकारी पारदर्शिता केंद्र पर देखें।"
            : "See the trust's real registration details, disclosures and bank information on the Transparency centre."}
        </p>
        <div className={styles.ctaLinks}>
          <Link href={`/${locale}/transparency`} className="btn btn-outline">
            {isHi ? "पारदर्शिता केंद्र" : "Transparency centre"}
          </Link>
          <Link href={`/${locale}/impact`} className="btn btn-outline">
            {isHi ? "प्रभाव पृष्ठ" : "Impact page"}
          </Link>
        </div>
      </div>
    </>
  );
}
