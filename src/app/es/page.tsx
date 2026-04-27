import type { Metadata } from "next";
import Link from "next/link";
import { getAllBooks } from "@/lib/books";
import { buildAffiliateUrl } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Recomendaciones de Libros 2026 – Los mejores libros para lectores curiosos",
  description: "Los mejores libros de historia, mitología, historia oscura y conspiraciones, ordenados por valoraciones reales de Amazon. Selección independiente de Skriuwer.",
  alternates: {
    canonical: "https://www.skriuwer.com/es",
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
    title: "Recomendaciones de Libros 2026 – Los mejores libros para lectores curiosos",
    description: "Los mejores libros de historia, mitología, historia oscura y conspiraciones, ordenados por valoraciones reales de Amazon.",
    url: "https://www.skriuwer.com/es",
    type: "website",
    locale: "es_ES",
  },
};

const CATEGORIES = [
  { label: "Historia", slug: "history", href: "/es/mejores-libros-historia", desc: "Los libros de historia más leídos" },
  { label: "Mitología", slug: "mythology", href: "/es/mejores-libros-mitologia", desc: "Griega, nórdica, egipcia y más" },
  { label: "Historia Oscura", slug: "dark-history", href: "/es/mejores-libros-historia-oscura", desc: "Lo que los libros de texto omiten" },
  { label: "Conspiraciones", slug: "conspiracy", href: "/es/mejores-libros-conspiraciones", desc: "Hechos detrás de los mitos" },
  { label: "Mitología Nórdica", slug: "mythology", href: "/es/mejores-libros-mitologia-nordica", desc: "Odin, Thor, Ragnarök" },
  { label: "Libros en Español", slug: "language-learning", href: "/es/mejores-libros-en-espanol", desc: "Las mejores ediciones en español" },
];

export default function EsHomePage() {
  const topBooks = getAllBooks()
    .filter((b) => b.categories.some((c) => ["history", "mythology", "dark-history", "conspiracy"].includes(c)))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="hero-glow-cat">
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight"
            style={{ backgroundImage: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
            Los mejores libros,<br />valorados por lectores
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Listas de libros seleccionadas de historia, mitología, historia oscura y más — ordenadas por valoraciones verificadas de lectores en Amazon.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/es/mejores-libros-historia" className="px-5 py-2.5 rounded-lg bg-[var(--color-orange)] text-white font-semibold hover:bg-[var(--color-orange-light)] transition text-sm">
              Explorar libros de historia
            </Link>
            <Link href="/books" className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold hover:text-[var(--color-orange-light)] hover:border-[var(--color-orange-light)] transition text-sm">
              Ver todos los libros
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Explorar por categoría</h2>
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

      {/* Top books */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Los más valorados ahora</h2>
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
                      Comprar en Amazon →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Sobre Skriuwer</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            Skriuwer es un sitio independiente de recomendaciones de libros de Frisia, Países Bajos. Todas las listas se ordenan por número de valoraciones verificadas de lectores en Amazon, no por presupuesto publicitario. Sin listas patrocinadas, sin relleno.
          </p>
        </div>
      </section>
    </div>
  );
}
