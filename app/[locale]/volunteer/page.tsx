import type { Metadata } from "next";
import staticStyles from "@/components/StaticPage.module.css";
import InquiryForm from "@/components/InquiryForm";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "स्वयंसेवक बनें" : "Volunteer" };
}

export default function VolunteerPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      <div className={staticStyles.hero}>
        <span className="eyebrow">{isHi ? "जुड़ें" : "GET INVOLVED"}</span>
        <h1 className={staticStyles.h1} lang="hi">
          स्वयंसेवक बनें
        </h1>
        <p className={staticStyles.lead}>
          {isHi
            ? "अपने पास के किसी कार्यक्रम को समय और कौशल दें। नीचे अपनी रुचि दर्ज करें और हमारी टीम आपसे संपर्क करेगी।"
            : "Give time and skills to a programme near you. Share your interest below and our team will reach out."}
        </p>
      </div>
      <section className={`${staticStyles.section} ${staticStyles.sectionLast}`} style={{ maxWidth: 560 }}>
        <InquiryForm locale={locale} type="volunteer" extraFieldLabel={{ hi: "रुचि का क्षेत्र", en: "Area of interest" }} />
      </section>
    </>
  );
}
