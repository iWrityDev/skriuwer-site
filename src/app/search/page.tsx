import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = {
  title: "Search Books, Find Your Next Read",
  description: "Search across 1000+ books on history, mythology, language learning, psychology, business, true crime, and more. Find your perfect book by title, author, or topic.",
};

export default function SearchPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Search Books</h1>
      </div>
      <p className="text-[var(--color-text-muted)] mb-8 ml-5">
        Search across 1000+ books by title, author, or topic.
      </p>
      <Suspense fallback={<div className="text-[var(--color-text-muted)]">Loading search...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
