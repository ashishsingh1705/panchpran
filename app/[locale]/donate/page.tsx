import type { Metadata } from "next";
import homeStyles from "@/components/Home.module.css";
import DonateFlow from "@/components/DonateFlow";
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
      </div>
    </section>
  );
}
