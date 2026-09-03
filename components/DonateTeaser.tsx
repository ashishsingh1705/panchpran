"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./DonateTeaser.module.css";
import { pillars } from "@/lib/pillars";
import type { Locale } from "@/lib/i18n";

const AMOUNTS = [500, 1000, 2500];

export default function DonateTeaser({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(1000);
  const [directed, setDirected] = useState<string[]>([]);

  const toggleDirected = (slug: string) => {
    setDirected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const onSubmit = () => {
    const params = new URLSearchParams({ amount: String(amount), freq });
    if (directed.length) params.set("pillars", directed.join(","));
    router.push(`/${locale}/donate?${params.toString()}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.toggleTrack} role="radiogroup" aria-label={locale === "hi" ? "आवृत्ति" : "Frequency"}>
        <button
          type="button"
          role="radio"
          aria-checked={freq === "once"}
          className={`${styles.toggleBtn} ${freq === "once" ? styles.toggleBtnActive : ""}`}
          onClick={() => setFreq("once")}
        >
          {locale === "hi" ? "एकबार" : "One-time"}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={freq === "monthly"}
          className={`${styles.toggleBtn} ${freq === "monthly" ? styles.toggleBtnActive : ""}`}
          onClick={() => setFreq("monthly")}
        >
          {locale === "hi" ? "मासिक" : "Monthly"}
        </button>
      </div>

      <div className={styles.amountRow}>
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            className={`${styles.amountChip} ${amount === a ? styles.amountChipActive : ""}`}
            aria-pressed={amount === a}
            onClick={() => setAmount(a)}
          >
            ₹{a.toLocaleString("en-IN")}
          </button>
        ))}
      </div>

      <div>
        <span className={styles.directedLabel}>
          {locale === "hi" ? "अपना योगदान निर्देशित करें (वैकल्पिक)" : "Direct your contribution (optional)"}
        </span>
        <div className={styles.directedRow}>
          {pillars.map((p) => (
            <button
              key={p.slug}
              type="button"
              lang="hi"
              className={`${styles.pillarChip} ${directed.includes(p.slug) ? styles.pillarChipActive : ""}`}
              aria-pressed={directed.includes(p.slug)}
              onClick={() => toggleDirected(p.slug)}
            >
              {p.hi}
            </button>
          ))}
        </div>
      </div>

      <button type="button" className={`btn btn-secondary ${styles.submit}`} onClick={onSubmit}>
        <span lang="hi">सहयोग करें</span>
      </button>
      <p className={styles.reassurance}>
        {locale === "hi"
          ? "सुरक्षित भुगतान · ईमेल द्वारा रसीद · दानदाता विवरण कभी प्रकाशित नहीं होते"
          : "Secure payment · Receipt by email · Donor details never published"}
      </p>
    </div>
  );
}
