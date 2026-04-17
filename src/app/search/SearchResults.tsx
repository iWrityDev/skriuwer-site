"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Fuse from "fuse.js";
import Link from "next/link";
import Image from "next/image";
import type { Book } from "@/lib/types";
import booksData from "../../../data/books.json";

const allBooks = (booksData.books as unknown) as Book[];
const fuse = new Fuse(allBooks, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "author", weight: 0.3 },
    { name: "categories", weight: 0.1 },
    { name: "tags", weight: 0.1 },
  ],
  threshold: 0.35,
  includeScore: true,
});

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Book[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
    if (initialQuery.length >= 2) {
      const found = fuse.search(initialQuery).map((r) => r.item);
      setResults(found);
    } else {
      setResults([]);
    }
    inputRef.current?.focus();
  }, [initialQuery]);

  function handleChange(value: string) {
    setQuery(value);
    if (value.length >= 2) {
      const found = fuse.search(value).map((r) => r.item);
      setResults(found);
    } else {
      setResults([]);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search books by title, author, or topic..."
          className="flex-1 px-5 py-3 rounded-lg text-base bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-orange)] transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-light)] transition-colors"
        >
          Search
        </button>
      </form>

      {/* Heading */}
      {initialQuery ? (
        <div className="mb-6 flex items-center gap-3">
          <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
          <h1 className="text-xl font-bold text-[var(--color-text)]">
            {results.length > 0
              ? `${results.length} results for "${initialQuery}"`
              : `No results for "${initialQuery}"`}
          </h1>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-muted)] text-lg">
            Search across {allBooks.length.toLocaleString()} books
          </p>
          <p className="text-[var(--color-text-dim)] text-sm mt-2">
            Try searching for a title, author name, or topic like &ldquo;Roman history&rdquo; or &ldquo;Greek mythology&rdquo;
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((book) => (
            <Link
              key={book.slug}
              href={`/books/${book.slug}`}
              className="flex gap-4 p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group"
            >
              {book.coverImage && (
                <div className="flex-shrink-0 w-14 h-20 relative rounded overflow-hidden bg-[var(--color-surface-light)]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                    unoptimized
                  />
                </div>
              )}
              <div className="min-w-0 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors line-clamp-2 leading-snug mb-1">
                    {book.title}
                  </h2>
                  <p className="text-xs text-[var(--color-text-dim)] mb-1">{book.author}</p>
                  {book.categories.length > 0 && (
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-[var(--color-surface-light)] text-[var(--color-orange-light)] capitalize mb-1">
                      {book.categories[0].replace(/-/g, " ")}
                    </span>
                  )}
                </div>
                {book.starRating && book.reviewCount > 0 && (
                  <p className="text-xs text-[var(--color-text-dim)]">
                    ★ {book.starRating} ({book.reviewCount.toLocaleString()})
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {initialQuery && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-muted)] mb-4">
            No books found matching &quot;{initialQuery}&quot;
          </p>
          <p className="text-[var(--color-text-dim)] text-sm mb-6">
            Try a broader search or browse by category.
          </p>
          <Link href="/books" className="btn-outline">
            Browse All Books
          </Link>
        </div>
      )}
    </div>
  );
}
