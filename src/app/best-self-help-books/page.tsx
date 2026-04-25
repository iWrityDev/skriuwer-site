import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Self-Help Books in 2026 | Top Picks Ranked by Readers",
  description:
    "The best self-help books ranked by reader reviews. From building better habits to unlocking your mindset, these top picks have helped millions of people improve their lives.",
  alternates: { canonical: "https://www.skriuwer.com/best-self-help-books" },
};

export default function BestSelfHelpBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("self-help"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Self-Help Books"
      description="The right self-help book at the right time can genuinely change how you think, work, and live. These are the top-rated self-help books ranked by reader popularity, covering habits, mindset, productivity, and personal growth."
      books={books}
      breadcrumb="Best Self-Help Books"
      categoryPage="/category/self-help"
      categoryLabel="self-help"
      canonical="https://www.skriuwer.com/best-self-help-books"
    />
  );
}
