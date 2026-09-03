export type Locale = "hi" | "en";

export const locales: Locale[] = ["hi", "en"];

export const defaultLocale: Locale = "hi";

export function otherLocale(locale: Locale): Locale {
  return locale === "hi" ? "en" : "hi";
}

export interface NavItem {
  href: (locale: Locale) => string;
  label: { hi: string; en: string };
  children?: { href: (locale: Locale) => string; label: { hi: string; en: string } }[];
}

export const navItems: NavItem[] = [
  { href: (l) => `/${l}`, label: { hi: "होम", en: "Home" } },
  { href: (l) => `/${l}/about`, label: { hi: "हमारे बारे में", en: "About Us" } },
  {
    href: (l) => `/${l}/pillar/education`,
    label: { hi: "हमारा कार्य", en: "Our Work" },
    children: [
      { href: (l) => `/${l}/pillar/education`, label: { hi: "शिक्षा", en: "Education" } },
      { href: (l) => `/${l}/pillar/self`, label: { hi: "स्वावलंबन", en: "Self-Reliance" } },
      { href: (l) => `/${l}/pillar/environment`, label: { hi: "पर्यावरण", en: "Environment" } },
      { href: (l) => `/${l}/pillar/women`, label: { hi: "महिला सशक्तिकरण", en: "Women Empowerment" } },
      { href: (l) => `/${l}/pillar/health`, label: { hi: "स्वास्थ्य", en: "Health" } },
    ],
  },
  { href: (l) => `/${l}/impact`, label: { hi: "प्रभाव", en: "Impact" } },
  { href: (l) => `/${l}/get-involved`, label: { hi: "जुड़ें", en: "Get Involved" } },
  { href: (l) => `/${l}/transparency`, label: { hi: "पारदर्शिता", en: "Transparency" } },
  { href: (l) => `/${l}/contact`, label: { hi: "संपर्क करें", en: "Contact" } },
];
