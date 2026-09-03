import { notFound } from "next/navigation";
import type { Metadata } from "next";
import staticStyles from "@/components/StaticPage.module.css";
import { legalDocs, getLegalDoc } from "@/lib/legal";
import { locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => legalDocs.map((d) => ({ locale, doc: d.slug })));
}

export function generateMetadata({ params }: { params: { doc: string; locale: Locale } }): Metadata {
  const doc = getLegalDoc(params.doc);
  if (!doc) return {};
  return { title: doc.title[params.locale] };
}

export default function LegalPage({ params }: { params: { doc: string; locale: Locale } }) {
  const doc = getLegalDoc(params.doc);
  if (!doc) notFound();
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      <div className={staticStyles.hero}>
        <span className="eyebrow">{isHi ? "कानूनी" : "LEGAL"}</span>
        <h1 className={staticStyles.h1Latin}>{doc.title[locale]}</h1>
        <p className={staticStyles.lead}>{doc.scope[locale]}</p>
        {doc.lastUpdated && (
          <p className="mono" style={{ fontSize: 11.5, color: "var(--color-text-faint)", marginTop: 16 }}>
            {isHi ? "अंतिम अद्यतन" : "Last updated"}: {doc.lastUpdated}
          </p>
        )}
      </div>

      {doc.sections && (
        <section className={staticStyles.section}>
          {doc.sections.map((section) => (
            <div key={section.heading.en} style={{ marginBottom: 32, maxWidth: 720 }}>
              <h2 className={staticStyles.sectionTitle}>{section.heading[locale]}</h2>
              <p className={staticStyles.body}>{section.body[locale]}</p>
            </div>
          ))}
        </section>
      )}

      <section className={`${staticStyles.section} ${staticStyles.sectionLast}`}>
        <h2 className={staticStyles.sectionTitle}>{isHi ? "लंबित" : "Outstanding"}</h2>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {doc.outstanding.map((item) => (
            <li key={item.en} className={staticStyles.placeholderCard}>
              {item[locale]}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
