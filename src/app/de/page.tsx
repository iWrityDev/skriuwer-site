import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBooks } from "@/lib/books";
import { buildAffiliateUrl } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Bücher-Empfehlungen 2026 – Die besten Bücher für neugierige Leser",
  description:
    "Entdecken Sie die besten Bücher über Geschichte, Mythologie, dunkle Geschichte und mehr. Alle Titel nach verifizierten Leserbewertungen auf Amazon sortiert.",
  alternates: {
    canonical: "https://www.skriuwer.com/de",
    languages: {
      en: "https://www.skriuwer.com",
      de: "https://www.skriuwer.com/de",
    },
  },
  openGraph: {
    title: "Bücher-Empfehlungen 2026 – Die besten Bücher für neugierige Leser",
    description:
      "Entdecken Sie die besten Bücher über Geschichte, Mythologie, dunkle Geschichte und mehr.",
    url: "https://www.skriuwer.com/de",
    type: "website",
    locale: "de_DE",
  },
};

const CATEGORIES_DE = [
  { slug: "beste-geschichtsbuecher", label: "Geschichte", emoji: "🏛️", desc: "Von der Antike bis zur Moderne" },
  { slug: "beste-mythologie-buecher", label: "Mythologie", emoji: "⚡", desc: "Griechisch, nordisch, ägyptisch" },
  { slug: "beste-dunkle-geschichte-buecher", label: "Dunkle Geschichte", emoji: "🕯️", desc: "Die Seiten, die Schulbücher auslassen" },
  { slug: "beste-buecher-auf-deutsch", label: "Bücher auf Deutsch", emoji: "🇩🇪", desc: "Deutschsprachige Titel, alle Genres" },
  { slug: "beste-verschwoerungstheorie-buecher", label: "Verschwörung", emoji: "🔍", desc: "Vertuschungen, Geheimnisse, Wahrheit" },
  { slug: "beste-nordische-mythologie-buecher", label: "Nordische Mythologie", emoji: "🪓", desc: "Odin, Thor, Ragnarök und mehr" },
];

export default function GermanHomePage() {
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
            Skriuwer.com auf Deutsch
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5"
            style={{
              backgroundImage: "linear-gradient(135deg, #fff 0%, var(--color-orange-light) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Die besten Bücher,<br />nach Lesern bewertet
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            Keine Redakteursmeinungen, keine gesponserten Listen. Jede Rangliste basiert auf verifizierten Amazon-Leserbewertungen — je mehr Bewertungen, desto weiter oben.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Category grid */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">
            Kategorien
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES_DE.map((cat) => (
              <Link
                key={cat.slug}
                href={`/de/${cat.slug}`}
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
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">
            Meistbewertete Bücher
          </h2>
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
                      Bei Amazon kaufen →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* About Skriuwer DE */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Über Skriuwer.com</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
            Skriuwer ist eine unabhängige Bücher-Empfehlungsseite aus den Niederlanden. Wir verkaufen keine Bücher selbst — wir verlinken zu Amazon, damit Sie direkt beim Händler kaufen können. Alle Ranglisten basieren auf echten Leserbewertungen, nicht auf Werbeverträgen.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Als Amazon-Partner verdienen wir eine kleine Provision bei qualifizierten Käufen — für Sie entstehen keine Mehrkosten.
          </p>
        </section>
      </div>
    </div>
  );
}
