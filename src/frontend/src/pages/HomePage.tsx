import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Phone, Star, Users } from "lucide-react";
import { useState } from "react";
import { useLang } from "../App";
import { ProviderCard } from "../components/ProviderCard";
import { SearchBar } from "../components/SearchBar";
import { CATEGORY_COLORS, SAMPLE_PROVIDERS } from "../data/providers";
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

const CATEGORY_ICONS: Record<Category, string> = {
  Plumbing: "🔧",
  Electrical: "⚡",
  Cleaning: "🧹",
  Tutoring: "📚",
  Carpentry: "🪵",
  Painting: "🎨",
  ACRepair: "❄️",
  CarRepair: "🚗",
  Tailoring: "🪡",
  Others: "🛠️",
};

export function HomePage() {
  const { lang } = useLang();
  const t = useT(lang);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const featured = SAMPLE_PROVIDERS.filter((p) => p.available).slice(0, 6);

  const handleSearch = () => {
    if (search.trim()) {
      navigate({
        to: "/directory",
        search: { q: search, category: undefined, area: undefined },
      });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary/5 border-b border-border/50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex gap-3 max-w-xl mx-auto">
            <SearchBar
              value={search}
              onChange={setSearch}
              lang={lang}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shrink-0"
              data-ocid="hero.search_button"
            >
              {lang === "bn" ? "খুঁজুন" : "Search"}
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users size={15} /> {SAMPLE_PROVIDERS.length}+{" "}
              {lang === "bn" ? "প্রোভাইডার" : "Providers"}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={15} className="text-primary" />{" "}
              {lang === "bn" ? "বিশ্বস্ত সেবা" : "Trusted Services"}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={15} />{" "}
              {lang === "bn" ? "সরাসরি যোগাযোগ" : "Direct Contact"}
            </span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 bg-background" data-ocid="categories.section">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
            {t.sections.categories}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat}
                to="/directory"
                search={{ category: cat, q: undefined, area: undefined }}
                className="group block"
                data-ocid={`category.item.${i + 1}`}
              >
                <Card className="h-full shadow-warm hover:shadow-warm-md transition-smooth group-hover:-translate-y-0.5 border-border/60 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{CATEGORY_ICONS[cat]}</div>
                    <p
                      className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${CATEGORY_COLORS[cat]}`}
                    >
                      {t.categories[cat]}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-14 bg-muted/30" data-ocid="featured.section">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              {t.sections.featured}
            </h2>
            <Link to="/directory" search={{}}>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                data-ocid="featured.view_all_button"
              >
                {lang === "bn" ? "সব দেখুন" : "View All"}{" "}
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((provider, i) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                lang={lang}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 bg-background" data-ocid="how_it_works.section">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-10 text-center">
            {t.sections.howItWorks}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "১",
                title: t.howItWorks.step1Title,
                desc: t.howItWorks.step1Desc,
                icon: "🔍",
              },
              {
                num: "২",
                title: t.howItWorks.step2Title,
                desc: t.howItWorks.step2Desc,
                icon: "✅",
              },
              {
                num: "৩",
                title: t.howItWorks.step3Title,
                desc: t.howItWorks.step3Desc,
                icon: "📞",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="text-center"
                data-ocid={`how_it_works.item.${i + 1}`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-2xl mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/directory" search={{}}>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2"
                data-ocid="how_it_works.cta_button"
              >
                {t.hero.cta} <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
