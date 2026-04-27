import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BookGrid } from "@/components/BookGrid";
import { getAllBooks, getBookCount, getBookCountByCategory } from "@/lib/books";
import { CATEGORIES, getCategoryCssVar } from "@/lib/categories";

export const metadata: Metadata = {
  title: "All Books, Browse Our Complete Collection | Skriuwer",
  description: "Browse 200+ curated books across history, mythology, language learning, psychology, self-help, true crime, and more. Honest picks with Amazon links.",
  alternates: { canonical: "https://www.skriuwer.com/books" },
  openGraph: {
    title: "All Books — Browse Our Complete Collection | Skriuwer",
    description: "Browse 200+ curated books across history, mythology, language learning, psychology, self-help, true crime, and more. Honest picks with Amazon links.",
    url: "https://www.skriuwer.com/books",
    type: "website",
  },
};

export default function BooksPage() {
  const books = getAllBooks();
  const totalCount = getBookCount();
  const ownCount = books.filter((b) => b.isOwnBook).length;
  const categoryCounts = getBookCountByCategory();

  // Sort categories by book count descending
  const sortedCategories = [...CATEGORIES]
    .filter((c) => categoryCounts[c.slug])
    .sort((a, b) => (categoryCounts[b.slug] || 0) - (categoryCounts[a.slug] || 0));

  return (
    <>
      {/* Hero */}
      <section className="hero-glow">
        <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-gold-dim)] text-[var(--color-gold)] border border-[color-mix(in_srgb,var(--color-gold)_25%,transparent)]">
            📚 Full Catalog
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] leading-[1.1] tracking-tight">
            All{" "}
            <span
              style={{
                backgroundImage: "var(--color-orange-gradient)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {totalCount} books
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {ownCount} of them written and published under Skriuwer.com. Click any book
            for details and the current price on your local Amazon.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-10">
        {/* Category quick-filter, each chip in its category color */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full border text-[var(--color-orange)] bg-[color-mix(in_srgb,var(--color-orange)_12%,transparent)]" style={{ borderColor: "var(--color-orange)" }}>
            All ({totalCount})
          </span>
          {sortedCategories.map((cat) => {
            const style = {
              "--cat-color": `var(${getCategoryCssVar(cat.slug)})`,
            } as CSSProperties;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                style={style}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <span className="cat-dot" />
                {cat.name}{" "}
                <span className="text-[var(--color-text-dim)] group-hover:text-[var(--color-text-muted)]">
                  ({categoryCounts[cat.slug] || 0})
                </span>
              </Link>
            );
          })}
        </div>

        <BookGrid books={books} />
      </div>
    </>
  );
}
