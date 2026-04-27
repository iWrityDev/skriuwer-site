import type { Metadata } from "next";
import Link from "next/link";
import { getAllBooks } from "@/lib/books";
import { buildAffiliateUrl } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Consigli Libri 2026 – I migliori libri per lettori curiosi",
  description: "I migliori libri di storia, mitologia, storia oscura e complotti, ordinati per valutazioni reali di Amazon. Selezione indipendente di Skriuwer.",
  alternates: {
    canonical: "https://www.skriuwer.com/it",
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
    title: "Consigli Libri 2026 – I migliori libri per lettori curiosi",
    description: "I migliori libri di storia, mitologia, storia oscura e complotti, ordinati per valutazioni reali di Amazon.",
    url: "https://www.skriuwer.com/it",
    type: "website",
    locale: "it_IT",
  },
};

const CATEGORIES = [
  { label: "Storia", href: "/it/migliori-libri-storia", desc: "I libri di storia più letti" },
  { label: "Mitologia", href: "/it/migliori-libri-mitologia", desc: "Greca, norrena, egizia e altro" },
  { label: "Storia Oscura", href: "/it/migliori-libri-storia-oscura", desc: "Quello che i libri di testo omettono" },
  { label: "Complotti", href: "/it/migliori-libri-complotto", desc: "Fatti dietro i miti" },
  { label: "Mitologia Norrena", href: "/it/migliori-libri-mitologia-norrena", desc: "Odino, Thor, Ragnarök" },
  { label: "Libri in Italiano", href: "/it/migliori-libri-in-italiano", desc: "Le migliori edizioni in italiano" },
];

export default function ItHomePage() {
  const topBooks = getAllBooks()
    .filter((b) => b.categories.some((c) => ["history", "mythology", "dark-history", "conspiracy"].includes(c)))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  return (
    <div>
      <section className="hero-glow-cat">
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight"
            style={{ backgroundImage: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
            I migliori libri,<br />valutati dai lettori
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Liste di libri curate su storia, mitologia, storia oscura e altro — ordinate per valutazioni verificate dei lettori su Amazon.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/it/migliori-libri-storia" className="px-5 py-2.5 rounded-lg bg-[var(--color-orange)] text-white font-semibold hover:bg-[var(--color-orange-light)] transition text-sm">
              Esplora libri di storia
            </Link>
            <Link href="/books" className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold hover:text-[var(--color-orange-light)] hover:border-[var(--color-orange-light)] transition text-sm">
              Vedi tutti i libri
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Esplora per categoria</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.href} href={cat.href}
              className="group p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-orange-light)] transition-all hover:-translate-y-0.5 bg-[var(--color-surface)]">
              <div className="font-bold text-[var(--color-text)] group-hover:text-[var(--color-orange-light)] transition text-sm mb-1">{cat.label}</div>
              <div className="text-xs text-[var(--color-text-dim)]">{cat.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">I più votati adesso</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {topBooks.map((book) => {
            const amazonUrl = book.asin ? buildAffiliateUrl(book.asin) : null;
            const cover = book.coverImageFallback?.startsWith("http") ? book.coverImageFallback : book.coverImage;
            return (
              <div key={book.slug} className="flex flex-col rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)] hover:-translate-y-0.5 transition-all">
                {cover?.startsWith("http") && (
                  <div className="w-full h-40 bg-[var(--color-surface-light)] flex items-center justify-center overflow-hidden">
                    <img src={cover} alt={book.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-3 flex flex-col flex-1">
                  <Link href={`/books/${book.slug}`} className="font-semibold text-[var(--color-text)] hover:text-[var(--color-orange-light)] text-sm line-clamp-2 leading-snug mb-1">
                    {book.title}
                  </Link>
                  <p className="text-xs text-[var(--color-text-dim)] mb-2">{book.author}</p>
                  {amazonUrl && (
                    <a href={amazonUrl} target="_blank" rel="noopener noreferrer nofollow sponsored"
                      className="mt-auto text-center px-3 py-1.5 rounded bg-[var(--color-orange)] text-white text-xs font-bold hover:bg-[var(--color-orange-light)] transition">
                      Acquista su Amazon →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Chi siamo</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            Skriuwer è un sito indipendente di consigli sui libri dalla Frisia, Paesi Bassi. Tutte le liste sono ordinate per numero di valutazioni verificate dei lettori su Amazon, non per budget pubblicitario. Nessuna lista sponsorizzata, nessun riempitivo.
          </p>
        </div>
      </section>
    </div>
  );
}
