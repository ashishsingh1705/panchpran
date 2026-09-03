import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { pillars } from "@/lib/pillars";
import { legalDocs } from "@/lib/legal";

const BASE_URL = "https://panchpranvikastrust.org";

const staticPaths = ["", "/about", "/impact", "/transparency", "/get-involved", "/donate", "/volunteer", "/partner", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({ url: `${BASE_URL}/${locale}${path}`, lastModified: new Date() });
    }
    for (const pillar of pillars) {
      entries.push({ url: `${BASE_URL}/${locale}/pillar/${pillar.slug}`, lastModified: new Date() });
    }
    for (const doc of legalDocs) {
      entries.push({ url: `${BASE_URL}/${locale}/legal/${doc.slug}`, lastModified: new Date() });
    }
  }

  return entries;
}
