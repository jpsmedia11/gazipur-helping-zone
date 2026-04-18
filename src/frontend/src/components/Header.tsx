import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { useT } from "../i18n";
import type { Language } from "../types";

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
}

export function Header({ lang, onToggleLang }: HeaderProps) {
  const t = useT(lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    { to: "/", label: t.nav.home, search: undefined },
    { to: "/directory", label: t.nav.directory, search: {} },
    { to: "/about", label: t.nav.about, search: undefined },
    { to: "/contact", label: t.nav.contact, search: undefined },
  ] as const;

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-warm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0 group" data-ocid="header.home_link">
          <span className="font-display font-bold text-lg text-primary leading-tight group-hover:opacity-80 transition-opacity">
            {t.siteName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map(({ to, label, search }) => (
            <Link
              key={to}
              to={to}
              {...(search !== undefined ? { search } : {})}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                isActive(to)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
              data-ocid={`header.nav.${label.toLowerCase().replace(/\s/g, "_")}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleLang}
            className="hidden md:flex items-center gap-1.5 text-xs border-border/80 hover:bg-primary/5 hover:text-primary hover:border-primary/40 transition-smooth"
            data-ocid="header.lang_toggle"
            aria-label="Toggle language"
          >
            <Globe size={14} />
            {lang === "bn" ? "EN" : "বাংলা"}
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground/70 hover:bg-muted transition-smooth"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-ocid="header.mobile_menu_toggle"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ to, label, search }) => (
            <Link
              key={to}
              to={to}
              {...(search !== undefined ? { search } : {})}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActive(to)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </Link>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onToggleLang();
              setMenuOpen(false);
            }}
            className="mt-2 flex items-center gap-1.5 text-xs self-start"
            data-ocid="header.mobile_lang_toggle"
          >
            <Globe size={14} />
            {lang === "bn" ? "EN" : "বাংলা"}
          </Button>
        </div>
      )}
    </header>
  );
}
