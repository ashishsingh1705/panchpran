import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { pillars } from "@/lib/pillars";
import type { Locale } from "@/lib/i18n";

const t = {
  hi: {
    org: "संगठन",
    programmes: "कार्यक्रम",
    getInvolved: "जुड़ें",
    transparency: "पारदर्शिता",
    about: "हमारे बारे में",
    vision: "दृष्टि और मिशन",
    panchPran: "पंच प्रण",
    leadership: "नेतृत्व",
    donate: "सहयोग करें",
    volunteer: "स्वयंसेवक बनें",
    partner: "साझेदारी करें",
    contact: "संपर्क करें",
    annualReports: "वार्षिक रिपोर्ट",
    financial: "वित्तीय जानकारी",
    governance: "शासन",
    policies: "नीतियाँ",
    address: "पंजीकृत कार्यालय — प्रदान की जाएगी",
    email: "ईमेल — प्रदान किया जाएगा",
    phone: "फोन — प्रदान किया जाएगा",
    copyright: "© पंच प्रण विकास ट्रस्ट",
    privacy: "गोपनीयता नीति",
    terms: "उपयोग की शर्तें",
    cookies: "कुकी नीति",
    accessibility: "सुगम्यता",
  },
  en: {
    org: "Organization",
    programmes: "Programmes",
    getInvolved: "Get involved",
    transparency: "Transparency",
    about: "About",
    vision: "Vision & Mission",
    panchPran: "Panch Pran",
    leadership: "Leadership",
    donate: "Donate",
    volunteer: "Volunteer",
    partner: "Partner",
    contact: "Contact",
    annualReports: "Annual reports",
    financial: "Financial information",
    governance: "Governance",
    policies: "Policies",
    address: "Registered office — to be provided",
    email: "Email — to be provided",
    phone: "Phone — to be provided",
    copyright: "© Panch Pran Vikas Trust",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    cookies: "Cookie Policy",
    accessibility: "Accessibility",
  },
};

export default function Footer({ locale }: { locale: Locale }) {
  const c = t[locale];
  return (
    <footer className={styles.footer} data-surface="dark">
      <div className={styles.inner}>
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <Image src="/logo.png" alt="Panch Pran Vikas Trust emblem" width={64} height={64} className={styles.emblem} />
            <span className={styles.brandHi} lang="hi">
              पंच प्रण विकास ट्रस्ट
            </span>
            <span className={styles.brandEn}>PANCH PRAN VIKAS TRUST</span>
            <div className={styles.addressBlock}>
              <span className="mono">{c.address}</span>
              <span className="mono">{c.email}</span>
              <span className="mono">{c.phone}</span>
            </div>
            <div className={styles.socialRow}>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
              <span aria-hidden="true">·</span>
              <a href="#" aria-label="LinkedIn">
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a href="#" aria-label="YouTube">
                YouTube
              </a>
            </div>
          </div>

          <nav className={styles.linkCol} aria-label={c.org}>
            <h2>{c.org}</h2>
            <ul>
              <li>
                <Link href={`/${locale}/about`}>{c.about}</Link>
              </li>
              <li>
                <Link href={`/${locale}/about`}>{c.vision}</Link>
              </li>
              <li>
                <Link href={`/${locale}/pillar/education`}>{c.panchPran}</Link>
              </li>
              <li>
                <Link href={`/${locale}/about`}>{c.leadership}</Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.linkCol} aria-label={c.programmes}>
            <h2>{c.programmes}</h2>
            <ul>
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${locale}/pillar/${p.slug}`} lang="hi" style={{ fontSize: "14.5px" }}>
                    {p.hi}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkCol} aria-label={c.getInvolved}>
            <h2>{c.getInvolved}</h2>
            <ul>
              <li>
                <Link href={`/${locale}/donate`}>{c.donate}</Link>
              </li>
              <li>
                <Link href={`/${locale}/volunteer`}>{c.volunteer}</Link>
              </li>
              <li>
                <Link href={`/${locale}/partner`}>{c.partner}</Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`}>{c.contact}</Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.linkCol} aria-label={c.transparency}>
            <h2>{c.transparency}</h2>
            <ul>
              <li>
                <Link href={`/${locale}/transparency`}>{c.annualReports}</Link>
              </li>
              <li>
                <Link href={`/${locale}/transparency`}>{c.financial}</Link>
              </li>
              <li>
                <Link href={`/${locale}/transparency`}>{c.governance}</Link>
              </li>
              <li>
                <Link href={`/${locale}/legal/privacy`}>{c.policies}</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.legalBar}>
          <span>{c.copyright}</span>
          <div className={styles.legalLinks}>
            <Link href={`/${locale}/legal/privacy`}>{c.privacy}</Link>
            <Link href={`/${locale}/legal/terms`}>{c.terms}</Link>
            <Link href={`/${locale}/legal/cookies`}>{c.cookies}</Link>
            <Link href={`/${locale}/legal/accessibility`}>{c.accessibility}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
