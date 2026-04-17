import type { Metadata } from "next";
import Link from "next/link";
import { BookGrid } from "@/components/BookGrid";
import { getAllBooks, getBookCount, getBookCountByCategory } from "@/lib/books";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "All Books — Browse Our Complete Collection",
  description: "Browse over 1000 books across history, mythology, language learning, psychology, business, true crime, and more. All with Amazon affiliate links.",
  alternates: { canonical: "https://skriuwer.com/books" },
};

export default function BooksPage() {
  const books = getAllBooks();
  const categoryCounts = getBookCountByCategory();

  // Sort categories by book count descending
  const sortedCategories = [...CATEGORIES]
    .filter((c) => categoryCounts[c.slug])
    .sort((a, b) => (categoryCounts[b.slug] || 0) - (categoryCounts[a.slug] || 0));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">All Books</h1>
      </div>
      <p className="text-[var(--color-text-muted)] mb-6 ml-5">
        {getBookCount()} books to discover. Click any book for details and Amazon links.
      </p>

      {/* Category quick-filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-orange)] text-[var(--color-orange)] bg-[rgba(232,100,10,0.08)]">
          All ({getBookCount()})
        </span>
        {sortedCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-colors"
          >
            {cat.name} ({categoryCounts[cat.slug] || 0})
          </Link>
        ))}
      </div>

      <BookGrid books={books} />
    </div>
  );
}
