import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./pillar.module.css";
import homeStyles from "@/components/Home.module.css";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PillarSymbol from "@/components/PillarSymbol";
import { pillars, getPillar } from "@/lib/pillars";
import { locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => pillars.map((p) => ({ locale, slug: p.slug })));
}

export function generateMetadata({ params }: { params: { slug: string; locale: Locale } }): Metadata {
  const pillar = getPillar(params.slug);
  if (!pillar) return {};
  return {
    title: params.locale === "hi" ? pillar.hi : pillar.en,
    description: pillar.body[params.locale],
  };
}

export default function PillarPage({ params }: { params: { slug: string; locale: Locale } }) {
  const pillar = getPillar(params.slug);
  if (!pillar) notFound();
  const { locale } = params;
  const isHi = locale === "hi";
  const otherPillars = pillars.filter((p) => p.slug !== pillar.slug);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="eyebrow">{pillar.index} — {isHi ? "हमारा प्रण" : "OUR PLEDGE"}</span>
          <div className={styles.heroTop}>
            <PillarSymbol slug={pillar.slug} size={56} />
            <div>
              <h1 className={styles.h1} lang="hi">
                {pillar.hi}
              </h1>
              <span className={styles.h1En}>{pillar.en}</span>
            </div>
          </div>
          <p className={styles.leadBody} lang={isHi ? "hi" : undefined}>
            {isHi ? pillar.body.hi : pillar.body.en}
          </p>
        </div>
      </section>

      <section className={homeStyles.section}>
        <div className={homeStyles.sectionInner}>
          <div className={styles.twoCol}>
            <div>
              <span className="eyebrow">{isHi ? "इस प्रण का कारण" : "WHY THIS PLEDGE"}</span>
              <p className={styles.whyBody} lang={isHi ? "hi" : undefined}>
                {isHi ? pillar.whyPledge.hi : pillar.whyPledge.en}
              </p>
            </div>
            <div className={styles.heroImage}>
              <ImagePlaceholder subject={`${pillar.en} programme activity`} crop="4:3" />
            </div>
          </div>
        </div>
      </section>

      <section className={homeStyles.section}>
        <div className={homeStyles.sectionInner}>
          <span className="eyebrow">{isHi ? "गतिविधियां" : "ACTIVITIES"}</span>
          <h2 className={homeStyles.h2Deva} lang="hi" style={{ marginBottom: 32 }}>
            {isHi ? "इस प्रण के तहत काम" : "Work under this commitment"}
          </h2>
          <ul className={styles.activityList}>
            {pillar.activities.map((a) => (
              <li key={a.en} className={styles.activityItem}>
                <span className={styles.activityDot} aria-hidden="true" />
                <span lang={isHi ? "hi" : undefined}>{isHi ? a.hi : a.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={homeStyles.section}>
        <div className={homeStyles.sectionInner}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <ImagePlaceholder subject={`Person connected to ${pillar.en.toLowerCase()} programme`} crop="4:3" />
            </div>
            <div className={styles.storyBody}>
              <span className={styles.storyLocation}>{pillar.storyLocation}</span>
              <h3 className={styles.storyTitle} lang={isHi ? "hi" : undefined}>
                {isHi ? pillar.storyTitle.hi : pillar.storyTitle.en}
              </h3>
              <span className="annotation">
                {isHi
                  ? "प्लेसहोल्डर कथा — साक्षात्कार-आधारित कहानी से बदलें, सहमति दर्ज की गई हो, परिणाम सत्यापित हो।"
                  : "Placeholder narrative — replace with an interview-based story, consent recorded, outcome verified."}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.measureBand} data-surface="dark">
        <div className={homeStyles.sectionInner}>
          <span className="eyebrow eyebrow--on-dark">{isHi ? "हम कैसे मापते हैं" : "HOW WE MEASURE"}</span>
          <p className={styles.measureBody} lang={isHi ? "hi" : undefined}>
            {isHi ? pillar.measurement.hi : pillar.measurement.en}
          </p>
          <div className={styles.figureRow}>
            <span className={styles.figureDash}>—</span>
            <span className="mono" style={{ color: "rgba(250,248,243,.6)" }}>
              {isHi ? "सत्यापित आंकड़ा उपलब्ध होने पर जोड़ा जाएगा" : "Verified figure to be added once available"}
            </span>
          </div>
        </div>
      </div>

      <section className={homeStyles.section} style={{ paddingBottom: "clamp(64px,10vw,120px)" }}>
        <div className={homeStyles.sectionInner}>
          <span className="eyebrow">{isHi ? "अन्य प्रण" : "OTHER PLEDGES"}</span>
          <h2 className={homeStyles.h2Latin} style={{ marginBottom: 32 }}>
            {isHi ? "हमारे बाकी चार प्रण" : "The other four commitments"}
          </h2>
          <div className={styles.otherGrid}>
            {otherPillars.map((p) => (
              <Link href={`/${locale}/pillar/${p.slug}`} key={p.slug} className={styles.otherCard}>
                <PillarSymbol slug={p.slug} size={28} />
                <span lang="hi">{p.hi}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
