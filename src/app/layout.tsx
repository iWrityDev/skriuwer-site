import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Skriuwer.com, Book Recommendations & Reviews",
    template: "%s – Skriuwer.com",
  },
  description:
    "Discover the best books across history, mythology, language learning, psychology, true crime, and more. Curated lists with Amazon affiliate links.",
  metadataBase: new URL("https://www.skriuwer.com"),
  openGraph: {
    siteName: "Skriuwer.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    site: "@skriuwer",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://www.skriuwer.com/feed.xml",
    },
  },
  verification: {
    google: "DbBrErTvMfvU-bLCm6StjRd8zo6gwDeBpM3gL7tZ7gI",
  },
};

type Locale = "en" | "de" | "nl" | "fr" | "es" | "it" | "pt";

const NAV_CONFIG: Record<Locale, {
  shop: string; bestsellers: string; categories: string; readingLists: string; blog: string;
  homeHref: string; shopHref: string; bestsellersHref: string; readingListsHref: string;
  blogHref: string; searchHref: string;
  cats: { label: string; slug: string }[];
}> = {
  en: {
    shop: "Shop", bestsellers: "Bestsellers", categories: "Categories ▾",
    readingLists: "Reading Lists", blog: "Blog",
    homeHref: "/", shopHref: "/books", bestsellersHref: "/bestsellers",
    readingListsHref: "/reading-lists", blogHref: "/blog", searchHref: "/search",
    cats: [
      { label: "History", slug: "history" },
      { label: "Dark History", slug: "dark-history" },
      { label: "Conspiracy", slug: "conspiracy" },
      { label: "Mythology", slug: "mythology" },
      { label: "Religion & Spirituality", slug: "religion" },
      { label: "Science & Nature", slug: "science" },
      { label: "Language Learning", slug: "language-learning" },
      { label: "Frisian Language", slug: "frisian" },
      { label: "Self-Help", slug: "self-help" },
    ],
  },
  de: {
    shop: "Bücher", bestsellers: "Bestseller", categories: "Kategorien ▾",
    readingLists: "Leselisten", blog: "Blog",
    homeHref: "/de", shopHref: "/books", bestsellersHref: "/bestsellers",
    readingListsHref: "/de", blogHref: "/blog", searchHref: "/search",
    cats: [
      { label: "Geschichte", slug: "history" },
      { label: "Dunkle Geschichte", slug: "dark-history" },
      { label: "Verschwörung", slug: "conspiracy" },
      { label: "Mythologie", slug: "mythology" },
      { label: "Religion & Spiritualität", slug: "religion" },
      { label: "Wissenschaft & Natur", slug: "science" },
      { label: "Sprachlernen", slug: "language-learning" },
      { label: "Selbsthilfe", slug: "self-help" },
    ],
  },
  nl: {
    shop: "Boeken", bestsellers: "Bestsellers", categories: "Categorieën ▾",
    readingLists: "Leeslijsten", blog: "Blog",
    homeHref: "/nl", shopHref: "/books", bestsellersHref: "/bestsellers",
    readingListsHref: "/nl", blogHref: "/blog", searchHref: "/search",
    cats: [
      { label: "Geschiedenis", slug: "history" },
      { label: "Donkere Geschiedenis", slug: "dark-history" },
      { label: "Complottheorie", slug: "conspiracy" },
      { label: "Mythologie", slug: "mythology" },
      { label: "Religie & Spiritualiteit", slug: "religion" },
      { label: "Wetenschap & Natuur", slug: "science" },
      { label: "Taal leren", slug: "language-learning" },
      { label: "Zelfhulp", slug: "self-help" },
    ],
  },
  fr: {
    shop: "Livres", bestsellers: "Meilleures Ventes", categories: "Catégories ▾",
    readingLists: "Listes de Lecture", blog: "Blog",
    homeHref: "/fr", shopHref: "/books", bestsellersHref: "/bestsellers",
    readingListsHref: "/fr", blogHref: "/blog", searchHref: "/search",
    cats: [
      { label: "Histoire", slug: "history" },
      { label: "Histoire Sombre", slug: "dark-history" },
      { label: "Complot", slug: "conspiracy" },
      { label: "Mythologie", slug: "mythology" },
      { label: "Religion & Spiritualité", slug: "religion" },
      { label: "Science & Nature", slug: "science" },
      { label: "Apprentissage des Langues", slug: "language-learning" },
      { label: "Développement Personnel", slug: "self-help" },
    ],
  },
  es: {
    shop: "Libros", bestsellers: "Más Vendidos", categories: "Categorías ▾",
    readingLists: "Listas de Lectura", blog: "Blog",
    homeHref: "/es", shopHref: "/books", bestsellersHref: "/bestsellers",
    readingListsHref: "/es", blogHref: "/blog", searchHref: "/search",
    cats: [
      { label: "Historia", slug: "history" },
      { label: "Historia Oscura", slug: "dark-history" },
      { label: "Conspiraciones", slug: "conspiracy" },
      { label: "Mitología", slug: "mythology" },
      { label: "Religión & Espiritualidad", slug: "religion" },
      { label: "Ciencia & Naturaleza", slug: "science" },
      { label: "Aprendizaje de Idiomas", slug: "language-learning" },
      { label: "Desarrollo Personal", slug: "self-help" },
    ],
  },
  it: {
    shop: "Libri", bestsellers: "Più Venduti", categories: "Categorie ▾",
    readingLists: "Liste di Lettura", blog: "Blog",
    homeHref: "/it", shopHref: "/books", bestsellersHref: "/bestsellers",
    readingListsHref: "/it", blogHref: "/blog", searchHref: "/search",
    cats: [
      { label: "Storia", slug: "history" },
      { label: "Storia Oscura", slug: "dark-history" },
      { label: "Complotti", slug: "conspiracy" },
      { label: "Mitologia", slug: "mythology" },
      { label: "Religione & Spiritualità", slug: "religion" },
      { label: "Scienza & Natura", slug: "science" },
      { label: "Apprendimento Lingue", slug: "language-learning" },
      { label: "Crescita Personale", slug: "self-help" },
    ],
  },
  pt: {
    shop: "Livros", bestsellers: "Mais Vendidos", categories: "Categorias ▾",
    readingLists: "Listas de Leitura", blog: "Blog",
    homeHref: "/pt", shopHref: "/books", bestsellersHref: "/bestsellers",
    readingListsHref: "/pt", blogHref: "/blog", searchHref: "/search",
    cats: [
      { label: "História", slug: "history" },
      { label: "História Sombria", slug: "dark-history" },
      { label: "Conspirações", slug: "conspiracy" },
      { label: "Mitologia", slug: "mythology" },
      { label: "Religião & Espiritualidade", slug: "religion" },
      { label: "Ciência & Natureza", slug: "science" },
      { label: "Aprendizado de Idiomas", slug: "language-learning" },
      { label: "Desenvolvimento Pessoal", slug: "self-help" },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const locale: Locale = pathname.startsWith("/de") ? "de"
    : pathname.startsWith("/nl") ? "nl"
    : pathname.startsWith("/fr") ? "fr"
    : pathname.startsWith("/es") ? "es"
    : pathname.startsWith("/it") ? "it"
    : pathname.startsWith("/pt") ? "pt"
    : "en";
  const isDE = locale === "de";
  const isNL = locale === "nl";
  const isFR = locale === "fr";
  const isES = locale === "es";
  const isIT = locale === "it";
  const isPT = locale === "pt";
  const isLocalized = locale !== "en";

  const nav = NAV_CONFIG[locale];
  const htmlLang = locale;

  return (
    <html lang={htmlLang}>
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-40">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center">
            <Link href={nav.homeHref} className="flex items-center gap-2.5">
              <Logo size={40} />
              <span
                className="text-[1.15rem] font-extrabold text-[var(--color-orange-light)] hidden sm:inline"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", letterSpacing: "-0.01em" }}
              >
                Skriuwer
                <span
                  className="text-[var(--color-text-dim)] font-normal"
                  style={{ fontStyle: "normal", fontSize: "0.75em" }}
                >
                  .com
                </span>
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wider ml-8">
              <Link href={nav.shopHref} className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                {nav.shop}
              </Link>
              <Link href={nav.bestsellersHref} className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                {nav.bestsellers}
              </Link>
              {/* Categories dropdown */}
              <div className="relative group hidden sm:block">
                <button className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition cursor-pointer bg-transparent border-0 p-0 font-semibold uppercase tracking-wider text-sm">
                  {nav.categories}
                </button>
                <div className="absolute top-full left-0 mt-1 w-52 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
                  {nav.cats.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:bg-[var(--color-surface-light)] transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href={nav.readingListsHref} className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                {nav.readingLists}
              </Link>
              {!isLocalized && (
                <Link href="/gift-guides" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                  Gift Guides
                </Link>
              )}
              <Link href={nav.blogHref} className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                {nav.blog}
              </Link>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <LanguageSwitcher />
              {/* Search icon - desktop */}
              <Link
                href={nav.searchHref}
                className="hidden sm:flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition text-sm"
                aria-label="Search books"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              {/* Mobile: hamburger */}
              <Link href={nav.shopHref} className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition sm:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {isDE ? (
                <>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Stöbern</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/de" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition font-semibold">Startseite</Link>
                      <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Alle Bücher</Link>
                      <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Bestseller</Link>
                      <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Geschichtsbücher</Link>
                      <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mythologie-Bücher</Link>
                      <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Sprachlernen</Link>
                      <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                      <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Suche</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Beste-Bücher-Listen</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/de/beste-geschichtsbuecher" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Geschichtsbücher</Link>
                      <Link href="/de/beste-mythologie-buecher" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Mythologie-Bücher</Link>
                      <Link href="/de/beste-verschwoerungstheorie-buecher" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Verschwörungstheorie-Bücher</Link>
                      <Link href="/de/beste-dunkle-geschichte-buecher" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Bücher über Dunkle Geschichte</Link>
                      <Link href="/de/beste-nordische-mythologie-buecher" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Bücher über Nordische Mythologie</Link>
                      <Link href="/de/beste-buecher-auf-deutsch" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Bücher auf Deutsch</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Unternehmen</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Über uns</Link>
                      <Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Kontakt</Link>
                      <Link href="/affiliate-disclosure" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Affiliate-Hinweis</Link>
                      <Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Datenschutz</Link>
                      <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Nutzungsbedingungen</Link>
                    </div>
                  </div>
                </>
              ) : isNL ? (
                <>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Bladeren</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/nl" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition font-semibold">Startpagina</Link>
                      <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Alle Boeken</Link>
                      <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Bestsellers</Link>
                      <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Geschiedenisboeken</Link>
                      <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mythologie-boeken</Link>
                      <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Taal leren</Link>
                      <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                      <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Zoeken</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Beste Boeken Lijsten</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/nl/beste-geschiedenisboeken" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Geschiedenisboeken</Link>
                      <Link href="/nl/beste-mythologie-boeken" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Mythologie-boeken</Link>
                      <Link href="/nl/beste-complottheorie-boeken" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Complottheorie-boeken</Link>
                      <Link href="/nl/beste-donkere-geschiedenis-boeken" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Donkere Geschiedenis-boeken</Link>
                      <Link href="/nl/beste-noordse-mythologie-boeken" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Noordse Mythologie-boeken</Link>
                      <Link href="/nl/beste-boeken-in-het-nederlands" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Beste Boeken in het Nederlands</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Bedrijf</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Over ons</Link>
                      <Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Contact</Link>
                      <Link href="/affiliate-disclosure" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Affiliate-informatie</Link>
                      <Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Privacybeleid</Link>
                      <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Gebruiksvoorwaarden</Link>
                    </div>
                  </div>
                </>
              ) : isFR ? (
                <>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Explorer</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/fr" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition font-semibold">Accueil</Link>
                      <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Tous les Livres</Link>
                      <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meilleures Ventes</Link>
                      <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Livres d&apos;Histoire</Link>
                      <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Livres de Mythologie</Link>
                      <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Apprentissage des Langues</Link>
                      <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                      <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Recherche</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Meilleures Listes</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/fr/meilleurs-livres-histoire" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meilleurs Livres d&apos;Histoire</Link>
                      <Link href="/fr/meilleurs-livres-mythologie" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meilleurs Livres de Mythologie</Link>
                      <Link href="/fr/meilleurs-livres-complots" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meilleurs Livres sur les Complots</Link>
                      <Link href="/fr/meilleurs-livres-histoire-sombre" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meilleurs Livres d&apos;Histoire Sombre</Link>
                      <Link href="/fr/meilleurs-livres-mythologie-nordique" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meilleurs Livres de Mythologie Nordique</Link>
                      <Link href="/fr/meilleurs-livres-en-francais" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meilleurs Livres en Français</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">À Propos</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">À Propos de Nous</Link>
                      <Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Contact</Link>
                      <Link href="/affiliate-disclosure" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Liens Affiliés</Link>
                      <Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Politique de Confidentialité</Link>
                      <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Conditions d&apos;Utilisation</Link>
                    </div>
                  </div>
                </>
              ) : isES ? (
                <>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Explorar</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/es" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition font-semibold">Inicio</Link>
                      <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Todos los Libros</Link>
                      <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Más Vendidos</Link>
                      <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Libros de Historia</Link>
                      <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Libros de Mitología</Link>
                      <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Aprendizaje de Idiomas</Link>
                      <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                      <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Buscar</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Mejores Listas</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/es/mejores-libros-historia" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mejores Libros de Historia</Link>
                      <Link href="/es/mejores-libros-mitologia" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mejores Libros de Mitología</Link>
                      <Link href="/es/mejores-libros-conspiraciones" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mejores Libros de Conspiraciones</Link>
                      <Link href="/es/mejores-libros-historia-oscura" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mejores Libros de Historia Oscura</Link>
                      <Link href="/es/mejores-libros-mitologia-nordica" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mejores Libros de Mitología Nórdica</Link>
                      <Link href="/es/mejores-libros-en-espanol" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mejores Libros en Español</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Empresa</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Sobre Nosotros</Link>
                      <Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Contacto</Link>
                      <Link href="/affiliate-disclosure" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Divulgación de Afiliados</Link>
                      <Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Política de Privacidad</Link>
                      <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Términos de Uso</Link>
                    </div>
                  </div>
                </>
              ) : isIT ? (
                <>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Esplora</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/it" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition font-semibold">Home</Link>
                      <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Tutti i Libri</Link>
                      <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Più Venduti</Link>
                      <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Libri di Storia</Link>
                      <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Libri di Mitologia</Link>
                      <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Apprendimento Lingue</Link>
                      <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                      <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Cerca</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Le Migliori Liste</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/it/migliori-libri-storia" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Migliori Libri di Storia</Link>
                      <Link href="/it/migliori-libri-mitologia" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Migliori Libri di Mitologia</Link>
                      <Link href="/it/migliori-libri-complotto" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Migliori Libri sui Complotti</Link>
                      <Link href="/it/migliori-libri-storia-oscura" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Migliori Libri di Storia Oscura</Link>
                      <Link href="/it/migliori-libri-mitologia-norrena" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Migliori Libri di Mitologia Norrena</Link>
                      <Link href="/it/migliori-libri-in-italiano" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Migliori Libri in Italiano</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Azienda</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Chi Siamo</Link>
                      <Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Contatti</Link>
                      <Link href="/affiliate-disclosure" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Informativa Affiliati</Link>
                      <Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Privacy Policy</Link>
                      <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Termini di Utilizzo</Link>
                    </div>
                  </div>
                </>
              ) : isPT ? (
                <>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Explorar</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/pt" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition font-semibold">Início</Link>
                      <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Todos os Livros</Link>
                      <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mais Vendidos</Link>
                      <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Livros de História</Link>
                      <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Livros de Mitologia</Link>
                      <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Aprendizado de Idiomas</Link>
                      <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                      <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Pesquisar</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Melhores Listas</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/pt/melhores-livros-historia" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Melhores Livros de História</Link>
                      <Link href="/pt/melhores-livros-mitologia" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Melhores Livros de Mitologia</Link>
                      <Link href="/pt/melhores-livros-conspiracoes" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Melhores Livros sobre Conspirações</Link>
                      <Link href="/pt/melhores-livros-historia-sombria" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Melhores Livros de História Sombria</Link>
                      <Link href="/pt/melhores-livros-mitologia-nordica" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Melhores Livros de Mitologia Nórdica</Link>
                      <Link href="/pt/melhores-livros-em-portugues" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Melhores Livros em Português</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Empresa</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Sobre Nós</Link>
                      <Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Contato</Link>
                      <Link href="/affiliate-disclosure" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Divulgação de Afiliados</Link>
                      <Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Política de Privacidade</Link>
                      <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Termos de Uso</Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Browse</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/start-here" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition font-semibold">Start Here</Link>
                      <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">All Books</Link>
                      <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Bestsellers</Link>
                      <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">History Books</Link>
                      <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mythology Books</Link>
                      <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Language Learning</Link>
                      <Link href="/gift-guides" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Gift Guides</Link>
                      <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                      <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Search</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Best Of Lists</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/best-history-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best History Books</Link>
                      <Link href="/best-mythology-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Mythology Books</Link>
                      <Link href="/best-conspiracy-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Conspiracy Books</Link>
                      <Link href="/best-dark-history-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Dark History Books</Link>
                      <Link href="/best-language-learning-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Language Learning Books</Link>
                      <Link href="/best-religion-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Religion Books</Link>
                      <Link href="/best-science-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Science Books</Link>
                      <Link href="/best-american-history-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best American History Books</Link>
                      <Link href="/best-books-in-german" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Books in German</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Company</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">About Us</Link>
                      <Link href="/team" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meet the Authors</Link>
                      <Link href="/authors/auke" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Author: Auke</Link>
                      <Link href="/authors/jennifer-joseph" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Author: Jennifer Joseph</Link>
                      <Link href="/authors/yahia-fathy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Author: Yahia Fathy</Link>
                      <Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Contact</Link>
                      <Link href="/affiliate-disclosure" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Affiliate Disclosure</Link>
                      <Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Privacy Policy</Link>
                      <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Terms of Service</Link>
                    </div>
                  </div>
                </>
              )}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">{isDE ? "Kontakt" : isES ? "Contacto" : isIT ? "Contatti" : isPT ? "Contato" : "Contact"}</h3>
                <div className="text-sm text-[var(--color-text-muted)] space-y-1">
                  <p className="font-semibold text-[var(--color-text)]">Skriuwer.com</p>
                  <p>{isDE ? "Friesland, Niederlande" : isNL ? "Friesland, Nederland" : isFR ? "Frise, Pays-Bas" : isES ? "Frisia, Países Bajos" : isIT ? "Frisia, Paesi Bassi" : isPT ? "Frísia, Países Baixos" : "Friesland, Netherlands"}</p>
                  <p className="mt-3">
                    <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
                      kontakt@skriuwer.com
                    </a>
                  </p>
                </div>
                {/* Social media */}
                <div className="flex gap-3 mt-5">
                  <a
                    href="https://www.facebook.com/learnfrisian"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:bg-[var(--color-surface)] transition-colors border border-[var(--color-border)]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/learnfrisian"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:bg-[var(--color-surface)] transition-colors border border-[var(--color-border)]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@learnfrisian"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:bg-[var(--color-surface)] transition-colors border border-[var(--color-border)]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {!isLocalized && (
              <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-dim)] mb-2 uppercase tracking-wider font-semibold">Also available in</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <Link href="/de" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">🇩🇪 Deutsch</Link>
                  <Link href="/nl" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">🇳🇱 Nederlands</Link>
                  <Link href="/fr" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">🇫🇷 Français</Link>
                  <Link href="/es" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">🇪🇸 Español</Link>
                  <Link href="/it" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">🇮🇹 Italiano</Link>
                  <Link href="/pt" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">🇧🇷 Português</Link>
                </div>
              </div>
            )}
            <div className="mt-10 pt-6 border-t border-[var(--color-border)] text-xs text-[var(--color-text-dim)]">
              {isDE ? (
                <p>Als Amazon-Partner verdient Skriuwer an qualifizierten Käufen. Preise und Verfügbarkeit können sich ändern.</p>
              ) : isNL ? (
                <p>Als Amazon-partner verdient Skriuwer aan in aanmerking komende aankopen. Prijzen en beschikbaarheid kunnen veranderen.</p>
              ) : isFR ? (
                <p>En tant que partenaire Amazon, Skriuwer gagne une commission sur les achats qualifiés. Les prix et disponibilités peuvent changer.</p>
              ) : isES ? (
                <p>Como asociado de Amazon, Skriuwer gana comisiones por compras calificadas. Los precios y disponibilidad pueden cambiar.</p>
              ) : isIT ? (
                <p>In qualità di Associato Amazon, Skriuwer guadagna dagli acquisti idonei. I prezzi e la disponibilità possono variare.</p>
              ) : isPT ? (
                <p>Como Associado Amazon, Skriuwer ganha com compras qualificadas. Preços e disponibilidade podem mudar.</p>
              ) : (
                <p>As an Amazon Associate, Skriuwer earns from qualifying purchases. Book prices and availability are subject to change.</p>
              )}
              <p className="mt-1">&copy; {new Date().getFullYear()} Skriuwer.com. {isDE ? "Alle Rechte vorbehalten." : isNL ? "Alle rechten voorbehouden." : isFR ? "Tous droits réservés." : isES ? "Todos los derechos reservados." : isIT ? "Tutti i diritti riservati." : isPT ? "Todos os direitos reservados." : "All rights reserved."}</p>
            </div>
          </div>
        </footer>
        <Script
          src="https://plausible.io/js/pa-tDvtnO57A0AOoBxYGIwx3.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">{`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
          plausible.init()
        `}</Script>
      </body>
    </html>
  );
}
