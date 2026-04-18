import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "../App";
import { ProviderCard } from "../components/ProviderCard";
import { SearchBar } from "../components/SearchBar";
import { AREAS, AREAS_BN, SAMPLE_PROVIDERS } from "../data/providers";
import { useProviders, useSearchProviders } from "../hooks/useProviders";
import { useT } from "../i18n";
import type { Category } from "../types";

const CATEGORIES: Category[] = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Tutoring",
  "Carpentry",
  "Painting",
  "ACRepair",
  "CarRepair",
  "Tailoring",
  "Others",
];

export function DirectoryPage() {
  const { lang } = useLang();
  const t = useT(lang);

  // Read initial search params
  const searchParams = useSearch({ from: "/directory" }) as {
    q?: string;
    category?: Category;
    area?: string;
  };

  const [query, setQuery] = useState(searchParams.q ?? "");
  const [category, setCategory] = useState<string>(
    searchParams.category ?? "all",
  );
  const [area, setArea] = useState<string>(searchParams.area ?? "all");

  // Use search query if set, else all providers
  const { data: searchResults, isLoading: searchLoading } =
    useSearchProviders(query);
  const { data: allProviders, isLoading: allLoading } = useProviders();

  const isLoading = query ? searchLoading : allLoading;
  const baseResults = query ? searchResults : allProviders;

  const filtered = (baseResults ?? []).filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (area !== "all" && p.area !== area) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">
            {t.directory.title}
          </h1>
          <p className="text-muted-foreground text-sm">
            {SAMPLE_PROVIDERS.length}{" "}
            {lang === "bn" ? "জন প্রোভাইডার পাওয়া গেছে" : "providers listed"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div
          className="flex flex-col sm:flex-row gap-3 mb-8"
          data-ocid="directory.filters"
        >
          <SearchBar
            value={query}
            onChange={setQuery}
            lang={lang}
            className="flex-1"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              className="sm:w-48 bg-card"
              data-ocid="directory.category_select"
            >
              <SelectValue placeholder={t.directory.allCategories} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.directory.allCategories}</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {t.categories[cat]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger
              className="sm:w-40 bg-card"
              data-ocid="directory.area_select"
            >
              <SelectValue placeholder={t.directory.allAreas} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.directory.allAreas}</SelectItem>
              {AREAS.map((a) => (
                <SelectItem key={a} value={a}>
                  {lang === "bn" ? AREAS_BN[a] : a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="directory.loading_state"
          >
            {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => (
              <Skeleton key={k} className="h-44 rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="directory.empty_state">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-muted-foreground">{t.directory.noResults}</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="directory.list"
          >
            {filtered.map((provider, i) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                lang={lang}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
