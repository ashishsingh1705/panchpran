export type PillarSlug = "education" | "self" | "environment" | "women" | "health";

export interface PillarCopy {
  slug: PillarSlug;
  index: string;
  hi: string;
  en: string;
  body: { hi: string; en: string };
  whyPledge: { hi: string; en: string };
  activities: { hi: string; en: string }[];
  measurement: { hi: string; en: string };
  storyTitle: { hi: string; en: string };
  storyLocation: string;
}

export const pillars: PillarCopy[] = [
  {
    slug: "education",
    index: "01",
    hi: "शिक्षा",
    en: "Education",
    body: {
      hi: "बच्चों और समुदायों के लिए गुणवत्तापूर्ण शिक्षा, सीखने के अवसर और कौशल तक पहुंच।",
      en: "Access to quality education, learning opportunities and skills for children and communities.",
    },
    whyPledge: {
      hi: "शिक्षा हर दूसरे प्रण की नींव है — बिना सीखने के अवसर के, स्वावलंबन और नेतृत्व दूर के लक्ष्य बने रहते हैं।",
      en: "Education is the foundation the other four pledges are built on — without access to learning, self-reliance and leadership stay out of reach.",
    },
    activities: [
      { hi: "स्कूल-सहायता कार्यक्रम — विवरण उपलब्ध होने पर जोड़ा जाएगा", en: "School-support programme — details to be added once confirmed" },
      { hi: "सामुदायिक पुस्तकालय / अध्ययन केंद्र — योजना चरण में", en: "Community library / learning centre — in planning" },
      { hi: "शिक्षक-सहयोग पहल — योजना चरण में", en: "Teacher-support initiative — in planning" },
    ],
    measurement: {
      hi: "नामांकन, उपस्थिति और सीखने के स्तर को शैक्षणिक वर्ष के अनुसार दर्ज किया जाएगा और सत्यापित होने पर प्रकाशित किया जाएगा।",
      en: "Enrolment, attendance and learning-level indicators will be tracked by academic year and published once verified.",
    },
    storyTitle: { hi: "सीमा की कहानी", en: "Seema's story" },
    storyLocation: "location — to be confirmed",
  },
  {
    slug: "self",
    index: "02",
    hi: "स्वावलंबन",
    en: "Self-Reliance",
    body: {
      hi: "कौशल, आजीविका, उद्यम और व्यावसायिक विकास के माध्यम से आर्थिक स्वतंत्रता।",
      en: "Economic independence through skills, livelihoods, enterprise and vocational development.",
    },
    whyPledge: {
      hi: "स्थायी बदलाव तब टिकता है जब परिवार अपनी आय खुद बना सकें — राहत नहीं, क्षमता चाहिए।",
      en: "Change lasts when families can generate their own income — the goal is capability, not relief.",
    },
    activities: [
      { hi: "व्यावसायिक कौशल प्रशिक्षण — योजना चरण में", en: "Vocational skills training — in planning" },
      { hi: "लघु उद्यम सहयोग समूह — योजना चरण में", en: "Small-enterprise collectives — in planning" },
    ],
    measurement: {
      hi: "प्रशिक्षण पूरा करने की दर और बारह महीने बाद सक्रिय आजीविका को दर्ज किया जाएगा।",
      en: "Training completion rates and livelihoods still active after twelve months will be tracked.",
    },
    storyTitle: { hi: "एक समूह की कहानी", en: "A collective's story" },
    storyLocation: "location — to be confirmed",
  },
  {
    slug: "environment",
    index: "03",
    hi: "पर्यावरण",
    en: "Environment",
    body: {
      hi: "संरक्षण, वृक्षारोपण, जल संरक्षण, अपशिष्ट प्रबंधन और उत्तरदायी जीवनशैली।",
      en: "Conservation, plantation, water protection, waste management and responsible living.",
    },
    whyPledge: {
      hi: "जिन समुदायों के साथ हम काम करते हैं, वे सबसे पहले पर्यावरणीय दबाव का सामना करते हैं — इसलिए यह प्रण बाकी सभी से जुड़ा है।",
      en: "The communities we work with are first to feel environmental strain, which is why this pledge connects to every other one.",
    },
    activities: [
      { hi: "वृक्षारोपण अभियान — योजना चरण में", en: "Plantation drives — in planning" },
      { hi: "जल संरक्षण कार्य — योजना चरण में", en: "Water-conservation work — in planning" },
    ],
    measurement: {
      hi: "दो और पांच वर्षों में वृक्ष उत्तरजीविता दर दर्ज कर प्रकाशित की जाएगी।",
      en: "Tree survival at two and five years will be recorded and published.",
    },
    storyTitle: { hi: "एक गांव की कहानी", en: "A village's story" },
    storyLocation: "location — to be confirmed",
  },
  {
    slug: "women",
    index: "04",
    hi: "महिला सशक्तिकरण",
    en: "Women Empowerment",
    body: {
      hi: "कौशल, आर्थिक स्वतंत्रता, नेतृत्व और सामुदायिक निर्णयों में भागीदारी।",
      en: "Skills, economic independence, leadership and participation in community decisions.",
    },
    whyPledge: {
      hi: "जब महिलाएं निर्णय लेने में भाग लेती हैं, तो पूरे समुदाय का भविष्य बदलता है।",
      en: "When women take part in decisions, the future of the whole community shifts.",
    },
    activities: [
      { hi: "महिला आजीविका समूह — योजना चरण में", en: "Women's livelihood groups — in planning" },
      { hi: "नेतृत्व प्रशिक्षण — योजना चरण में", en: "Leadership training — in planning" },
    ],
    measurement: {
      hi: "बारह महीने बाद सक्रिय समूहों की संख्या और नेतृत्व भूमिकाओं में भागीदारी दर्ज की जाएगी।",
      en: "Groups still active after twelve months and participation in leadership roles will be tracked.",
    },
    storyTitle: { hi: "एक नेता की कहानी", en: "A leader's story" },
    storyLocation: "location — to be confirmed",
  },
  {
    slug: "health",
    index: "05",
    hi: "स्वास्थ्य",
    en: "Health",
    body: {
      hi: "निवारक स्वास्थ्य जागरूकता, पोषण, स्वच्छता और सामुदायिक स्वास्थ्य पहुंच।",
      en: "Preventive health awareness, nutrition, sanitation and community health outreach.",
    },
    whyPledge: {
      hi: "स्वस्थ समुदाय ही सीख सकता है, कमा सकता है और नेतृत्व कर सकता है — स्वास्थ्य हर दूसरे प्रण को सहारा देता है।",
      en: "A healthy community is what makes learning, earning and leading possible — health underwrites every other pledge.",
    },
    activities: [
      { hi: "निवारक स्वास्थ्य शिविर — योजना चरण में", en: "Preventive health camps — in planning" },
      { hi: "पोषण जागरूकता कार्यक्रम — योजना चरण में", en: "Nutrition-awareness programme — in planning" },
    ],
    measurement: {
      hi: "पूर्ण किए गए रेफरल और शिविर भागीदारी को रिपोर्टिंग चक्र के अनुसार दर्ज किया जाएगा।",
      en: "Completed referrals and camp participation will be tracked by reporting cycle.",
    },
    storyTitle: { hi: "एक स्वास्थ्य शिविर की कहानी", en: "A health camp's story" },
    storyLocation: "location — to be confirmed",
  },
];

export function getPillar(slug: string): PillarCopy | undefined {
  return pillars.find((p) => p.slug === slug);
}
