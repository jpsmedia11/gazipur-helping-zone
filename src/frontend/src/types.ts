export type Category =
  | "Plumbing"
  | "Electrical"
  | "Cleaning"
  | "Tutoring"
  | "Carpentry"
  | "Painting"
  | "ACRepair"
  | "CarRepair"
  | "Tailoring"
  | "Others";

export type PriceRange = "Low" | "Medium" | "High";

export interface Provider {
  id: string;
  name: string;
  nameBn?: string;
  category: Category;
  area: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  description: string;
  descriptionBn?: string;
  priceRange: PriceRange;
  rating: number;
  reviewCount: number;
  available: boolean;
}

export type Language = "bn" | "en";
