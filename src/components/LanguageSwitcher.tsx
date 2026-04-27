"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LOCALE_ROUTES: Record<string, Record<string, string>> = {
  de: {
    "/de": "/",
    "/de/beste-geschichtsbuecher": "/best-history-books",
    "/de/beste-mythologie-buecher": "/best-mythology-books",
    "/de/beste-dunkle-geschichte-buecher": "/best-dark-history-books",
    "/de/beste-buecher-auf-deutsch": "/best-books-in-german",
    "/de/beste-verschwoerungstheorie-buecher": "/best-conspiracy-books",
    "/de/beste-nordische-mythologie-buecher": "/best-norse-mythology-books",
  },
  nl: {
    "/nl": "/",
    "/nl/beste-geschiedenisboeken": "/best-history-books",
    "/nl/beste-mythologie-boeken": "/best-mythology-books",
    "/nl/beste-donkere-geschiedenis-boeken": "/best-dark-history-books",
    "/nl/beste-boeken-in-het-nederlands": "/best-books-in-dutch",
    "/nl/beste-complottheorie-boeken": "/best-conspiracy-books",
    "/nl/beste-noordse-mythologie-boeken": "/best-norse-mythology-books",
  },
  fr: {
    "/fr": "/",
    "/fr/meilleurs-livres-histoire": "/best-history-books",
    "/fr/meilleurs-livres-mythologie": "/best-mythology-books",
    "/fr/meilleurs-livres-histoire-sombre": "/best-dark-history-books",
    "/fr/meilleurs-livres-en-francais": "/best-books-in-french",
    "/fr/meilleurs-livres-complots": "/best-conspiracy-books",
    "/fr/meilleurs-livres-mythologie-nordique": "/best-norse-mythology-books",
  },
};

// Build reverse maps: English path → localized path
const EN_TO_LOCALE: Record<string, Record<string, string>> = {};
for (const [loc, map] of Object.entries(LOCALE_ROUTES)) {
  EN_TO_LOCALE[loc] = Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
}

function detectLocale(pathname: string): "en" | "de" | "nl" | "fr" {
  if (pathname.startsWith("/de")) return "de";
  if (pathname.startsWith("/nl")) return "nl";
  if (pathname.startsWith("/fr")) return "fr";
  return "en";
}

function toEnglish(pathname: string, locale: string): string {
  return LOCALE_ROUTES[locale]?.[pathname] ?? "/";
}

function toLocale(enPath: string, locale: string): string {
  return EN_TO_LOCALE[locale]?.[enPath] ?? `/${locale}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const enPath = locale === "en" ? pathname : toEnglish(pathname, locale);

  const hrefs = {
    en: locale === "en" ? pathname : enPath,
    de: locale === "de" ? pathname : toLocale(enPath, "de"),
    nl: locale === "nl" ? pathname : toLocale(enPath, "nl"),
    fr: locale === "fr" ? pathname : toLocale(enPath, "fr"),
  };

  const langs = ["en", "de", "nl", "fr"] as const;

  return (
    <div className="flex items-center gap-0.5 text-xs font-bold tracking-wider border border-[var(--color-border)] rounded overflow-hidden">
      {langs.map((l) => (
        <Link
          key={l}
          href={hrefs[l]}
          className={`px-2 py-1 transition-colors ${
            locale === l
              ? "bg-[var(--color-orange)] text-white"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)]"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
