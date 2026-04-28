import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBooks } from "@/lib/books";
import { buildAffiliateUrl } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Boekenaanbevelingen 2026 – De beste boeken voor nieuwsgierige lezers",
  description:
    "Ontdek de beste boeken over geschiedenis, mythologie, donkere geschiedenis en meer. Alle titels gesorteerd op geverifieerde lezersbeoordelingen van Amazon.",
  alternates: {
    canonical: "https://www.skriuwer.com/nl",
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
    title: "Boekenaanbevelingen 2026 – De beste boeken voor nieuwsgierige lezers",
    description:
      "Ontdek de beste boeken over geschiedenis, mythologie, donkere geschiedenis en meer.",
    url: "https://www.skriuwer.com/nl",
    type: "website",
    locale: "nl_NL",
  },
};

const CATEGORIES_NL = [
  { slug: "beste-geschiedenisboeken", label: "Geschiedenis", emoji: "🏛️", desc: "Van de Oudheid tot de moderne tijd" },
  { slug: "beste-mythologie-boeken", label: "Mythologie", emoji: "⚡", desc: "Grieks, Noors, Egyptisch" },
  { slug: "beste-donkere-geschiedenis-boeken", label: "Donkere Geschiedenis", emoji: "🕯️", desc: "De bladzijden die schoolboeken weglaten" },
  { slug: "beste-boeken-in-het-nederlands", label: "Boeken in het Nederlands", emoji: "🇳🇱", desc: "Nederlandstalige titels, alle genres" },
  { slug: "beste-complottheorie-boeken", label: "Complottheorie", emoji: "🔍", desc: "Doofpotten, geheimen, waarheid" },
  { slug: "beste-noordse-mythologie-boeken", label: "Noordse Mythologie", emoji: "🪓", desc: "Odin, Thor, Ragnarok en meer" },
];

export default function DutchHomePage() {
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
            Skriuwer.com in het Nederlands
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5"
            style={{
              backgroundImage: "linear-gradient(135deg, #fff 0%, var(--color-orange-light) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            De beste boeken,<br />beoordeeld door lezers
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            Geen redacteursmeningen, geen gesponsorde lijsten. Elke ranglijst is gebaseerd op geverifieerde Amazon-lezersbeoordelingen. Hoe meer beoordelingen, hoe hoger in de lijst.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Category grid */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Categorieën</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES_NL.map((cat) => (
              <Link
                key={cat.slug}
                href={`/nl/${cat.slug}`}
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
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Meest beoordeelde boeken</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {topBooks.map((book) => {
              const src = book.coverImage?.startsWith("http")
                ? book.coverImage
                : book.coverImageFallback?.startsWith("http")
                ? book.coverImageFallback
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
                      Kopen op Amazon →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* About Skriuwer NL */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Over Skriuwer.com</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
            Skriuwer is een onafhankelijke boekenaanbevelingssite uit Friesland, Nederland. Wij verkopen geen boeken, maar linken naar Amazon zodat u direct bij de verkoper kunt kopen. Alle ranglijsten zijn gebaseerd op echte lezersbeoordelingen, niet op advertentiecontracten.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Als Amazon-partner verdienen wij een kleine commissie bij in aanmerking komende aankopen. Voor u zijn er geen extra kosten.
          </p>
        </section>
      </div>
    </div>
  );
}
