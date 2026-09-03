import type { Metadata } from "next";
import Link from "next/link";
import homeStyles from "@/components/Home.module.css";
import DonateFlow from "@/components/DonateFlow";
import { orgDetails } from "@/lib/orgDetails";
import type { Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: params.locale === "hi" ? "सहयोग करें" : "Donate" };
}

export default function DonatePage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { amount?: string; freq?: string; pillars?: string };
}) {
  const { locale } = params;
  const isHi = locale === "hi";
  const parsedAmount = parseInt(searchParams.amount ?? "", 10);
  const initialAmount = !isNaN(parsedAmount) && parsedAmount >= 100 ? parsedAmount : 1000;
  const initialFreq = searchParams.freq === "monthly" ? "monthly" : "once";
  const initialPillars = searchParams.pillars ? searchParams.pillars.split(",") : [];

  return (
    <section className={homeStyles.section} style={{ paddingBottom: "clamp(64px,10vw,120px)" }}>
      <div className={homeStyles.sectionInner}>
        <span className="eyebrow">{isHi ? "जुड़ें" : "GET INVOLVED"}</span>
        <h1 className={homeStyles.h2Deva} lang="hi" style={{ marginBottom: 48 }}>
          साथ मिलकर बदलाव लाएँ
        </h1>
        <DonateFlow locale={locale} initialAmount={initialAmount} initialFreq={initialFreq} initialPillars={initialPillars} />

        <div
          style={{
            marginTop: 56,
            maxWidth: 640,
            padding: "24px 28px",
            background: "var(--color-sand)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
            {isHi ? "सीधे बैंक हस्तांतरण को प्राथमिकता देते हैं?" : "Prefer a direct bank transfer?"}
          </h2>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--color-text-muted-dark)", marginBottom: 14 }}>
            {isHi
              ? "ऑनलाइन भुगतान गेटवे जुड़ने तक, आप NEFT/RTGS/IMPS के माध्यम से सीधे नीचे दिए गए खाते में योगदान भेज सकते हैं।"
              : "Until the online payment gateway is connected, you can send a contribution directly via NEFT/RTGS/IMPS to the account below."}
          </p>
          <p className="mono" style={{ fontSize: 12.5, lineHeight: 1.9, color: "var(--color-secondary-on-sand)" }}>
            {orgDetails.bank.name} · {orgDetails.bank.branch}
            <br />
            {isHi ? "खाता संख्या" : "Account number"}: {orgDetails.bank.accountNumber}
            <br />
            IFSC: {isHi ? "प्रदान किया जाना है" : "to be provided by the trust"}
          </p>
          <Link href={`/${locale}/transparency`} className="section-link" style={{ display: "inline-block", marginTop: 14, fontSize: 13.5 }}>
            {isHi ? "पूर्ण पंजीकरण विवरण देखें →" : "View full registration details →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
