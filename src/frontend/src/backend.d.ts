import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProviderView {
    id: ProviderId;
    area: string;
    name: string;
    description: string;
    isActive: boolean;
    email: string;
    priceRange: PriceRange;
    experience: bigint;
    availability: string;
    address: string;
    category: Category;
    rating: number;
    phone: string;
    reviewCount: bigint;
}
export type ProviderId = bigint;
export interface AddProviderArgs {
    area: string;
    name: string;
    description: string;
    email: string;
    priceRange: PriceRange;
    experience: bigint;
    availability: string;
    address: string;
    category: Category;
    phone: string;
}
export interface UpdateProviderArgs {
    id: ProviderId;
    area?: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    email?: string;
    priceRange?: PriceRange;
    experience?: bigint;
    availability?: string;
    address?: string;
    category?: Category;
    phone?: string;
}
export interface PageResult {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<ProviderView>;
}
export enum Category {
    Cleaning = "Cleaning",
    Plumbing = "Plumbing",
    Painting = "Painting",
    Tailoring = "Tailoring",
    Tutoring = "Tutoring",
    Carpentry = "Carpentry",
    CarRepair = "CarRepair",
    ACRepair = "ACRepair",
    Others = "Others",
    Electrical = "Electrical"
}
export enum PriceRange {
    Low = "Low",
    High = "High",
    Medium = "Medium"
}
export interface backendInterface {
    addProvider(args: AddProviderArgs): Promise<ProviderId>;
    getProvider(id: ProviderId): Promise<ProviderView | null>;
    listProviders(page: bigint, pageSize: bigint): Promise<PageResult>;
    listProvidersByArea(area: string, page: bigint, pageSize: bigint): Promise<PageResult>;
    listProvidersByCategory(category: Category, page: bigint, pageSize: bigint): Promise<PageResult>;
    searchProviders(keyword: string, page: bigint, pageSize: bigint): Promise<PageResult>;
    updateProvider(args: UpdateProviderArgs): Promise<boolean>;
}
