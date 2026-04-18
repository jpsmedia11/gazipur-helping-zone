import type { backendInterface, Category, PriceRange, ProviderView, PageResult } from "../backend";

const sampleProviders: ProviderView[] = [
  {
    id: BigInt(1),
    name: "রাহেলা বেগম ক্লিনিং সার্ভিস",
    category: "Cleaning" as unknown as Category,
    description: "গাজীপুরে ১০ বছরের অভিজ্ঞতা সহ বাড়ি ও অফিস পরিষ্কারের পেশাদার সেবা।",
    phone: "01712345678",
    email: "rahela@example.com",
    address: "টঙ্গী, গাজীপুর",
    area: "টঙ্গী",
    experience: BigInt(10),
    priceRange: "Low" as unknown as PriceRange,
    availability: "রবি–বৃহ সকাল ৮টা–বিকেল ৫টা",
    rating: 4.5,
    reviewCount: BigInt(23),
    isActive: true,
  },
  {
    id: BigInt(2),
    name: "করিম ইলেকট্রিক্যাল সার্ভিস",
    category: "Electrical" as unknown as Category,
    description: "বাড়ি ও দোকানের সব ধরনের বৈদ্যুতিক কাজ দ্রুত ও নির্ভরযোগ্যভাবে সম্পন্ন করা হয়।",
    phone: "01898765432",
    email: "karim.electric@example.com",
    address: "গাজীপুর সদর",
    area: "গাজীপুর সদর",
    experience: BigInt(7),
    priceRange: "Medium" as unknown as PriceRange,
    availability: "সোম–শনি সকাল ৯টা–রাত ৮টা",
    rating: 4.8,
    reviewCount: BigInt(41),
    isActive: true,
  },
  {
    id: BigInt(3),
    name: "আল-আমিন প্লাম্বিং",
    category: "Plumbing" as unknown as Category,
    description: "পানির পাইপ, বাথরুম ফিটিং ও সব ধরনের প্লাম্বিং কাজে দক্ষ ও অভিজ্ঞ।",
    phone: "01556677889",
    email: "alamin.plumbing@example.com",
    address: "কালিয়াকৈর, গাজীপুর",
    area: "কালিয়াকৈর",
    experience: BigInt(5),
    priceRange: "Medium" as unknown as PriceRange,
    availability: "সপ্তাহের সব দিন সকাল ৮টা–সন্ধ্যা ৭টা",
    rating: 4.3,
    reviewCount: BigInt(17),
    isActive: true,
  },
  {
    id: BigInt(4),
    name: "সুমাইয়া টিউটর সেন্টার",
    category: "Tutoring" as unknown as Category,
    description: "১ম–১২শ শ্রেণির সকল বিষয়ে গৃহশিক্ষা, গণিত ও বিজ্ঞানে বিশেষ দক্ষতা।",
    phone: "01923344556",
    email: "sumaiya.tutor@example.com",
    address: "জয়দেবপুর, গাজীপুর",
    area: "জয়দেবপুর",
    experience: BigInt(4),
    priceRange: "Low" as unknown as PriceRange,
    availability: "বিকেল ৩টা–রাত ৯টা",
    rating: 4.9,
    reviewCount: BigInt(56),
    isActive: true,
  },
  {
    id: BigInt(5),
    name: "হাসান কার্পেন্ট্রি ওয়ার্কশপ",
    category: "Carpentry" as unknown as Category,
    description: "আসবাবপত্র তৈরি, মেরামত ও কাস্টম ডিজাইনে পেশাদার কাঠের কাজ।",
    phone: "01667788990",
    email: "hasan.carpentry@example.com",
    address: "শ্রীপুর, গাজীপুর",
    area: "শ্রীপুর",
    experience: BigInt(12),
    priceRange: "Medium" as unknown as PriceRange,
    availability: "সোম–শনি সকাল ৮টা–বিকেল ৬টা",
    rating: 4.6,
    reviewCount: BigInt(29),
    isActive: true,
  },
  {
    id: BigInt(6),
    name: "মডার্ন পেইন্টিং সার্ভিস",
    category: "Painting" as unknown as Category,
    description: "বাড়ি ও অফিসের দেয়াল রং, ওয়ালপেপার ও সব ধরনের পেইন্টিং কাজ।",
    phone: "01788990011",
    email: "modern.painting@example.com",
    address: "টঙ্গী, গাজীপুর",
    area: "টঙ্গী",
    experience: BigInt(8),
    priceRange: "High" as unknown as PriceRange,
    availability: "রবি–বৃহ সকাল ৮টা–সন্ধ্যা ৬টা",
    rating: 4.4,
    reviewCount: BigInt(15),
    isActive: true,
  },
];

const makePageResult = (items: ProviderView[], page: bigint, pageSize: bigint): PageResult => ({
  items: items.slice(Number((page - BigInt(1)) * pageSize), Number(page * pageSize)),
  total: BigInt(items.length),
  page,
  pageSize,
});

export const mockBackend: backendInterface = {
  addProvider: async () => BigInt(sampleProviders.length + 1),

  getProvider: async (id) => {
    return sampleProviders.find((p) => p.id === id) ?? null;
  },

  listProviders: async (page, pageSize) => makePageResult(sampleProviders, page, pageSize),

  listProvidersByArea: async (area, page, pageSize) => {
    const filtered = sampleProviders.filter((p) => p.area.includes(area));
    return makePageResult(filtered, page, pageSize);
  },

  listProvidersByCategory: async (category, page, pageSize) => {
    const filtered = sampleProviders.filter((p) => p.category === category);
    return makePageResult(filtered, page, pageSize);
  },

  searchProviders: async (keyword, page, pageSize) => {
    const filtered = sampleProviders.filter(
      (p) =>
        p.name.includes(keyword) ||
        p.description.includes(keyword) ||
        p.area.includes(keyword)
    );
    return makePageResult(filtered, page, pageSize);
  },

  updateProvider: async () => true,
};
