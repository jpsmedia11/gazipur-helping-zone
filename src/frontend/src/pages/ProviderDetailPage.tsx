import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  XCircle,
} from "lucide-react";
import { useLang } from "../App";
import { CategoryBadge } from "../components/CategoryBadge";
import { useProvider } from "../hooks/useProviders";
import { useT } from "../i18n";

export function ProviderDetailPage() {
  const { id } = useParams({ from: "/provider/$id" });
  const { lang } = useLang();
  const t = useT(lang);
  const { data: provider, isLoading } = useProvider(id);

  if (isLoading) {
    return (
      <div
        className="container mx-auto px-4 py-10 max-w-2xl"
        data-ocid="provider_detail.loading_state"
      >
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-60 w-full rounded-lg" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="provider_detail.error_state"
      >
        <p className="text-muted-foreground text-lg">
          {lang === "bn" ? "প্রোভাইডার পাওয়া যায়নি।" : "Provider not found."}
        </p>
        <Link to="/directory" search={{}}>
          <Button
            variant="outline"
            className="mt-4"
            data-ocid="provider_detail.back_button"
          >
            <ArrowLeft size={16} className="mr-1" />
            {lang === "bn" ? "ডিরেক্টরিতে ফিরুন" : "Back to Directory"}
          </Button>
        </Link>
      </div>
    );
  }

  const displayName =
    lang === "bn" && provider.nameBn ? provider.nameBn : provider.name;
  const description =
    lang === "bn" && provider.descriptionBn
      ? provider.descriptionBn
      : provider.description;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <Link
            to="/directory"
            search={{}}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid="provider_detail.back_link"
          >
            <ArrowLeft size={15} />
            {lang === "bn" ? "ডিরেক্টরি" : "Directory"}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-warm-md border-border/60">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {displayName}
                </h1>
                {lang === "bn" && provider.nameBn && (
                  <p className="text-sm text-muted-foreground">
                    {provider.name}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  <CategoryBadge category={provider.category} lang={lang} />
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={14} /> {provider.area}
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                {provider.available ? (
                  <span
                    className="flex items-center gap-1.5 text-sm text-accent font-medium"
                    data-ocid="provider_detail.availability"
                  >
                    <CheckCircle size={16} /> {t.provider.available}
                  </span>
                ) : (
                  <span
                    className="flex items-center gap-1.5 text-sm text-muted-foreground"
                    data-ocid="provider_detail.availability"
                  >
                    <XCircle size={16} /> {t.provider.unavailable}
                  </span>
                )}
              </div>
            </div>

            {/* Rating + Price */}
            <div className="flex flex-wrap gap-6 py-4 border-y border-border mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {lang === "bn" ? "রেটিং" : "Rating"}
                </p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className={
                        s <= Math.round(provider.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }
                    />
                  ))}
                  <span className="font-semibold text-foreground ml-1">
                    {provider.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({provider.reviewCount} {t.provider.reviews})
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {t.provider.priceRange}
                </p>
                <span className="font-medium text-foreground">
                  {t.priceRange[provider.priceRange]}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display font-semibold text-lg text-foreground mb-2">
                {lang === "bn" ? "বিবরণ" : "About"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Contact Buttons */}
            <div
              className="space-y-3"
              data-ocid="provider_detail.contact_section"
            >
              <h2 className="font-display font-semibold text-lg text-foreground">
                {t.provider.contact}
              </h2>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${provider.phone}`}>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2"
                    data-ocid="provider_detail.call_button"
                  >
                    <Phone size={16} /> {t.provider.callNow}
                  </Button>
                </a>
                {provider.whatsapp && (
                  <a
                    href={`https://wa.me/${provider.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="gap-2 border-accent/50 text-accent hover:bg-accent/10 transition-smooth"
                      data-ocid="provider_detail.whatsapp_button"
                    >
                      <MessageCircle size={16} /> {t.provider.whatsapp}
                    </Button>
                  </a>
                )}
                {provider.email && (
                  <a href={`mailto:${provider.email}`}>
                    <Button
                      variant="outline"
                      className="gap-2 transition-smooth"
                      data-ocid="provider_detail.email_button"
                    >
                      <Mail size={16} /> {t.provider.email}
                    </Button>
                  </a>
                )}
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                {provider.phone}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
