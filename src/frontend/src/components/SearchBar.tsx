import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useT } from "../i18n";
import type { Language } from "../types";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  lang: Language;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  lang,
  className = "",
}: SearchBarProps) {
  const t = useT(lang);

  return (
    <div className={`relative ${className}`}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        size={18}
      />
      <Input
        data-ocid="search_input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          lang === "bn"
            ? t.directory.searchPlaceholder
            : t.hero.searchPlaceholder
        }
        className="pl-10 bg-card border-border focus:ring-primary/40 transition-smooth"
        aria-label={lang === "bn" ? "সার্চ করুন" : "Search"}
      />
    </div>
  );
}
