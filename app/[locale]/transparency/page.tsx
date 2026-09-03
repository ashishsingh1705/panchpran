import type { Metadata } from "next";
import styles from "./transparency.module.css";
import { transparencyCells } from "@/lib/homeContent";
import { pillars } from "@/lib/pillars";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "पारदर्शिता" : "Transparency" };
}

const registrationFields = [
  { hi: "पंजीकरण संख्या", en: "Registration number" },
  { hi: "पंजीकरण तिथि", en: "Registration date" },
  { hi: "पैन", en: "PAN" },
  { hi: "पंजीकृत कार्यालय", en: "Registered office" },
  { hi: "80जी / 12ए स्थिति", en: "80G / 12A status" },
];

export default function TransparencyPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      <div className={styles.hero}>
        <span className="eyebrow">{isHi ? "पारदर्शिता" : "TRANSPARENCY"}</span>
        <h1 className={styles.h1} lang="hi">
          आपका विश्वास, हमारी जिम्मेदारी
        </h1>
        <p className={styles.lead}>
          {isHi
            ? "इस पृष्ठ पर तब तक कुछ नहीं दिखाया जाता जब तक वह मौजूद न हो। कोई प्रमाणपत्र, रेटिंग, पुरस्कार, साझेदार लोगो या आंकड़ा तब तक प्रकट नहीं होता जब तक उसके पीछे का दस्तावेज़ मौजूद न हो।"
            : "Nothing on this page is shown until it exists. No certificate, rating, award, partner logo or figure appears until the document behind it does."}
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{isHi ? "प्रकटीकरण रजिस्टर" : "Disclosure register"}</h2>
        <div className={styles.registerList}>
          {transparencyCells.map((cell) => (
            <div className={styles.registerRow} key={cell.en}>
              <span className={styles.registerName}>{isHi ? cell.hi : cell.en}</span>
              <span className={styles.registerStatus}>{cell.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{isHi ? "पंजीकरण विवरण" : "Registration details"}</h2>
        <div className={styles.table}>
          {registrationFields.map((f) => (
            <div className={styles.tableRow} key={f.en}>
              <span className={styles.tableKey}>{isHi ? f.hi : f.en}</span>
              <span className={styles.tableValue}>{isHi ? "प्रदान की जानी है" : "to be provided by the trust"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{isHi ? "शासी निकाय और नेतृत्व" : "Governing body & leadership"}</h2>
        <div className={styles.trusteeGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div className={styles.trusteeCard} key={i}>
              {isHi ? "ट्रस्टी विवरण — प्रदान किया जाना है" : "Trustee details — to be provided"}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{isHi ? "निधि का उपयोग" : "Use of funds"}</h2>
        <div className={styles.fundsBars}>
          {pillars.map((p) => (
            <div className={styles.fundsBar} key={p.slug}>
              <div className={styles.fundsFill} />
              <span className={styles.fundsLabel} lang="hi">
                {p.hi}
              </span>
              <span className="mono" style={{ fontSize: 11, color: "var(--color-text-faint)" }}>
                —%
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.grievanceBand}>
        <div className={styles.grievanceInner}>
          <div className={styles.grievanceCol}>
            <h3>{isHi ? "शिकायत निवारण" : "Grievance channel"}</h3>
            <p>
              {isHi
                ? "शिकायत दर्ज करने का चैनल और प्रतिक्रिया समय-सीमा ट्रस्ट द्वारा पुष्टि होने पर यहां प्रकाशित की जाएगी।"
                : "A channel for raising concerns and its response window will be published here once confirmed by the trust."}
            </p>
          </div>
          <div className={styles.grievanceCol}>
            <h3>{isHi ? "दानदाता गोपनीयता" : "Donor privacy"}</h3>
            <p>
              {isHi
                ? "दानदाता की पहचान कभी प्रकाशित नहीं की जाती। दानदाता रिकॉर्ड तक पहुंच सीमित और ऑडिट की जाती है।"
                : "Donor identity is never published. Access to donor records is restricted and audited."}
            </p>
          </div>
          <div className={styles.grievanceCol}>
            <h3>{isHi ? "सुधार नीति" : "Corrections policy"}</h3>
            <p>
              {isHi
                ? "यदि इस साइट पर कोई त्रुटि पाई जाती है, तो उसे सुधारा जाएगा और परिवर्तन का रिकॉर्ड रखा जाएगा।"
                : "If an error is found on this site, it will be corrected and a record of the change kept."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
