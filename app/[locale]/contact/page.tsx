import type { Metadata } from "next";
import staticStyles from "@/components/StaticPage.module.css";
import InquiryForm from "@/components/InquiryForm";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "संपर्क करें" : "Contact" };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      <div className={staticStyles.hero}>
        <span className="eyebrow">{isHi ? "संपर्क करें" : "CONTACT"}</span>
        <h1 className={staticStyles.h1} lang="hi">
          हमसे संपर्क करें
        </h1>
        <p className={staticStyles.lead}>
          {isHi
            ? "पंजीकृत कार्यालय, ईमेल और फोन विवरण ट्रस्ट द्वारा प्रदान किए जाने पर यहां प्रकाशित किए जाएंगे।"
            : "Registered office, email and phone details will be published here once provided by the trust."}
        </p>
      </div>
      <section className={`${staticStyles.section} ${staticStyles.sectionLast}`} style={{ maxWidth: 560 }}>
        <InquiryForm locale={locale} type="contact" />
      </section>
    </>
  );
}
