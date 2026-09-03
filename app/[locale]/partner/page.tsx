import type { Metadata } from "next";
import staticStyles from "@/components/StaticPage.module.css";
import InquiryForm from "@/components/InquiryForm";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "साझेदारी करें" : "Partner With Us" };
}

export default function PartnerPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      <div className={staticStyles.hero}>
        <span className="eyebrow">{isHi ? "जुड़ें" : "GET INVOLVED"}</span>
        <h1 className={staticStyles.h1} lang="hi">
          साझेदारी करें
        </h1>
        <p className={staticStyles.lead}>
          {isHi
            ? "साझा उद्देश्यों पर हमारे साथ सहयोग करें — संगठन, संस्थान या कॉर्पोरेट सीएसआर भागीदार के रूप में। नीचे विवरण साझा करें।"
            : "Collaborate with us on shared objectives — as an organisation, institution, or corporate CSR partner. Share your details below."}
        </p>
      </div>
      <section className={`${staticStyles.section} ${staticStyles.sectionLast}`} style={{ maxWidth: 560 }}>
        <InquiryForm locale={locale} type="partner" extraFieldLabel={{ hi: "संगठन का नाम", en: "Organisation name" }} />
      </section>
    </>
  );
}
