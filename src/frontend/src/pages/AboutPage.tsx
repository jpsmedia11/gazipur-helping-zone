import { useLang } from "../App";
import { SAMPLE_PROVIDERS } from "../data/providers";
import { useT } from "../i18n";

const TEAM = [
  { name: "Abdullah Al Mamun", role: "Founder", emoji: "👨‍💼" },
  { name: "Fatema Begum", role: "Community Manager", emoji: "👩‍💼" },
  { name: "Rakib Hossain", role: "Technical Lead", emoji: "👨‍💻" },
];

export function AboutPage() {
  const { lang } = useLang();
  const t = useT(lang);

  const stats = [
    {
      value: `${SAMPLE_PROVIDERS.length}+`,
      label: lang === "bn" ? "নিবন্ধিত প্রোভাইডার" : "Registered Providers",
    },
    { value: "5", label: lang === "bn" ? "আওতাভুক্ত এলাকা" : "Areas Covered" },
    {
      value: "10",
      label: lang === "bn" ? "সার্ভিস ক্যাটাগরি" : "Service Categories",
    },
    { value: "২০২৪", label: lang === "bn" ? "প্রতিষ্ঠাকাল" : "Established" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.about.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
            {lang === "bn" ? "আমাদের লক্ষ্য" : "Our Mission"}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {lang === "bn"
              ? "গাজীপুর হেল্পিং জোন তৈরি হয়েছে গাজীপুরের বাসিন্দাদের তাদের প্রয়োজনীয় সেবা খুঁজে পেতে সাহায্য করার জন্য। প্রায়ই মানুষ বিশ্বস্ত প্লাম্বার, ইলেকট্রিশিয়ান বা টিউটর খুঁজে পেতে কষ্ট পান। আমরা সেই সমস্যা সমাধান করতে চাই।"
              : "Gazipur Helping Zone was created to help residents of Gazipur find the services they need quickly and reliably. Finding a trusted plumber, electrician, or tutor shouldn't be difficult — we make it simple."}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {lang === "bn"
              ? "আমাদের ডিরেক্টরিতে তালিকাভুক্ত সকল সেবা প্রদানকারী স্থানীয়ভাবে যাচাইকৃত এবং কমিউনিটি রেটিং দ্বারা মূল্যায়িত।"
              : "All providers listed in our directory are locally verified and community-rated, ensuring quality and trustworthiness."}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className="text-center"
                data-ocid={`about.stat.${i + 1}`}
              >
                <p className="font-display text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
            {lang === "bn" ? "আমাদের দল" : "Our Team"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="text-center p-5 rounded-lg bg-card border border-border/60 shadow-warm"
                data-ocid={`about.team.${i + 1}`}
              >
                <div className="text-4xl mb-3">{member.emoji}</div>
                <p className="font-display font-semibold text-foreground">
                  {member.name}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
