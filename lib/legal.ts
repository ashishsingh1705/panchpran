export type LegalDoc = "privacy" | "terms" | "cookies" | "accessibility" | "refund";

export const legalDocs: {
  slug: LegalDoc;
  title: { hi: string; en: string };
  scope: { hi: string; en: string };
  outstanding: { hi: string; en: string }[];
}[] = [
  {
    slug: "privacy",
    title: { hi: "गोपनीयता नीति", en: "Privacy Policy" },
    scope: {
      hi: "यह नीति बताएगी कि ट्रस्ट वेबसाइट आगंतुकों, दानदाताओं, स्वयंसेवकों और साझेदारों से कौन सा व्यक्तिगत डेटा एकत्र करता है, उसका उपयोग कैसे करता है, और उसे कैसे सुरक्षित रखता है।",
      en: "This policy will explain what personal data the trust's website collects from visitors, donors, volunteers and partners, how it is used, and how it is kept secure.",
    },
    outstanding: [
      { hi: "ट्रस्ट द्वारा अनुमोदित अंतिम नीति पाठ", en: "Final policy text approved by the trust" },
      { hi: "डेटा संरक्षण अधिकारी या संपर्क बिंदु का विवरण", en: "Data protection contact point" },
      { hi: "उपयोग किए जाने वाले तृतीय-पक्ष प्रोसेसर की सूची (भुगतान गेटवे, एनालिटिक्स)", en: "List of third-party processors used (payment gateway, analytics)" },
    ],
  },
  {
    slug: "terms",
    title: { hi: "उपयोग की शर्तें", en: "Terms of Use" },
    scope: {
      hi: "यह दस्तावेज़ इस वेबसाइट के उपयोग की शर्तों को निर्धारित करेगा, जिसमें स्वीकार्य उपयोग, बौद्धिक संपदा और दायित्व की सीमाएं शामिल हैं।",
      en: "This document will set out the terms for using this website, including acceptable use, intellectual property and limitations of liability.",
    },
    outstanding: [
      { hi: "ट्रस्ट के कानूनी सलाहकार द्वारा समीक्षित अंतिम शर्तें", en: "Final terms reviewed by the trust's legal counsel" },
      { hi: "प्रयोज्य कानून और क्षेत्राधिकार", en: "Governing law and jurisdiction" },
    ],
  },
  {
    slug: "cookies",
    title: { hi: "कुकी नीति", en: "Cookie Policy" },
    scope: {
      hi: "यह नीति बताएगी कि यह वेबसाइट कौन सी कुकीज़ और समान तकनीकों का उपयोग करती है, और आगंतुक अपनी सहमति कैसे प्रबंधित कर सकते हैं।",
      en: "This policy will explain which cookies and similar technologies this website uses, and how visitors can manage their consent.",
    },
    outstanding: [
      { hi: "अंतिम एनालिटिक्स और सहमति उपकरण का चयन", en: "Final choice of analytics and consent tooling" },
      { hi: "कुकी तालिका जो वास्तव में सहमति बार सेट करती है उससे मेल खानी चाहिए", en: "Cookie table must match what the consent bar actually sets" },
    ],
  },
  {
    slug: "accessibility",
    title: { hi: "सुगम्यता वक्तव्य", en: "Accessibility Statement" },
    scope: {
      hi: "यह वक्तव्य इस वेबसाइट की WCAG 2.2 AA अनुपालन स्थिति और ज्ञात सीमाओं का वर्णन करेगा।",
      en: "This statement will describe this website's WCAG 2.2 AA conformance status and any known limitations.",
    },
    outstanding: [
      { hi: "वास्तविक मध्यम श्रेणी के एंड्रॉइड उपकरण पर स्क्रीन-रीडर समीक्षा", en: "Screen-reader review on a real mid-tier Android device" },
      { hi: "सुगम्यता प्रतिक्रिया के लिए संपर्क चैनल", en: "Contact channel for accessibility feedback" },
    ],
  },
  {
    slug: "refund",
    title: { hi: "धनवापसी और रद्दीकरण नीति", en: "Refund & Cancellation Policy" },
    scope: {
      hi: "यह नीति बताएगी कि दान की धनवापसी या मासिक योगदान के रद्दीकरण का अनुरोध कैसे किया जाए।",
      en: "This policy will explain how to request a refund of a donation or cancel a monthly contribution.",
    },
    outstanding: [
      { hi: "भुगतान गेटवे साझेदार का चयन और उसकी धनवापसी प्रक्रिया", en: "Choice of payment gateway partner and its refund process" },
      { hi: "धनवापसी अनुरोधों के लिए समय-सीमा", en: "Turnaround time for refund requests" },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
