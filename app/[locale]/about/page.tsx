import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/StaticPage.module.css";
import { pillars } from "@/lib/pillars";
import { approachSteps } from "@/lib/homeContent";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "हमारे बारे में" : "About Us" };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      <div className={styles.hero}>
        <span className="eyebrow">{isHi ? "हमारे बारे में" : "ABOUT US"}</span>
        <h1 className={styles.h1} lang="hi">
          पंच प्रण विकास ट्रस्ट
        </h1>
        <p className={styles.lead}>
          {isHi
            ? "पंच प्रण विकास ट्रस्ट पांच प्रतिबद्धताओं पर काम करने वाला एक सामुदायिक-नेतृत्व वाला संगठन है: शिक्षा, स्वावलंबन, पर्यावरण, महिला सशक्तिकरण और स्वास्थ्य। हमारा मानना है कि यह पांचों एक साथ आगे बढ़ने पर ही स्थायी बदलाव संभव है।"
            : "Panch Pran Vikas Trust is a community-led organisation working across five commitments: education, self-reliance, environment, women empowerment and health. We believe lasting change is only possible when all five move forward together."}
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{isHi ? "दृष्टि और मिशन" : "Vision & Mission"}</h2>
        <p className={styles.body}>
          {isHi
            ? "हमारी दृष्टि और मिशन का औपचारिक विवरण ट्रस्ट द्वारा स्वीकृत होने पर यहां प्रकाशित किया जाएगा।"
            : "A formal statement of our vision and mission will be published here once approved by the trust."}
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{isHi ? "पंच प्रण" : "Panch Pran"}</h2>
        <div className={styles.grid2}>
          {pillars.map((p) => (
            <Link href={`/${locale}/pillar/${p.slug}`} key={p.slug} style={{ fontWeight: 600, fontFamily: "var(--font-deva)" }} lang="hi">
              {p.hi} <span style={{ color: "var(--color-primary)" }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{isHi ? "हमारा दृष्टिकोण" : "Our Approach"}</h2>
        <div className={styles.grid2}>
          {approachSteps.map((s) => (
            <div key={s.en}>
              <strong lang="hi" style={{ fontFamily: "var(--font-deva)", display: "block", marginBottom: 6 }}>
                {s.hi}
              </strong>
              <p className={styles.body} lang={isHi ? "hi" : undefined}>
                {isHi ? s.body.hi : s.body.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLast}`}>
        <h2 className={styles.sectionTitle}>{isHi ? "नेतृत्व और शासन" : "Leadership & Governance"}</h2>
        <p className={styles.body} style={{ marginBottom: 20 }}>
          {isHi
            ? "ट्रस्टियों के नाम, भूमिकाएं, जीवनी और तस्वीरें ट्रस्ट द्वारा प्रदान किए जाने पर यहां प्रकाशित की जाएंगी।"
            : "Trustee names, roles, biographies and photographs will be published here once supplied by the trust."}
        </p>
        <Link href={`/${locale}/transparency`} className="section-link">
          {isHi ? "पारदर्शिता केंद्र देखें →" : "View the transparency centre →"}
        </Link>
      </section>
    </>
  );
}
