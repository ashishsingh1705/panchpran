import Link from "next/link";
import type { Metadata } from "next";
import styles from "@/components/Home.module.css";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PillarSymbol from "@/components/PillarSymbol";
import Reveal from "@/components/Reveal";
import DonateTeaser from "@/components/DonateTeaser";
import { pillars } from "@/lib/pillars";
import { approachSteps, impactMetrics, initiatives, transparencyCells, getInvolvedCards, stories } from "@/lib/homeContent";
import { orgDetails } from "@/lib/orgDetails";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "पंच प्रण विकास ट्रस्ट" : "Panch Pran Vikas Trust",
    description: isHi
      ? "पंच प्रण। एक संकल्प। बेहतर भविष्य। शिक्षा, स्वावलंबन, पर्यावरण, महिला सशक्तिकरण और स्वास्थ्य के लिए पांच प्रण।"
      : "Five commitments. One shared vision for a stronger, healthier and self-reliant India.",
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const isHi = locale === "hi";

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-label={isHi ? "परिचय" : "Introduction"}>
        <div className={styles.heroBg}>
          <ImagePlaceholder
            subject="Community learning or livelihood activity, natural morning light"
            crop="wide landscape, ~2.25:1"
            style={{ position: "absolute", inset: 0 }}
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>पंच प्रण · एक संकल्प · सतत विकास</span>
          <h1 className={styles.heroTitle} lang="hi">
            <span>पंच प्रण।</span>
            <span>एक संकल्प।</span>
            <span>बेहतर भविष्य।</span>
          </h1>
          <p className={styles.heroSub}>
            Five commitments. One shared vision for a stronger, healthier and self-reliant India.
          </p>
          <div className={styles.heroCtas}>
            <Link href={`/${locale}/pillar/education`} className="btn btn-secondary" lang={isHi ? "hi" : undefined}>
              {isHi ? "हमारे कार्य देखें" : "See our work"}
            </Link>
            <Link href={`/${locale}/contact`} className="btn btn-ghost-dark" lang={isHi ? "hi" : undefined}>
              {isHi ? "हमसे जुड़ें" : "Connect with us"}
            </Link>
          </div>
        </div>
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={`${styles.scrollLabel} mono`}>scroll</span>
          <span className={styles.scrollBar} />
        </div>
      </section>

      {/* Trust strip */}
      <div className={styles.trustStrip}>
        <span className={styles.trustItem}>
          <span className={styles.trustDot} aria-hidden="true" />
          {isHi ? "पंजीकृत सार्वजनिक धर्मार्थ ट्रस्ट" : "Registered public charitable trust"}
          <span className="mono" style={{ fontSize: 11 }}>[{orgDetails.trustRegistrationNumber} · Darpan {orgDetails.darpanId}]</span>
        </span>
        <span className={styles.trustItem}>
          <span className={styles.trustDot} aria-hidden="true" />
          {isHi ? "वार्षिक रिपोर्ट सार्वजनिक रूप से प्रकाशित" : "Annual reports published publicly"}
        </span>
        <span className={styles.trustItem}>
          <span className={styles.trustDot} aria-hidden="true" />
          {isHi ? "पांच केंद्र क्षेत्रों में सामुदायिक-नेतृत्व कार्यक्रम" : "Community-led programmes across five focus areas"}
        </span>
      </div>

      {/* Panch Pran */}
      <section className={styles.section} aria-labelledby="panch-pran-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className="eyebrow">01 — {isHi ? "हमारे प्रण" : "OUR COMMITMENTS"}</span>
              <h2 id="panch-pran-heading" className={styles.h2Deva} lang="hi">
                हमारे पाँच प्रण
              </h2>
            </div>
            <p className={styles.leadText} lang={isHi ? "hi" : undefined}>
              {isHi
                ? "हमारा विश्वास है कि स्थायी विकास तभी संभव है जब शिक्षा, स्वावलंबन, पर्यावरण, महिला सशक्तिकरण और स्वास्थ्य साथ-साथ आगे बढ़ें।"
                : "We believe lasting development is only possible when education, self-reliance, environment, women empowerment and health advance together."}
            </p>
          </div>
          <div className={`hairline-grid ${styles.pillarGrid}`}>
            {pillars.map((p, i) => (
              <Reveal as="article" key={p.slug} delayMs={i * 60} className={styles.pillarCard}>
                <div className={styles.pillarCardTop}>
                  <span className={`${styles.pillarIndex} mono`}>{p.index}</span>
                  <PillarSymbol slug={p.slug} />
                </div>
                <div>
                  <h3 className={styles.pillarTitleHi} lang="hi">
                    {p.hi}
                  </h3>
                  <span className={styles.pillarTitleEn}>{p.en}</span>
                </div>
                <p className={styles.pillarBody} lang={isHi ? "hi" : undefined}>
                  {isHi ? p.body.hi : p.body.en}
                </p>
                <Link href={`/${locale}/pillar/${p.slug}`} className={styles.pillarLink} lang={isHi ? "hi" : undefined}>
                  {isHi ? "जानें अधिक →" : "Learn more →"}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className={styles.section} aria-labelledby="approach-heading">
        <div className={styles.sectionInner}>
          <span className="eyebrow">02 — {isHi ? "हमारा दृष्टिकोण" : "OUR APPROACH"}</span>
          <h2 id="approach-heading" className={styles.h2Latin} style={{ maxWidth: 640 }}>
            {isHi ? "हम समुदायों के साथ काम करते हैं, केवल उनके लिए नहीं।" : "We work with communities, not simply for them."}
          </h2>
          <div className={styles.timeline}>
            <div className={styles.timelineRule} aria-hidden="true" />
            <div className={styles.timelineGrid}>
              {approachSteps.map((step, i) => {
                const isPivot = i === 2;
                const color = isPivot ? "#D97745" : "#174A3A";
                return (
                  <Reveal as="div" key={step.hi} delayMs={i * 60} className={styles.timelineStep}>
                    <span
                      className={styles.timelineDot}
                      style={{ background: color, boxShadow: `0 0 0 1px ${color}` }}
                      aria-hidden="true"
                    />
                    <h3 className={styles.timelineTitle} lang="hi">
                      {step.hi}
                    </h3>
                    <span className={styles.timelineLabel}>{step.en}</span>
                    <p className={styles.timelineBody} lang={isHi ? "hi" : undefined}>
                      {isHi ? step.body.hi : step.body.en}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <div className={styles.impactBand}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader} style={{ border: "none", paddingBottom: 0 }}>
            <div>
              <span className="eyebrow eyebrow--on-sand">03 — {isHi ? "प्रभाव" : "IMPACT"}</span>
              <h2 className={styles.h2Deva} lang="hi">
                हमारे प्रभाव की कहानी
              </h2>
            </div>
            <Link href={`/${locale}/impact`} className="btn btn-outline">
              {isHi ? "पूरी प्रभाव रिपोर्ट देखें →" : "View the full impact report →"}
            </Link>
          </div>
          <div className={`hairline-grid ${styles.impactMetrics}`}>
            {impactMetrics.map((m) => (
              <div className={styles.metricCell} key={m.label.en}>
                <span className={styles.metricNumber}>—</span>
                <span className={styles.metricLabel}>{m.label[locale]}</span>
                <span className={styles.metricAnnotation}>
                  {isHi ? "अपुष्ट · अवधि निर्धारित नहीं" : "unverified · period t.b.d."}
                </span>
              </div>
            ))}
          </div>
          <p className={styles.impactDisclaimer}>
            {isHi
              ? "ऊपर दिया गया हर आंकड़ा एक ले-आउट प्लेसहोल्डर है। ट्रस्ट द्वारा सत्यापित संख्याएं उपलब्ध होते ही प्रत्येक मीट्रिक के लिए वर्ष और स्रोत रिपोर्ट के साथ जोड़ी जाएंगी।"
              : "Every figure above is a layout placeholder. Verified numbers, the period they cover, and the source report will be inserted per metric once the trust provides them."}
          </p>
        </div>
      </div>

      {/* Stories */}
      <section className={styles.section} aria-labelledby="stories-heading">
        <div className={styles.sectionInner}>
          <span className="eyebrow">04 — {isHi ? "बदलाव की कहानियाँ" : "STORIES OF CHANGE"}</span>
          <h2 id="stories-heading" className={styles.h2Deva} lang="hi" style={{ marginBottom: 56 }}>
            बदलाव की कहानियाँ
          </h2>
          <div className={styles.storiesGrid}>
            <div>
              <div className={styles.leadImage}>
                <ImagePlaceholder subject={stories.lead.subject} crop={stories.lead.crop} />
              </div>
              <div className={styles.leadStoryBody}>
                <div className={styles.storyMeta}>
                  <span className="chip" lang="hi">
                    {stories.lead.pillarHi}
                  </span>
                  <span className={styles.storyLocation}>{stories.lead.location}</span>
                </div>
                <h3 className={styles.leadStoryTitle} lang={isHi ? "hi" : undefined}>
                  {isHi ? stories.lead.title.hi : stories.lead.title.en}
                </h3>
                <p className={styles.storyBody} lang={isHi ? "hi" : undefined}>
                  {isHi ? stories.lead.body.hi : stories.lead.body.en}
                </p>
                <span className="annotation">
                  {isHi
                    ? "प्लेसहोल्डर कथा — साक्षात्कार-आधारित कहानी से बदलें, सहमति दर्ज की गई हो, परिणाम सत्यापित हो।"
                    : "Placeholder narrative — replace with an interview-based story, consent recorded, outcome verified."}
                </span>
                <Link href={`/${locale}/pillar/self`} className="section-link" lang={isHi ? "hi" : undefined}>
                  {isHi ? "पूरी कहानी पढ़ें →" : "Read full story →"}
                </Link>
              </div>
            </div>
            <div className={styles.secondaryStories}>
              {stories.secondary.map((s) => (
                <div key={s.title.en}>
                  <div className={styles.secondaryImage}>
                    <ImagePlaceholder subject={s.subject} crop={s.crop} />
                  </div>
                  <div className={styles.secondaryStoryBody}>
                    <div className={styles.storyMeta}>
                      <span className="chip" lang="hi" style={{ fontSize: 12.5, padding: "4px 10px" }}>
                        {s.pillarHi}
                      </span>
                      <span className={styles.storyLocation}>{s.location}</span>
                    </div>
                    <h3 className={styles.secondaryStoryTitle}>{isHi ? s.title.hi : s.title.en}</h3>
                    <p className={styles.storyBody} style={{ fontFamily: "var(--font-latin)", fontSize: 14.5 }}>
                      {isHi ? s.body.hi : s.body.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className={styles.section} style={{ paddingBottom: "clamp(64px,10vw,120px)" }} aria-labelledby="initiatives-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className="eyebrow">05 — {isHi ? "पहल" : "INITIATIVES"}</span>
              <h2 id="initiatives-heading" className={styles.h2Latin}>
                {isHi ? "विशिष्ट पहल" : "Featured initiatives"}
              </h2>
            </div>
            <Link href={`/${locale}/impact`} className="section-link">
              {isHi ? "सभी परियोजनाएं →" : "All projects →"}
            </Link>
          </div>
          <div className={styles.initiativesGrid}>
            {initiatives.map((item) => (
              <article className={styles.initiativeCard} key={item.title.en}>
                <div className={styles.initiativeImage}>
                  <ImagePlaceholder subject={item.subject} crop={item.crop} />
                </div>
                <div className={styles.initiativeBody}>
                  <div className={styles.initiativeMeta}>
                    <span className="chip" lang="hi">
                      {item.pillarHi}
                    </span>
                    <span
                      className={styles.statusRow}
                      style={{ color: item.status === "active" ? "var(--color-primary)" : "var(--color-text-muted)" }}
                    >
                      <span
                        className="status-dot"
                        style={{ background: item.status === "active" ? "var(--color-accent)" : "var(--color-secondary)" }}
                        aria-hidden="true"
                      />
                      {item.status === "active" ? (isHi ? "सक्रिय" : "ACTIVE") : isHi ? "योजनाबद्ध" : "PLANNED"}
                    </span>
                  </div>
                  <h3 className={styles.initiativeTitle}>{isHi ? item.title.hi : item.title.en}</h3>
                  <p className={styles.initiativeBodyText} lang={isHi ? "hi" : undefined}>
                    {isHi ? item.body.hi : item.body.en}
                  </p>
                  <div className={styles.initiativeFooter}>
                    <span>{item.location}</span>
                    <span className="section-link" lang={isHi ? "hi" : undefined}>
                      {isHi ? "प्रोजेक्ट देखें →" : "View project →"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <div className={styles.transparencyBand} data-surface="dark">
        <div className={styles.transparencyGrid}>
          <div className={styles.transparencyLeft}>
            <span className="eyebrow eyebrow--on-dark">06 — {isHi ? "पारदर्शिता" : "TRANSPARENCY"}</span>
            <h2 className={styles.h2Deva} lang="hi" style={{ color: "var(--color-on-dark)" }}>
              आपका विश्वास, हमारी जिम्मेदारी
            </h2>
            <p className={styles.transparencyBody}>
              {isHi
                ? "शासन दस्तावेज़, लेखा परीक्षित खाते और कार्यक्रम रिपोर्ट स्वीकृत होते ही प्रकाशित की जाती हैं। जब तक कोई चीज मौजूद नहीं होती, उसे यहां नहीं दिखाया जाता।"
                : "Governance documents, audited accounts and programme reports are published as they are approved. Nothing is shown here until it exists."}
            </p>
            <Link href={`/${locale}/transparency`} className="btn btn-light-on-dark" style={{ alignSelf: "flex-start" }}>
              {isHi ? "पारदर्शिता केंद्र →" : "Transparency centre →"}
            </Link>
          </div>
          <div className={`hairline-grid ${styles.disclosureGrid}`}>
            {transparencyCells.map((cell) => (
              <div className={styles.disclosureCell} key={cell.en}>
                <span className={styles.disclosureTitle}>{isHi ? cell.hi : cell.en}</span>
                <span className={`${styles.disclosureStatus} mono`}>{cell.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get involved */}
      <section className={styles.section} aria-labelledby="involved-heading">
        <div className={styles.sectionInner}>
          <span className="eyebrow">07 — {isHi ? "जुड़ें" : "GET INVOLVED"}</span>
          <h2 id="involved-heading" className={styles.h2Deva} lang="hi" style={{ marginBottom: 52 }}>
            साथ मिलकर बदलाव लाएँ
          </h2>
          <div className={styles.involvedGrid}>
            {getInvolvedCards.map((card) => (
              <Link href={`/${locale}${card.href}`} className={styles.involvedCard} key={card.key}>
                <span className="mono" style={{ fontSize: 11, color: "var(--color-text-faint)" }}>
                  {card.index}
                </span>
                <h3 className={styles.involvedTitle} lang={isHi ? "hi" : undefined}>
                  {isHi ? card.title.hi : card.title.en}
                </h3>
                <p className={styles.involvedBody} lang={isHi ? "hi" : undefined}>
                  {isHi ? card.body.hi : card.body.en}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Donation module */}
      <section className={styles.section} aria-labelledby="donate-heading">
        <div className={styles.sectionInner}>
          <div className={styles.donationPanel}>
            <div className={styles.donationLeft}>
              <h2 id="donate-heading" className={styles.donationTitle} lang="hi">
                आपका सहयोग, समुदाय की दिशा
              </h2>
              <p className={styles.donationBody} lang={isHi ? "hi" : undefined}>
                {isHi
                  ? "आपका योगदान शिक्षा, स्वास्थ्य, स्वावलंबन, पर्यावरण और महिला सशक्तिकरण के प्रयासों को आगे बढ़ाने में मदद करता है।"
                  : "Your contribution helps advance efforts in education, health, self-reliance, environment and women empowerment."}
              </p>
              <span className="annotation">
                {isHi
                  ? "भुगतान गेटवे, रसीद और कर-छूट का विवरण ट्रस्ट की अनुपालन जानकारी की पुष्टि होने पर यहां दिखाई देगा।"
                  : "Payment gateway, receipting and tax-exemption details will appear here once the trust's compliance information is confirmed."}
              </span>
            </div>
            <DonateTeaser locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
