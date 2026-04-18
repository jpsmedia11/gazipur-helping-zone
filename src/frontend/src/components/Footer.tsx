import { Link } from "@tanstack/react-router";
import { useT } from "../i18n";
import type { Language } from "../types";

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = useT(lang);
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display font-semibold text-primary">
              {t.siteName}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t.footer.builtWith}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Link
              to="/"
              className="hover:text-primary transition-colors"
              data-ocid="footer.home_link"
            >
              {t.nav.home}
            </Link>
            <Link
              to="/directory"
              search={{}}
              className="hover:text-primary transition-colors"
              data-ocid="footer.directory_link"
            >
              {t.nav.directory}
            </Link>
            <Link
              to="/about"
              className="hover:text-primary transition-colors"
              data-ocid="footer.about_link"
            >
              {t.nav.about}
            </Link>
            <Link
              to="/contact"
              className="hover:text-primary transition-colors"
              data-ocid="footer.contact_link"
            >
              {t.nav.contact}
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            &copy; {year} {t.siteName}. {t.footer.rights}
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
