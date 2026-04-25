import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { BookGrid } from "@/components/BookGrid";
import { getBooksByCategory } from "@/lib/books";
import { CATEGORIES, getCategoryBySlug, getCategoryCssVar } from "@/lib/categories";
import { buildAffiliateUrl } from "@/lib/affiliate";
import type { Book } from "@/lib/types";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `Best ${cat.name} Books, Top Picks for ${new Date().getFullYear()}`,
    description: `${cat.description} Browse our curated collection of the best ${cat.name.toLowerCase()} books, all available on Amazon.`,
    alternates: { canonical: `https://www.skriuwer.com/category/${category}` },
  };
}

function TopBookCard({ book, rank }: { book: Book; rank: number }) {
  return (
    <div className="flex gap-4 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group">
      <span className="flex-shrink-0 w-9 h-9 rounded-full text-white text-sm font-bold flex items-center justify-center" style={{ background: "var(--color-orange-gradient)" }}>
        {rank}
      </span>
      <div className="flex-shrink-0 relative rounded overflow-hidden bg-[var(--color-surface-light)] flex items-center justify-center" style={{ width: 56, height: 80 }}>
        {(() => {
          // Own books: use Shopify CDN (coverImage). Third-party: prefer Amazon CDN (coverImageFallback).
          const src = book.isOwnBook
            ? (book.coverImage?.startsWith("http") ? book.coverImage : null)
            : (book.coverImageFallback?.startsWith("http") ? book.coverImageFallback : book.coverImage?.startsWith("http") ? book.coverImage : null);
          return src ? (
            <Image src={src} alt={book.title} fill className="object-cover" sizes="56px" unoptimized />
          ) : (
            <span className="text-xl">&#128218;</span>
          );
        })()}
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/books/${book.slug}`}>
          <h3 className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors line-clamp-2 leading-snug mb-1">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-[var(--color-text-dim)] mb-2">{book.author}</p>
        {book.reviewCount > 0 && (
          <p className="text-xs text-[var(--color-text-dim)]">{book.reviewCount.toLocaleString()} reviews</p>
        )}
      </div>
      {book.asin && (
        <a
          href={buildAffiliateUrl(book.asin)}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="flex-shrink-0 self-center px-3 py-1.5 text-xs font-bold bg-[var(--color-orange)] text-white rounded hover:bg-[var(--color-orange-light)] transition-colors whitespace-nowrap"
        >
          Buy
        </a>
      )}
    </div>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();
  const books = getBooksByCategory(category);
  const topBooks = books.slice(0, 5);
  const restBooks = books.slice(5);

  const catStyle = {
    "--cat-color": `var(${getCategoryCssVar(category)})`,
  } as CSSProperties;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Best ${cat.name} Books`,
    description: cat.description,
    url: `https://www.skriuwer.com/category/${category}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={catStyle}>
        {/* Hero */}
        <section className="hero-glow-cat">
          <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">
            <nav className="text-xs text-[var(--color-text-dim)] mb-5">
              <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
              {" / "}
              <Link href="/books" className="hover:text-[var(--color-orange-light)]">Books</Link>
              {" / "}
              <span className="text-[var(--color-text)]">{cat.name}</span>
            </nav>
            <div className="flex items-center gap-2 mb-3">
              <span className="cat-chip" style={{ fontSize: 11 }}>
                <span className="cat-dot" />
                Category
              </span>
              <span className="text-xs text-[var(--color-text-dim)]">
                {books.length} book{books.length === 1 ? "" : "s"}
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, color-mix(in srgb, var(--cat-color) 60%, white) 0%, var(--cat-color) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Best {cat.name} Books
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {cat.description}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-10">
          {books.length > 0 ? (
            <>
              {/* Top 5 ranked books */}
              {topBooks.length > 0 && (
                <section className="mb-10">
                  <div className="section-header mb-4">
                    <span className="accent-bar" style={{ background: "var(--cat-color)" }} />
                    <h2 className="text-lg font-bold text-[var(--color-text)]">Top Picks</h2>
                  </div>
                  <div className="space-y-3">
                    {topBooks.map((book, i) => (
                      <TopBookCard key={book.slug} book={book} rank={i + 1} />
                    ))}
                  </div>
                </section>
              )}

              {/* All books grid */}
              {restBooks.length > 0 && (
                <section>
                  <div className="section-header mb-4">
                    <span className="accent-bar" style={{ background: "var(--cat-color)" }} />
                    <h2 className="text-lg font-bold text-[var(--color-text)]">All {cat.name} Books</h2>
                  </div>
                  <BookGrid books={restBooks} />
                </section>
              )}
            </>
          ) : (
            <p className="text-[var(--color-text-dim)] py-8">No books in this category yet. Check back soon!</p>
          )}
        </div>
      </div>
    </>
  );
}
