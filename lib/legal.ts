export type LegalDoc = "privacy" | "terms" | "cookies" | "accessibility" | "refund";

interface LegalSection {
  heading: { hi: string; en: string };
  body: { hi: string; en: string };
}

interface LegalDocEntry {
  slug: LegalDoc;
  title: { hi: string; en: string };
  scope: { hi: string; en: string };
  lastUpdated?: string;
  sections?: LegalSection[];
  outstanding: { hi: string; en: string }[];
}

export const legalDocs: LegalDocEntry[] = [
  {
    slug: "privacy",
    title: { hi: "गोपनीयता नीति", en: "Privacy Policy" },
    scope: {
      hi: "यह नीति बताती है कि पंच प्रण विकास ट्रस्ट की वेबसाइट कौन सा व्यक्तिगत डेटा एकत्र करती है, उसका उपयोग कैसे करती है, किसके साथ साझा करती है, और आपके क्या अधिकार हैं।",
      en: "This policy explains what personal data the Panch Pran Vikas Trust website collects, how it is used, who it is shared with, and what rights you have over it.",
    },
    lastUpdated: "2026-09-03",
    sections: [
      {
        heading: { hi: "हम क्या एकत्र करते हैं", en: "What we collect" },
        body: {
          hi: "जब आप संपर्क, स्वयंसेवक या साझेदारी फॉर्म भरते हैं, तो हम आपका नाम, ईमेल पता, आपके द्वारा दिया गया कोई अतिरिक्त विवरण (जैसे संगठन का नाम) और आपका संदेश एकत्र करते हैं। दान फ़्लो अभी किसी भुगतान गेटवे से जुड़ा नहीं है, इसलिए उसमें दर्ज कोई भी जानकारी हमारे किसी सर्वर या ईमेल तक नहीं पहुंचती। होस्टिंग प्रदाता मानक तकनीकी लॉग (जैसे IP पता, ब्राउज़र प्रकार) अस्थायी रूप से रिकॉर्ड कर सकता है, जैसा हर वेबसाइट के लिए सामान्य है।",
          en: "When you fill in the Contact, Volunteer or Partner form, we collect your name, email address, any additional field you provide (such as an organisation name) and your message. The donate flow is not yet connected to a payment gateway, so nothing entered there reaches our servers or inbox. Our hosting provider may briefly log standard technical data (such as IP address and browser type), as is normal for any website.",
        },
      },
      {
        heading: { hi: "हम इसका उपयोग क्यों करते हैं", en: "Why we use it" },
        body: {
          hi: "आपके संदेश का जवाब देने, स्वयंसेवा या साझेदारी के अवसरों पर समन्वय करने, और (भुगतान गेटवे जुड़ने के बाद) दान की पुष्टि व रसीद भेजने के लिए। हम इस जानकारी का उपयोग विपणन ईमेल भेजने के लिए तब तक नहीं करते जब तक आप स्पष्ट रूप से सहमति नहीं देते।",
          en: "To respond to your message, to coordinate volunteering or partnership opportunities, and — once a payment gateway is connected — to confirm and issue receipts for donations. We do not use this information to send marketing email unless you separately opt in.",
        },
      },
      {
        heading: { hi: "यह किसके साथ साझा होता है", en: "Who we share it with" },
        body: {
          hi: "आपका फॉर्म सबमिशन Resend (ईमेल भेजने की सेवा) के माध्यम से ट्रस्ट के स्टाफ द्वारा प्रबंधित एक ईमेल इनबॉक्स में भेजा जाता है। यह वेबसाइट Vercel पर होस्ट की जाती है। न तो Resend और न ही Vercel आपके डेटा का उपयोग अपने स्वयं के उद्देश्यों के लिए करते हैं — वे केवल हमारी ओर से इसे संसाधित करते हैं। हम आपका डेटा किसी को बेचते नहीं हैं। दानदाता की पहचान कभी सार्वजनिक रूप से प्रकाशित नहीं की जाती।",
          en: "Your form submission is sent, via Resend (an email-delivery service), to an inbox managed by trust staff. This website is hosted on Vercel. Neither Resend nor Vercel use your data for their own purposes — they process it only on our behalf. We do not sell your data. Donor identity is never published publicly.",
        },
      },
      {
        heading: { hi: "हम इसे कितने समय तक रखते हैं", en: "How long we keep it" },
        body: {
          hi: "फॉर्म सबमिशन को आपके अनुरोध का जवाब देने के लिए आवश्यक समय तक, और उसके बाद हमारे रिकॉर्ड के लिए 12 महीने तक रखा जाता है, जब तक आप पहले हटाने का अनुरोध नहीं करते।",
          en: "Form submissions are kept for as long as needed to respond to your enquiry, and for 12 months afterward for our own records, unless you ask us to delete them sooner.",
        },
      },
      {
        heading: { hi: "आपके अधिकार", en: "Your rights" },
        body: {
          hi: "आप हमसे अपने डेटा की एक प्रति, उसमें सुधार, या उसे हटाने का अनुरोध कर सकते हैं। ऐसा करने के लिए, संपर्क पृष्ठ पर प्रकाशित होने वाले ईमेल पते पर लिखें (यह पता अभी ट्रस्ट द्वारा प्रदान किया जाना बाकी है)।",
          en: "You can ask us for a copy of your data, to correct it, or to delete it. To do so, write to the email address that will be published on our Contact page (that address is still pending from the trust).",
        },
      },
      {
        heading: { hi: "कुकीज़", en: "Cookies" },
        body: {
          hi: "यह वेबसाइट वर्तमान में कोई ट्रैकिंग, विज्ञापन या एनालिटिक्स कुकी सेट नहीं करती। कोई भी भविष्य का बदलाव यहां और हमारी कुकी नीति में पहले दर्शाया जाएगा।",
          en: "This website does not currently set any tracking, advertising or analytics cookies. Any future change to that will be reflected here and in our Cookie Policy first.",
        },
      },
      {
        heading: { hi: "सुरक्षा", en: "Security" },
        body: {
          hi: "डेटा HTTPS के माध्यम से एन्क्रिप्टेड भेजा जाता है। सार्वजनिक फॉर्म स्वचालित स्पैम से सुरक्षित हैं। हम कार्ड या भुगतान विवरण कभी अपने सिस्टम पर संग्रहीत नहीं करते।",
          en: "Data is transmitted encrypted over HTTPS. Public forms are protected against automated spam. We never store card or payment details on our own systems.",
        },
      },
    ],
    outstanding: [
      { hi: "ट्रस्ट का वास्तविक संपर्क ईमेल पता (गोपनीयता अनुरोधों के लिए)", en: "The trust's real contact email address (for privacy requests)" },
      { hi: "भुगतान गेटवे जुड़ने पर उसका नाम इस नीति में जोड़ा जाएगा", en: "The payment gateway will be named here once one is connected" },
      { hi: "ट्रस्ट के कानूनी सलाहकार द्वारा अंतिम समीक्षा", en: "Final review by the trust's legal counsel" },
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
