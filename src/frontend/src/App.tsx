import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";
import { Layout } from "./Layout";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DirectoryPage } from "./pages/DirectoryPage";
import { HomePage } from "./pages/HomePage";
import { ProviderDetailPage } from "./pages/ProviderDetailPage";
import type { Language } from "./types";

// Language Context
interface LangContextValue {
  lang: Language;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "bn",
  toggleLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

// Routes
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const directoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/directory",
  component: DirectoryPage,
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    q?: string;
    category?: string;
    area?: string;
  } => ({
    q: typeof search.q === "string" ? search.q : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    area: typeof search.area === "string" ? search.area : undefined,
  }),
});

const providerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/provider/$id",
  component: ProviderDetailPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  directoryRoute,
  providerRoute,
  aboutRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>("bn");
  const toggleLang = () => setLang((l) => (l === "bn" ? "en" : "bn"));

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <RouterProvider router={router} />
      <Toaster />
    </LangContext.Provider>
  );
}
