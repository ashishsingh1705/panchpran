import type { PillarSlug } from "./pillars";

export const reportMeta = {
  fyLabel: { hi: "वित्तीय वर्ष 2025–26 (नमूना)", en: "Financial Year 2025–26 (sample)" },
  period: { hi: "1 अप्रैल 2025 – 31 मार्च 2026", en: "1 April 2025 – 31 March 2026" },
};

export const snapshotStats = [
  { value: "3,150", label: { hi: "लोगों तक पहुंच", en: "People reached" } },
  { value: "410", label: { hi: "समर्थित छात्र", en: "Students supported" } },
  { value: "18", label: { hi: "सक्रिय समूह और पहल", en: "Active groups & initiatives" } },
  { value: "6", label: { hi: "गांव और समुदाय", en: "Villages & communities" } },
  { value: "₹46L", label: { hi: "कुल आय", en: "Total income" } },
  { value: "86%", label: { hi: "कार्यक्रमों पर खर्च अनुपात", en: "Programme spend ratio" } },
];

export const leadershipQuote = {
  quote: {
    hi: "यह नमूना दिखाता है कि हमारी आगामी वार्षिक रिपोर्ट किस रूप में प्रकाशित होगी — पारदर्शी, स्पष्ट और सत्यापित आंकड़ों के साथ।",
    en: "This sample shows the shape our published annual report will take — transparent, clear, and built on verified figures.",
  },
  role: { hi: "कार्यक्रम नेतृत्व — नमूना उद्धरण", en: "Programme leadership — sample quote" },
};

export const programmeSample: Record<
  PillarSlug,
  { reach: string; output: { hi: string; en: string }; fundPercent: number }
> = {
  education: {
    reach: "410",
    output: { hi: "410 छात्रों को शिक्षण सहायता मिली (नमूना)", en: "410 students received learning support (sample)" },
    fundPercent: 25,
  },
  self: {
    reach: "260",
    output: { hi: "260 प्रतिभागियों ने कौशल प्रशिक्षण पूरा किया (नमूना)", en: "260 participants completed skills training (sample)" },
    fundPercent: 16,
  },
  environment: {
    reach: "1,200",
    output: { hi: "1,200 पौधे रोपे गए (नमूना)", en: "1,200 saplings planted (sample)" },
    fundPercent: 14,
  },
  women: {
    reach: "340",
    output: { hi: "340 महिलाएं आजीविका समूहों में सक्रिय (नमूना)", en: "340 women active in livelihood groups (sample)" },
    fundPercent: 18,
  },
  health: {
    reach: "940",
    output: { hi: "940 लोगों ने निवारक स्वास्थ्य शिविरों में भाग लिया (नमूना)", en: "940 people attended preventive health camps (sample)" },
    fundPercent: 17,
  },
};

export const overheadSample = [
  { hi: "प्रशासनिक व्यय", en: "Administrative costs", fundPercent: 7 },
  { hi: "निधि-संग्रहण व्यय", en: "Fundraising costs", fundPercent: 3 },
];

export const incomeSources = [
  { hi: "व्यक्तिगत दान", en: "Individual donations", amount: 1890000 },
  { hi: "कॉर्पोरेट सीएसआर अनुदान", en: "Corporate CSR grants", amount: 1430000 },
  { hi: "फाउंडेशन और संस्थागत अनुदान", en: "Foundation & institutional grants", amount: 980000 },
  { hi: "अन्य आय (बैंक ब्याज आदि)", en: "Other income (bank interest, etc.)", amount: 300000 },
];

export const expenditureLines = [
  { hi: "कार्यक्रम व्यय — शिक्षा", en: "Programme costs — Education", amount: 1105000 },
  { hi: "कार्यक्रम व्यय — स्वावलंबन", en: "Programme costs — Self-Reliance", amount: 707000 },
  { hi: "कार्यक्रम व्यय — पर्यावरण", en: "Programme costs — Environment", amount: 619000 },
  { hi: "कार्यक्रम व्यय — महिला सशक्तिकरण", en: "Programme costs — Women Empowerment", amount: 796000 },
  { hi: "कार्यक्रम व्यय — स्वास्थ्य", en: "Programme costs — Health", amount: 751000 },
  { hi: "प्रशासनिक व्यय", en: "Administrative costs", amount: 309000 },
  { hi: "निधि-संग्रहण व्यय", en: "Fundraising costs", amount: 133000 },
];

export const balanceSheet = {
  assets: [
    { hi: "नकद और बैंक शेष", en: "Cash & bank balances", amount: 1540000 },
    { hi: "अचल संपत्तियां (शुद्ध)", en: "Fixed assets (net)", amount: 420000 },
    { hi: "अन्य प्राप्य", en: "Other receivables", amount: 95000 },
  ],
  liabilities: [
    { hi: "प्रतिबंधित परियोजना निधि", en: "Restricted project funds", amount: 560000 },
    { hi: "अप्रतिबंधित संचय एवं अधिशेष", en: "Unrestricted reserves & surplus", amount: 1360000 },
    { hi: "चालू देनदारियां (देय)", en: "Current liabilities (payables)", amount: 135000 },
  ],
};

export const governanceSample = {
  boardSize: 5,
  meetingsHeld: 4,
  policies: [
    { hi: "वित्तीय प्रबंधन नीति", en: "Financial management policy" },
    { hi: "बाल संरक्षण नीति", en: "Child safeguarding policy" },
    { hi: "व्हिसलब्लोअर एवं शिकायत नीति", en: "Whistleblower & grievance policy" },
    { hi: "हितों के टकराव संबंधी नीति", en: "Conflict-of-interest policy" },
  ],
};
