"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { navItems, otherLocale, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [disclosureOpen, setDisclosureOpen] = useState(false);
  const disclosureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDrawerOpen(false);
    setDisclosureOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!disclosureOpen) return;
    const onClick = (e: MouseEvent) => {
      if (disclosureRef.current && !disclosureRef.current.contains(e.target as Node)) {
        setDisclosureOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDisclosureOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [disclosureOpen]);

  const other = otherLocale(locale);
  const isActive = (href: string) => pathname === href;

  const otherLocalePath = pathname
    ? pathname.replace(`/${locale}`, `/${other}`) || `/${other}`
    : `/${other}`;

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <Link href={`/${locale}`} className={styles.brand}>
          <Image src="/logo.png" alt="Panch Pran Vikas Trust emblem" width={56} height={56} className={styles.brandMark} priority />
          <span className={styles.brandText}>
            <span className={styles.brandHi} lang="hi">
              पंच प्रण विकास ट्रस्ट
            </span>
            <span className={styles.brandEn}>PANCH PRAN VIKAS TRUST</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={locale === "hi" ? "मुख्य नेविगेशन" : "Main navigation"}>
          {navItems.map((item) => {
            const href = item.href(locale);
            if (item.children) {
              return (
                <div className={styles.disclosure} ref={disclosureRef} key={href}>
                  <button
                    type="button"
                    className={styles.disclosureTrigger}
                    aria-expanded={disclosureOpen}
                    onClick={() => setDisclosureOpen((v) => !v)}
                    onFocus={() => setDisclosureOpen(true)}
                  >
                    <span lang={locale}>{item.label[locale]}</span>
                    <svg
                      className={`${styles.caret} ${disclosureOpen ? styles.caretOpen : ""}`}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </button>
                  {disclosureOpen && (
                    <div className={styles.disclosurePanel} role="menu">
                      {item.children.map((child) => (
                        <Link key={child.href(locale)} href={child.href(locale)} lang={locale} role="menuitem">
                          {child.label[locale]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                lang={locale}
                className={`${styles.navItem} ${isActive(href) ? styles.navItemActive : ""}`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {item.label[locale]}
              </Link>
            );
          })}
        </nav>

        <div className={styles.utilities}>
          <div className={styles.langSwitch}>
            <Link
              href={locale === "hi" ? pathname ?? "/hi" : otherLocalePath}
              lang="hi"
              className={locale === "hi" ? styles.langActive : styles.langInactive}
              aria-current={locale === "hi" ? "true" : undefined}
            >
              हिन्दी
            </Link>
            <span className={styles.langDivider} aria-hidden="true" />
            <Link
              href={locale === "en" ? pathname ?? "/en" : otherLocalePath}
              lang="en"
              className={locale === "en" ? styles.langActive : styles.langInactive}
              aria-current={locale === "en" ? "true" : undefined}
            >
              English
            </Link>
          </div>
          <Link href={`/${locale}/donate`} className="btn btn-primary">
            <span lang={locale}>{locale === "hi" ? "सहयोग करें" : "Donate"}</span>
          </Link>
          <button
            type="button"
            className={styles.hamburger}
            aria-label={locale === "hi" ? "मेनू खोलें" : "Open menu"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {drawerOpen && (
        <>
          <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)} />
          <div
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label={locale === "hi" ? "नेविगेशन मेनू" : "Navigation menu"}
          >
            <div className={styles.drawerHeader}>
              <button
                type="button"
                className={styles.drawerClose}
                onClick={() => setDrawerOpen(false)}
                aria-label={locale === "hi" ? "मेनू बंद करें" : "Close menu"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className={styles.drawerNav} aria-label={locale === "hi" ? "मुख्य नेविगेशन" : "Main navigation"}>
              {navItems.map((item) => (
                <Link key={item.href(locale)} href={item.href(locale)} lang={locale} className={styles.drawerNavItem}>
                  {item.label[locale]}
                </Link>
              ))}
            </nav>
            <div className={styles.drawerFooter}>
              <div className={styles.drawerLangSwitch}>
                <Link href={locale === "hi" ? pathname ?? "/hi" : otherLocalePath} lang="hi" className={locale === "hi" ? styles.langActive : styles.langInactive}>
                  हिन्दी
                </Link>
                <Link href={locale === "en" ? pathname ?? "/en" : otherLocalePath} lang="en" className={locale === "en" ? styles.langActive : styles.langInactive}>
                  English
                </Link>
              </div>
              <Link href={`/${locale}/donate`} className="btn btn-primary" style={{ width: "100%" }}>
                <span lang={locale}>{locale === "hi" ? "सहयोग करें" : "Donate"}</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
