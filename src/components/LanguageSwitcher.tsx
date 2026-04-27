"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DE_TO_EN: Record<string, string> = {
  "/de": "/",
  "/de/beste-geschichtsbuecher": "/best-history-books",
  "/de/beste-mythologie-buecher": "/best-mythology-books",
  "/de/beste-dunkle-geschichte-buecher": "/best-dark-history-books",
  "/de/beste-buecher-auf-deutsch": "/best-books-in-german",
  "/de/beste-verschwoerungstheorie-buecher": "/best-conspiracy-books",
  "/de/beste-nordische-mythologie-buecher": "/best-norse-mythology-books",
};

const EN_TO_DE: Record<string, string> = Object.fromEntries(
  Object.entries(DE_TO_EN).map(([de, en]) => [en, de])
);

export function LanguageSwitcher() {
  const pathname = usePathname();
  const isGerman = pathname.startsWith("/de");

  const enHref = isGerman ? (DE_TO_EN[pathname] ?? "/") : pathname;
  const deHref = isGerman ? pathname : (EN_TO_DE[pathname] ?? "/de");

  return (
    <div className="flex items-center gap-0.5 text-xs font-bold tracking-wider border border-[var(--color-border)] rounded overflow-hidden">
      <Link
        href={enHref}
        className={`px-2 py-1 transition-colors ${
          !isGerman
            ? "bg-[var(--color-orange)] text-white"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)]"
        }`}
      >
        EN
      </Link>
      <Link
        href={deHref}
        className={`px-2 py-1 transition-colors ${
          isGerman
            ? "bg-[var(--color-orange)] text-white"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)]"
        }`}
      >
        DE
      </Link>
    </div>
  );
}
