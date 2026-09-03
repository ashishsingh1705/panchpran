import type { Metadata } from "next";
import styles from "./transparency.module.css";
import { transparencyCells } from "@/lib/homeContent";
import { pillars } from "@/lib/pillars";
import { orgDetails } from "@/lib/orgDetails";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "पारदर्शिता" : "Transparency" };
}

function registrationFields(isHi: boolean) {
  const pending = isHi ? "प्रदान की जानी है" : "to be provided by the trust";
  return [
    { hi: "ट्रस्ट पंजीकरण संख्या", en: "Trust registration number", value: orgDetails.trustRegistrationNumber },
    { hi: "पैन", en: "PAN", value: orgDetails.panNumber },
    { hi: "एनजीओ दर्पण आईडी", en: "NGO Darpan ID", value: orgDetails.darpanId },
    { hi: "पंजीकरण आईडी (IN-UP)", en: "Registration ID (IN-UP)", value: orgDetails.inUpRegistrationId },
    { hi: "पंजीकृत कार्यालय", en: "Registered office", value: pending },
    { hi: "80जी / 12ए स्थिति", en: "80G / 12A status", value: pending },
  ];
}

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
          {registrationFields(isHi).map((f) => (
            <div className={styles.tableRow} key={f.en}>
              <span className={styles.tableKey}>{isHi ? f.hi : f.en}</span>
              <span className={styles.tableValue}>{f.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{isHi ? "बैंक विवरण (सीधे हस्तांतरण के लिए)" : "Bank details (for direct transfer)"}</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--color-text-muted)", marginBottom: 16, maxWidth: 640 }}>
          {isHi
            ? "ऑनलाइन भुगतान गेटवे जुड़ने तक, योगदान सीधे नीचे दिए गए बैंक खाते में NEFT/RTGS/IMPS के माध्यम से भेजे जा सकते हैं। कृपया हस्तांतरण के बाद रसीद के लिए संपर्क करें।"
            : "Until the online payment gateway is connected, contributions can be sent directly via NEFT/RTGS/IMPS to the account below. Please get in touch after transferring so a receipt can be issued."}
        </p>
        <div className={styles.table}>
          <div className={styles.tableRow}>
            <span className={styles.tableKey}>{isHi ? "बैंक का नाम" : "Bank name"}</span>
            <span className={styles.tableValue}>{orgDetails.bank.name}</span>
          </div>
          <div className={styles.tableRow}>
            <span className={styles.tableKey}>{isHi ? "शाखा" : "Branch"}</span>
            <span className={styles.tableValue}>{orgDetails.bank.branch}</span>
          </div>
          <div className={styles.tableRow}>
            <span className={styles.tableKey}>{isHi ? "खाता संख्या" : "Account number"}</span>
            <span className={styles.tableValue}>{orgDetails.bank.accountNumber}</span>
          </div>
          <div className={styles.tableRow}>
            <span className={styles.tableKey}>IFSC</span>
            <span className={styles.tableValue}>{isHi ? "प्रदान किया जाना है" : "to be provided by the trust"}</span>
          </div>
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
                ? "दानदाता की पहचान कभी प्रकाशित नहीं की जाती। रिकॉर्ड तक पहुंच केवल अधिकृत ट्रस्ट स्टाफ तक सीमित है। यदि ट्रस्ट भविष्य में एक समर्पित दानदाता-प्रबंधन प्रणाली अपनाता है, तो एक औपचारिक पहुंच लॉग जोड़ा जाएगा।"
                : "Donor identity is never published. Access to records is limited to authorised trust staff. A formal access log will be added if the trust adopts a dedicated donor-management system."}
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
