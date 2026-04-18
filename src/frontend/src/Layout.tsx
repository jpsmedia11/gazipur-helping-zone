import type { ReactNode } from "react";
import { useLang } from "./App";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { lang, toggleLang } = useLang();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header lang={lang} onToggleLang={toggleLang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
