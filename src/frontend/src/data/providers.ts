import type { Category, Provider } from "../types";

export const SAMPLE_PROVIDERS: Provider[] = [
  {
    id: "1",
    name: "Rahim Uddin",
    nameBn: "রহিম উদ্দিন",
    category: "Plumbing",
    area: "Tongi",
    phone: "+8801711223344",
    whatsapp: "+8801711223344",
    description:
      "Expert plumber with 10+ years of experience. Available 7 days a week for all pipe and pump repairs.",
    descriptionBn:
      "১০+ বছরের অভিজ্ঞতা সম্পন্ন দক্ষ প্লাম্বার। সকল পাইপ ও পাম্প মেরামতের জন্য সপ্তাহে ৭ দিন পাওয়া যায়।",
    priceRange: "Low",
    rating: 4.8,
    reviewCount: 47,
    available: true,
  },
  {
    id: "2",
    name: "Karim Electric",
    nameBn: "করিম ইলেকট্রিক",
    category: "Electrical",
    area: "Gazipur Sadar",
    phone: "+8801855667788",
    whatsapp: "+8801855667788",
    email: "karim.electric@email.com",
    description:
      "Licensed electrician for home wiring, fans, ACs, and all electrical work. Fast and reliable.",
    descriptionBn:
      "হোম ওয়্যারিং, ফ্যান, এসি এবং সকল বৈদ্যুতিক কাজের জন্য লাইসেন্সপ্রাপ্ত ইলেকট্রিশিয়ান। দ্রুত ও নির্ভরযোগ্য।",
    priceRange: "Medium",
    rating: 4.6,
    reviewCount: 32,
    available: true,
  },
  {
    id: "3",
    name: "Clean Home Service",
    nameBn: "ক্লিন হোম সার্ভিস",
    category: "Cleaning",
    area: "Pubail",
    phone: "+8801933445566",
    description:
      "Professional home and office cleaning service. Trained staff, eco-friendly products.",
    descriptionBn:
      "পেশাদার বাড়ি ও অফিস পরিষ্কার সেবা। প্রশিক্ষিত কর্মী, পরিবেশবান্ধব পণ্য।",
    priceRange: "Medium",
    rating: 4.5,
    reviewCount: 28,
    available: true,
  },
  {
    id: "4",
    name: "Hasan Tutor Center",
    nameBn: "হাসান টিউটর সেন্টার",
    category: "Tutoring",
    area: "Joydebpur",
    phone: "+8801622334455",
    email: "hasan.tutor@email.com",
    description:
      "Experienced tutor for classes 6-12, specialising in Science and Mathematics. Home visits available.",
    descriptionBn:
      "৬ষ্ঠ-১২শ শ্রেণির অভিজ্ঞ শিক্ষক, বিজ্ঞান ও গণিতে বিশেষজ্ঞ। বাড়িতে পড়ানো হয়।",
    priceRange: "Low",
    rating: 4.9,
    reviewCount: 65,
    available: true,
  },
  {
    id: "5",
    name: "Mohon Carpenter",
    nameBn: "মোহন কার্পেন্টার",
    category: "Carpentry",
    area: "Kaliakoir",
    phone: "+8801777889900",
    whatsapp: "+8801777889900",
    description:
      "Custom furniture and woodwork. Doors, windows, cupboards. Quality work at fair prices.",
    descriptionBn:
      "কাস্টম আসবাবপত্র ও কাঠের কাজ। দরজা, জানালা, আলমারি। সঠিক দামে মানসম্পন্ন কাজ।",
    priceRange: "Medium",
    rating: 4.4,
    reviewCount: 19,
    available: true,
  },
  {
    id: "6",
    name: "Rajan Painting Works",
    nameBn: "রাজন পেইন্টিং ওয়ার্কস",
    category: "Painting",
    area: "Tongi",
    phone: "+8801611223344",
    description:
      "Interior and exterior painting for homes and offices. Quick, clean, and professional.",
    descriptionBn: "বাড়ি ও অফিসের আন্তরীণ ও বাহ্যিক পেইন্টিং। দ্রুত, পরিষ্কার ও পেশাদার।",
    priceRange: "Low",
    rating: 4.3,
    reviewCount: 22,
    available: false,
  },
  {
    id: "7",
    name: "Cool Air AC Service",
    nameBn: "কুল এয়ার এসি সার্ভিস",
    category: "ACRepair",
    area: "Gazipur Sadar",
    phone: "+8801922334455",
    whatsapp: "+8801922334455",
    email: "coolair@email.com",
    description:
      "AC installation, servicing, and repair for all brands. Same-day service available.",
    descriptionBn:
      "সব ব্র্যান্ডের এসি ইন্সটলেশন, সার্ভিসিং ও মেরামত। একই দিনে সার্ভিস পাওয়া যায়।",
    priceRange: "Medium",
    rating: 4.7,
    reviewCount: 53,
    available: true,
  },
  {
    id: "8",
    name: "Auto Care Gazipur",
    nameBn: "অটো কেয়ার গাজীপুর",
    category: "CarRepair",
    area: "Joydebpur",
    phone: "+8801844556677",
    description:
      "Full car service and repairs. Engine, brakes, AC, tyres. Trusted by Gazipur drivers.",
    descriptionBn:
      "সম্পূর্ণ গাড়ি সার্ভিস ও মেরামত। ইঞ্জিন, ব্রেক, এসি, টায়ার। গাজীপুরের চালকদের বিশ্বস্ত।",
    priceRange: "Medium",
    rating: 4.5,
    reviewCount: 41,
    available: true,
  },
  {
    id: "9",
    name: "Nasrin Tailors",
    nameBn: "নাসরিন টেইলার্স",
    category: "Tailoring",
    area: "Pubail",
    phone: "+8801599887766",
    description:
      "Expert tailoring for women and children. Salwar kameez, saree blouses, school uniforms.",
    descriptionBn:
      "মহিলা ও শিশুদের জন্য বিশেষজ্ঞ দর্জি সেবা। সালোয়ার কামিজ, শাড়ির ব্লাউজ, স্কুল ইউনিফর্ম।",
    priceRange: "Low",
    rating: 4.8,
    reviewCount: 38,
    available: true,
  },
  {
    id: "10",
    name: "Sohel Handyman",
    nameBn: "সহেল হ্যান্ডিম্যান",
    category: "Others",
    area: "Kaliakoir",
    phone: "+8801733221100",
    whatsapp: "+8801733221100",
    description:
      "General handyman services — moving, furniture assembly, minor repairs and odd jobs.",
    descriptionBn:
      "সাধারণ হ্যান্ডিম্যান সেবা — মালামাল স্থানান্তর, আসবাবপত্র সংযোজন, ছোট মেরামত।",
    priceRange: "Low",
    rating: 4.2,
    reviewCount: 15,
    available: true,
  },
];

export const AREAS = [
  "Tongi",
  "Gazipur Sadar",
  "Pubail",
  "Joydebpur",
  "Kaliakoir",
];
export const AREAS_BN: Record<string, string> = {
  Tongi: "টঙ্গী",
  "Gazipur Sadar": "গাজীপুর সদর",
  Pubail: "পূবাইল",
  Joydebpur: "জয়দেবপুর",
  Kaliakoir: "কালিয়াকৈর",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  Plumbing: "bg-primary/10 text-primary",
  Electrical: "bg-secondary/20 text-secondary-foreground",
  Cleaning: "bg-accent/15 text-accent",
  Tutoring: "bg-primary/15 text-primary",
  Carpentry: "bg-secondary/15 text-secondary-foreground",
  Painting: "bg-accent/10 text-accent",
  ACRepair: "bg-primary/10 text-primary",
  CarRepair: "bg-secondary/20 text-secondary-foreground",
  Tailoring: "bg-accent/15 text-accent",
  Others: "bg-muted text-muted-foreground",
};
