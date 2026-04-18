import { CATEGORY_COLORS } from "../data/providers";
import { useT } from "../i18n";
import type { Category } from "../types";
import type { Language } from "../types";

interface CategoryBadgeProps {
  category: Category;
  lang: Language;
  showDot?: boolean;
}

export function CategoryBadge({
  category,
  lang,
  showDot = true,
}: CategoryBadgeProps) {
  const t = useT(lang);
  const colorClass = CATEGORY_COLORS[category];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {showDot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current opacity-70"
          aria-hidden="true"
        />
      )}
      {t.categories[category]}
    </span>
  );
}
