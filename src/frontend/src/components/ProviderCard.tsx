import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Star } from "lucide-react";
import { useT } from "../i18n";
import type { Language, Provider } from "../types";
import { CategoryBadge } from "./CategoryBadge";

interface ProviderCardProps {
  provider: Provider;
  lang: Language;
  index?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating}`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          className={
            star <= Math.round(rating)
              ? "fill-primary text-primary"
              : "text-muted-foreground"
          }
        />
      ))}
    </span>
  );
}

export function ProviderCard({ provider, lang, index = 1 }: ProviderCardProps) {
  const t = useT(lang);
  const displayName =
    lang === "bn" && provider.nameBn ? provider.nameBn : provider.name;

  return (
    <Link
      to="/provider/$id"
      params={{ id: provider.id }}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
      data-ocid={`provider.item.${index}`}
    >
      <Card className="h-full shadow-warm hover:shadow-warm-md transition-smooth group-hover:-translate-y-0.5 border-border/60">
        <CardContent className="p-5 flex flex-col gap-3">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-foreground text-base leading-snug truncate group-hover:text-primary transition-colors">
                {displayName}
              </h3>
              {lang === "bn" && provider.nameBn && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {provider.name}
                </p>
              )}
            </div>
            {provider.available ? (
              <Badge className="shrink-0 bg-accent/10 text-accent border border-accent/30 text-xs">
                {t.provider.available}
              </Badge>
            ) : (
              <Badge variant="secondary" className="shrink-0 text-xs">
                {t.provider.unavailable}
              </Badge>
            )}
          </div>

          {/* Category */}
          <CategoryBadge category={provider.category} lang={lang} />

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 min-w-0">
              <MapPin size={13} className="shrink-0" />
              <span className="truncate">{provider.area}</span>
            </span>
            <span className="flex items-center gap-1 shrink-0">
              <Phone size={13} />
              <span className="text-xs">
                {t.priceRange[provider.priceRange]}
              </span>
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <StarRating rating={provider.rating} />
            <span className="text-sm font-medium text-foreground">
              {provider.rating}
            </span>
            <span className="text-xs text-muted-foreground">
              ({provider.reviewCount} {t.provider.reviews})
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
