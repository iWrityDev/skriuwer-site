import type { Metadata } from "next";
import Link from "next/link";
import { BookGrid } from "@/components/BookGrid";
import { getBestsellers, getBookCountByCategory } from "@/lib/books";
import { CATEGORIES } from "@/lib/categories";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Bestselling Books, Most Reviewed & Highest Rated",
  description: "Discover the most popular books right now, ranked by reader reviews across history, mythology, psychology, business, and more. Updated daily.",
  alternates: { canonical: "https://www.skriuwer.com/bestsellers" },
  openGraph: {
    title: "Bestselling Books — Most Reviewed & Highest Rated | Skriuwer",
    description: "Discover the most popular books right now, ranked by reader reviews across history, mythology, psychology, business, and more. Updated daily.",
    url: "https://www.skriuwer.com/bestsellers",
    type: "website",
  },
};

export default function BestsellersPage() {
  const bestsellers = getBestsellers(60);
  const categoryCounts = getBookCountByCategory();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Bestselling Books</h1>
      </div>
      <p className="text-[var(--color-text-muted)] mb-6 ml-5">
        The {bestsellers.length} most-reviewed books across all categories, ranked by reader popularity.
      </p>

      {/* Browse by category */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES
          .filter((c) => categoryCounts[c.slug])
          .sort((a, b) => (categoryCounts[b.slug] || 0) - (categoryCounts[a.slug] || 0))
          .slice(0, 10)
          .map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-colors"
            >
              {cat.name}
            </Link>
          ))}
      </div>

      <BookGrid books={bestsellers} />
    </div>
  );
}
