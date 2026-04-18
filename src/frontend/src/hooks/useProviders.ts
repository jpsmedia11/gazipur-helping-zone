import { useQuery } from "@tanstack/react-query";
import { SAMPLE_PROVIDERS } from "../data/providers";
import type { Category, Provider } from "../types";

// Since the backend interface is empty, we use static sample data.
// When backend methods are available, replace these with actor calls.

export function useProviders(page = 0, pageSize = 12) {
  return useQuery<Provider[]>({
    queryKey: ["providers", page, pageSize],
    queryFn: async () => {
      const start = page * pageSize;
      return SAMPLE_PROVIDERS.slice(start, start + pageSize);
    },
    staleTime: 60_000,
  });
}

export function useProvidersByCategory(category: Category | null) {
  return useQuery<Provider[]>({
    queryKey: ["providers", "category", category],
    queryFn: async () => {
      if (!category) return SAMPLE_PROVIDERS;
      return SAMPLE_PROVIDERS.filter((p) => p.category === category);
    },
    staleTime: 60_000,
  });
}

export function useProvidersByArea(area: string | null) {
  return useQuery<Provider[]>({
    queryKey: ["providers", "area", area],
    queryFn: async () => {
      if (!area) return SAMPLE_PROVIDERS;
      return SAMPLE_PROVIDERS.filter((p) => p.area === area);
    },
    staleTime: 60_000,
  });
}

export function useSearchProviders(query: string) {
  return useQuery<Provider[]>({
    queryKey: ["providers", "search", query],
    queryFn: async () => {
      if (!query.trim()) return SAMPLE_PROVIDERS;
      const q = query.toLowerCase();
      return SAMPLE_PROVIDERS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameBn?.includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    },
    staleTime: 30_000,
  });
}

export function useProvider(id: string) {
  return useQuery<Provider | undefined>({
    queryKey: ["provider", id],
    queryFn: async () => SAMPLE_PROVIDERS.find((p) => p.id === id),
    staleTime: 60_000,
  });
}
