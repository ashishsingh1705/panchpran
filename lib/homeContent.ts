export const approachSteps = [
  { hi: "सुनना", en: "Listen", body: { hi: "हम उन लोगों को सुनकर शुरुआत करते हैं जो समस्या के साथ जीते हैं।", en: "We begin by listening to the people who live with the problem." } },
  { hi: "समझना", en: "Understand", body: { hi: "किसी भी कार्यक्रम को डिज़ाइन करने से पहले स्थानीय जरूरतों का अध्ययन किया जाता है।", en: "Local needs are studied before any programme is designed." } },
  { hi: "साथ चलना", en: "Walk together", body: { hi: "कार्यक्रम समुदायों के साथ मिलकर, निर्णय साझा करते हुए चलाए जाते हैं।", en: "Programmes are run alongside communities, sharing decisions." } },
  { hi: "सक्षम बनाना", en: "Enable", body: { hi: "लक्ष्य दीर्घकालिक क्षमता है, अल्पकालिक राहत नहीं।", en: "The goal is long-term capability, not short-term relief." } },
  { hi: "स्थायी बदलाव", en: "Measure change", body: { hi: "परिणामों को दर्ज किया जाता है, समीक्षा की जाती है और खुले तौर पर प्रकाशित किया जाता है।", en: "Outcomes are recorded, reviewed and published openly." } },
];

export const impactMetrics = [
  { label: { hi: "जीवन तक पहुंच", en: "Lives reached" } },
  { label: { hi: "समर्थित छात्र", en: "Students supported" } },
  { label: { hi: "आजीविका कार्यक्रमों में महिलाएं", en: "Women in livelihood programmes" } },
  { label: { hi: "सामुदायिक पहल", en: "Community initiatives" } },
  { label: { hi: "गांव और समुदाय", en: "Villages & communities" } },
];

export const initiatives = [
  {
    pillarHi: "शिक्षा",
    status: "active" as const,
    location: "Uttar Pradesh",
    subject: "Learning centre",
    crop: "16:9",
    title: { hi: "सामुदायिक शिक्षण पहल", en: "Community Learning Initiative" },
    body: {
      hi: "बच्चों और युवाओं के लिए एक सुरक्षित, सुसंगत सीखने की जगह बनाना।",
      en: "Building a safe, consistent learning space for children and young people.",
    },
  },
  {
    pillarHi: "महिला सशक्तिकरण",
    status: "active" as const,
    location: "location — to be confirmed",
    subject: "Women's livelihood group",
    crop: "16:9",
    title: { hi: "आजीविका सामूहिक", en: "Livelihood Collectives" },
    body: {
      hi: "महिलाओं के समूहों को कौशल, बचत और साझा उद्यम के माध्यम से आगे बढ़ाना।",
      en: "Supporting groups of women through skills, savings and shared enterprise.",
    },
  },
  {
    pillarHi: "स्वास्थ्य",
    status: "planned" as const,
    location: "location — to be confirmed",
    subject: "Health camp",
    crop: "16:9",
    title: { hi: "निवारक स्वास्थ्य पहुंच", en: "Preventive Health Outreach" },
    body: {
      hi: "समुदायों में निवारक जांच और स्वास्थ्य जागरूकता शिविर लाना।",
      en: "Bringing preventive screening and health-awareness camps into communities.",
    },
  },
];

export const transparencyCells = [
  { hi: "वार्षिक रिपोर्ट", en: "Annual reports", status: "awaiting upload" },
  { hi: "लेखा परीक्षित वित्तीय विवरण", en: "Audited financial statements", status: "awaiting upload" },
  { hi: "पंजीकरण विवरण", en: "Registration details", status: "to be provided by the trust" },
  { hi: "शासी निकाय और नेतृत्व", en: "Governing body & leadership", status: "to be provided by the trust" },
  { hi: "नीतियां और अनुपालन", en: "Policies & compliance", status: "awaiting upload" },
  { hi: "दानदाता जानकारी और निधि का उपयोग", en: "Donor information & use of funds", status: "awaiting upload" },
];

export const getInvolvedCards = [
  { key: "donate", index: "01", title: { hi: "सहयोग करें", en: "Donate" }, body: { hi: "एकबार या मासिक रूप से आर्थिक सहयोग करें।", en: "Support programmes financially, once or monthly." }, href: "/donate" },
  { key: "volunteer", index: "02", title: { hi: "स्वयंसेवक बनें", en: "Volunteer" }, body: { hi: "अपने पास किसी कार्यक्रम को समय और कौशल दें।", en: "Give time and skills to a programme near you." }, href: "/volunteer" },
  { key: "partner", index: "03", title: { hi: "साझेदारी करें", en: "Partner" }, body: { hi: "साझा उद्देश्यों पर हमारे साथ सहयोग करें।", en: "Collaborate with us on shared objectives." }, href: "/partner" },
  { key: "advocate", index: "04", title: { hi: "पैरोकारी करें", en: "Advocate" }, body: { hi: "अधिक लोगों को इस काम के बारे में बताने में मदद करें।", en: "Help more people learn about this work." }, href: "/get-involved" },
  { key: "csr", index: "05", title: { hi: "कॉर्पोरेट सीएसआर", en: "Corporate CSR" }, body: { hi: "दीर्घकालिक सामाजिक-प्रभाव पहल बनाएं।", en: "Build long-term social-impact initiatives." }, href: "/partner" },
];

export const stories = {
  lead: {
    pillarHi: "स्वावलंबन",
    location: "location — to be confirmed",
    subject: "Woman at her workplace, environmental context",
    crop: "4:3",
    title: { hi: "सीमा की कहानी", en: "Seema's story" },
    body: {
      hi: "प्लेसहोल्डर कथा — साक्षात्कार-आधारित कहानी से बदलें, सहमति दर्ज की गई हो, परिणाम सत्यापित हो।",
      en: "Placeholder narrative — replace with an interview-based story, consent recorded, outcome verified.",
    },
  },
  secondary: [
    {
      pillarHi: "शिक्षा",
      location: "location — to be confirmed",
      subject: "Children in a learning space",
      crop: "16:9",
      title: { hi: "एक कक्षा की कहानी", en: "A classroom's story" },
      body: { hi: "प्लेसहोल्डर — साक्षात्कार-आधारित कहानी से बदलें।", en: "Placeholder — replace with an interview-based story." },
    },
    {
      pillarHi: "पर्यावरण",
      location: "location — to be confirmed",
      subject: "Plantation or water conservation work",
      crop: "16:9",
      title: { hi: "एक गांव की कहानी", en: "A village's story" },
      body: { hi: "प्लेसहोल्डर — साक्षात्कार-आधारित कहानी से बदलें।", en: "Placeholder — replace with an interview-based story." },
    },
  ],
};
