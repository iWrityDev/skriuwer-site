import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBooks } from "@/lib/books";
import { buildAffiliateUrl } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Recommandations de Livres 2026 – Les meilleurs livres pour lecteurs curieux",
  description:
    "Découvrez les meilleurs livres sur l'histoire, la mythologie, l'histoire sombre et plus encore. Tous les titres classés par avis de lecteurs vérifiés sur Amazon.",
  alternates: {
    canonical: "https://www.skriuwer.com/fr",
    languages: {
      en: "https://www.skriuwer.com",
      de: "https://www.skriuwer.com/de",
      nl: "https://www.skriuwer.com/nl",
      fr: "https://www.skriuwer.com/fr",
      es: "https://www.skriuwer.com/es",
      it: "https://www.skriuwer.com/it",
      pt: "https://www.skriuwer.com/pt",
    },
  },
  openGraph: {
    title: "Recommandations de Livres 2026 – Les meilleurs livres pour lecteurs curieux",
    description:
      "Découvrez les meilleurs livres sur l'histoire, la mythologie, l'histoire sombre et plus encore.",
    url: "https://www.skriuwer.com/fr",
    type: "website",
    locale: "fr_FR",
  },
};

const CATEGORIES_FR = [
  { slug: "meilleurs-livres-histoire", label: "Histoire", emoji: "🏛️", desc: "De l'Antiquité à l'époque moderne" },
  { slug: "meilleurs-livres-mythologie", label: "Mythologie", emoji: "⚡", desc: "Grecque, nordique, égyptienne" },
  { slug: "meilleurs-livres-histoire-sombre", label: "Histoire Sombre", emoji: "🕯️", desc: "Les pages que les manuels omettent" },
  { slug: "meilleurs-livres-en-francais", label: "Livres en Français", emoji: "🇫🇷", desc: "Titres francophones, tous genres" },
  { slug: "meilleurs-livres-complots", label: "Théories du Complot", emoji: "🔍", desc: "Dissimulations, secrets, vérité" },
  { slug: "meilleurs-livres-mythologie-nordique", label: "Mythologie Nordique", emoji: "🪓", desc: "Odin, Thor, Ragnarök et plus" },
];

export default function FrenchHomePage() {
  const topBooks = getAllBooks()
    .filter((b) => b.reviewCount > 5000)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="hero-glow py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-orange-light)] mb-4">
            Skriuwer.com en Français
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5"
            style={{
              backgroundImage: "linear-gradient(135deg, #fff 0%, var(--color-orange-light) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Les meilleurs livres,<br />évalués par les lecteurs
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            Pas d&apos;opinions éditoriales, pas de listes sponsorisées. Chaque classement est basé sur des avis de lecteurs vérifiés sur Amazon. Plus il y a d&apos;avis, plus le livre est haut dans la liste.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Category grid */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Catégories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES_FR.map((cat) => (
              <Link
                key={cat.slug}
                href={`/fr/${cat.slug}`}
                className="group p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-orange)] transition-colors"
              >
                <span className="text-2xl mb-2 block">{cat.emoji}</span>
                <p className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange-light)] transition-colors">
                  {cat.label}
                </p>
                <p className="text-xs text-[var(--color-text-dim)] mt-0.5">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Top books */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Livres les plus évalués</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {topBooks.map((book) => {
              const src = book.coverImageFallback?.startsWith("http")
                ? book.coverImageFallback
                : book.coverImage?.startsWith("http")
                ? book.coverImage
                : null;
              return (
                <div key={book.slug} className="group flex flex-col gap-3 p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-orange)] transition-colors">
                  <Link href={`/books/${book.slug}`} className="block">
                    <div className="relative aspect-[2/3] rounded overflow-hidden bg-[var(--color-surface-light)]">
                      {src ? (
                        <Image src={src} alt={book.title} fill className="object-cover" sizes="200px" unoptimized />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-3xl">📚</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-orange-light)] transition-colors line-clamp-2 leading-snug">
                      {book.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-dim)] mt-0.5">{book.author}</p>
                  </Link>
                  {book.asin && (
                    <a
                      href={buildAffiliateUrl(book.asin)}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="mt-auto w-full text-center py-1.5 text-xs font-bold bg-[var(--color-orange)] text-white rounded hover:bg-[var(--color-orange-light)] transition-colors"
                    >
                      Acheter sur Amazon →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* About Skriuwer FR */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">À propos de Skriuwer.com</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
            Skriuwer est un site de recommandations de livres indépendant, basé en Frise, aux Pays-Bas. Nous ne vendons pas de livres directement, mais proposons des liens vers Amazon pour que vous puissiez acheter directement chez le vendeur. Tous les classements sont basés sur de vrais avis de lecteurs, pas sur des contrats publicitaires.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            En tant que partenaire Amazon, nous gagnons une petite commission sur les achats qualifiés. Aucun coût supplémentaire pour vous.
          </p>
        </section>
      </div>
    </div>
  );
}
