import Link from "next/link";
import type { Metadata } from "next";
import staticStyles from "@/components/StaticPage.module.css";
import homeStyles from "@/components/Home.module.css";
import { getInvolvedCards } from "@/lib/homeContent";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "जुड़ें" : "Get Involved" };
}

export default function GetInvolvedPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      <div className={staticStyles.hero}>
        <span className="eyebrow">{isHi ? "जुड़ें" : "GET INVOLVED"}</span>
        <h1 className={staticStyles.h1} lang="hi">
          साथ मिलकर बदलाव लाएँ
        </h1>
        <p className={staticStyles.lead}>
          {isHi
            ? "चाहे आप समय दें, कौशल दें या संसाधन — हर योगदान पांच प्रणों को आगे बढ़ाता है।"
            : "Whether you give time, skill or resources, every contribution advances the five commitments."}
        </p>
      </div>
      <section className={`${staticStyles.section} ${staticStyles.sectionLast}`}>
        <div className={homeStyles.involvedGrid}>
          {getInvolvedCards.map((card) => (
            <Link href={`/${locale}${card.href}`} className={homeStyles.involvedCard} key={card.key}>
              <span className="mono" style={{ fontSize: 11, color: "var(--color-text-faint)" }}>
                {card.index}
              </span>
              <h3 className={homeStyles.involvedTitle} lang={isHi ? "hi" : undefined}>
                {isHi ? card.title.hi : card.title.en}
              </h3>
              <p className={homeStyles.involvedBody} lang={isHi ? "hi" : undefined}>
                {isHi ? card.body.hi : card.body.en}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
